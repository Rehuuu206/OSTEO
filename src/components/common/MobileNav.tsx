import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  Bone, 
  Menu,
  Send
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView, toggleMobileSidebar, referrals } = useApp();
  const { t } = useLanguage();

  const pendingReferralsCount = referrals.filter(r => r.status === 'PENDING_REVIEW').length;

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'movement', label: 'Motion', icon: Video },
    { id: 'digital_twin', label: '3D Twin', icon: Bone },
    { id: 'referrals', label: 'Referrals', icon: Send, badge: pendingReferralsCount }
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5 flex items-center justify-around"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentView(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-semibold transition-all min-w-[56px] ${
              isActive 
                ? 'text-sky-700 font-bold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              isActive ? 'bg-sky-100 text-sky-700 shadow-xs' : 'text-slate-500'
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="mt-0.5 tracking-tight truncate max-w-[62px]">{tab.label}</span>

            {/* Badge */}
            {tab.badge && tab.badge > 0 ? (
              <span className="absolute top-0.5 right-2 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                {tab.badge}
              </span>
            ) : null}
          </button>
        );
      })}

      {/* More / All Modules Button */}
      <button
        onClick={toggleMobileSidebar}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-semibold text-slate-600 hover:text-slate-900 transition-all min-w-[56px]"
        title="Open all clinical modules menu"
      >
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
          <Menu className="w-4 h-4" />
        </div>
        <span className="mt-0.5 tracking-tight">Modules</span>
      </button>
    </nav>
  );
};
