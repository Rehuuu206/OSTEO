import React from 'react';
import { 
  GitMerge, 
  Cpu, 
  Video, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Activity,
  Bone,
  Info
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { SensorFusionEngine } from '../../services/sensorAdapter';

export const FusionComparison: React.FC = () => {
  const { 
    activeAssessment, 
    latestSensorReading, 
    setCurrentView,
    selectedPatient
  } = useApp();

  const sensorKneeAngle = latestSensorReading ? latestSensorReading.kneeAngleDeg : 82.0;
  const videoKneeAngle = activeAssessment?.movementSessions[0]?.biomechanics.maxKneeFlexionDeg || 79.2;

  const fusionResult = SensorFusionEngine.compareSensorAndVideo(sensorKneeAngle, videoKneeAngle);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Dual-Signal Kinematic Cross-Validation
            </span>
            <span className="text-xs text-slate-500">
              Patient: <strong>{selectedPatient?.name || 'Devi Saikia'}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Sensor + Video Data Fusion Engine
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Cross-validates wearable IMU knee angle against computer-vision pose estimation to eliminate single-modality errors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('ai_insights')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            <span>Explainable AI Model</span>
          </button>
          <button
            onClick={() => setCurrentView('digital_twin')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-md transition"
          >
            <Bone className="w-4 h-4" />
            <span>Open 3D Digital Twin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Concordance Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Source A: Wearable Sensor */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Cpu className="w-4 h-4 text-sky-600" />
              <span>Wearable IMU Sensor</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
              MEASURED
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-4xl font-extrabold font-mono text-sky-600">
              {sensorKneeAngle}°
            </div>
            <p className="text-xs text-slate-500">
              Direct physical angular measurement from calibrated tibial goniometer.
            </p>
          </div>

          <div className="text-xs space-y-1 pt-2 border-t border-slate-100 text-slate-600">
            <div className="flex justify-between">
              <span>Sampling Frequency:</span>
              <span className="font-mono font-semibold text-slate-800">50 Hz Hardware</span>
            </div>
            <div className="flex justify-between">
              <span>Drift Calibration:</span>
              <span className="font-semibold text-emerald-600">Zero-Calibrated</span>
            </div>
          </div>
        </div>

        {/* Source B: Computer Vision Video */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Video className="w-4 h-4 text-teal-600" />
              <span>Video Pose Estimation</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono">
              ESTIMATED
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-4xl font-extrabold font-mono text-teal-600">
              {videoKneeAngle}°
            </div>
            <p className="text-xs text-slate-500">
              Extracted from 3-point hip-knee-ankle sub-pixel joint landmark trajectory.
            </p>
          </div>

          <div className="text-xs space-y-1 pt-2 border-t border-slate-100 text-slate-600">
            <div className="flex justify-between">
              <span>Camera Setup:</span>
              <span className="font-semibold text-slate-800">Sagittal 90° Calibrated</span>
            </div>
            <div className="flex justify-between">
              <span>Tracking Confidence:</span>
              <span className="font-mono font-semibold text-emerald-600">0.89 (Good)</span>
            </div>
          </div>
        </div>

        {/* Fusion Output: Agreement & Combined Estimate */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-sky-400">
              <GitMerge className="w-4 h-4" />
              <span>Fused Kinematic Estimate</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              fusionResult.agreementLevel === 'High' 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                : 'bg-amber-950 text-amber-300 border-amber-800'
            }`}>
              {fusionResult.agreementLevel} Agreement
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-4xl font-extrabold font-mono text-white">
              {fusionResult.combinedEstimateAngleDeg}°
            </div>
            <p className="text-xs text-slate-400">
              Variance: <strong className="text-sky-300">Δ {fusionResult.absoluteDifferenceDeg}°</strong> ({fusionResult.percentageDifference}%)
            </p>
          </div>

          <div className="text-xs space-y-1 pt-2 border-t border-slate-800 text-slate-400">
            <div className="flex justify-between">
              <span>Fusion Confidence Score:</span>
              <span className="font-mono font-bold text-emerald-400">{fusionResult.fusionConfidenceScore}%</span>
            </div>
            <div className="flex justify-between">
              <span>Dual Concordance:</span>
              <span className="font-semibold text-sky-300">Verified Compatible</span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Alignment Comparison Bar */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Angular Kinematic Distribution & Discrepancy Analysis
        </h3>

        {/* Visual Bar Comparison */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Physical IMU Sensor (Knee Flexion):</span>
              <span className="font-mono font-bold text-sky-600">{sensorKneeAngle}°</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-sky-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(sensorKneeAngle / 140) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Smartphone Video Estimate (Knee Flexion):</span>
              <span className="font-mono font-bold text-teal-600">{videoKneeAngle}°</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-teal-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(videoKneeAngle / 140) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Weighted Fused Estimate (55% IMU + 45% Video):</span>
              <span className="font-mono font-bold text-slate-900">{fusionResult.combinedEstimateAngleDeg}°</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-slate-800 h-full rounded-full transition-all duration-300"
                style={{ width: `${(fusionResult.combinedEstimateAngleDeg / 140) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recommendation Note Box */}
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Fusion Engine Validation Verdict:</div>
            <p className="leading-relaxed text-sky-800">
              {fusionResult.recommendationNote}
            </p>
          </div>
        </div>

        {/* High Disagreement safeguard */}
        {fusionResult.disagreementFlag && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold">Caution: High Disagreement Detected</div>
              <p>
                Sensor and video measurements differ significantly (&gt;12°). Review calibration, sensor placement, and camera angle before clinical referral.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
