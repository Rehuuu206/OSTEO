import React, { useState } from 'react';
import { 
  CalendarClock, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Calendar, 
  Phone, 
  MessageSquare, 
  User, 
  ArrowRight,
  ClipboardCheck,
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { FollowUpItem } from '../../types';

export const FollowUpTrackerView: React.FC = () => {
  const { followUps, patients, refreshFollowUps, setCurrentView, setSelectedPatient } = useApp();

  const [filterStatus, setFilterStatus] = useState<'ALL' | 'DUE' | 'UPCOMING' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredItems = followUps.filter((item) => {
    const patient = patients.find(p => p.id === item.patientId);
    const matchesSearch = 
      (patient?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient?.customId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const dueCount = followUps.filter(f => f.status === 'DUE').length;
  const upcomingCount = followUps.filter(f => f.status === 'UPCOMING').length;
  const completedCount = followUps.filter(f => f.status === 'COMPLETED').length;

  const handleSendSms = (patientName: string) => {
    showToast(`SMS reminder in local Assamese/Hindi queued for ${patientName}`);
  };

  const handleStartFollowupAssessment = (patientId: string) => {
    const p = patients.find(pat => pat.id === patientId);
    if (p) setSelectedPatient(p);
    setCurrentView('movement');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Community Continuity of Care
            </span>
            <span className="text-xs text-slate-500">
              Active Recalls: <strong className="text-slate-900">{followUps.length}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1.5">
            Patient Follow-up & Recall Management
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Monitor reassessment intervals, track home rehabilitation exercise compliance, and prevent clinical drop-out.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Scheduled automated WhatsApp batch broadcast for upcoming follow-ups')}
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            <span>Send Batch Reminders</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Total Recalls</span>
            <CalendarClock className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{followUps.length}</div>
          <p className="text-[10px] text-slate-500 mt-1">Logged patient checkups</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Action Due</span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 font-mono">{dueCount}</div>
          <p className="text-[10px] text-red-600/80 mt-1">Overdue or due this week</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Upcoming Recalls</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 font-mono">{upcomingCount}</div>
          <p className="text-[10px] text-slate-500 mt-1">Scheduled next 30 days</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 font-mono">{completedCount}</div>
          <p className="text-[10px] text-emerald-700 mt-1">Successfully re-evaluated</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search follow-up by patient name, ID, or clinical notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'DUE', 'UPCOMING', 'COMPLETED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Follow-up Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400">
            <CalendarClock className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No follow-ups found</p>
            <p className="text-xs text-slate-400 mt-0.5">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const patient = patients.find(p => p.id === item.patientId);

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'DUE'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : item.status === 'UPCOMING'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {item.status}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.dueDate}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">
                    {patient?.name || 'Devi Saikia'}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {patient?.customId || 'OST-2026-042'} • {patient?.village || 'Chabua'}
                  </div>

                  <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">Clinical Focus: </span>
                    {item.notes}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleSendSms(patient?.name || 'Patient')}
                    className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition shadow-2xs"
                    title="Send localized SMS reminder"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                    <span>Remind</span>
                  </button>

                  <button
                    onClick={() => handleStartFollowupAssessment(item.patientId)}
                    className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition shadow-2xs"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Re-evaluate</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
