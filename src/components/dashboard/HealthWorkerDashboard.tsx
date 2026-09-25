import React from 'react';
import { 
  Users, 
  UserPlus, 
  Play, 
  CalendarClock, 
  GitPullRequest, 
  RefreshCw, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  ChevronRight, 
  Box, 
  CheckCircle2, 
  ShieldAlert,
  ArrowUpRight,
  ClipboardCheck,
  FileText,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const HealthWorkerDashboard: React.FC = () => {
  const { 
    currentUser, 
    isOffline, 
    syncQueueCount, 
    triggerSync, 
    isSyncing,
    patients, 
    assessments, 
    referrals, 
    followUps,
    setCurrentView, 
    setSelectedPatient, 
    setActiveAssessment,
    setNewPatientModalOpen,
    loadDemoPatient
  } = useApp();

  const { t } = useLanguage();

  // Metrics computation
  const todayAssessmentsCount = assessments.length;
  const pendingFollowupsCount = followUps.filter(f => f.status === 'DUE' || f.status === 'UPCOMING').length;
  const pendingReferralsCount = referrals.filter(r => r.status === 'PENDING_REVIEW').length;
  const highRiskAssessments = assessments.filter(a => a.aiAssessment.overallRisk === 'HIGH');
  const moderateRiskAssessments = assessments.filter(a => a.aiAssessment.overallRisk === 'MODERATE');
  const lowRiskAssessments = assessments.filter(a => a.aiAssessment.overallRisk === 'LOW');

  // Greeting based on hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleOpenAssessment = (a: any) => {
    const p = patients.find(pat => pat.id === a.patientId);
    if (p) setSelectedPatient(p);
    setActiveAssessment(a);
    setCurrentView('reports');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* 1. TOP BREADCRUMB */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="text-slate-400 font-medium">Overview</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-bold text-slate-900">Dashboard</span>
      </div>

      {/* 2. WELCOME SECTION */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-radial from-sky-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                {currentUser.facility}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              {getGreeting()}, {currentUser.name}
            </h1>
            <p className="text-xs text-slate-300 max-w-xl">
              Ready for today's assessments? Early biomechanical screening helps identify joint risks before radiographic progression.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('movement')}
              className="flex items-center gap-2 h-11 px-5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-md shadow-sky-500/25 transition active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Assessment</span>
            </button>

            <button
              onClick={() => setNewPatientModalOpen(true)}
              className="flex items-center gap-2 h-11 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-xs transition active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Patient</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. KPI ROW (12-Column Grid: 4 cards each 3 columns) */}
      <div className="grid grid-cols-12 gap-4">
        {/* Card 1: Today's Assessments */}
        <div 
          onClick={() => setCurrentView('assessments')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-600">Today's Assessments</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {todayAssessmentsCount}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <span>Clinical protocols completed</span>
          </div>
        </div>

        {/* Card 2: Pending Follow-ups */}
        <div 
          onClick={() => setCurrentView('followups')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-600">Pending Follow-ups</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarClock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">
            {pendingFollowupsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Community recall due
          </div>
        </div>

        {/* Card 3: Pending Referrals */}
        <div 
          onClick={() => setCurrentView('referrals')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-600">Pending Referrals</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <GitPullRequest className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-600 font-mono">
            {pendingReferralsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Awaiting AMCH specialist review
          </div>
        </div>

        {/* Card 4: Pending Sync */}
        <div 
          onClick={triggerSync}
          className="col-span-12 sm:col-span-6 lg:col-span-3 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-600">Pending Sync</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-sky-600' : ''}`} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {syncQueueCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {syncQueueCount === 0 ? 'All local records synced' : 'Click to push to cloud'}
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT GRID (12 Columns: 8 cols Recent Assessments + 4 cols Attention Required) */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT (8 Columns): Recent Assessments */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Assessments</h2>
              <p className="text-[11px] text-slate-500">Latest biomechanical screening results</p>
            </div>
            <button
              onClick={() => setCurrentView('assessments')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {assessments.slice(0, 4).map((a) => {
              const patient = patients.find(p => p.id === a.patientId);
              const bio = a.movementSessions[0]?.biomechanics;
              const risk = a.aiAssessment.overallRisk;

              return (
                <div 
                  key={a.id} 
                  onClick={() => handleOpenAssessment(a)}
                  className="p-4 hover:bg-slate-50 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0">
                      {patient?.name.charAt(0) || 'P'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                        <span>{patient?.name || 'Patient'}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-normal">
                          {patient?.customId || 'OST-2026-042'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{patient?.age}y / {patient?.sex}</span>
                        <span>•</span>
                        <span>{patient?.village}</span>
                        <span>•</span>
                        <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-mono font-bold text-slate-800">
                        {bio?.maxKneeFlexionDeg ? `${bio.maxKneeFlexionDeg.toFixed(0)}° Flexion` : '82° Flexion'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Symmetry {bio?.gaitSymmetryPercent || 81}%
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      risk === 'HIGH'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : risk === 'MODERATE'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {risk}
                    </span>

                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT (4 Columns): Attention Required */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h2 className="text-sm font-bold text-slate-900">Attention Required</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
              {highRiskAssessments.length} Urgent
            </span>
          </div>

          <div className="space-y-3">
            {highRiskAssessments.slice(0, 3).map((a) => {
              const p = patients.find(pat => pat.id === a.patientId);
              return (
                <div 
                  key={a.id}
                  onClick={() => handleOpenAssessment(a)}
                  className="p-3.5 rounded-xl bg-red-50/50 border border-red-200/80 hover:bg-red-50 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{p?.name || 'Devi Saikia'}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white uppercase">
                      High OA Risk
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {a.aiAssessment.clinicalSummary?.split('.')[0] || 'Early articular cartilage stress indicated'}.
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-red-700 font-semibold">
                    <span>Needs orthopedist referral</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}

            {/* Simulated recall reminder item */}
            <div 
              onClick={() => setCurrentView('followups')}
              className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80 hover:bg-amber-50 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">Tea Worker Batch Recall</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-600 text-white uppercase">
                  Follow-up Due
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                30-day reassessment interval reached for agricultural screening cohort.
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-amber-700 font-semibold">
                <span>View Recall Queue</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. ANALYTICS SECTION (12 Columns: 6 + 6 Columns) */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Analytics (6 Columns): Risk Stratification Breakdown */}
        <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Community Risk Stratification</h2>
              <p className="text-[11px] text-slate-500">Distribution across active screening registry</p>
            </div>
            <button 
              onClick={() => setCurrentView('analytics')}
              className="text-xs text-sky-600 font-semibold hover:text-sky-700"
            >
              GIS Analytics →
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Low Risk (Grade 0-1)</span>
                <span className="font-bold text-emerald-700">{lowRiskAssessments.length} ({Math.round(lowRiskAssessments.length / (assessments.length || 1) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${Math.round(lowRiskAssessments.length / (assessments.length || 1) * 100)}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Moderate Risk (Grade 2)</span>
                <span className="font-bold text-amber-700">{moderateRiskAssessments.length} ({Math.round(moderateRiskAssessments.length / (assessments.length || 1) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${Math.round(moderateRiskAssessments.length / (assessments.length || 1) * 100)}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">High Risk (Grade 3-4)</span>
                <span className="font-bold text-red-700">{highRiskAssessments.length} ({Math.round(highRiskAssessments.length / (assessments.length || 1) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full" 
                  style={{ width: `${Math.round(highRiskAssessments.length / (assessments.length || 1) * 100)}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Analytics (6 Columns): Biomechanical Concordance */}
        <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Biomechanical Sensor & Vision Concordance</h2>
              <p className="text-[11px] text-slate-500">Cross-validation between wearable IMU and CV pose</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              96.6% Match
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Average Knee Flexion</span>
              <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">82.4°</span>
              <span className="text-[10px] text-amber-600 mt-1 block">Normative: &gt;110°</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Mean Gait Cadence</span>
              <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">92.0 spm</span>
              <span className="text-[10px] text-slate-500 mt-1 block">Normative: 100-120 spm</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Gait Symmetry Index</span>
              <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">81.0%</span>
              <span className="text-[10px] text-amber-600 mt-1 block">Normative: &gt;90%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Visual Occlusion Recovery</span>
              <span className="text-lg font-bold font-mono text-emerald-600 mt-0.5 block">100%</span>
              <span className="text-[10px] text-emerald-700 mt-1 block">IMU telemetric backup</span>
            </div>
          </div>
        </div>

      </div>

      {/* 6. QUICK ACTIONS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Quick Clinical Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setCurrentView('movement')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 text-left transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-sky-600" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-sky-700">Movement Lab</div>
            <div className="text-[10px] text-slate-500">Launch CV gait test</div>
          </button>

          <button
            onClick={() => setCurrentView('digital_twin')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 text-left transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Box className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-amber-700">3D Digital Twin</div>
            <div className="text-[10px] text-slate-500">Simulate joint load</div>
          </button>

          <button
            onClick={() => setCurrentView('guidance')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 text-left transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-teal-700">Clinical Protocols</div>
            <div className="text-[10px] text-slate-500">ICMR screening standards</div>
          </button>

          <button
            onClick={loadDemoPatient}
            className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 text-left transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-purple-700">Load Demo Case</div>
            <div className="text-[10px] text-slate-500">Devi Saikia (Assam)</div>
          </button>
        </div>
      </div>

      {/* 7. EDUCATIONAL & AWARENESS CONTENT */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-sky-950 rounded-2xl p-6 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Community Health Worker Education & Patient Counseling</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Multilingual Knee Health Resources for Rural Workers
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Access printable leaflets, joint-protective ergonomics for tea garden workers, and video guides in Assamese, Bengali, Hindi, and Manipuri.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('awareness')}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs transition active:scale-[0.98] flex-shrink-0"
        >
          <span>Explore Awareness Hub</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
