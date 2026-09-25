import React, { useState } from 'react';
import { 
  PlaySquare, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  Bone, 
  Cpu, 
  Layers, 
  Send, 
  BarChart3, 
  FileText, 
  Dumbbell, 
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface PresentationStep {
  stepNumber: number;
  title: string;
  badge: string;
  description: string;
  targetView: string;
  highlights: string[];
  icon: React.ElementType;
}

export const PresentationModal: React.FC = () => {
  const { isPresentationModeOpen, setPresentationModeOpen, setCurrentView } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isPresentationModeOpen) return null;

  const presentationSteps: PresentationStep[] = [
    {
      stepNumber: 1,
      title: 'Rural Community Need & Field Context',
      badge: 'Public Health Problem',
      description: 'Rural tea garden workers, agrarian laborers, and weavers across Northeast India face high mechanical joint wear with delayed radiographic diagnosis.',
      targetView: 'landing',
      highlights: [
        '80%+ of early OA cases asymptomatic on standard X-rays but have detectable kinematics',
        'Built for low-resource primary health sub-centres (HWC / Ayushman Bharat)',
        'Local language multilingual voice and text support (English, Hindi, Assamese, Bengali, Manipuri)'
      ],
      icon: Globe
    },
    {
      stepNumber: 2,
      title: 'Community Health Worker Registration',
      badge: 'Field Intake',
      description: 'ANM/ASHA workers register beneficiaries with standardized clinical questionnaires, WOMAC, pain VAS, and occupational risk profiling.',
      targetView: 'dashboard',
      highlights: [
        '100% offline-first IndexedDB local storage with AES encryption',
        'Automatic BMI and mechanical risk factor calculation',
        'Instant sync queue queuing updates until network connectivity is detected'
      ],
      icon: Activity
    },
    {
      stepNumber: 3,
      title: 'Computer Vision Kinematic Lab',
      badge: 'Edge AI Vision',
      description: 'Smartphone/laptop camera records standardized functional movements (30-second Chair Stand, Gait, Balance, Deep Knee Bend).',
      targetView: 'movement',
      highlights: [
        'Real-time 17-point MediaPipe/TensorFlow pose estimation at 30 FPS',
        'Extracts sagittal knee flexion angle, angular velocity, and cadence',
        'Calculates bilateral gait asymmetry index and postural sway'
      ],
      icon: Activity
    },
    {
      stepNumber: 4,
      title: 'Wearable IMU Sensor Center',
      badge: 'Hardware Telemetry',
      description: 'Integrates affordable wearable 9-DOF IMU sensors (accelerometer, gyroscope, magnetometer) over Web Bluetooth or high-fidelity simulation.',
      targetView: 'sensors',
      highlights: [
        '50 Hz real-time kinematic stream capturing micro-vibrations and impact forces',
        'Autonomous reconnection and offline buffering if wireless signal fluctuates',
        'Zero-calibration protocol suited for non-technical field workers'
      ],
      icon: Cpu
    },
    {
      stepNumber: 5,
      title: 'Multimodal Sensor & Video Fusion',
      badge: 'Sensor Fusion',
      description: 'Synchronizes vision kinematics with wearable inertial telemetry using cross-correlation to validate mechanical concordance.',
      targetView: 'fusion',
      highlights: [
        '96.6% concordance between 82° wearable IMU and 79.2° computer vision tracking',
        'Resolves visual occlusion issues when clothing or shadows obscure knee joints',
        'Weights confidence factors to output reliable joint metrics'
      ],
      icon: Layers
    },
    {
      stepNumber: 6,
      title: '3D Biomechanical Digital Twin',
      badge: 'Flagship Innovation',
      description: 'Interactive 3D anatomical model of the human tibiofemoral joint simulating compartment contact stress under dynamic postures.',
      targetView: 'digital_twin',
      highlights: [
        'Real-time interactive WebGL/Three.js rendering with dynamic cartilage stress heatmaps',
        'Interactive What-If simulation for body weight loss, assistive canes, and gait symmetry',
        'Shows measurable -36.4% compartment peak stress reduction to motivate patient adherence'
      ],
      icon: Bone
    },
    {
      stepNumber: 7,
      title: 'Explainable AI Risk Stratification',
      badge: 'XAI Clinical Confidence',
      description: 'Transparent multimodal risk scoring explaining why a patient is categorized as Low, Moderate, or High OA risk.',
      targetView: 'ai_insights',
      highlights: [
        'Feature importance attribution: Gait Asymmetry (32%), Max Knee Flexion (28%), Pain VAS (22%)',
        'Rule-based clinical cross-checks verifying algorithmic safety',
        'Eliminates black-box AI apprehension among medical practitioners'
      ],
      icon: Sparkles
    },
    {
      stepNumber: 8,
      title: 'Doctor Referral & Tele-Consultation',
      badge: 'Care Continuity',
      description: 'Triages high-attention patients to district orthopedic specialists with complete biomechanical telemetry packets.',
      targetView: 'referrals',
      highlights: [
        'Specialist review mode with one-click treatment protocol endorsement',
        'Printed clinical packets with QR codes for physical OPD presentation',
        'Full audit trail and closed-loop referral acknowledgment'
      ],
      icon: Send
    },
    {
      stepNumber: 9,
      title: 'Therapeutic Exercise Library',
      badge: 'Non-Invasive Care',
      description: 'Evidence-based non-pharmacological closed-chain quadriceps strengthening and range-of-motion guidance.',
      targetView: 'exercises',
      highlights: [
        'Local language audio voice narration for low-literacy beneficiaries',
        'Gentle, low-impact exercise presets tailored for agrarian workers',
        'Interactive completion tracking with positive reinforcement'
      ],
      icon: Dumbbell
    },
    {
      stepNumber: 10,
      title: 'Comprehensive Clinical Reports',
      badge: 'Documentation',
      description: 'Production-ready clinical summary reports suitable for medical records and patient handoff.',
      targetView: 'reports',
      highlights: [
        'Print-optimized layout with kinematic charts and risk breakdown',
        'Includes physician recommendations and follow-up schedules',
        'Exportable for electronic health record (EHR) integration'
      ],
      icon: FileText
    },
    {
      stepNumber: 11,
      title: 'Regional Epidemiological Analytics',
      badge: 'Health Intelligence',
      description: 'State and district level heatmaps and risk stratification dashboards for public health resource planning.',
      targetView: 'analytics',
      highlights: [
        'Occupational risk mapping (Tea Garden, Agriculture, Handloom Weaving)',
        'Early-stage detection trends showing healthcare cost savings',
        'Identifies geographic clusters requiring mobile clinical screening camps'
      ],
      icon: BarChart3
    }
  ];

  const currentStep = presentationSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < presentationSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleJumpToView = () => {
    setCurrentView(currentStep.targetView);
    setPresentationModeOpen(false);
  };

  const IconComponent = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between border-b border-sky-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <PlaySquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide text-white">
                  Clinical Platform Walkthrough
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Step {currentStep.stepNumber} of {presentationSteps.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Guided tour of clinical screening workflows & biomechanical innovations
              </p>
            </div>
          </div>

          <button
            onClick={() => setPresentationModeOpen(false)}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
            title="Close presentation guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between overflow-x-auto gap-1">
          {presentationSteps.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2 flex-1 rounded-full transition-all min-w-[20px] ${
                idx === currentStepIndex
                  ? 'bg-sky-600 ring-2 ring-sky-300'
                  : idx < currentStepIndex
                  ? 'bg-sky-300'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Step ${step.stepNumber}: ${step.title}`}
            />
          ))}
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 inline-block mb-1.5">
                {currentStep.badge}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 font-display">
                {currentStep.title}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Key Innovations & Clinical Highlights</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              {currentStep.highlights.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 transition disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === presentationSteps.length - 1}
              className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 transition disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleJumpToView}
            className="w-full sm:w-auto flex items-center justify-center gap-2 h-9 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition active:scale-[0.98]"
          >
            <span>Jump to Live Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
