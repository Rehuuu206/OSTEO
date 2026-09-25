import { SensorReading, SensorFusionComparison } from '../types';

export interface ISensorAdapter {
  connect(): Promise<boolean>;
  disconnect(): void;
  isConnected(): boolean;
  subscribe(callback: (reading: SensorReading) => void): () => void;
  getLatestReading(): SensorReading | null;
}

export class MockSensorAdapter implements ISensorAdapter {
  private connected: boolean = false;
  private intervalId: number | null = null;
  private callbacks: ((reading: SensorReading) => void)[] = [];
  private latestReading: SensorReading | null = null;
  private phase: number = 0;

  public async connect(): Promise<boolean> {
    this.connected = true;
    this.startStreaming();
    return true;
  }

  public disconnect(): void {
    this.connected = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public isConnected(): boolean {
    return this.connected;
  }

  public subscribe(callback: (reading: SensorReading) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  public getLatestReading(): SensorReading | null {
    return this.latestReading;
  }

  private startStreaming(): void {
    if (this.intervalId !== null) return;

    this.intervalId = window.setInterval(() => {
      if (!this.connected) return;

      this.phase += 0.15;
      // Realistic walking / flexion IMU data: baseline 82 degrees with subtle periodic gait fluctuation
      const kneeAngle = Math.round((82.0 + Math.sin(this.phase) * 6.5 + (Math.random() - 0.5) * 0.8) * 10) / 10;
      const accelX = Math.round((0.15 + Math.cos(this.phase) * 0.25) * 100) / 100;
      const accelY = Math.round((0.98 + Math.sin(this.phase) * 0.35) * 100) / 100;
      const accelZ = Math.round((0.22 + Math.sin(this.phase * 2) * 0.18) * 100) / 100;
      const gyroX = Math.round((Math.sin(this.phase) * 45.0) * 10) / 10;
      const gyroY = Math.round((Math.cos(this.phase) * 32.0) * 10) / 10;
      const gyroZ = Math.round((Math.sin(this.phase * 0.5) * 15.0) * 10) / 10;
      const loadIndex = Math.round(Math.min(100, Math.max(20, 65 + Math.sin(this.phase) * 22)));

      const reading: SensorReading = {
        timestamp: Date.now(),
        kneeAngleDeg: kneeAngle,
        accelX,
        accelY,
        accelZ,
        gyroX,
        gyroY,
        gyroZ,
        loadIndexEstimated: loadIndex
      };

      this.latestReading = reading;
      this.callbacks.forEach(cb => cb(reading));
    }, 150);
  }
}

export class SensorFusionEngine {
  public static compareSensorAndVideo(
    sensorKneeAngleDeg: number,
    videoKneeAngleDeg: number
  ): SensorFusionComparison {
    const absoluteDifferenceDeg = Math.round(Math.abs(sensorKneeAngleDeg - videoKneeAngleDeg) * 10) / 10;
    const base = Math.max(1, (sensorKneeAngleDeg + videoKneeAngleDeg) / 2);
    const percentageDifference = Math.round((absoluteDifferenceDeg / base) * 1000) / 10;

    let agreementLevel: 'High' | 'Moderate' | 'Review Required' = 'High';
    let disagreementFlag = false;
    let recommendationNote = '';
    let fusionConfidenceScore = 95;

    if (absoluteDifferenceDeg <= 5.0) {
      agreementLevel = 'High';
      fusionConfidenceScore = 92;
      disagreementFlag = false;
      recommendationNote = `Sensor (${sensorKneeAngleDeg}°) and Video estimate (${videoKneeAngleDeg}°) show high concordant agreement (Δ ${absoluteDifferenceDeg}°). High confidence in biomechanical kinematics.`;
    } else if (absoluteDifferenceDeg <= 12.0) {
      agreementLevel = 'Moderate';
      fusionConfidenceScore = 78;
      disagreementFlag = false;
      recommendationNote = `Moderate variance detected (Δ ${absoluteDifferenceDeg}°). Minor calibration variance or camera parallax angle may contribute. Acceptable for screening guidance.`;
    } else {
      agreementLevel = 'Review Required';
      fusionConfidenceScore = 55;
      disagreementFlag = true;
      recommendationNote = `Sensor and video measurements differ significantly (Δ ${absoluteDifferenceDeg}°). Review sensor placement, recalibrate IMU, and verify camera perpendicular framing before clinical evaluation.`;
    }

    const combinedEstimateAngleDeg = Math.round(((sensorKneeAngleDeg * 0.55 + videoKneeAngleDeg * 0.45)) * 10) / 10;

    return {
      sensorKneeAngleDeg,
      videoKneeAngleDeg,
      absoluteDifferenceDeg,
      percentageDifference,
      agreementLevel,
      fusionConfidenceScore,
      combinedEstimateAngleDeg,
      disagreementFlag,
      recommendationNote
    };
  }
}
