import React, { useState } from 'react';
import { 
  Bone, 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  HeartHandshake, 
  TrendingDown, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  Activity,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';
import { KneeJoint3D } from './KneeJoint3D';
import { PatientCounselingModal } from './PatientCounselingModal';
import { useApp } from '../../store/AppContext';
import { AIEngine } from '../../services/aiEngine';

export const DigitalTwinView: React.FC = () => {
  const { selectedPatient, activeAssessment, setCurrentView } = useApp();

  const baselineWeight = selectedPatient?.weightKg || 78;
  const [simWeight, setSimWeight] = useState(Math.max(45, baselineWeight - 6));
  const [assistiveDevice, setAssistiveDevice] = useState<'None' | 'Cane / Stick' | 'Knee Brace' | 'Walker'>('Cane / Stick');
  const [simGaitSymmetry, setSimGaitSymmetry] = useState(92);
  const [kneeFlexionAngle, setKneeFlexionAngle] = useState(35);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [focusedCompartment, setFocusedCompartment] = useState<'all' | 'medial' | 'lateral' | 'patellofemoral'>('all');
  
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);

  // Compute what-if simulation
  const baselineResult = AIEngine.simulateDigitalTwin(baselineWeight, baselineWeight, 'None', 81.2);
  const simResult = AIEngine.simulateDigitalTwin(baselineWeight, simWeight, assistiveDevice, simGaitSymmetry);

  const handleResetSimulation = () => {
    setSimWeight(Math.max(45, baselineWeight - 6));
    setAssistiveDevice('Cane / Stick');
    setSimGaitSymmetry(92);
    setKneeFlexionAngle(35);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-200">
              Biomechanical Simulation Engine
            </span>
            <span className="text-xs text-slate-500">
              Patient: <strong>{selectedPatient?.name || 'Devi Saikia'}</strong> ({selectedPatient?.customId || 'OST-2026-042'})
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            3D Biomechanical Digital Twin & Joint Load Simulation
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Patient-specific tibiofemoral kinematic model. Simulates compartment contact stress distribution and non-invasive offloading interventions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCounselingModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-600/20 transition"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Patient Counseling Mode</span>
          </button>

          <button
            onClick={() => setCurrentView('reports')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            <span>Generate Report</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Viewport on Left, Interactive What-If Controls on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Cols: 3D Joint Simulator */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-4 shadow-2xl relative overflow-hidden">
            
            {/* Top Toolbar overlay inside 3D canvas */}
            <div className="flex items-center justify-between z-10 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bone className="w-4 h-4 text-sky-400" />
                  <span>Right Knee Joint Digital Twin</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  Patient Specific
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    showHeatmap ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {showHeatmap ? 'Heatmap: ON' : 'Heatmap: OFF'}
                </button>
              </div>
            </div>

            {/* Three.js Container */}
            <div className="h-[440px] rounded-2xl overflow-hidden border border-slate-800/80 relative">
              <KneeJoint3D
                relativeLoadIndex={simResult.simulatedRelativeLoad}
                medialStressIndex={simResult.medialCompartmentStressIndex}
                lateralStressIndex={simResult.lateralCompartmentStressIndex}
                kneeFlexionDeg={kneeFlexionAngle}
                showHeatmap={showHeatmap}
              />
            </div>

            {/* Compartment Stress Heatmap Legend & Summary */}
            <div className="mt-4 grid grid-cols-3 gap-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Medial Compartment</div>
                <div className="text-lg font-bold font-mono text-red-400">
                  {simResult.medialCompartmentStressIndex}
                  <span className="text-xs text-slate-500 font-normal"> / 100</span>
                </div>
                <div className="text-[10px] text-red-400">Peak Adduction Pressure</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Lateral Compartment</div>
                <div className="text-lg font-bold font-mono text-emerald-400">
                  {simResult.lateralCompartmentStressIndex}
                  <span className="text-xs text-slate-500 font-normal"> / 100</span>
                </div>
                <div className="text-[10px] text-emerald-400">Normative Range</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Patellofemoral Joint</div>
                <div className="text-lg font-bold font-mono text-amber-400">
                  {simResult.patellofemoralStressIndex}
                  <span className="text-xs text-slate-500 font-normal"> / 100</span>
                </div>
                <div className="text-[10px] text-amber-400">Moderate Flexion Shear</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right 5 Cols: What-If Simulation Controls & Comparative Outcomes */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sliders className="w-4 h-4 text-sky-600" />
                <span>What-If Intervention Simulator</span>
              </div>
              <button
                onClick={handleResetSimulation}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Slider 1: Body Weight Reduction */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-700">
                <span className="font-semibold">Simulated Body Weight:</span>
                <span className="font-mono font-bold text-sky-700">
                  {simWeight} kg ({simWeight < baselineWeight ? `-${baselineWeight - simWeight} kg` : 'Baseline'})
                </span>
              </div>
              <input
                type="range"
                min={Math.max(45, baselineWeight - 15)}
                max={baselineWeight}
                value={simWeight}
                onChange={(e) => setSimWeight(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>{baselineWeight - 15} kg</span>
                <span>Current: {baselineWeight} kg</span>
              </div>
            </div>

            {/* Slider 2: Assistive Offloading Device */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Walking Assistive Offloading Support:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['None', 'Cane / Stick', 'Knee Brace', 'Walker'] as const).map((device) => (
                  <button
                    key={device}
                    onClick={() => setAssistiveDevice(device)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition ${
                      assistiveDevice === device
                        ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {device}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 3: Gait Symmetry Correction */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-700">
                <span className="font-semibold">Gait Symmetry Target:</span>
                <span className="font-mono font-bold text-sky-700">{simGaitSymmetry}%</span>
              </div>
              <input
                type="range"
                min={75}
                max={98}
                value={simGaitSymmetry}
                onChange={(e) => setSimGaitSymmetry(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>75% (Severe Limp)</span>
                <span>81.2% (Current)</span>
                <span>98% (Symmetric)</span>
              </div>
            </div>

            {/* Slider 4: Knee Flexion Angle Animation */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-slate-700">
                <span className="font-semibold">Joint Angle Dynamic Pose:</span>
                <span className="font-mono font-bold text-slate-900">{kneeFlexionAngle}° Flexion</span>
              </div>
              <input
                type="range"
                min={0}
                max={90}
                value={kneeFlexionAngle}
                onChange={(e) => setKneeFlexionAngle(Number(e.target.value))}
                className="w-full accent-slate-800"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0° (Full Extension)</span>
                <span>45° (Mid-Stance)</span>
                <span>90° (Deep Flexion)</span>
              </div>
            </div>

          </div>

          {/* Outcome Comparison Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-sky-950 text-white border border-sky-900/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                  Simulated Joint Offload
                </span>
              </div>
              <span className="text-2xl font-extrabold font-mono text-emerald-400">
                -{simResult.loadReductionPercent}%
              </span>
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400">Baseline Contact Stress</div>
                <div className="text-xl font-bold font-mono text-red-400">
                  {baselineResult.baselineRelativeLoad} <span className="text-xs text-slate-500">/ 100</span>
                </div>
                <div className="text-[10px] text-slate-400">Unmodified Stride</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400">Simulated Contact Stress</div>
                <div className="text-xl font-bold font-mono text-emerald-400">
                  {simResult.simulatedRelativeLoad} <span className="text-xs text-slate-500">/ 100</span>
                </div>
                <div className="text-[10px] text-emerald-400">With Interventions</div>
              </div>
            </div>

            {/* Clinical Explanation Text */}
            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
              {simResult.explanationText || simResult.explanation}
            </p>
          </div>

        </div>

      </div>

      {/* Patient Counseling Modal */}
      <PatientCounselingModal
        isOpen={isCounselingModalOpen}
        onClose={() => setIsCounselingModalOpen(false)}
      />

    </div>
  );
};
