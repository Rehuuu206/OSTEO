import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Video, 
  Cpu, 
  GitMerge, 
  Bone, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Users, 
  WifiOff, 
  Globe, 
  Scale, 
  HeartHandshake,
  Stethoscope,
  Eye,
  Sliders
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';

interface LandingPageProps {
  onEnterApp?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { setCurrentView, loadDemoPatient, setPresentationModeOpen, setNewPatientModalOpen } = useApp();
  const { t } = useLanguage();

  const [activePipelineStep, setActivePipelineStep] = useState(0);

  const pipelineSteps = [
    { title: '1. Patient Factors', desc: 'Socio-demographics, occupational posture, pain VAS, morning stiffness', icon: Users, color: 'text-blue-500' },
    { title: '2. Video Movement', desc: 'Smartphone video of walking and sit-to-stand kinematics', icon: Video, color: 'text-teal-500' },
    { title: '3. AI Pose Estimation', desc: 'Sub-pixel joint landmark tracking & range-of-motion calculations', icon: Eye, color: 'text-indigo-500' },
    { title: '4. Sensor Fusion', desc: 'Wearable IMU goniometer validation against video estimates', icon: GitMerge, color: 'text-amber-500' },
    { title: '5. 3D Digital Twin', desc: 'Patient-specific joint stress simulation & what-if offloading', icon: Bone, color: 'text-emerald-500' },
    { title: '6. Actionable Care', desc: 'Targeted exercises, digital report, and orthopedic referral', icon: FileText, color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Tagline pill */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-semibold tracking-wide shadow-lg shadow-sky-950/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>North Eastern Region Healthcare Technology • Community OA Screening Platform</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl font-display"
            >
              See Movement. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">Understand Risk.</span> Guide Better Care.
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed"
            >
              An AI-assisted multimodal platform for early osteoarthritis risk screening, video-based biomechanical movement assessment, wearable sensor fusion, and patient-specific 3D digital twin joint simulation.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  setNewPatientModalOpen(true);
                  setCurrentView('dashboard');
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/25 transition transform hover:-translate-y-0.5"
              >
                <span>Start Screening Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={loadDemoPatient}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-white font-semibold text-sm shadow-md transition transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Explore Live Demo Case</span>
              </button>

              <button
                onClick={() => setPresentationModeOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-semibold text-sm transition"
              >
                <Play className="w-4 h-4 text-amber-400" />
                <span>Clinical Platform Tour</span>
              </button>
            </motion.div>

            {/* Animated Interactive Pipeline Flow Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full mt-10 p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md shadow-2xl"
            >
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-4 flex items-center justify-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>End-to-End Multimodal Assessment Architecture</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {pipelineSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isSelected = activePipelineStep === idx;
                  return (
                    <div
                      key={step.title}
                      onClick={() => setActivePipelineStep(idx)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-slate-750 border-sky-500/80 shadow-lg shadow-sky-950/60 ring-1 ring-sky-500' 
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center mb-2 ${step.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-white leading-tight mb-1">{step.title}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-2 leading-snug">{step.desc}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE CRITICAL PROBLEM IN RURAL & NORTH-EAST INDIA */}
      <section className="py-16 bg-slate-950/60 border-y border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              The Challenge: Late Detection & Rural Disparity
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Knee osteoarthritis (OA) affects over 62 million Indians, with severe prevalence among agricultural workers, tea garden laborers, and weavers in the North Eastern Region due to prolonged squatting, repetitive mechanical loads, and lack of local orthopedic specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-3xl font-extrabold text-red-400 font-mono mb-2">Stage 3–4</div>
              <h3 className="text-base font-semibold text-white mb-2">Late Presentation at Hospitals</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Most rural patients only see a doctor after severe cartilage loss, joint deformity, and chronic disability have already occurred, leaving total joint replacement as the only remaining option.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-3xl font-extrabold text-amber-400 font-mono mb-2">1 : 120,000</div>
              <h3 className="text-base font-semibold text-white mb-2">Orthopedist Scarcity in PHCs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sub-centres and Primary Health Centres lack radiographic setups and musculoskeletal specialists. Community health workers (ASHA/ANM) need portable, objective decision-support tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-3xl font-extrabold text-emerald-400 font-mono mb-2">3.8x Load</div>
              <h3 className="text-base font-semibold text-white mb-2">The Multiplier Prevention Window</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every 1 kg of body mass adds nearly 4 kg of tibiofemoral ground-reaction stress. Early behavioral offloading, quadriceps therapy, and simple walking aids can arrest early progression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MULTIMODAL DIFFERENTIATOR SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>The Core Innovation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              Why Multimodal Assessment Changes the Game
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              OsteoSense NER doesn't look at a questionnaire alone, nor an isolated camera angle. It fuses clinical symptoms, computer vision kinematics, wearable sensor readings, and 3D simulation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Interactive comparison card */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="font-semibold text-sm text-white">Live Sensor vs Video Fusion</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                  High Concordance
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-sky-400" />
                    <span className="text-slate-300">Wearable Knee Goniometer (IMU)</span>
                  </div>
                  <span className="font-mono font-bold text-sky-400 text-sm">82.0°</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Video className="w-4 h-4 text-teal-400" />
                    <span className="text-slate-300">Smartphone Video Pose Estimation</span>
                  </div>
                  <span className="font-mono font-bold text-teal-400 text-sm">79.2°</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <GitMerge className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-300">Absolute Variance & Agreement</span>
                  </div>
                  <span className="font-mono font-bold text-amber-400 text-sm">Δ 2.8° (High)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-800/50 text-[11px] text-sky-200">
                <strong>Dual-Signal Verification:</strong> When sensor and video estimates agree closely, confidence in joint angle measurement increases, eliminating single-sensor false positives.
              </div>
            </div>

            {/* Right: Feature breakdown */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Sub-Pixel Pose Landmarks & Joint Angles</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Calculates real-time 3-point joint angles across hip, knee, and ankle from standard smartphone camera footage.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Gait Symmetry & Antalgic Limb Offloading</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Measures left-versus-right step timing to identify protective antalgic limping before structural deformity appears.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Sit-to-Stand 5-Repetition Consistency</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Extracts trunk inclination angle, rising duration, and compensatory sway during functional chair-stand transitions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Offline-First Resilient Architecture</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Designed to function completely offline in remote villages, syncing automatically whenever cellular network connectivity resumes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 3D DIGITAL TWIN PREVIEW CALLOUT */}
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Bone className="w-3.5 h-3.5" />
              <span>Advanced Biomechanical Simulation</span>
            </div>
            <h2 className="text-3xl font-bold text-white font-display">
              Interactive 3D Knee Digital Twin & What-If Simulation
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Show patients immediately how losing 5 kg of weight or using an indigenous walking stick dramatically reduces compressive load on vulnerable cartilage. Empowers community health workers with a simple visual counseling tool.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  loadDemoPatient();
                  setCurrentView('digital_twin');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
              >
                <span>Launch 3D Digital Twin</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 p-5 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium">What-If Simulation</span>
              <Sliders className="w-4 h-4 text-sky-400" />
            </div>
            <div className="p-3 rounded-xl bg-slate-900 text-center space-y-1 border border-slate-800">
              <div className="text-[11px] text-slate-400">Baseline Relative Load</div>
              <div className="text-2xl font-bold font-mono text-red-400">88 / 100</div>
              <div className="text-[10px] text-slate-500">78 kg • Unassisted</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/60 text-center space-y-1 border border-emerald-800/60">
              <div className="text-[11px] text-emerald-300">Simulated Joint Offloading</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">56 / 100</div>
              <div className="text-[10px] text-emerald-300 font-semibold">-36.4% Joint Stress Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DISCLAIMER & CALL TO ACTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ethical, Responsible & Transparent AI</span>
          </div>

          <h3 className="text-2xl font-bold text-white font-display">
            Ready to Explore the OsteoSense NER Platform?
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.disclaimerFull}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg transition"
            >
              Enter Health Worker Dashboard
            </button>
            <button
              onClick={loadDemoPatient}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
            >
              View Devi Saikia Screening Report
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
