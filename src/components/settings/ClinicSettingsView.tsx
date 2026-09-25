import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  Cpu, 
  HardDrive, 
  Globe, 
  Sliders, 
  ShieldCheck, 
  Save, 
  RefreshCw, 
  Trash2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const ClinicSettingsView: React.FC = () => {
  const { 
    currentUser, 
    isOffline, 
    toggleSimulatedOffline, 
    syncQueueCount, 
    triggerSync, 
    isSyncing 
  } = useApp();

  const { language, setLanguage } = useLanguage();

  const [facilityName, setFacilityName] = useState(currentUser.facility || 'Chabua CHC, Dibrugarh, Assam');
  const [district, setDistrict] = useState('Dibrugarh');
  const [samplingRate, setSamplingRate] = useState('60');
  const [autoSyncOnWifi, setAutoSyncOnWifi] = useState(true);
  const [cacheLimitMb, setCacheLimitMb] = useState('500');
  const [adductionThreshold, setAdductionThreshold] = useState('2.8');
  const [asymmetryTolerance, setAsymmetryTolerance] = useState('15');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              System Management
            </span>
            <span className="text-xs text-slate-500">
              Station ID: <strong className="font-mono text-slate-800">NER-CHC-429-A</strong>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1.5">
            Platform & Facility Settings
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Configure screening facility parameters, sensor telemetry sampling, offline storage caching, and decision-support thresholds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition active:scale-[0.98]"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Clinic settings and sensor configurations successfully committed to local device store.</span>
        </div>
      )}

      <div className="space-y-6">
        
        {/* Section 1: Facility Profile */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-600" />
            <span>Health Facility & Regional Node</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Facility / CHC Name</label>
              <input 
                type="text" 
                value={facilityName} 
                onChange={(e) => setFacilityName(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:ring-2 focus:ring-sky-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Administrative District</label>
              <input 
                type="text" 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:ring-2 focus:ring-sky-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Assigned Screener</label>
              <input 
                type="text" 
                disabled
                value={currentUser.name} 
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tertiary Referral Linkage</label>
              <input 
                type="text" 
                disabled
                value="Assam Medical College & Hospital (AMCH), Dibrugarh" 
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Sensor & Hardware Sampling */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <span>Wearable Sensor Telemetry & Pose Sampling</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">IMU Sampling Rate</label>
              <select
                value={samplingRate}
                onChange={(e) => setSamplingRate(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white"
              >
                <option value="50">50 Hz (Low Power Mode)</option>
                <option value="60">60 Hz (Standard Clinical Recommended)</option>
                <option value="100">100 Hz (High Precision Research)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Vision Pose Estimator Frame Budget</label>
              <select
                defaultValue="30"
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white"
              >
                <option value="24">24 FPS (Battery Conservative)</option>
                <option value="30">30 FPS (Standard Smartphone Camera)</option>
                <option value="60">60 FPS (Smooth Kinematic Tracking)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Offline Storage & Cloud Synchronization */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-600" />
            <span>Local Offline Cache & Synchronization</span>
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-900">Simulate Field Offline Mode</div>
                <div className="text-[11px] text-slate-500">Temporarily simulate lack of rural cellular connectivity.</div>
              </div>
              <button
                onClick={toggleSimulatedOffline}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  isOffline ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                {isOffline ? 'Offline Mode ON' : 'Online Mode'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-900">Pending Sync Queue</div>
                <div className="text-[11px] text-slate-500">{syncQueueCount} screening and referral records waiting for cloud sync.</div>
              </div>
              <button
                onClick={triggerSync}
                disabled={isSyncing || syncQueueCount === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: CDSS Algorithmic Risk Thresholds */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-600" />
            <span>Decision Support Risk Thresholds</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Knee Adduction Moment Alert (Nm/kg·m)
              </label>
              <input 
                type="number" 
                step="0.1"
                value={adductionThreshold} 
                onChange={(e) => setAdductionThreshold(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 text-slate-800"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Normative standard is &lt;2.4. Elevated starts at &gt;2.8.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Gait Asymmetry Alert Threshold (%)
              </label>
              <input 
                type="number" 
                value={asymmetryTolerance} 
                onChange={(e) => setAsymmetryTolerance(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 text-slate-800"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Triggers moderate risk warning when stance asymmetry exceeds this value.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
