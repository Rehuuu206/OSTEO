import React from 'react';
import { 
  User, 
  Building2, 
  Mail, 
  ShieldCheck, 
  X, 
  LogOut, 
  Settings, 
  HelpCircle, 
  Award,
  Calendar
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHelp?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, onOpenHelp }) => {
  const { currentUser, currentRole, setCurrentRole, setCurrentView } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Card Header */}
        <div className="relative bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 p-6 text-white text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border-2 border-white/30 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-3 shadow-lg">
            {currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>

          <h3 className="font-extrabold text-lg text-white font-display">
            {currentUser.name}
          </h3>
          <p className="text-xs text-sky-200 mt-0.5 capitalize font-medium">
            {currentRole.replace('_', ' ')} • {currentUser.designation}
          </p>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Building2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900">Assigned Health Facility</div>
              <div className="text-slate-600 mt-0.5">{currentUser.facility}</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Mail className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900">Official Communication Email</div>
              <div className="text-slate-600 mt-0.5">{currentUser.email}</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900">Ayushman Bharat NER Accreditation</div>
              <div className="text-slate-600 mt-0.5">Certified Biomechanical Screening Operator (Level 2)</div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setCurrentView('settings');
                onClose();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Settings</span>
            </button>

            <button
              onClick={() => {
                onClose();
                if (onOpenHelp) onOpenHelp();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Help Guide</span>
            </button>
          </div>
        </div>

        {/* Footer Logout */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">ID: {currentUser.id}</span>
          <button
            onClick={() => {
              setCurrentView('landing');
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
