import React, { useState } from 'react';
import { 
  HeartPulse, 
  BookOpen, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  FileText, 
  Stethoscope, 
  ChevronRight, 
  Scale, 
  Layers, 
  ArrowRight,
  Info,
  Thermometer,
  Compass,
  Clock
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const ClinicalGuidanceView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'protocols' | 'kl_grades' | 'biomechanics' | 'red_flags'>('protocols');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              Clinical Decision Support Protocols
            </span>
            <span className="text-xs text-slate-500">
              ICMR & WHO Guideline Compliant
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1.5">
            Clinical Guidance & Screening Protocols
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Standardized knee osteoarthritis clinical workflows, biomechanical normative thresholds, and triage pathways for community practitioners.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('movement')}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-sm transition active:scale-[0.98]"
        >
          <Activity className="w-4 h-4" />
          <span>Apply Protocol in Lab</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        {[
          { id: 'protocols', label: 'Screening Protocol', icon: Compass },
          { id: 'kl_grades', label: 'Kellgren-Lawrence Staging', icon: Layers },
          { id: 'biomechanics', label: 'Biomechanical Thresholds', icon: Scale },
          { id: 'red_flags', label: 'Red Flags & Referral Matrix', icon: ShieldAlert }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Standard Screening Protocol */}
      {activeTab === 'protocols' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600" />
              <span>Community 4-Step Triaging Protocol (ANM / ASHA Guideline)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white text-xs font-extrabold flex items-center justify-center mb-3">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Subjective Intake</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Screen age (&gt;40y), knee pain intensity on VAS 0-10 scale, morning stiffness (&lt;30m vs &gt;30m), and agrarian occupational risk factors.
                </p>
                <div className="mt-3 text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-200">
                  Target: Identify symptomatic joint
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                <div className="w-7 h-7 rounded-lg bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center mb-3">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Movement Kinematics</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Record 10-meter natural gait or 5-repetition sit-to-stand. AI pose estimation computes knee flexion angle, cadence, and cadence asymmetry.
                </p>
                <div className="mt-3 text-[11px] font-medium text-sky-800 bg-sky-50 px-2 py-1 rounded border border-sky-200">
                  Target: Detect gait deviations
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center mb-3">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Inertial Sensor Fusion</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Pair single BLE IMU sensor over distal femur or proximal tibia. Cross-correlate acceleration angular rates with visual skeleton stream.
                </p>
                <div className="mt-3 text-[11px] font-medium text-indigo-800 bg-indigo-50 px-2 py-1 rounded border border-indigo-200">
                  Target: Verify &gt;90% concordance
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center mb-3">
                  4
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Risk Stratification</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  System synthesizes multimodal features into Low, Moderate, or High risk with transparent XAI factor attribution.
                </p>
                <div className="mt-3 text-[11px] font-medium text-purple-800 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                  Target: Generate action pathway
                </div>
              </div>
            </div>
          </div>

          {/* Action Recommendations Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Low Risk Pathway</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed mb-3">
                Mild or occasional ache with normal gait symmetry (&gt;88%) and adequate knee flexion (&gt;110°).
              </p>
              <ul className="text-xs text-emerald-900 space-y-1.5 list-disc pl-4">
                <li>Prescribe home quad-strengthening exercises</li>
                <li>Ergonomic counseling for tea-leaf basket lifting</li>
                <li>Routine 6-month community recall</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Moderate Risk Pathway</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed mb-3">
                Frequent joint stiffness, reduced flexion (85°-105°), or detectable antalgic gait asymmetry.
              </p>
              <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4">
                <li>Supervised physiotherapy & isometric regimen</li>
                <li>Digital twin visual load offloading demo</li>
                <li>30-day clinical follow-up visit</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200">
              <div className="flex items-center gap-2 text-red-800 font-bold text-sm mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>High Risk Referral Pathway</span>
              </div>
              <p className="text-xs text-red-950 leading-relaxed mb-3">
                Severe pain (VAS &gt;6), significant flexion loss (&lt;85°), high knee adduction moment, or instability.
              </p>
              <ul className="text-xs text-red-900 space-y-1.5 list-disc pl-4">
                <li>Immediate tele-referral to AMCH Orthopedics</li>
                <li>Schedule bilateral weight-bearing AP radiographs</li>
                <li>Evaluate assistive walking cane prescription</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Kellgren-Lawrence Staging */}
      {activeTab === 'kl_grades' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Kellgren & Lawrence (KL) Radiographic Classification Standard</span>
          </h2>
          <p className="text-xs text-slate-500">
            OsteoSense NER correlates multimodal biomechanical and symptom risk scores with clinical KL grades:
          </p>

          <div className="space-y-3">
            {[
              {
                grade: 'Grade 0 (Normal)',
                radiology: 'No radiographic features of osteoarthritis. Preserved joint space.',
                biomechanics: 'Symmetric gait (>92%), normal flexion (>120°), no antalgic compensation.',
                action: 'Preventive education & posture maintenance.'
              },
              {
                grade: 'Grade 1 (Doubtful)',
                radiology: 'Doubtful joint space narrowing and possible osteophytic lipping.',
                biomechanics: 'Mild terminal extension lag, slight reduction in walking cadence under fatigue.',
                action: 'Early lifestyle intervention, low-impact cycling/swimming exercises.'
              },
              {
                grade: 'Grade 2 (Minimal / Mild)',
                radiology: 'Definite osteophytes and possible joint space narrowing on weight-bearing views.',
                biomechanics: 'Peak knee flexion 95°-110°, early increase in external knee adduction moment.',
                action: 'Physical therapy referral, quadriceps/hamstring balance training.'
              },
              {
                grade: 'Grade 3 (Moderate)',
                radiology: 'Multiple moderate osteophytes, definite joint space narrowing, some sclerosis and possible deformity.',
                biomechanics: 'Marked gait asymmetry, peak flexion 80°-95°, antalgic trunk lean.',
                action: 'Secondary care orthopedist consultation, unloader brace evaluation.'
              },
              {
                grade: 'Grade 4 (Severe)',
                radiology: 'Large osteophytes, marked joint space narrowing, severe sclerosis and definite bone contour deformity.',
                biomechanics: 'Severe flexion limitation (<80°), high joint contact stress, severe functional deficit.',
                action: 'Tertiary referral for arthroplasty / joint preservation surgical triage.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="md:w-1/4">
                  <div className="font-bold text-slate-900 text-sm">{item.grade}</div>
                  <div className="text-[11px] text-indigo-700 font-semibold mt-0.5">Clinical Grade {idx}</div>
                </div>
                <div className="md:w-2/5">
                  <div className="text-xs text-slate-700 font-medium">X-Ray: {item.radiology}</div>
                  <div className="text-xs text-slate-500 mt-1">Kinematics: {item.biomechanics}</div>
                </div>
                <div className="md:w-1/3 bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-800">
                  <strong className="text-slate-900">Protocol Action:</strong> {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Biomechanical Thresholds */}
      {activeTab === 'biomechanics' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-sky-600" />
            <span>Biomechanical Risk Thresholds & Normative Reference Database</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm mb-2">Peak Knee Flexion Angle (Sagittal Plane)</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-sky-100">
                  <span className="font-medium text-emerald-700">Normative Healthy:</span>
                  <span className="font-bold font-mono">&gt; 115° to 135°</span>
                </div>
                <div className="flex justify-between py-1 border-b border-sky-100">
                  <span className="font-medium text-amber-700">Borderline / Early OA:</span>
                  <span className="font-bold font-mono">95° to 110°</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-red-700">High Risk Limitation:</span>
                  <span className="font-bold font-mono">&lt; 90°</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3">
                Assessed during 5-rep Sit-to-Stand or maximum active knee flexion test.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm mb-2">Gait Symmetry Percentage (Bilateral Ratio)</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-sky-100">
                  <span className="font-medium text-emerald-700">Symmetric Gait:</span>
                  <span className="font-bold font-mono">92% to 100%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-sky-100">
                  <span className="font-medium text-amber-700">Subclinical Asymmetry:</span>
                  <span className="font-bold font-mono">82% to 91%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-red-700">Antalgic Limb Avoidance:</span>
                  <span className="font-bold font-mono">&lt; 80%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3">
                Calculated from stance time differential and vertical peak acceleration variance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm mb-2">Natural Cadence (Steps per Minute)</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-sky-100">
                  <span className="font-medium text-emerald-700">Healthy Community Cadence:</span>
                  <span className="font-bold font-mono">100 - 120 spm</span>
                </div>
                <div className="flex justify-between py-1 border-b border-sky-100">
                  <span className="font-medium text-amber-700">Mild Functional Slowing:</span>
                  <span className="font-bold font-mono">85 - 99 spm</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-red-700">Impaired Ambulatory Speed:</span>
                  <span className="font-bold font-mono">&lt; 85 spm</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3">
                Reduced cadence correlates with fear of pain, quadriceps weakness, and loss of joint stability.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-200">
              <h3 className="font-bold text-sky-950 text-sm mb-2">Medial Joint Load Index (Relative to Body Weight)</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-sky-100">
                  <span className="font-medium text-emerald-700">Normative Medial Fraction:</span>
                  <span className="font-bold font-mono">55% - 65% total load</span>
                </div>
                <div className="flex justify-between py-1 border-b border-sky-100">
                  <span className="font-medium text-amber-700">Elevated Medial Thrust:</span>
                  <span className="font-bold font-mono">66% - 78% total load</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-red-700">Accelerated Cartilage Wear:</span>
                  <span className="font-bold font-mono">&gt; 78% total load</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3">
                Calculated via 3D Digital Twin joint compartment stress distribution engine.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Red Flags & Referral Matrix */}
      {activeTab === 'red_flags' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-red-600 font-bold text-base">
            <ShieldAlert className="w-5 h-5" />
            <span>Critical Clinical Red Flags (Immediate Referral Required)</span>
          </div>
          <p className="text-xs text-slate-500">
            If any of the following signs are detected during intake, do NOT continue screening. Refer immediately to district hospital / AMCH casualty:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Hot, Erythematous Joint with Systemic Fever</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Suspect septic arthritis or acute crystal arthropathy (gout). Requires emergency synovial aspiration.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">True Mechanical Joint Locking</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Sudden physical block to extension. Suggests displaced bucket-handle meniscal tear or loose body.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Rapid Unexplained Joint Effusion</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Large swelling developing within 2 hours of trivial trauma. Indicates acute hemarthrosis or ligament tear.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 flex items-start gap-3">
              <Activity className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Night Rest Pain & Unexplained Weight Loss</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Non-mechanical pain waking patient from deep sleep. Rule out musculoskeletal neoplastic etiology or skeletal TB.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
