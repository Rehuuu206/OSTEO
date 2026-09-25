import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Users, 
  ClipboardCheck, 
  FileText, 
  GitPullRequest, 
  ChevronRight, 
  ArrowRight,
  Command
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { Patient, AssessmentRecord, DoctorReferral } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { 
    patients, 
    assessments, 
    referrals, 
    setSelectedPatient, 
    setActiveAssessment, 
    setCurrentView 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Patients
  const matchedPatients = q 
    ? patients.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.customId.toLowerCase().includes(q) || 
        p.village.toLowerCase().includes(q) ||
        p.phone.includes(q)
      ).slice(0, 4)
    : [];

  // Search Assessments
  const matchedAssessments = q
    ? assessments.filter(a => {
        const p = patients.find(pat => pat.id === a.patientId);
        return a.id.toLowerCase().includes(q) || 
               (p?.name || '').toLowerCase().includes(q) ||
               (p?.customId || '').toLowerCase().includes(q);
      }).slice(0, 4)
    : [];

  // Search Reports
  const matchedReports = q
    ? assessments.filter(a => {
        const p = patients.find(pat => pat.id === a.patientId);
        return a.id.toLowerCase().includes(q) ||
               `REP-${a.id}`.toLowerCase().includes(q) ||
               (p?.name || '').toLowerCase().includes(q);
      }).slice(0, 4)
    : [];

  // Search Referrals
  const matchedReferrals = q
    ? referrals.filter(r => {
        const p = patients.find(pat => pat.id === r.patientId);
        return r.id.toLowerCase().includes(q) ||
               (p?.name || '').toLowerCase().includes(q) ||
               (r.referredToDoctor || '').toLowerCase().includes(q) ||
               (r.reasonForReferral || '').toLowerCase().includes(q);
      }).slice(0, 4)
    : [];

  const totalMatches = matchedPatients.length + matchedAssessments.length + matchedReports.length + matchedReferrals.length;

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('patients');
    onClose();
  };

  const handleSelectAssessment = (a: AssessmentRecord) => {
    const p = patients.find(pat => pat.id === a.patientId);
    if (p) setSelectedPatient(p);
    setActiveAssessment(a);
    setCurrentView('assessments');
    onClose();
  };

  const handleSelectReport = (a: AssessmentRecord) => {
    const p = patients.find(pat => pat.id === a.patientId);
    if (p) setSelectedPatient(p);
    setActiveAssessment(a);
    setCurrentView('reports');
    onClose();
  };

  const handleSelectReferral = (r: DoctorReferral) => {
    const p = patients.find(pat => pat.id === r.patientId);
    if (p) setSelectedPatient(p);
    setCurrentView('referrals');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients, assessments, reports, referrals..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-200/80 text-slate-600 hover:bg-slate-300 transition"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-4 max-h-[60vh]">
          {!q ? (
            <div className="py-8 text-center text-slate-400">
              <Command className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-semibold text-slate-600">Global Clinical Search</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Type a patient name, ID (OST-2026-042), assessment code, or doctor referral...
              </p>
            </div>
          ) : totalMatches === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-xs font-semibold text-slate-700">No matching records found</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ensure spelling is correct or try searching by village or patient ID.
              </p>
            </div>
          ) : (
            <>
              {/* Group: Patients */}
              {matchedPatients.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-2">
                    <Users className="w-3.5 h-3.5 text-sky-600" />
                    <span>Patients ({matchedPatients.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedPatients.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectPatient(p)}
                        className="p-2.5 rounded-xl hover:bg-sky-50 transition cursor-pointer flex items-center justify-between group border border-transparent hover:border-sky-200"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {p.customId} • {p.age}y / {p.sex} • {p.village}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group: Assessments */}
              {matchedAssessments.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-2">
                    <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Assessments ({matchedAssessments.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedAssessments.map(a => {
                      const p = patients.find(pat => pat.id === a.patientId);
                      return (
                        <div
                          key={a.id}
                          onClick={() => handleSelectAssessment(a)}
                          className="p-2.5 rounded-xl hover:bg-emerald-50 transition cursor-pointer flex items-center justify-between group border border-transparent hover:border-emerald-200"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 flex items-center gap-2">
                              <span>{a.id}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-700">
                                {a.aiAssessment.overallRisk} RISK
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              Patient: {p?.name || 'Devi Saikia'} ({p?.customId || 'OST-2026-042'})
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Group: Reports */}
              {matchedReports.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Reports ({matchedReports.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedReports.map(a => {
                      const p = patients.find(pat => pat.id === a.patientId);
                      return (
                        <div
                          key={`rep-${a.id}`}
                          onClick={() => handleSelectReport(a)}
                          className="p-2.5 rounded-xl hover:bg-indigo-50 transition cursor-pointer flex items-center justify-between group border border-transparent hover:border-indigo-200"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-800">
                              Clinical Screening Report • {p?.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              ID: REP-{a.id.slice(0, 10)} • {new Date(a.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Group: Referrals */}
              {matchedReferrals.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-2">
                    <GitPullRequest className="w-3.5 h-3.5 text-purple-600" />
                    <span>Referrals ({matchedReferrals.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedReferrals.map(r => {
                      const p = patients.find(pat => pat.id === r.patientId);
                      return (
                        <div
                          key={r.id}
                          onClick={() => handleSelectReferral(r)}
                          className="p-2.5 rounded-xl hover:bg-purple-50 transition cursor-pointer flex items-center justify-between group border border-transparent hover:border-purple-200"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-purple-800">
                              {r.id} • {p?.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              To: {r.referredToDoctor || 'Orthopedic Specialist'} ({r.targetFacilityOrDoctor || r.referredFacility || 'AMCH'}) • Status: {r.status}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="font-mono">Press ESC or click outside to dismiss</span>
          <span className="font-medium text-slate-700">OsteoSense NER Indexer</span>
        </div>
      </div>
    </div>
  );
};
