import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Check, 
  AlertTriangle, 
  User, 
  Building2, 
  Stethoscope, 
  FileText,
  Clock
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StorageService } from '../../services/storage';
import { ReferralRecord } from '../../types';

interface NewReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewReferralModal: React.FC<NewReferralModalProps> = ({ isOpen, onClose }) => {
  const { selectedPatient, activeAssessment, refreshReferrals, currentUser } = useApp();

  const [referredToDoctor, setReferredToDoctor] = useState('Dr. Bhaskar Jyoti Bora, MS (Ortho)');
  const [referredFacility, setReferredFacility] = useState('Assam Medical College Hospital (AMCH), Dibrugarh');
  const [urgency, setUrgency] = useState<'ROUTINE' | 'PRIORITY' | 'IMMEDIATE'>('PRIORITY');
  const [reason, setReason] = useState('Asymmetric antalgic gait (81.2% symmetry), severe knee pain VAS 7/10, restricted flexion 79.2°, and high medial compartment contact stress.');
  const [clinicalNotes, setClinicalNotes] = useState('Patient has been working in tea gardens for 28 years with daily hillside walking and squatting. Bilateral crepitus noted.');

  if (!isOpen) return null;

  const handleCreateReferral = () => {
    const newRef: ReferralRecord = {
      id: 'ref-' + Date.now(),
      assessmentId: activeAssessment?.id || 'rec-001',
      patientId: selectedPatient?.id || 'pat-001',
      patientName: selectedPatient?.name || 'Devi Saikia',
      patientAge: selectedPatient?.age || 58,
      referringWorker: currentUser.name,
      referredToDoctor,
      referredFacility,
      urgency,
      reasonForReferral: reason,
      clinicalSummaryNotes: clinicalNotes,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString()
    };

    StorageService.addReferral(newRef);
    refreshReferrals();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Stethoscope className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-sm font-bold">Generate Doctor Telemedicine Referral</h2>
              <p className="text-[11px] text-slate-400">Packets include biometric summaries and 3D digital twin snapshots</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500">Patient:</span>{' '}
              <strong className="text-slate-900">{selectedPatient?.name || 'Devi Saikia'}</strong> ({selectedPatient?.customId || 'OST-2026-042'})
            </div>
            <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">
              High Risk Tier
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Referral Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['ROUTINE', 'PRIORITY', 'IMMEDIATE'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`py-2 px-3 rounded-xl border text-center font-semibold transition ${
                    urgency === lvl
                      ? lvl === 'IMMEDIATE'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Specialist / Orthopedic Doctor
            </label>
            <input
              type="text"
              value={referredToDoctor}
              onChange={(e) => setReferredToDoctor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Receiving Health Facility / Tele-Hub
            </label>
            <input
              type="text"
              value={referredFacility}
              onChange={(e) => setReferredFacility(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Reason for Referral (Biomechanical & Pain Rationale)
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Health Worker Clinical Observations
            </label>
            <textarea
              rows={2}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateReferral}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition"
          >
            <Send className="w-4 h-4" />
            <span>Transmit Referral Packet</span>
          </button>
        </div>

      </div>
    </div>
  );
};
