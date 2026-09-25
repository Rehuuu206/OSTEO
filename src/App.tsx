import React, { useState } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { FooterDisclaimer } from './components/common/FooterDisclaimer';
import { LandingPage } from './components/landing/LandingPage';
import { HealthWorkerDashboard } from './components/dashboard/HealthWorkerDashboard';
import { PatientListView } from './components/patient/PatientListView';
import { PatientRegistrationModal } from './components/patient/PatientRegistrationModal';
import { MovementLab } from './components/movement/MovementLab';
import { SensorCenter } from './components/sensors/SensorCenter';
import { FusionComparison } from './components/fusion/FusionComparison';
import { DigitalTwinView } from './components/digitaltwin/DigitalTwinView';
import { AIInsightsView } from './components/ai/AIInsightsView';
import { ReferralWorkflow } from './components/referral/ReferralWorkflow';
import { ExerciseLibrary } from './components/exercises/ExerciseLibrary';
import { ClinicalReportView } from './components/reports/ClinicalReportView';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { AssessmentsListView } from './components/assessments/AssessmentsListView';
import { ClinicalGuidanceView } from './components/guidance/ClinicalGuidanceView';
import { FollowUpTrackerView } from './components/followups/FollowUpTrackerView';
import { AwarenessHubView } from './components/awareness/AwarenessHubView';
import { ClinicSettingsView } from './components/settings/ClinicSettingsView';
import { HelpAssistantModal } from './components/common/HelpAssistantModal';
import { PresentationModal } from './components/presentation/PresentationModal';
import { RefreshCw, WifiOff } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    currentView, 
    setCurrentView,
    isNewPatientModalOpen, 
    setNewPatientModalOpen,
    isOffline,
    syncQueueCount,
    isSyncing,
    triggerSync,
    isSidebarCollapsed
  } = useApp();

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // If on landing page, show hero showcase
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <LandingPage onEnterApp={() => setCurrentView('dashboard')} />
        <FooterDisclaimer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col selection:bg-sky-500 selection:text-white">
      
      {/* 1. Desktop Fixed Sidebar & Mobile Drawer (Self-contained, fixed position, 100vh height, zero scrolling) */}
      <div className="no-print">
        <Sidebar />
      </div>

      {/* 2. Main Application Area (Padded on desktop to align beside the fixed sidebar) */}
      <div className={`min-h-screen flex flex-col transition-[padding] duration-300 ease-in-out ${
        isSidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[280px]'
      }`}>
        
        {/* Offline / Sync Notification Bar */}
        {isOffline && (
          <div className="no-print flex-shrink-0 bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between z-30 shadow-xs">
            <div className="flex items-center gap-2">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline Mode Active • Screenings and videos stored safely in local device cache</span>
            </div>
            {syncQueueCount > 0 && (
              <span className="font-mono bg-amber-600/30 px-2 py-0.5 rounded text-[11px]">
                {syncQueueCount} records queued for cloud sync
              </span>
            )}
          </div>
        )}

        {/* Main App Navigation Header (Sticky at top of main content area, aligns beside sidebar) */}
        <div className="no-print sticky top-0 z-30">
          <Header onOpenHelp={() => setIsHelpModalOpen(true)} />
        </div>

        {/* Main Content Area (Single unified page scroll, zero nested scrollbars) */}
        <main className="flex-1 min-w-0 pb-16 bg-slate-50">
          {currentView === 'dashboard' && <HealthWorkerDashboard />}
          {currentView === 'patients' && <PatientListView />}
          {currentView === 'assessments' && <AssessmentsListView />}
          {currentView === 'movement' && <MovementLab />}
          {currentView === 'sensors' && <SensorCenter />}
          {currentView === 'fusion' && <FusionComparison />}
          {currentView === 'digital_twin' && <DigitalTwinView />}
          {currentView === 'ai_insights' && <AIInsightsView />}
          {currentView === 'guidance' && <ClinicalGuidanceView />}
          {currentView === 'referrals' && <ReferralWorkflow />}
          {currentView === 'followups' && <FollowUpTrackerView />}
          {currentView === 'reports' && <ClinicalReportView />}
          {currentView === 'exercises' && <ExerciseLibrary />}
          {currentView === 'awareness' && <AwarenessHubView />}
          {currentView === 'analytics' && <AnalyticsDashboard />}
          {currentView === 'settings' && <ClinicSettingsView />}
        </main>

        {/* Regulatory & Safety Footer */}
        <div className="no-print">
          <FooterDisclaimer />
        </div>

      </div>

      {/* Mobile Bottom Navigation (Visible only on mobile) */}
      <div className="no-print lg:hidden">
        <MobileNav />
      </div>

      {/* Global Patient Registration Wizard Modal */}
      <PatientRegistrationModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setNewPatientModalOpen(false)}
      />

      {/* Global Clinical Help & Assistant Modal */}
      <HelpAssistantModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Clinical Platform Walkthrough Tour Modal */}
      <PresentationModal />

    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </LanguageProvider>
  );
}
