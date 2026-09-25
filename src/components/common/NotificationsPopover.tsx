import React from 'react';
import { 
  Bell, 
  WifiOff, 
  CalendarClock, 
  GitPullRequest, 
  FileText, 
  ClipboardCheck, 
  Cpu, 
  CheckCircle2, 
  ChevronRight,
  X
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ isOpen, onClose }) => {
  const { 
    syncQueueCount, 
    isOffline, 
    referrals, 
    followUps, 
    isSensorConnected, 
    setCurrentView 
  } = useApp();

  if (!isOpen) return null;

  const dueFollowups = followUps.filter(f => f.status === 'DUE');
  const pendingReferrals = referrals.filter(r => r.status === 'PENDING_REVIEW');

  const notifications = [
    ...(syncQueueCount > 0 ? [{
      id: 'sync',
      title: `${syncQueueCount} Screenings Queued for Cloud Sync`,
      description: isOffline ? 'Device is in offline mode. Records cached safely in local storage.' : 'Ready to push to central registry.',
      icon: WifiOff,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      actionView: 'settings',
      timestamp: 'Pending Sync'
    }] : []),
    ...(dueFollowups.length > 0 ? [{
      id: 'followup',
      title: `${dueFollowups.length} Patient Recall(s) Due`,
      description: 'Devi Saikia and tea garden worker follow-up assessments due this week.',
      icon: CalendarClock,
      iconColor: 'text-red-600 bg-red-50 border-red-200',
      actionView: 'followups',
      timestamp: 'Follow-up Due'
    }] : []),
    ...(pendingReferrals.length > 0 ? [{
      id: 'referral',
      title: `${pendingReferrals.length} Referral Pending Specialist Review`,
      description: 'Transmitted to AMCH Orthopedics Dept. Awaiting specialist triage.',
      icon: GitPullRequest,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-200',
      actionView: 'referrals',
      timestamp: 'Referral Update'
    }] : []),
    {
      id: 'report',
      title: 'Multimodal Screening Report Ready',
      description: 'Report for Devi Saikia (OST-2026-042) compiled with biomechanical metrics.',
      icon: FileText,
      iconColor: 'text-sky-600 bg-sky-50 border-sky-200',
      actionView: 'reports',
      timestamp: 'Report Ready'
    },
    {
      id: 'assessment',
      title: '5-Rep Sit-to-Stand Assessment Completed',
      description: 'Gait cadence and knee extension kinematics successfully verified.',
      icon: ClipboardCheck,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      actionView: 'assessments',
      timestamp: 'Assessment Completed'
    },
    {
      id: 'sensor',
      title: isSensorConnected ? 'BLE IMU Sensor Synced (60Hz)' : 'Sensor Disconnected / Standby',
      description: isSensorConnected ? 'Inertial telemetry synchronized with vision pipeline.' : 'Mock synthetic telemetry adapter available.',
      icon: Cpu,
      iconColor: isSensorConnected ? 'text-teal-600 bg-teal-50 border-teal-200' : 'text-slate-500 bg-slate-100 border-slate-200',
      actionView: 'sensors',
      timestamp: 'Sensor Status'
    }
  ];

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-700" />
          <span className="text-xs font-bold text-slate-900">Clinical Notifications</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-sky-600 text-white">
            {notifications.length}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              onClick={() => {
                setCurrentView(n.actionView);
                onClose();
              }}
              className="p-3.5 hover:bg-slate-50/80 transition cursor-pointer flex items-start gap-3 group"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${n.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-sky-600 transition">
                    {n.title}
                  </h4>
                  <span className="text-[9px] font-semibold text-slate-400 whitespace-nowrap">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {n.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
        All alerts synchronized with local health station database
      </div>
    </div>
  );
};
