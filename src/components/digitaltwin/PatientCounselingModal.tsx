import React, { useState } from 'react';
import { 
  X, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Dumbbell, 
  Scale, 
  ShieldCheck,
  Play
} from 'lucide-react';
import { KneeJoint3D } from './KneeJoint3D';
import { useApp } from '../../store/AppContext';
import { AIEngine } from '../../services/aiEngine';

interface PatientCounselingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientCounselingModal: React.FC<PatientCounselingModalProps> = ({ isOpen, onClose }) => {
  const { selectedPatient, activeAssessment, setCurrentView } = useApp();

  const baselineWeight = selectedPatient?.weightKg || 78;
  const [simWeight, setSimWeight] = useState(Math.max(45, baselineWeight - 5));
  const [assistance, setAssistance] = useState<'None' | 'Cane / Stick' | 'Knee Brace'>('Cane / Stick');

  if (!isOpen) return null;

  const simResult = AIEngine.simulateDigitalTwin(baselineWeight, simWeight, assistance as any, 81.2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Patient Counseling Mode
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Simple Visual Explanation
                </span>
              </div>
              <h2 className="text-base font-bold text-white">
                Explaining Joint Health to {selectedPatient?.name || 'Devi Saikia'}
              </h2>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left 3D Visualizer, Right Friendly Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto">
          
          {/* Left: 3D Knee with Heatmap */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Your Knee Joint 3D Model:</span>
            </div>

            <div className="h-[360px] rounded-2xl overflow-hidden border border-slate-700">
              <KneeJoint3D
                relativeLoadIndex={simResult.simulatedRelativeLoad}
                medialStressIndex={simResult.medialCompartmentStressIndex}
                lateralStressIndex={simResult.lateralCompartmentStressIndex}
                kneeFlexionDeg={30}
                showHeatmap={true}
              />
            </div>

            <p className="text-[11px] text-slate-400 italic text-center">
              Green areas show smooth, comfortable movement. Red areas show high pressure that causes pain.
            </p>
          </div>

          {/* Right: What-if sliders & Gentle Advice */}
          <div className="space-y-5">
            
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>Let's see how simple changes protect your knee:</span>
              </h3>

              {/* Weight change */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Simulate losing a little weight:</span>
                  <span className="font-bold text-teal-400">{baselineWeight} kg → {simWeight} kg ({baselineWeight - simWeight} kg drop)</span>
                </div>
                <input
                  type="range"
                  min={Math.max(45, baselineWeight - 12)}
                  max={baselineWeight}
                  value={simWeight}
                  onChange={(e) => setSimWeight(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
                <div className="text-[11px] text-slate-400">
                  Rule of thumb: Every 1 kg you lose takes 4 kg of pressure off your knees with every step!
                </div>
              </div>

              {/* Walking stick */}
              <div className="space-y-1.5">
                <label className="block text-xs text-slate-300">
                  Using a walking stick or cane in your hand:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['None', 'Cane / Stick', 'Knee Brace'].map((dev) => (
                    <button
                      key={dev}
                      onClick={() => setAssistance(dev as any)}
                      className={`py-2 px-2.5 rounded-xl border text-center transition ${
                        assistance === dev
                          ? 'bg-teal-600 text-white font-bold border-teal-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                      }`}
                    >
                      {dev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Benefit Badge */}
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-center space-y-1">
                <div className="text-xs text-emerald-300 font-medium">Estimated Pressure Relief on Knee:</div>
                <div className="text-3xl font-extrabold font-mono text-emerald-400">
                  -{simResult.loadReductionPercent}%
                </div>
                <div className="text-[11px] text-emerald-200 font-medium">
                  {simResult.loadReductionPercent > 20 ? 'Significant relief! Helps you walk with less pain.' : 'Good start to protect cartilage.'}
                </div>
              </div>

            </div>

            {/* Friendly Action Steps */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-semibold text-white">Recommended Simple Habits for You:</div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Do gentle leg-straightening exercises in a chair each morning (5-8 minutes).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Use a walking stick in your left hand when walking to the tea garden or market.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Sit on a low wooden stool (pirha) instead of full deep floor squats when working.</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Reassure the patient: Osteoarthritis can be managed well with daily care and early action.
          </div>
          <button
            onClick={() => {
              onClose();
              setCurrentView('exercises');
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition"
          >
            <Dumbbell className="w-4 h-4" />
            <span>Show Patient Safe Exercises</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
