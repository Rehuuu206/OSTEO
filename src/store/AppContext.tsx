import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Patient, AssessmentRecord, SensorReading, DoctorReferral, FollowUpItem } from '../types';
import { StorageService } from '../services/storage';
import { MockSensorAdapter } from '../services/sensorAdapter';
import { DEMO_PATIENTS, DEMO_ASSESSMENT_RECORD } from '../services/demoData';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: User;
  currentView: string;
  setCurrentView: (view: string) => void;
  patients: Patient[];
  refreshPatients: () => void;
  selectedPatient: Patient | null;
  setSelectedPatient: (p: Patient | null) => void;
  assessments: AssessmentRecord[];
  refreshAssessments: () => void;
  activeAssessment: AssessmentRecord;
  setActiveAssessment: (a: AssessmentRecord) => void;
  referrals: DoctorReferral[];
  refreshReferrals: () => void;
  followUps: FollowUpItem[];
  refreshFollowUps: () => void;
  sensorAdapter: MockSensorAdapter;
  latestSensorReading: SensorReading | null;
  isSensorConnected: boolean;
  connectSensor: () => Promise<boolean>;
  disconnectSensor: () => void;
  isOffline: boolean;
  toggleSimulatedOffline: () => void;
  syncQueueCount: number;
  triggerSync: () => Promise<void>;
  isSyncing: boolean;
  loadDemoPatient: () => void;
  isPresentationModeOpen: boolean;
  setPresentationModeOpen: (open: boolean) => void;
  isPatientCounselingOpen: boolean;
  setPatientCounselingOpen: (open: boolean) => void;
  isNewPatientModalOpen: boolean;
  setNewPatientModalOpen: (open: boolean) => void;
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
}

const mockSensorInstance = new MockSensorAdapter();

const DEFAULT_USER: User = {
  id: 'usr-chw-01',
  name: 'Priyanka Gogoi, ANM',
  role: 'health_worker',
  facility: 'Chabua CHC, Dibrugarh, Assam',
  designation: 'Senior Auxiliary Nurse Midwife (ANM) & Community Screener',
  email: 'priyanka.gogoi@nhm.assam.gov.in'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('health_worker');
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_USER);
  const [currentView, setCurrentView] = useState<string>('landing');
  
  const [patients, setPatients] = useState<Patient[]>(() => StorageService.getPatients());
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(() => DEMO_PATIENTS[0]);
  
  const [assessments, setAssessments] = useState<AssessmentRecord[]>(() => StorageService.getAssessments());
  const [activeAssessment, setActiveAssessment] = useState<AssessmentRecord>(() => {
    const list = StorageService.getAssessments();
    return list.length > 0 ? list[0] : DEMO_ASSESSMENT_RECORD;
  });

  const [referrals, setReferrals] = useState<DoctorReferral[]>(() => StorageService.getReferrals());
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(() => StorageService.getFollowUps());

  const [isSensorConnected, setIsSensorConnected] = useState<boolean>(false);
  const [latestSensorReading, setLatestSensorReading] = useState<SensorReading | null>(null);

  const [isOffline, setIsOffline] = useState<boolean>(() => StorageService.getSimulatedOffline());
  const [syncQueueCount, setSyncQueueCount] = useState<number>(() => StorageService.getSyncQueue().length);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const [isPresentationModeOpen, setPresentationModeOpen] = useState<boolean>(false);
  const [isPatientCounselingOpen, setPatientCounselingOpen] = useState<boolean>(false);
  const [isNewPatientModalOpen, setNewPatientModalOpen] = useState<boolean>(false);

  // Sidebar responsive drawer & collapse state
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const toggleMobileSidebar = () => setMobileSidebarOpen(prev => !prev);
  const toggleSidebarCollapsed = () => setSidebarCollapsed(prev => !prev);

  // Update user profile representation when role switches
  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (role === 'health_worker') {
      setCurrentUser(DEFAULT_USER);
    } else if (role === 'doctor') {
      setCurrentUser({
        id: 'usr-doc-01',
        name: 'Dr. Bhaskar Barua, MS (Ortho)',
        role: 'doctor',
        facility: 'Assam Medical College & Hospital (AMCH), Dibrugarh',
        designation: 'Associate Professor & Consultant Orthopedic Surgeon',
        email: 'dr.bbarua@amch.edu.in'
      });
    } else if (role === 'admin') {
      setCurrentUser({
        id: 'usr-adm-01',
        name: 'Dr. Anuradha Sarma, MD',
        role: 'admin',
        facility: 'National Health Mission Directorate, Guwahati',
        designation: 'State Nodal Officer - Musculoskeletal Health & NCDs',
        email: 'anuradha.sarma@nhm.assam.gov.in'
      });
    } else {
      setCurrentUser({
        id: 'usr-pat-01',
        name: selectedPatient ? selectedPatient.name : 'Devi Saikia',
        role: 'patient',
        facility: 'Chabua CHC',
        designation: 'Patient / Beneficiary',
        email: 'devi.saikia.assam@ruralhealth.org'
      });
    }
  };

  const refreshPatients = () => {
    setPatients(StorageService.getPatients());
    setSyncQueueCount(StorageService.getSyncQueue().length);
  };

  const refreshAssessments = () => {
    const list = StorageService.getAssessments();
    setAssessments(list);
    if (list.length > 0 && !activeAssessment) {
      setActiveAssessment(list[0]);
    }
    setSyncQueueCount(StorageService.getSyncQueue().length);
  };

  const refreshReferrals = () => {
    setReferrals(StorageService.getReferrals());
    setSyncQueueCount(StorageService.getSyncQueue().length);
  };

  const refreshFollowUps = () => {
    setFollowUps(StorageService.getFollowUps());
    setSyncQueueCount(StorageService.getSyncQueue().length);
  };

  const connectSensor = async (): Promise<boolean> => {
    const success = await mockSensorInstance.connect();
    setIsSensorConnected(success);
    return success;
  };

  const disconnectSensor = () => {
    mockSensorInstance.disconnect();
    setIsSensorConnected(false);
  };

  useEffect(() => {
    const unsubscribe = mockSensorInstance.subscribe((reading) => {
      setLatestSensorReading(reading);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Sync logic
  const triggerSync = async (): Promise<void> => {
    setIsSyncing(true);
    // Simulate server synchronization delay
    await new Promise((resolve) => setTimeout(resolve, 1400));
    StorageService.clearSyncQueue();
    setSyncQueueCount(0);
    setIsSyncing(false);
  };

  const toggleSimulatedOffline = () => {
    const nextVal = !isOffline;
    setIsOffline(nextVal);
    StorageService.setSimulatedOffline(nextVal);
  };

  const loadDemoPatient = () => {
    setSelectedPatient(DEMO_PATIENTS[0]);
    setActiveAssessment(DEMO_ASSESSMENT_RECORD);
    setCurrentView('digital_twin');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        currentView,
        setCurrentView,
        patients,
        refreshPatients,
        selectedPatient,
        setSelectedPatient,
        assessments,
        refreshAssessments,
        activeAssessment,
        setActiveAssessment,
        referrals,
        refreshReferrals,
        followUps,
        refreshFollowUps,
        sensorAdapter: mockSensorInstance,
        latestSensorReading,
        isSensorConnected,
        connectSensor,
        disconnectSensor,
        isOffline,
        toggleSimulatedOffline,
        syncQueueCount,
        triggerSync,
        isSyncing,
        loadDemoPatient,
        isPresentationModeOpen,
        setPresentationModeOpen,
        isPatientCounselingOpen,
        setPatientCounselingOpen,
        isNewPatientModalOpen,
        setNewPatientModalOpen,
        isMobileSidebarOpen,
        setMobileSidebarOpen,
        toggleMobileSidebar,
        isSidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebarCollapsed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};
