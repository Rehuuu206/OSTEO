import React from 'react';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  HardDrive, 
  X,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface SyncStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyncStatusModal: React.FC<SyncStatusModalProps> = ({ isOpen, onClose }) => {
  const { 
    isOffline, 
    toggleSimulatedOffline, 
    syncQueueCount, 
    triggerSync, 
    isSyncing 
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              isSyncing ? 'bg-blue-500 animate-ping' :
              isOffline ? 'bg-amber-500' :
              syncQueueCount > 0 ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <h3 className="font-bold text-sm text-slate-900">
              Connectivity & Sync Status
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Details */}
        <div className="p-5 space-y-4 text-xs">
          {/* Connection Status Box */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isOffline ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center gap-3">
              {isOffline ? <WifiOff className="w-5 h-5 text-amber-700" /> : <Wifi className="w-5 h-5 text-emerald-700" />}
              <div>
                <div className="font-bold text-sm">
                  {isOffline ? 'Field Offline Mode' : 'Connected to Central Network'}
                </div>
                <div className="text-[11px] opacity-80 mt-0.5">
                  {isOffline ? 'Simulating low rural cellular reception in NER.' : 'High-speed broadband / 4G link operational.'}
                </div>
              </div>
            </div>
            <button
              onClick={toggleSimulatedOffline}
              className="px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200 hover:bg-white text-[11px] font-bold text-slate-800 transition"
            >
              Toggle
            </button>
          </div>

          {/* Sync Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-600">Pending Records:</span>
              <span className="font-bold text-slate-900 font-mono">
                {syncQueueCount} records queued
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-600">Last Synchronization:</span>
              <span className="font-bold text-slate-900 font-mono">
                Today, 09:42 AM
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-600">Failed Synchronizations:</span>
              <span className="font-bold text-emerald-600 font-mono">
                0 (Zero errors)
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-600">Local Cache Security:</span>
              <span className="font-bold text-slate-900">
                AES-256 Encrypted (IndexedDB)
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
          >
            Close
          </button>

          <button
            onClick={triggerSync}
            disabled={isSyncing || syncQueueCount === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronizing...' : 'Retry / Sync Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
