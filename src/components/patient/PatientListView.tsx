import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  ChevronRight, 
  Bone, 
  FileText, 
  Activity, 
  MapPin, 
  Briefcase,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { Patient } from '../../types';

export const PatientListView: React.FC = () => {
  const { 
    patients, 
    assessments, 
    setSelectedPatient, 
    setActiveAssessment, 
    setCurrentView,
    setNewPatientModalOpen 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'ALL' | 'HIGH' | 'MODERATE' | 'LOW'>('ALL');

  const filteredPatients = patients.filter((p) => {
    const assessment = assessments.find(a => a.patientId === p.id);
    const risk = p.overallRisk || assessment?.aiAssessment.overallRisk || 'MODERATE';
    
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.occupation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = selectedRiskFilter === 'ALL' || risk === selectedRiskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Community Health Registry
            </span>
            <span className="text-xs text-slate-500">
              Total Beneficiaries: <strong>{patients.length}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Registered Patients & Screening Profiles
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Search, filter, and inspect clinical symptoms, biomechanical movement histories, and 3D digital twins.
          </p>
        </div>

        <button
          onClick={() => setNewPatientModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, patient ID (e.g. OST-2026), village, or occupation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        {/* Risk Filter Chips */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
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
              {lvl === 'ALL' ? 'All Tiers' : `${lvl} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Patient List Grid */}
      <div className="space-y-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((p) => {
            const assessment = assessments.find(a => a.patientId === p.id);
            const risk = p.overallRisk || assessment?.aiAssessment.overallRisk || 'MODERATE';
            return (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {p.customId}
                    </span>
                    <h2 className="text-base font-bold text-slate-900">
                      {p.name}
                    </h2>
                    <span className="text-xs text-slate-500">
                      ({p.age} years, {p.sex})
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      risk === 'HIGH'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : risk === 'MODERATE'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {risk} Risk
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{p.occupation}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{p.village}, {p.district}</span>
                    </span>
                    <span>
                      BMI: <strong>{p.bmi.toFixed(1)}</strong> ({p.bmiCategory})
                    </span>
                    <span>
                      Registered: {new Date(p.registeredAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedPatient(p);
                      if (assessment) setActiveAssessment(assessment);
                      setCurrentView('movement');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <Activity className="w-3.5 h-3.5 text-sky-600" />
                    <span>Movement Lab</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPatient(p);
                      if (assessment) setActiveAssessment(assessment);
                      setCurrentView('digital_twin');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <Bone className="w-3.5 h-3.5" />
                    <span>3D Digital Twin</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPatient(p);
                      if (assessment) setActiveAssessment(assessment);
                      setCurrentView('reports');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Report</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No matching patients found</div>
            <p className="text-xs text-slate-400">
              Try adjusting your search keywords or risk filter.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
