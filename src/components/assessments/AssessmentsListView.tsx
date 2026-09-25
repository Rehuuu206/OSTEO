import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Bone, 
  TrendingUp, 
  Activity, 
  ArrowUpRight, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  GitPullRequest,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { AssessmentRecord, RiskLevel } from '../../types';

export const AssessmentsListView: React.FC = () => {
  const { 
    assessments, 
    patients, 
    setActiveAssessment, 
    setSelectedPatient, 
    setCurrentView,
    setNewPatientModalOpen 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'ALL' | 'HIGH' | 'MODERATE' | 'LOW'>('ALL');
  const [selectedTestFilter, setSelectedTestFilter] = useState<'ALL' | 'walking' | 'sit_to_stand' | 'knee_flexion'>('ALL');

  const filteredAssessments = assessments.filter((a) => {
    const patient = patients.find(p => p.id === a.patientId);
    const patientName = patient?.name || '';
    const patientCustomId = patient?.customId || '';
    const assessmentId = a.id;
    
    const matchesSearch = 
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patientCustomId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient?.village || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = selectedRiskFilter === 'ALL' || a.aiAssessment.overallRisk === selectedRiskFilter;
    
    const hasTestType = selectedTestFilter === 'ALL' || a.movementSessions.some(s => s.testType === selectedTestFilter);

    return matchesSearch && matchesRisk && hasTestType;
  });

  const highRiskCount = assessments.filter(a => a.aiAssessment.overallRisk === 'HIGH').length;
  const modRiskCount = assessments.filter(a => a.aiAssessment.overallRisk === 'MODERATE').length;
  const lowRiskCount = assessments.filter(a => a.aiAssessment.overallRisk === 'LOW').length;

  const handleOpenAssessment = (a: AssessmentRecord, targetView: 'reports' | 'digital_twin' | 'movement') => {
    const patient = patients.find(p => p.id === a.patientId);
    if (patient) setSelectedPatient(patient);
    setActiveAssessment(a);
    setCurrentView(targetView);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
              Clinical Assessment Registry
            </span>
            <span className="text-xs text-slate-500">
              Total Screenings: <strong className="text-slate-900">{assessments.length}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1.5">
            Biomechanical Assessments & OA Screenings
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Systematic directory of video kinematics, inertial sensor streams, and multimodal AI risk stratifications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('movement')}
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm shadow-sky-600/20 transition active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>New Assessment</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">All Records</span>
            <ClipboardCheck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{assessments.length}</div>
          <p className="text-[10px] text-slate-500 mt-1">Full multimodal screening sets</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">High Risk (Grade 3+)</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 font-mono">{highRiskCount}</div>
          <p className="text-[10px] text-red-600/80 mt-1">Requires specialist referral</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Moderate (Grade 1-2)</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 font-mono">{modRiskCount}</div>
          <p className="text-[10px] text-slate-500 mt-1">Scheduled for physical therapy</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Low Risk</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 font-mono">{lowRiskCount}</div>
          <p className="text-[10px] text-emerald-700 mt-1">Preventive posture counselling</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patient name, patient ID (e.g. OST-2026), village, or assessment ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Risk:</span>
          {(['ALL', 'HIGH', 'MODERATE', 'LOW'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedRiskFilter(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                selectedRiskFilter === lvl
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl === 'ALL' ? 'All' : lvl.charAt(0) + lvl.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Assessment Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Record / Patient</th>
                <th className="px-4 py-3.5">Test Protocol</th>
                <th className="px-4 py-3.5">Date & Time</th>
                <th className="px-4 py-3.5">Kinematic Metrics</th>
                <th className="px-4 py-3.5">OA Risk Stratification</th>
                <th className="px-5 py-3.5 text-right">Clinical Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAssessments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <ClipboardCheck className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No assessment records found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try clearing your search query or changing risk filters.</p>
                  </td>
                </tr>
              ) : (
                filteredAssessments.map((record) => {
                  const patient = patients.find(p => p.id === record.patientId);
                  const firstSession = record.movementSessions[0];
                  const bio = firstSession?.biomechanics;
                  const risk = record.aiAssessment.overallRisk;

                  return (
                    <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {patient?.name || 'Unknown Patient'}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                          <span>{patient?.customId || 'N/A'}</span>
                          <span>•</span>
                          <span>{patient?.age}y / {patient?.sex}</span>
                          <span>•</span>
                          <span className="truncate max-w-[120px]">{patient?.village}</span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 capitalize border border-slate-200">
                          {firstSession?.testType.replace('_', ' ') || 'Multimodal'}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {record.movementSessions.length} session(s) logged
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        <div className="font-medium text-slate-800">
                          {new Date(record.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      <td className="px-4 py-4 font-mono text-[11px]">
                        <div className="space-y-0.5">
                          <div className="text-slate-700 flex items-center justify-between gap-2 max-w-[170px]">
                            <span className="text-slate-400 font-sans">Flexion:</span>
                            <span className="font-bold">{bio?.maxKneeFlexionDeg ? `${bio.maxKneeFlexionDeg.toFixed(1)}°` : '82.0°'}</span>
                          </div>
                          <div className="text-slate-700 flex items-center justify-between gap-2 max-w-[170px]">
                            <span className="text-slate-400 font-sans">Symmetry:</span>
                            <span className="font-bold">{bio?.gaitSymmetryPercent ? `${bio.gaitSymmetryPercent.toFixed(0)}%` : '81%'}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="inline-flex items-center gap-1.5">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            risk === 'HIGH'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : risk === 'MODERATE'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {risk} RISK
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {record.aiAssessment.fusionConfidence || record.aiAssessment.riskIndexScore}%
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            onClick={() => handleOpenAssessment(record, 'reports')}
                            className="h-8 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1 transition shadow-2xs"
                            title="View comprehensive clinical report"
                          >
                            <FileText className="w-3.5 h-3.5 text-sky-600" />
                            <span>Report</span>
                          </button>

                          <button
                            onClick={() => handleOpenAssessment(record, 'digital_twin')}
                            className="h-8 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1 transition shadow-2xs"
                            title="Inspect 3D digital twin"
                          >
                            <Bone className="w-3.5 h-3.5 text-amber-600" />
                            <span>3D Twin</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
