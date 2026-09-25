import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Wifi, 
  WifiOff, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sliders, 
  Radio,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { SensorReading } from '../../types';

export const SensorCenter: React.FC = () => {
  const { 
    isSensorConnected, 
    connectSensor, 
    disconnectSensor, 
    latestSensorReading, 
    setCurrentView,
    activeAssessment
  } = useApp();

  const [connectionType, setConnectionType] = useState<'mock' | 'bluetooth' | 'serial'>('mock');
  const [readingsHistory, setReadingsHistory] = useState<number[]>([]);

  // Track recent knee angle trajectory
  useEffect(() => {
    if (latestSensorReading) {
      setReadingsHistory(prev => [...prev.slice(-24), latestSensorReading.kneeAngleDeg]);
    }
  }, [latestSensorReading]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Wearable IMU Goniometer
            </span>
            <span className="text-xs text-slate-500">
              Sensor Hardware Adapter Engine
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Wearable Physical Sensor Center
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Connect wireless IMU knee braces and goniometers to continuously sample knee kinematics, 3-axis acceleration, and angular rates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSensorConnected ? (
            <button
              onClick={disconnectSensor}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold transition"
            >
              <WifiOff className="w-4 h-4 text-amber-600" />
              <span>Disconnect Sensor</span>
            </button>
          ) : (
            <button
              onClick={connectSensor}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition"
            >
              <Zap className="w-4 h-4" />
              <span>Connect Wearable IMU</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('fusion')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition"
          >
            <span>Run Sensor + Video Fusion</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sensor Adapter Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div
          onClick={() => setConnectionType('mock')}
          className={`p-4 rounded-2xl border cursor-pointer transition ${
            connectionType === 'mock'
              ? 'bg-sky-50/70 border-sky-500 shadow-sm ring-1 ring-sky-500'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">Mock Sensor Adapter</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Pre-calibrated
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            High-fidelity synthetic stream generating realistic 82° knee flexion with natural walking cycle harmonics.
          </p>
        </div>

        <div
          onClick={() => setConnectionType('bluetooth')}
          className={`p-4 rounded-2xl border cursor-pointer transition ${
            connectionType === 'bluetooth'
              ? 'bg-sky-50/70 border-sky-500 shadow-sm ring-1 ring-sky-500'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">Bluetooth LE (BLE)</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Web Bluetooth API
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Direct wireless pairing with Arduino / ESP32 MPU6050 knee bands over standard GATT characteristics.
          </p>
        </div>

        <div
          onClick={() => setConnectionType('serial')}
          className={`p-4 rounded-2xl border cursor-pointer transition ${
            connectionType === 'serial'
              ? 'bg-sky-50/70 border-sky-500 shadow-sm ring-1 ring-sky-500'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">USB / Serial COM Port</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Web Serial API
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Wired connection for stationary clinical research benches & custom lab goniometers.
          </p>
        </div>

      </div>

      {/* Live Stream Telemetry & Sparkline Graph */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-6 text-white space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${isSensorConnected ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  Live IMU Kinematic Telemetry
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  isSensorConnected ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isSensorConnected ? 'STREAMING ACTIVE • 150ms INTERVAL' : 'STANDBY'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sampling rate: 6.6 Hz • 6-DOF IMU (Accelerometer + Gyroscope)
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Knee Target: <span className="text-sky-400 font-bold">Right Knee Anterior Compartment</span>
          </div>
        </div>

        {/* Live Gauges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Sensor Knee Angle</span>
            <div className="text-3xl font-extrabold font-mono text-sky-400">
              {latestSensorReading ? `${latestSensorReading.kneeAngleDeg}°` : '82.0°'}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Physical IMU Verified</span>
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Accelerometer (g)</span>
            <div className="text-xs font-mono text-slate-300 space-y-0.5 pt-1">
              <div>Ax: <span className="text-white font-bold">{latestSensorReading?.accelX ?? 0.15} g</span></div>
              <div>Ay: <span className="text-white font-bold">{latestSensorReading?.accelY ?? 0.98} g</span></div>
              <div>Az: <span className="text-white font-bold">{latestSensorReading?.accelZ ?? 0.22} g</span></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Gyroscope (°/s)</span>
            <div className="text-xs font-mono text-slate-300 space-y-0.5 pt-1">
              <div>Gx: <span className="text-white font-bold">{latestSensorReading?.gyroX ?? 12.4}°/s</span></div>
              <div>Gy: <span className="text-white font-bold">{latestSensorReading?.gyroY ?? -8.2}°/s</span></div>
              <div>Gz: <span className="text-white font-bold">{latestSensorReading?.gyroZ ?? 4.1}°/s</span></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Estimated Joint Load</span>
            <div className="text-3xl font-extrabold font-mono text-amber-400">
              {latestSensorReading ? latestSensorReading.loadIndexEstimated : 72}
              <span className="text-xs text-slate-500 font-normal"> / 100</span>
            </div>
            <span className="text-[10px] text-amber-400">Moderate ground-reaction</span>
          </div>

        </div>

        {/* Live Sparkline Graph Canvas */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Real-time Knee Flexion Angle Waveform (deg)</span>
            <span className="font-mono text-sky-400">82° Nominal Baseline</span>
          </div>

          <div className="h-28 w-full flex items-end gap-1.5 pt-4">
            {(readingsHistory.length > 0 ? readingsHistory : [80, 81, 82, 83, 82, 81, 82, 83, 84, 82, 81, 82]).map((val, idx) => {
              const heightPercent = Math.min(100, Math.max(20, ((val - 60) / 40) * 100));
              return (
                <div
                  key={idx}
                  className="flex-1 bg-sky-500/80 hover:bg-sky-400 rounded-t transition-all duration-150 relative group"
                  style={{ height: `${heightPercent}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono pointer-events-none whitespace-nowrap z-10">
                    {val}°
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>-5.0s</span>
            <span>Gait Cycle Phase Waveform</span>
            <span>Now (0.0s)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
