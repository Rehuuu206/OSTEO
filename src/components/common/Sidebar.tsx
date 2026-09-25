import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  Activity, 
  Brain, 
  Box, 
  BookOpen, 
  Send, 
  CalendarClock, 
  FileText, 
  Dumbbell, 
  Lightbulb, 
  ChartNoAxesCombined, 
  Settings,
  LogOut,
  Wifi,
  WifiOff,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  LucideIcon
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface NavItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  countKey?: 'referrals' | 'followups';
}

interface NavSectionConfig {
  title: string;
  items: NavItemConfig[];
}

export const Sidebar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser,
    isOffline,
    toggleSimulatedOffline,
    referrals,
    followUps,
    isMobileSidebarOpen,
    setMobileSidebarOpen,
    isSidebarCollapsed,
    toggleSidebarCollapsed
  } = useApp();

  const pendingReferralsCount = referrals.filter(r => r.status === 'PENDING_REVIEW').length;
  const pendingFollowupsCount = followUps.filter(f => f.status === 'DUE' || f.status === 'UPCOMING').length;

  const navigationSections: NavSectionConfig[] = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'PATIENT CARE',
      items: [
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
        { id: 'movement', label: 'Movement Lab', icon: Activity },
        { id: 'ai_insights', label: 'AI Insights', icon: Brain },
        { id: 'digital_twin', label: 'Digital Twin', icon: Box },
        { id: 'guidance', label: 'Guidance', icon: BookOpen }
      ]
    },
    {
      title: 'CLINICAL WORKFLOW',
      items: [
        { id: 'referrals', label: 'Referrals', icon: Send, countKey: 'referrals' },
        { id: 'followups', label: 'Follow-ups', icon: CalendarClock, countKey: 'followups' },
        { id: 'reports', label: 'Reports', icon: FileText }
      ]
    },
    {
      title: 'RESOURCES',
      items: [
        { id: 'exercises', label: 'Exercises', icon: Dumbbell },
        { id: 'awareness', label: 'Awareness', icon: Lightbulb }
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'analytics', label: 'Analytics', icon: ChartNoAxesCombined },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const handleSelectView = (viewId: string) => {
    setCurrentView(viewId);
    if (isMobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  const userInitials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .filter(Boolean)
        .map(n => n.replace(/[^a-zA-Z]/g, ''))
        .filter(Boolean)
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'PG'
    : 'PG';

  const renderNavContent = () => (
    <div className="h-full max-h-screen flex flex-col justify-between overflow-hidden select-none text-slate-300">
      
      {/* ─────────────────────────────────────────────────────────────
          AREA A: BRAND HEADER (Compact 38px Apple-style Header)
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 h-[38px] px-3 border-b border-white/[0.08] flex items-center justify-between gap-2">
        {!isSidebarCollapsed ? (
          <div 
            onClick={() => setCurrentView('landing')} 
            className="flex items-center gap-2 cursor-pointer overflow-hidden group min-w-0"
            title="OsteoSense NER Home"
          >
            {/* 26x26px Compact Rounded Logo */}
            <div className="w-[26px] h-[26px] rounded-lg bg-gradient-to-tr from-sky-600 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0 border border-white/15">
              <Activity className="w-3.5 h-3.5 stroke-[2.4]" />
            </div>
            
            <div className="overflow-hidden min-w-0 leading-none">
              <h2 className="font-extrabold text-[12.5px] tracking-tight text-white uppercase font-display group-hover:text-sky-300 transition-colors truncate">
                OSTEOSENSE <span className="text-sky-400">NER</span>
              </h2>
              <p className="text-[9.5px] text-slate-400 font-medium truncate mt-0.5">
                Early OA Screening Platform
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleSidebarCollapsed}
            className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-600/30 via-blue-600/30 to-teal-500/30 border border-sky-400/30 text-sky-300 flex items-center justify-center font-bold text-[10px] mx-auto hover:bg-sky-600/40 transition"
            title="Expand Sidebar (Ctrl+B)"
          >
            OS
          </button>
        )}

        {/* Top-Right Collapse / Expand Button */}
        <button
          onClick={toggleSidebarCollapsed}
          className={`hidden lg:flex items-center justify-center w-6 h-6 rounded-md text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/20 transition-all focus-visible:ring-1 focus-visible:ring-sky-500 ${
            isSidebarCollapsed ? 'mx-auto' : 'flex-shrink-0'
          }`}
          title={isSidebarCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar (Ctrl+B)'}
          aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-3.5 h-3.5 text-sky-400" />
          ) : (
            <PanelLeftClose className="w-3.5 h-3.5 text-slate-300" />
          )}
        </button>

        {/* Mobile Close Drawer Button */}
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
          title="Close Navigation"
          aria-label="Close navigation"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          AREA B: NAVIGATION (Middle Area - Proportional, Zero Scrolling)
          All 14 items + 5 sections fit naturally on any desktop viewport
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 flex flex-col justify-evenly py-0.5 px-2 overflow-hidden">
        {navigationSections.map((section, secIdx) => (
          <div key={secIdx} className="space-y-px">
            {/* Elegant Micro Section Heading */}
            {!isSidebarCollapsed ? (
              <div className="px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.08em] text-slate-400/90 select-none leading-none">
                {section.title}
              </div>
            ) : (
              <div className="h-px bg-white/[0.06] my-0.5 mx-1.5" />
            )}

            {/* Navigation Items (Fluid 23px-28px height, 15px icon, 11px text) */}
            <div className="space-y-px">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                let countBadge = 0;
                if (item.countKey === 'referrals') countBadge = pendingReferralsCount;
                if (item.countKey === 'followups') countBadge = pendingFollowupsCount;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectView(item.id)}
                    title={isSidebarCollapsed ? item.label : undefined}
                    aria-label={item.label}
                    className={`sidebar-dynamic-item w-full group relative flex items-center px-2 rounded-lg text-xs font-medium transition-all gap-2 ${
                      isActive
                        ? 'sidebar-nav-item active text-white font-semibold'
                        : 'text-[#A8B4C7] hover:text-white hover:bg-white/[0.06]'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    {/* Glowing Cyan Left Accent Indicator for Active Item */}
                    {isActive && (
                      <span className="absolute left-1 w-0.5 h-3 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.9)]" />
                    )}

                    {/* Consistent Icon Container */}
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-3.5 h-3.5 transition-colors ${
                        isActive ? 'text-sky-400' : 'text-[#94A3B8] group-hover:text-slate-100'
                      }`} />
                    </div>

                    {/* Label & Dynamic Count Badges */}
                    {!isSidebarCollapsed && (
                      <>
                        <span className="sidebar-dynamic-text truncate text-left flex-1 tracking-tight">
                          {item.label}
                        </span>

                        {countBadge > 0 && (
                          <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 min-w-3.5 text-center flex-shrink-0 leading-tight">
                            {countBadge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Active Pip in Collapsed Mode */}
                    {isSidebarCollapsed && isActive && (
                      <div className="absolute right-1 w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_4px_rgba(56,189,248,0.9)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          AREA C: USER & SYSTEM FOOTER (Ultra-compact 80px Glass Area)
          Online Status + User Profile + Collapse & Sign Out Side-by-Side
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 p-2 bg-slate-950/80 border-t border-white/[0.08] space-y-1.5">
        
        {/* 1. Online / Offline Status Pill (22px) */}
        <button
          onClick={toggleSimulatedOffline}
          className={`w-full flex items-center gap-2 h-[22px] px-2 rounded-md border text-[10px] font-medium transition-all active:scale-[0.98] ${
            isOffline
              ? 'bg-amber-950/30 border-amber-500/30 text-amber-300 hover:bg-amber-950/50'
              : 'bg-emerald-950/25 border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/40'
          } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
          title={isOffline ? 'Offline Mode Active (Click to switch online)' : 'Online Synchronized (Click to test offline mode)'}
        >
          {isOffline ? (
            <WifiOff className="w-3 h-3 text-amber-400 flex-shrink-0" />
          ) : (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20 animate-pulse" />
              <Wifi className="w-3 h-3 text-emerald-400" />
            </div>
          )}
          {!isSidebarCollapsed && (
            <span className="truncate text-left flex-1 font-medium tracking-tight">
              {isOffline ? 'Field Offline Mode' : 'Online Synchronized'}
            </span>
          )}
        </button>

        {/* 2. Compact User Profile Card (28px) */}
        {!isSidebarCollapsed ? (
          <div className="p-1 px-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center gap-2">
            {/* 22x22px Blue Glass Avatar with Initials */}
            <div className="w-[22px] h-[22px] rounded-md bg-gradient-to-br from-sky-500/20 via-blue-600/30 to-indigo-600/40 border border-sky-400/30 text-sky-300 font-bold text-[9.5px] flex items-center justify-center flex-shrink-0">
              {userInitials}
            </div>
            <div className="overflow-hidden min-w-0 flex-1 leading-none">
              <div className="text-[10.5px] font-semibold text-slate-100 truncate">
                {currentUser?.name || 'Priyanka Gogoi, ANM'}
              </div>
              <div className="text-[8.5px] text-slate-400 truncate mt-0.5">
                {currentUser?.facility || 'Chabua CHC, Dibrugarh'}
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="w-7 h-7 mx-auto rounded-md bg-gradient-to-br from-sky-500/20 via-blue-600/30 to-indigo-600/40 border border-sky-400/30 text-sky-300 flex items-center justify-center text-[10px] font-bold"
            title={`${currentUser?.name || 'Priyanka Gogoi, ANM'} • ${currentUser?.facility || 'Chabua CHC, Dibrugarh'}`}
          >
            {userInitials}
          </div>
        )}

        {/* 3. Collapse Sidebar & Sign Out (Side-by-Side Dual Action Row - 24px) */}
        <div className={`flex items-center gap-1.5 ${isSidebarCollapsed ? 'flex-col gap-1' : ''}`}>
          {/* Collapse Sidebar Button */}
          <button
            onClick={toggleSidebarCollapsed}
            className={`hidden lg:flex items-center justify-center gap-1.5 h-[24px] rounded-md text-[10px] font-medium text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/12 transition-all ${
              isSidebarCollapsed ? 'w-7 px-0' : 'flex-1 px-2'
            }`}
            title={isSidebarCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar (Ctrl+B)'}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-3 h-3 text-sky-400" />
            ) : (
              <>
                <PanelLeftClose className="w-3 h-3 text-slate-400" />
                <span className="truncate">Collapse</span>
              </>
            )}
          </button>

          {/* Sign Out Button */}
          <button
            onClick={() => setCurrentView('landing')}
            className={`flex items-center justify-center gap-1.5 h-[24px] rounded-md text-[10px] font-medium text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 hover:border-rose-800/50 transition-all ${
              isSidebarCollapsed ? 'w-7 px-0' : 'flex-1 px-2'
            }`}
            title="Sign out / Return to Landing"
          >
            <LogOut className="w-3 h-3 text-rose-400 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="truncate">Sign Out</span>}
          </button>
        </div>

      </div>

    </div>
  );

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP FIXED GLASSMORPHISM SIDEBAR (100vh height, zero scrolling)
          ───────────────────────────────────────────────────────────── */}
      <aside 
        className={`glass-sidebar hidden lg:flex flex-col fixed top-0 left-0 bottom-0 h-screen max-h-screen transition-all duration-300 ease-in-out z-40 overflow-hidden ${
          isSidebarCollapsed ? 'w-[72px]' : 'w-[280px]'
        }`}
      >
        {renderNavContent()}
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE SLIDE-OVER DRAWER BACKDROP
          ───────────────────────────────────────────────────────────── */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 lg:hidden animate-in fade-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          MOBILE SLIDE-OVER DRAWER (Glassmorphism, 100vh, zero scrolling)
          ───────────────────────────────────────────────────────────── */}
      <div 
        className={`glass-sidebar fixed top-0 bottom-0 left-0 w-[280px] max-w-[85vw] h-screen max-h-screen z-50 lg:hidden shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {renderNavContent()}
      </div>
    </>
  );
};
