import React, { useState } from 'react';
import { 
  Send, 
  Stethoscope, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Building2, 
  User, 
  ChevronRight, 
  Printer, 
  Plus,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StorageService } from '../../services/storage';
import { NewReferralModal } from './NewReferralModal';
import { ReferralRecord } from '../../types';

export const ReferralWorkflow: React.FC = () => {
  const { referrals, refreshReferrals, currentUser, setCurrentView, setSelectedPatient } = useApp();
  const [selectedReferral, setSelectedReferral] = useState<ReferralRecord>(referrals[0] || null);
  const [isNewReferralModalOpen, setIsNewReferralModalOpen] = useState(false);

  // Doctor response state for review
  const [doctorNotes, setDoctorNotes] = useState('Agree with high-risk antalgic classification. Schedule bilateral knee AP/lateral standing radiographs (Kellgren-Lawrence grading). Prescribe non-steroidal gel and start supervised closed-chain quad isometric physiotherapy.');
  const [prescribedPlan, setPrescribedPlan] = useState<string[]>([
    'Bilateral Weight-Bearing Standing Knee X-Rays',
    'Closed-Chain Quadriceps Strengthening Physiotherapy',
    'Prescribe Contralateral Cane Offloading Support'
  ]);

  const handleDoctorApprove = () => {
    if (!selectedReferral) return;
    const updated: ReferralRecord = {
      ...selectedReferral,
      status: 'ACCEPTED',
      doctorNotes,
      prescribedPlan
    };
    StorageService.updateReferral(updated);
    refreshReferrals();
    setSelectedReferral(updated);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Community-to-Tertiary Care Linkage
            </span>
            <span className="text-xs text-slate-500">
              Telemedicine & Clinical Referral Hub
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Doctor Referral & Specialist Consultation Packets
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Triages high-risk osteoarthritis beneficiaries to District Hospitals and Medical Colleges with complete biomechanical telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsNewReferralModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Referral</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Referral List on Left, Active Referral Packet on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 5 Cols: Referral Queue */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Referral Queue ({referrals.length})
            </h2>
            <span className="text-[11px] text-slate-500">
              {referrals.filter(r => r.status === 'PENDING_REVIEW').length} Pending
            </span>
          </div>

          <div className="space-y-2.5">
            {referrals.map((ref) => {
              const isSelected = selectedReferral?.id === ref.id;
              return (
                <div
                  key={ref.id}
                  onClick={() => setSelectedReferral(ref)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-xs ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{ref.patientName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      ref.urgency === 'IMMEDIATE'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : ref.urgency === 'PRIORITY'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {ref.urgency}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                    {ref.reasonForReferral}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                    <span>{ref.referredFacility}</span>
                    <span className={`font-semibold ${ref.status === 'ACCEPTED' ? 'text-emerald-600' : 'text-blue-600'}`}>
                      {ref.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: Detailed Referral Packet & Doctor Review Mode */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          {selectedReferral ? (
            <>
              {/* Packet Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">REFERRAL REF: {selectedReferral.id}</span>
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedReferral.patientName} ({selectedReferral.patientAge}y)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Transmitted by: <strong>{selectedReferral.referringWorker}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Packet</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('digital_twin')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 text-xs font-semibold transition"
                  >
                    <span>View 3D Twin</span>
                  </button>
                </div>
              </div>

              {/* Biomechanical Telemetry Summary inside Referral */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400">Gait Asymmetry</div>
                  <div className="text-base font-bold font-mono text-red-600">81.2%</div>
                  <div className="text-[10px] text-slate-500">Antalgic limp deficit</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400">Knee Flexion ROM</div>
                  <div className="text-base font-bold font-mono text-amber-600">79.2°</div>
                  <div className="text-[10px] text-slate-500">Normal: &gt;110°</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400">Pain Severity</div>
                  <div className="text-base font-bold font-mono text-red-600">VAS 7/10</div>
                  <div className="text-[10px] text-slate-500">Bilateral joint line</div>
                </div>
              </div>

              {/* Referral Details */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-700">Reason for Specialist Triage:</span>
                  <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 mt-1">
                    {selectedReferral.reasonForReferral}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-700">Health Worker Field Observations:</span>
                  <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 mt-1">
                    {selectedReferral.clinicalSummaryNotes}
                  </p>
                </div>
              </div>

              {/* Doctor Review / Tele-consultation Section */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span>Doctor Review & Clinical Plan Prescription</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Consultant Doctor Evaluation Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                    Prescribed Actions & Care Protocol:
                  </label>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {prescribedPlan.map((plan, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{plan}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500 italic">
                    Assam Medical College Hospital Tele-Ortho Hub
                  </span>
                  <button
                    onClick={handleDoctorApprove}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Referral & Plan</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              Select a referral from the list on the left to review packet details.
            </div>
          )}
        </div>

      </div>

      {/* New Referral Modal */}
      <NewReferralModal
        isOpen={isNewReferralModalOpen}
        onClose={() => setIsNewReferralModalOpen(false)}
      />

    </div>
  );
};
