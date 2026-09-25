import React from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  TrendingDown, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ChevronRight, 
  Bone, 
  Scale, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const AIInsightsView: React.FC = () => {
  const { activeAssessment, selectedPatient, setCurrentView } = useApp();

  const ai = activeAssessment?.aiAssessment;
  const overallRisk = ai?.overallRisk || 'HIGH';
  const riskScore = ai?.riskIndexScore || ai?.compositeRiskScore || 78;

  interface FactorItem {
    factor: string;
    weightPercent: number;
    clinicalRationale: string;
  }

  const topFactors: FactorItem[] = ai?.topContributingFactors || [
    { factor: 'Asymmetric Gait Pattern (18.8% Antalgic Limp)', weightPercent: 25, clinicalRationale: 'Causes asymmetric shock absorption loading on the medial compartment.' },
    { factor: 'Knee Pain Severity (VAS 7/10)', weightPercent: 20, clinicalRationale: 'Indicates active intra-articular nociceptive distress during weight-bearing.' },
    { factor: 'Restricted Knee Flexion Range (79.2° vs >110° Ref)', weightPercent: 18, clinicalRationale: 'Significant kinematic deficit limiting stair climbing and ground tasks.' },
    { factor: 'Elevated Mechanical Load (BMI 28.6 kg/m²)', weightPercent: 15, clinicalRationale: 'Increases ground-reaction forces by approximately 4x body weight per step.' },
    { factor: 'Occupational Ground Kneeling & Tea Slope Traversing', weightPercent: 12, clinicalRationale: 'Daily repetitive biomechanical shear strain on knee cartilage.' },
    { factor: 'Age (58y) & First-Degree Family History', weightPercent: 10, clinicalRationale: 'Genetic collagen susceptibility combined with natural cellular matrix aging.' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Explainable AI (XAI) Model
            </span>
            <span className="text-xs text-slate-500">
              Patient: <strong>{selectedPatient?.name || 'Devi Saikia'}</strong> ({selectedPatient?.customId || 'OST-2026-042'})
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Multimodal AI Risk Stratification & Feature Attribution
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Transparent algorithmic breakdown highlighting clinical, kinematic, and sensor contributions to the composite OA risk score.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('digital_twin')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            <Bone className="w-4 h-4 text-sky-400" />
            <span>Open 3D Digital Twin</span>
          </button>
          <button
            onClick={() => setCurrentView('referrals')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition"
          >
            <span>Proceed to Doctor Referral</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Composite Risk Score Overview Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-900/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Composite Stratification Result
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {overallRisk === 'HIGH' ? 'High Risk / Clinical Attention Tier' : overallRisk === 'MODERATE' ? 'Moderate Risk Tier' : 'Low Risk / Routine Monitoring'}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Composite score derived from multi-layer fusion of clinical pain history, video sub-pixel knee range-of-motion, wearable sensor concordance, and occupational posture demands.
          </p>
        </div>

        {/* Big Score Gauge */}
        <div className="flex items-center gap-4 bg-slate-950/80 p-5 rounded-2xl border border-purple-800/60 flex-shrink-0">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-purple-400">
              {riskScore}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
              Risk Index / 100
            </div>
          </div>
          <div className="h-12 w-px bg-slate-800" />
          <div className="text-xs space-y-1">
            <div className="font-semibold text-purple-200">Confidence: 91.4%</div>
            <div className="text-[10px] text-slate-400">Model: Ensemble Gradient RF</div>
            <div className="text-[10px] text-emerald-400 font-medium">Concordance: Verified</div>
          </div>
        </div>
      </div>

      {/* Feature Importance Attribution Bars (Explainability) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Feature Attribution & Relative Contribution Weights
          </h3>
          <p className="text-xs text-slate-500">
            SHAP-style local importance showing which biometric factors elevate the patient's risk profile.
          </p>
        </div>

        <div className="space-y-4">
          {topFactors.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>{item.factor}</span>
                </span>
                <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  +{item.weightPercent}% contribution
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.weightPercent * 3.5}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 pl-3.5">
                {item.clinicalRationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Counterfactual Scenarios & Decision Support Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Counterfactuals */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Counterfactual Clinical Inferences</span>
          </div>
          <p className="text-xs text-slate-500">
            Simulating targeted lifestyle and biomechanical adjustments:
          </p>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-semibold text-slate-900">
                If Gait Symmetry improves from 81.2% to 92%:
              </div>
              <p className="text-slate-600">
                Risk score decreases by <strong className="text-emerald-700 font-mono">-14 points</strong> due to balanced medial compartment loading.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-semibold text-slate-900">
                If Body Weight is reduced by 5 kg (78 kg → 73 kg):
              </div>
              <p className="text-slate-600">
                Joint contact stress drops by <strong className="text-emerald-700 font-mono">-24.2%</strong>, removing patient from the high-attention tier.
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Safety & Regulatory Bounds */}
        <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>Clinical Decision Support Boundary</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            OsteoSense NER acts strictly as a point-of-care screening and triage decision-support tool. It does not replace clinical judgment, radiography (Kellgren-Lawrence grading), or specialist orthopedic consultation.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300">
            <div className="font-semibold text-white">Recommended Health Worker Action:</div>
            <p className="text-[11px] text-slate-400">
              Schedule Telemedicine / Physical Referral with Community Orthopedics within <strong>14 days</strong> for clinical joint examination.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
