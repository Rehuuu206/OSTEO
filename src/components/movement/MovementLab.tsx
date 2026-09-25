import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Camera, 
  RotateCcw, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Info, 
  Maximize2,
  FileCheck2,
  Cpu,
  Layers
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { CameraRecordingModal } from './CameraRecordingModal';
import { VideoAnalysisModal } from './VideoAnalysisModal';
import { SkeletonReplay } from './SkeletonReplay';
import { TestType } from '../../types';

export const MovementLab: React.FC = () => {
  const { activeAssessment, setActiveAssessment, selectedPatient, setCurrentView } = useApp();

  const [selectedTest, setSelectedTest] = useState<TestType>('walking');
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [activeSessionBiomechanics, setActiveSessionBiomechanics] = useState(
    activeAssessment?.movementSessions[0]?.biomechanics || null
  );

  const tests: {
    id: TestType;
    title: string;
    duration: string;
    description: string;
    instructionList: string[];
    thumbnailUrl: string;
  }[] = [
    {
      id: 'walking',
      title: 'Walking Gait & Cadence Analysis',
      duration: '10–15 seconds',
      description: 'Quantifies step cadence, gait symmetry percentage, peak knee flexion range, and antalgic limb avoidance.',
      instructionList: [
        'Ask the patient to walk 8-10 meters in a straight line at their natural, comfortable pace.',
        'Align camera at waist-height perpendicular to the walking pathway (side view).',
        'Ensure both feet and head remain inside the camera frame guidelines.'
      ],
      thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'sit_to_stand',
      title: 'Sit-to-Stand (5-Times Repetition)',
      duration: '15–20 seconds',
      description: 'Measures lower-limb functional power, trunk flexion during transition, and movement smoothness.',
      instructionList: [
        'Use a standard armless chair firmly placed against a wall.',
        'Patient crosses arms over chest and stands up fully, then sits down 5 times as fast as safely possible.',
        'Position camera 2.5 meters in front of the patient for coronal trunk sway detection.'
      ],
      thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'knee_flexion',
      title: 'Active Knee Flexion & Range of Motion',
      duration: '10 seconds',
      description: 'Determines maximum comfortable active knee flexion angle against standard normative >110° references.',
      instructionList: [
        'Patient stands holding a support or sits on the edge of a bed.',
        'Patient actively bends the affected knee backward as far as comfortably possible without sharp pain.',
        'Camera captures maximum sagittal flexion angle at the joint vertex.'
      ],
      thumbnailUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'balance',
      title: 'Standing Posture & Coronal Balance',
      duration: '10 seconds',
      description: 'Evaluates static lateral postural sway and pelvic tilt compensations.',
      instructionList: [
        'Patient stands still with feet shoulder-width apart for 10 seconds.',
        'Camera tracks shoulder and pelvic horizontal alignment.'
      ],
      thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const currentTestInfo = tests.find(t => t.id === selectedTest) || tests[0];

  const handleRecordingFinished = (sessionData: any) => {
    setActiveSessionBiomechanics(sessionData.biomechanics);
    setIsAnalysisModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Computer Vision Kinematics
            </span>
            <span className="text-xs text-slate-500">
              Patient: <strong>{selectedPatient?.name || 'Devi Saikia'}</strong> ({selectedPatient?.customId || 'OST-2026-042'})
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Biomechanical Movement Lab
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Record standardized movement videos to extract joint range-of-motion, gait symmetry, and functional transition consistency.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCameraModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/20 transition"
          >
            <Camera className="w-4 h-4" />
            <span>Launch Video Camera</span>
          </button>
          <button
            onClick={() => setCurrentView('sensors')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
          >
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>Sensor Center</span>
          </button>
        </div>
      </div>

      {/* Test Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tests.map((t) => {
          const isSelected = selectedTest === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTest(t.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-sky-50 border-sky-500 shadow-md ring-1 ring-sky-500'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {t.duration}
                </span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
              </div>
              <h3 className="text-xs font-bold text-slate-900 leading-tight mb-1">
                {t.title}
              </h3>
              <p className="text-[10px] text-slate-500 line-clamp-2">
                {t.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Test Demonstration & Camera Calibration Instructions Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 Cols: Skeleton Replay or Demonstration Feed */}
        <div className="lg:col-span-2 space-y-4">
          {activeSessionBiomechanics ? (
            <SkeletonReplay 
              biomechanics={activeSessionBiomechanics}
              onContinueToFusion={() => setCurrentView('fusion')}
            />
          ) : (
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 text-white p-6 space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-black flex items-center justify-center">
                <img
                  src={currentTestInfo.thumbnailUrl}
                  alt={currentTestInfo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-70"
                />
                <button
                  onClick={() => setIsCameraModalOpen(true)}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:scale-105 transition shadow-2xl"
                >
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </button>
                <div className="absolute bottom-3 left-3 bg-slate-950/80 px-3 py-1 rounded text-xs">
                  Watch protocol video or start test
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{currentTestInfo.title}</h3>
                  <p className="text-xs text-slate-400">Standardized clinical movement assessment</p>
                </div>
                <button
                  onClick={() => setIsCameraModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition"
                >
                  Record This Test
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Standardized Camera Setup & Protocol Guide */}
        <div className="space-y-4">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-2">
              <Camera className="w-4 h-4 text-sky-600" />
              <span>Camera Setup & Framing Protocol</span>
            </div>

            <div className="space-y-2.5">
              {currentTestInfo.instructionList.map((inst, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">{inst}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                <span>Quality Safeguards:</span>
              </div>
              <p>
                Avoid loose, flowing robes that obscure knee joints. Ask patient to roll up trousers or wear comfortable knee-level clothing.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400">Active Patient Profile</div>
            <div className="text-sm font-bold text-white">
              {selectedPatient ? selectedPatient.name : 'Devi Saikia'} ({selectedPatient?.age || 58}y, {selectedPatient?.sex || 'Female'})
            </div>
            <div className="text-xs text-slate-400">
              BMI: {selectedPatient?.bmi || 28.6} • Bilateral knee pain (VAS 7/10)
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Wearable Sensor:</span>
              <span className="text-emerald-400 font-semibold">Simulated IMU Ready</span>
            </div>
          </div>

        </div>

      </div>

      {/* Camera Recording Modal */}
      <CameraRecordingModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        testType={selectedTest}
        onRecordingComplete={handleRecordingFinished}
      />

      {/* AI Processing Modal */}
      <VideoAnalysisModal
        isOpen={isAnalysisModalOpen}
        onComplete={() => setIsAnalysisModalOpen(false)}
      />

    </div>
  );
};
