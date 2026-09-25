import React, { useState } from 'react';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Globe, 
  Bell, 
  Search, 
  ChevronDown, 
  HelpCircle, 
  Menu, 
  Play, 
  User, 
  Settings as SettingsIcon, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageCode, UserRole } from '../../types';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationsPopover } from './NotificationsPopover';
import { SyncStatusModal } from './SyncStatusModal';
import { UserProfileModal } from './UserProfileModal';

interface HeaderProps {
  onOpenHelp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHelp }) => {
  const { 
    currentRole, 
    setCurrentRole, 
    currentUser, 
    currentView,
    setCurrentView,
    isOffline, 
    syncQueueCount, 
    isSyncing,
    setPresentationModeOpen,
    toggleMobileSidebar,
    isSidebarCollapsed,
    toggleSidebarCollapsed,
    referrals,
    followUps
  } = useApp();

  const { language, setLanguage } = useLanguage();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Global Keyboard Shortcut: ⌘K (search), ⌘B (toggle sidebar)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebarCollapsed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebarCollapsed]);

  const pendingNotifCount = 
    (syncQueueCount > 0 ? 1 : 0) + 
    (followUps.filter(f => f.status === 'DUE').length > 0 ? 1 : 0) + 
    (referrals.filter(r => r.status === 'PENDING_REVIEW').length > 0 ? 1 : 0) + 2;

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'as', label: 'Assamese', native: 'অসমীয়া' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'mni', label: 'Manipuri', native: 'মেইতেই / Manipuri' }
  ];

  const roles: { role: UserRole; title: string; badge: string; color: string }[] = [
    { role: 'health_worker', title: 'Community Screener (ANM/ASHA)', badge: 'Health Worker', color: 'bg-emerald-500' },
    { role: 'doctor', title: 'Orthopedic Consultant / Doctor', badge: 'Clinician / Doctor', color: 'bg-blue-600' },
    { role: 'admin', title: 'State Health Nodal Administrator', badge: 'Admin', color: 'bg-purple-600' },
    { role: 'patient', title: 'Patient / Beneficiary Portal', badge: 'Patient View', color: 'bg-teal-600' }
  ];

  // Derive systematic breadcrumbs
  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'dashboard':
        return { section: 'Overview', page: 'Dashboard' };
      case 'patients':
        return { section: 'Patient Care', page: 'Patients' };
      case 'assessments':
        return { section: 'Patient Care', page: 'Assessments' };
      case 'movement':
        return { section: 'Patient Care', page: 'Movement Lab' };
      case 'ai_insights':
        return { section: 'Patient Care', page: 'AI Insights' };
      case 'digital_twin':
        return { section: 'Patient Care', page: 'Digital Twin' };
      case 'guidance':
        return { section: 'Patient Care', page: 'Guidance' };
      case 'referrals':
        return { section: 'Clinical Workflow', page: 'Referrals' };
      case 'followups':
        return { section: 'Clinical Workflow', page: 'Follow-ups' };
      case 'reports':
        return { section: 'Clinical Workflow', page: 'Reports' };
      case 'exercises':
        return { section: 'Resources', page: 'Exercises' };
      case 'awareness':
        return { section: 'Resources', page: 'Awareness' };
      case 'analytics':
        return { section: 'Management', page: 'Analytics' };
      case 'settings':
        return { section: 'Management', page: 'Settings' };
      default:
        return { section: 'Overview', page: 'Dashboard' };
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs select-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* LEFT: Mobile Menu Button + Brand (Mobile/Collapsed) + Systematic Breadcrumbs / Page Title */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {/* Sidebar Navigation Toggle Button (Responsive: Toggles collapse on desktop, drawer on mobile) */}
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                    toggleSidebarCollapsed();
                  } else {
                    toggleMobileSidebar();
                  }
                }}
                className="p-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100 transition focus-visible:ring-2 focus-visible:ring-sky-500 flex-shrink-0"
                title={isSidebarCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
                aria-label="Toggle navigation sidebar"
              >
                <Menu className="w-5 h-5 text-slate-700" />
              </button>

              {/* Brand Logo & Name (Visible on mobile screens or when sidebar is collapsed on desktop) */}
              <div 
                className={`items-center gap-2 cursor-pointer group flex-shrink-0 ${
                  isSidebarCollapsed ? 'flex' : 'flex lg:hidden'
                }`}
                onClick={() => setCurrentView('landing')}
                title="OsteoSense NER Home"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-700 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                  <Activity className="w-4.5 h-4.5 stroke-[2.4]" />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-sm tracking-tight text-slate-900 font-display">
                      OSTEOSENSE <span className="text-sky-600">NER</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider between brand/menu and page title */}
              <div className={`h-5 w-px bg-slate-200 flex-shrink-0 ${
                isSidebarCollapsed ? 'hidden sm:block' : 'hidden lg:block'
              }`} />

              {/* Systematic Breadcrumbs & Current Page Title */}
              <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs min-w-0">
                <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10.5px] truncate hidden sm:inline">
                  {breadcrumbs.section}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 hidden sm:inline" />
                <span className="font-bold text-slate-900 text-sm tracking-tight truncate">
                  {breadcrumbs.page}
                </span>
              </nav>
            </div>

            {/* RIGHT: Global Search, Notifications, Language, Connectivity, Profile */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Global Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 h-9 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs transition active:scale-[0.98]"
                title="Search patients, assessments, reports (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden xl:inline text-slate-400 font-normal">Search patients, assessments, reports...</span>
                <span className="hidden sm:inline xl:hidden text-slate-500 font-medium">Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white border border-slate-200 rounded text-slate-400">
                  ⌘K
                </kbd>
              </button>

              {/* Guided Clinical Walkthrough Tour */}
              <button
                onClick={() => setPresentationModeOpen(true)}
                className="hidden lg:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white text-xs font-semibold shadow-2xs transition active:scale-[0.98]"
                title="Guided clinical workflow walkthrough"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Clinical Tour</span>
              </button>

              {/* Connectivity Status Indicator */}
              <button
                onClick={() => setIsSyncModalOpen(true)}
                className={`flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-xl text-xs font-semibold border transition active:scale-[0.98] ${
                  isOffline
                    ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                    : syncQueueCount > 0
                    ? 'bg-sky-50 text-sky-900 border-sky-300 hover:bg-sky-100'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                }`}
                title="Click to view network sync status & retry"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                    <span className="hidden sm:inline">Syncing</span>
                  </>
                ) : isOffline ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="hidden sm:inline">Offline</span>
                  </>
                ) : syncQueueCount > 0 ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    <span className="hidden sm:inline">{syncQueueCount} Pending</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="hidden sm:inline">Online</span>
                  </>
                )}
              </button>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setShowLangDropdown(false);
                    setShowProfileDropdown(false);
                  }}
                  className="relative h-9 w-9 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 flex items-center justify-center transition active:scale-[0.98]"
                  title="Notifications & Tasks"
                >
                  <Bell className="w-4 h-4 text-slate-600" />
                  {pendingNotifCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                      {pendingNotifCount}
                    </span>
                  )}
                </button>

                <NotificationsPopover 
                  isOpen={isNotificationsOpen} 
                  onClose={() => setIsNotificationsOpen(false)} 
                />
              </div>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangDropdown(!showLangDropdown);
                    setIsNotificationsOpen(false);
                    setShowProfileDropdown(false);
                  }}
                  className="flex items-center gap-1.5 h-9 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold bg-white hover:bg-slate-50 transition active:scale-[0.98]"
                  title="Change interface language"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span className="uppercase font-bold">{language}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showLangDropdown && (
                  <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Regional Language
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {languages.map((item) => (
                        <button
                          key={item.code}
                          onClick={() => {
                            setLanguage(item.code);
                            setShowLangDropdown(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition ${
                            language === item.code ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{item.native}</span>
                          <span className="text-[10px] text-slate-400">({item.label})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileDropdown(!showProfileDropdown);
                    setShowLangDropdown(false);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 h-9 pl-1.5 pr-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition active:scale-[0.98]"
                  title="User Profile & Settings"
                >
                  <div className="w-6 h-6 rounded-lg bg-sky-600 text-white text-[11px] flex items-center justify-center font-bold shadow-2xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block max-w-[120px]">
                    <div className="text-xs font-bold text-slate-800 leading-tight truncate">
                      {currentUser.name.split(',')[0]}
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize leading-none truncate">
                      {currentRole.replace('_', ' ')}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                    {/* User Info Header */}
                    <div className="p-3 bg-slate-50 rounded-xl mb-2">
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[10px] text-slate-500 capitalize mt-0.5">
                        {currentRole.replace('_', ' ')}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-1">
                        {currentUser.facility}
                      </div>
                    </div>

                    {/* Navigation Options */}
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setIsProfileModalOpen(true);
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 transition"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        <span>Profile & Accreditation</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('settings');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 transition"
                      >
                        <SettingsIcon className="w-4 h-4 text-slate-500" />
                        <span>Clinic Settings</span>
                      </button>

                      {onOpenHelp && (
                        <button
                          onClick={() => {
                            onOpenHelp();
                            setShowProfileDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 transition"
                        >
                          <HelpCircle className="w-4 h-4 text-sky-600" />
                          <span>Help & Clinical Glossary</span>
                        </button>
                      )}
                    </div>

                    {/* Switch Roles Selector */}
                    <div className="border-t border-slate-100 my-2 pt-2">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Switch Active Role
                      </div>
                      <div className="space-y-0.5 mt-1">
                        {roles.map((r) => (
                          <button
                            key={r.role}
                            onClick={() => {
                              setCurrentRole(r.role);
                              setShowProfileDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition ${
                              currentRole === r.role ? 'bg-sky-50 text-sky-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${r.color}`} />
                            <span className="truncate">{r.badge}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setCurrentView('landing');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <SyncStatusModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenHelp={onOpenHelp}
      />
    </>
  );
};
