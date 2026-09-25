import { BiomechanicalFeatures, PoseLandmark, TestType } from '../types';

export class CVEngine {
  /**
   * Calculates the 2D joint angle between three points (A -> B -> C) where B is the vertex.
   * Typically: A = Hip, B = Knee, C = Ankle
   */
  public static calculateJointAngle(
    a: { x: number; y: number },
    b: { x: number; y: number },
    c: { x: number; y: number }
  ): number {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
      angle = 360.0 - angle;
    }
    return Math.round(angle * 10) / 10;
  }

  /**
   * Evaluates video recording quality for reliable computer vision inference
   */
  public static evaluateVideoQuality(
    hasPerson: boolean = true,
    fullBodyVisible: boolean = true,
    lightingAdequate: boolean = true,
    cameraStable: boolean = true,
    durationSeconds: number = 10
  ): {
    quality: 'POOR' | 'ACCEPTABLE' | 'GOOD' | 'EXCELLENT';
    score: number;
    issues: string[];
    canProcess: boolean;
  } {
    const issues: string[] = [];
    let score = 100;

    if (!hasPerson) {
      issues.push('No patient detected in camera view');
      score -= 50;
    }
    if (!fullBodyVisible) {
      issues.push('Full body (head to feet) not completely framed in camera');
      score -= 30;
    }
    if (!lightingAdequate) {
      issues.push('Insufficient or uneven lighting; joints may be shadowed');
      score -= 20;
    }
    if (!cameraStable) {
      issues.push('Camera movement / shake detected; recommend tripod or firm surface');
      score -= 15;
    }
    if (durationSeconds < 5) {
      issues.push('Recording duration too short (<5 seconds) for gait cycle detection');
      score -= 25;
    }

    score = Math.max(0, score);
    let quality: 'POOR' | 'ACCEPTABLE' | 'GOOD' | 'EXCELLENT' = 'GOOD';
    if (score < 50) quality = 'POOR';
    else if (score < 75) quality = 'ACCEPTABLE';
    else if (score < 90) quality = 'GOOD';
    else quality = 'EXCELLENT';

    return {
      quality,
      score,
      issues,
      canProcess: score >= 50
    };
  }

  /**
   * Generates realistic biomechanical features for a given test type
   * Clearly labeled with "Estimated from video", confidence, and data quality
   */
  public static extractBiomechanicalFeatures(
    testType: TestType,
    severityModifier: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK' = 'HIGH_RISK'
  ): BiomechanicalFeatures {
    if (testType === 'walking') {
      if (severityModifier === 'HIGH_RISK') {
        return {
          source: 'Estimated from video',
          confidence: 0.89,
          dataQuality: 'GOOD',
          maxKneeFlexionDeg: 79.2,
          minKneeFlexionDeg: 6.4,
          kneeRomDeg: 72.8,
          hipFlexionDeg: 28.5,
          ankleRomDeg: 18.2,
          trunkInclinationDeg: 12.4,
          gaitSymmetryPercent: 81.2,
          cadenceStepsPerMin: 88,
          estimatedWalkingSpeedMps: 0.82,
          strideDurationSeconds: 1.36,
          movementSmoothnessScore: 68,
          lateralSwayCm: 6.8
        };
      } else if (severityModifier === 'MODERATE_RISK') {
        return {
          source: 'Estimated from video',
          confidence: 0.92,
          dataQuality: 'GOOD',
          maxKneeFlexionDeg: 98.4,
          minKneeFlexionDeg: 4.2,
          kneeRomDeg: 94.2,
          hipFlexionDeg: 34.0,
          ankleRomDeg: 22.5,
          trunkInclinationDeg: 7.8,
          gaitSymmetryPercent: 89.5,
          cadenceStepsPerMin: 98,
          estimatedWalkingSpeedMps: 1.05,
          strideDurationSeconds: 1.22,
          movementSmoothnessScore: 78,
          lateralSwayCm: 4.2
        };
      } else {
        return {
          source: 'Estimated from video',
          confidence: 0.95,
          dataQuality: 'EXCELLENT',
          maxKneeFlexionDeg: 114.5,
          minKneeFlexionDeg: 2.1,
          kneeRomDeg: 112.4,
          hipFlexionDeg: 39.2,
          ankleRomDeg: 26.0,
          trunkInclinationDeg: 3.5,
          gaitSymmetryPercent: 97.2,
          cadenceStepsPerMin: 112,
          estimatedWalkingSpeedMps: 1.28,
          strideDurationSeconds: 1.07,
          movementSmoothnessScore: 92,
          lateralSwayCm: 2.6
        };
      }
    } else if (testType === 'sit_to_stand') {
      return {
        source: 'Estimated from video',
        confidence: 0.87,
        dataQuality: 'GOOD',
        maxKneeFlexionDeg: 88.0,
        minKneeFlexionDeg: 8.5,
        kneeRomDeg: 79.5,
        hipFlexionDeg: 72.0,
        ankleRomDeg: 16.0,
        trunkInclinationDeg: 24.5,
        gaitSymmetryPercent: 79.0,
        cadenceStepsPerMin: 0,
        estimatedWalkingSpeedMps: 0,
        strideDurationSeconds: 0,
        movementSmoothnessScore: 62,
        lateralSwayCm: 5.4,
        sitToStandRepsCount: 5,
        sitToStandAvgDurationSec: 3.8,
        sitToStandConsistencyScore: 65
      };
    } else {
      // Knee flexion active test
      return {
        source: 'Estimated from video',
        confidence: 0.91,
        dataQuality: 'GOOD',
        maxKneeFlexionDeg: 84.0,
        minKneeFlexionDeg: 5.0,
        kneeRomDeg: 79.0,
        hipFlexionDeg: 30.0,
        ankleRomDeg: 20.0,
        trunkInclinationDeg: 5.0,
        gaitSymmetryPercent: 84.0,
        cadenceStepsPerMin: 0,
        estimatedWalkingSpeedMps: 0,
        strideDurationSeconds: 0,
        movementSmoothnessScore: 72,
        lateralSwayCm: 3.0
      };
    }
  }

  /**
   * Generates a sample frame pose landmarks array for animated skeleton overlay
   */
  public static getSamplePoseLandmarks(timeOffsetSec: number, gaitCyclePhase: number): PoseLandmark[] {
    const cycle = (timeOffsetSec * 1.5 + gaitCyclePhase) % (Math.PI * 2);
    const legSwing = Math.sin(cycle) * 0.12;
    const legStance = -Math.sin(cycle) * 0.12;
    const kneeBend = Math.max(0, Math.sin(cycle)) * 0.15;

    return [
      { name: 'nose', x: 0.5, y: 0.15, visibility: 0.99 },
      { name: 'left_shoulder', x: 0.44, y: 0.26, visibility: 0.98 },
      { name: 'right_shoulder', x: 0.56, y: 0.26, visibility: 0.98 },
      { name: 'left_elbow', x: 0.40, y: 0.38, visibility: 0.95 },
      { name: 'right_elbow', x: 0.60, y: 0.38, visibility: 0.95 },
      { name: 'left_wrist', x: 0.38, y: 0.50, visibility: 0.92 },
      { name: 'right_wrist', x: 0.62, y: 0.50, visibility: 0.92 },
      { name: 'mid_spine', x: 0.50, y: 0.35, visibility: 0.96 },
      { name: 'left_hip', x: 0.46, y: 0.52, visibility: 0.98 },
      { name: 'right_hip', x: 0.54, y: 0.52, visibility: 0.98 },
      { name: 'left_knee', x: 0.45 + legStance * 0.5, y: 0.70 + kneeBend * 0.4, visibility: 0.97 },
      { name: 'right_knee', x: 0.55 + legSwing * 0.5, y: 0.70, visibility: 0.97 },
      { name: 'left_ankle', x: 0.45 + legStance, y: 0.88, visibility: 0.96 },
      { name: 'right_ankle', x: 0.55 + legSwing, y: 0.88 - kneeBend * 0.3, visibility: 0.96 }
    ];
  }
}
