import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  Loader2, 
  BrainCircuit, 
  GitMerge, 
  Bone, 
  FileText, 
  Sparkles,
  Layers
} from 'lucide-react';

interface VideoAnalysisModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const VideoAnalysisModal: React.FC<VideoAnalysisModalProps> = ({ isOpen, onComplete }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(10);

  const stages = [
    { title: 'Uploading & Loading Video Stream', desc: 'Buffering 1080p frames at 30 FPS' },
    { title: 'Extracting Video Frames', desc: 'Generating temporal sequence & timestamp alignment' },
    { title: 'Detecting Pose Keypoints', desc: 'Running convolutional sub-pixel pose inference' },
    { title: 'Tracking Joint Coordinates', desc: 'Mapping hip-knee-ankle kinematic trajectories' },
    { title: 'Calculating Biomechanical Angles', desc: 'Computing active knee flexion ROM & trunk inclination' },
    { title: 'Analyzing Gait Kinematics', desc: 'Quantifying step cadence, symmetry index & antalgic deficit' },
    { title: 'Comparing Wearable Sensor Data', desc: 'Validating video knee angle against IMU goniometer' },
    { title: 'Running Multimodal Risk Stratification', desc: 'Fusing clinical symptoms, history & movement models' },
    { title: 'Preparing 3D Digital Twin & Report', desc: 'Generating joint load heatmap & preventive recommendations' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStageIndex(0);
      setProgressPercent(10);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < stages.length - 1) {
          const next = prev + 1;
          setProgressPercent(Math.round(((next + 1) / stages.length) * 100));
          return next;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full text-white space-y-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <BrainCircuit className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                Multimodal AI Processing Engine
              </h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                Prototype Simulation
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Extracting sub-pixel kinematics & fusing sensor signals
            </p>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Progress: {stages[currentStageIndex].title}</span>
            <span className="font-bold text-sky-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stage List */}
        <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div 
                key={stage.title}
                className={`flex items-start gap-2.5 text-xs p-1.5 rounded-lg transition ${
                  isCurrent ? 'bg-sky-950/80 text-sky-200 border border-sky-800/60' : isCompleted ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-sky-400 animate-spin flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`font-semibold ${isCurrent ? 'text-sky-300' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                    {stage.title}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {stage.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-500 text-center italic">
          OsteoSense NER Multimodal Engine • v1.2-alpha-prototype
        </div>

      </div>
    </div>
  );
};
