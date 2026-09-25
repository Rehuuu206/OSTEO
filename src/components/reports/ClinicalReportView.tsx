import React from 'react';
import { 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  Bone, 
  FileText, 
  ShieldAlert, 
  Stethoscope,
  Activity,
  Cpu,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const ClinicalReportView: React.FC = () => {
  const { selectedPatient, activeAssessment, setCurrentView } = useApp();

  const patient = selectedPatient || {
    id: 'pat-001',
    customId: 'OST-2026-042',
    name: 'Devi Saikia',
    age: 58,
    sex: 'Female',
    phone: '+91 94351 88210',
    heightCm: 165,
    weightKg: 78,
    bmi: 28.6,
    bmiCategory: 'Overweight',
    occupation: 'Tea Garden Agricultural Worker',
    village: 'Chabua Tea Estate',
    district: 'Dibrugarh',
    state: 'Assam',
    registeredAt: '2026-09-18T10:30:00Z'
  };

  const ai = activeAssessment?.aiAssessment;
  const risk = ai?.overallRisk || 'HIGH';
  const score = ai?.riskIndexScore || ai?.compositeRiskScore || 78;
  const biomechanics = activeAssessment?.movementSessions[0]?.biomechanics;
  const sensor = activeAssessment?.sensorComparison;
  const twin = activeAssessment?.digitalTwin;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Top Non-Print Controls */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
            Official Screening Output
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Multimodal Assessment & Decision-Support Report
          </h1>
          <p className="text-xs text-slate-500">
            Formatted for standardized A4 physical printing and electronic clinical records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report / Save PDF</span>
          </button>
          <button
            onClick={() => setCurrentView('referrals')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
          >
            <Stethoscope className="w-4 h-4 text-sky-400" />
            <span>Doctor Referral</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div className="printable-report bg-white border border-slate-300 rounded-2xl shadow-xl p-8 sm:p-10 space-y-8 text-slate-900">
        
        {/* Section 1: Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white font-black text-sm">
                O
              </div>
              <span className="text-xl font-extrabold tracking-tight font-display text-slate-900">
                OsteoSense <span className="text-sky-600">NER</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Multimodal Early Osteoarthritis Screening & Biomechanical Assessment Platform
            </p>
            <p className="text-[11px] text-slate-400">
              Community Health Center: Chabua CHC, Dibrugarh, Assam • Facility Code: AS-DIB-041
            </p>
          </div>

          <div className="text-right text-xs space-y-0.5">
            <div className="font-mono font-bold text-slate-900">REPORT ID: REP-2026-0892</div>
            <div className="text-slate-500">Date: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div className="text-slate-500">Screening ANM: Priyanka Gogoi</div>
          </div>
        </div>

        {/* Section 2: Patient Demographics & Risk Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="space-y-1 text-xs sm:col-span-2">
            <div className="text-base font-extrabold text-slate-900">
              {patient.name} ({patient.customId})
            </div>
            <div className="text-slate-600">
              <strong>Age/Sex:</strong> {patient.age}y / {patient.sex} • <strong>Contact:</strong> {patient.phone}
            </div>
            <div className="text-slate-600">
              <strong>Location:</strong> {patient.village}, {patient.district}, {patient.state}
            </div>
            <div className="text-slate-600">
              <strong>Occupation:</strong> {patient.occupation}
            </div>
            <div className="text-slate-600">
              <strong>BMI:</strong> {patient.bmi} kg/m² ({patient.bmiCategory}) • Height: {patient.heightCm} cm • Weight: {patient.weightKg} kg
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
            risk === 'HIGH' ? 'bg-red-50 border-red-200 text-red-700' :
            risk === 'MODERATE' ? 'bg-amber-50 border-amber-200 text-amber-700' :
            'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider">Overall Risk Tier</span>
            <span className="text-2xl font-black font-mono mt-0.5">{risk} RISK</span>
            <span className="text-[11px] font-semibold mt-1">Score: {score} / 100</span>
          </div>
        </div>

        {/* Section 3: Clinical Symptoms & History */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
            1. Clinical Presentation & Joint History
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px]">Pain Severity</div>
              <div className="font-bold text-slate-900 mt-0.5">VAS 7 / 10</div>
              <div className="text-[10px] text-slate-500">Bilateral Knee</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px]">Morning Stiffness</div>
              <div className="font-bold text-slate-900 mt-0.5">25 Minutes</div>
              <div className="text-[10px] text-slate-500">&lt;30m Non-inflammatory</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px]">Functional Difficulty</div>
              <div className="font-bold text-slate-900 mt-0.5">Stairs & Walking</div>
              <div className="text-[10px] text-slate-500">Moderate Limitation</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px]">Prior Injury</div>
              <div className="font-bold text-slate-900 mt-0.5">Reported Right Knee</div>
              <div className="text-[10px] text-slate-500">Post-Traumatic Co-factor</div>
            </div>
          </div>
        </div>

        {/* Section 4: Computer Vision Biomechanical Analysis */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
            2. Video-Derived Biomechanical Kinematics (Pose Estimation)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px]">Peak Knee Flexion</div>
              <div className="font-bold text-amber-700 mt-0.5">
                {biomechanics?.maxKneeFlexionDeg || 79.2}°
              </div>
              <div className="text-[10px] text-slate-500">Ref: &gt;110° (Restricted)</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px]">Gait Symmetry Index</div>
              <div className="font-bold text-red-700 mt-0.5">
                {biomechanics?.gaitSymmetryPercent || 81.2}%
              </div>
              <div className="text-[10px] text-slate-500">18.8% Antalgic Limp</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px]">Cadence & Speed</div>
              <div className="font-bold text-slate-900 mt-0.5">
                {biomechanics?.cadenceStepsPerMin || 88} spm / {biomechanics?.estimatedWalkingSpeedMps || 0.88} m/s
              </div>
              <div className="text-[10px] text-slate-500">Reduced Velocity</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px]">Tracking Confidence</div>
              <div className="font-bold text-emerald-700 mt-0.5">
                {biomechanics?.confidence || biomechanics?.confidenceScore || 0.89} (Good)
              </div>
              <div className="text-[10px] text-slate-500">30 FPS Calibrated</div>
            </div>
          </div>
        </div>

        {/* Section 5: Sensor Fusion & Concordance */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
            3. Wearable IMU Sensor vs Video Concordance
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-slate-500">Hardware IMU Measured:</span>{' '}
              <strong className="text-sky-700 font-mono text-sm">{sensor?.sensorKneeAngleDeg || 82.0}°</strong> •{' '}
              <span className="text-slate-500">Video Pose Estimated:</span>{' '}
              <strong className="text-teal-700 font-mono text-sm">{sensor?.videoKneeAngleDeg || 79.2}°</strong>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Discrepancy:</span>
              <strong className="font-mono text-slate-900">Δ {sensor?.absoluteDifferenceDeg || 2.8}° ({sensor?.percentageDifference || 3.5}%)</strong>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                {sensor?.agreementLevel || 'High'} Agreement
              </span>
            </div>
          </div>
        </div>

        {/* Section 6: 3D Joint Stress & What-If Simulation */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
            4. 3D Digital Twin Joint Contact Simulation & Interventions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-400 text-[10px]">Medial Compartment Stress</div>
              <div className="font-bold text-red-700 text-base mt-0.5">
                {twin?.medialCompartmentStressIndex || 88} / 100
              </div>
              <div className="text-[10px] text-slate-500">Peak Adduction Moment</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-400 text-[10px]">Simulated Stress with Cane</div>
              <div className="font-bold text-emerald-700 text-base mt-0.5">
                {twin?.simulatedRelativeLoad || 53.4} / 100
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold">
                -{twin?.loadReductionPercent || 36.4}% Contact Relief
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-400 text-[10px]">What-If Weight Relieve</div>
              <div className="font-bold text-slate-900 text-base mt-0.5">-6.0 kg Drop</div>
              <div className="text-[10px] text-slate-500">Relieves ~24 kg per step</div>
            </div>
          </div>
        </div>

        {/* Section 7: Actionable Recommendations & Referral */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
            5. Recommended Clinical Care & Follow-Up
          </h3>
          <div className="text-xs space-y-1.5 text-slate-700">
            <div className="flex items-start gap-2">
              <span className="font-bold text-slate-900">1. Referral Triage:</span>
              <span>Priority referral to Orthopedics at Assam Medical College Hospital within 14 days for weight-bearing knee radiography.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-slate-900">2. Assistive Offloading:</span>
              <span>Advise use of contralateral single-point cane to offload medial tibiofemoral ground forces.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-slate-900">3. Preventive Exercises:</span>
              <span>Daily seated quadriceps sets (10 reps × 5s hold) and gentle heel slides; avoid full deep squatting.</span>
            </div>
          </div>
        </div>

        {/* Section 8: Signatures & Legal Disclaimer */}
        <div className="border-t-2 border-slate-200 pt-6 space-y-4">
          <div className="flex justify-between items-end text-xs text-slate-600">
            <div>
              <div className="border-b border-slate-400 w-48 mb-1" />
              <div className="font-semibold text-slate-900">Priyanka Gogoi, ANM</div>
              <div className="text-[10px] text-slate-400">Community Health Worker Signature</div>
            </div>

            <div className="text-right">
              <div className="border-b border-slate-400 w-48 mb-1 ml-auto" />
              <div className="font-semibold text-slate-900">Dr. Bhaskar Jyoti Bora, MS</div>
              <div className="text-[10px] text-slate-400">Consultant Orthopedic Surgeon</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100 text-[10px] text-slate-500 leading-relaxed text-justify">
            <strong>REGULATORY DISCLAIMER:</strong> This screening report is generated by OsteoSense NER, an artificial-intelligence-assisted multimodal decision-support prototype. It does NOT constitute a definitive diagnostic medical report or replace formal clinical judgment, radiography, or laboratory examination. Clinical correlation and specialist evaluation by a qualified orthopedic surgeon or physician are mandatory.
          </div>
        </div>

      </div>

    </div>
  );
};
