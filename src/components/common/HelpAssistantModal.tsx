import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Languages, 
  Sparkles,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface HelpAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpAssistantModal: React.FC<HelpAssistantModalProps> = ({ isOpen, onClose }) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'glossary' | 'protocols' | 'contacts'>('glossary');

  if (!isOpen) return null;

  const glossaryItems = [
    {
      term: 'Gait Symmetry Index',
      def: 'The percentage of balance between left and right foot contact times. Normal walking is >95%. Below 85% indicates significant limping (antalgic avoidance of knee pressure).'
    },
    {
      term: 'Knee Flexion Range of Motion (ROM)',
      def: 'The maximum angle the knee can bend. A healthy knee bends 120°–140°. Less than 110° indicates functional restriction for climbing stairs and squatting.'
    },
    {
      term: '3D Biomechanical Digital Twin',
      def: 'A mathematical and visual 3D simulation of the patient’s knee based on their exact weight, height, and measured gait kinematics showing high-pressure contact points.'
    },
    {
      term: 'Contralateral Cane Offloading',
      def: 'Using a walking stick in the hand opposite to the painful knee. This mechanical lever reduces peak knee adduction forces by up to 25% with each stride.'
    },
    {
      term: 'Low Stool (Pirha)',
      def: 'A traditional 6-inch wooden platform common in Northeast India. Sitting on a pirha prevents harmful 140° hyper-flexion joint stress caused by direct floor squats.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-sm font-bold">Clinical Protocol & Multilingual Assistant</h2>
              <p className="text-[11px] text-slate-400">Field guidance for Community Health Workers & Beneficiaries</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('glossary')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'glossary' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Clinical Glossary
          </button>
          <button
            onClick={() => setActiveTab('protocols')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'protocols' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Field Protocols
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'contacts' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Regional Referral Hubs
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto text-xs space-y-4">
          
          {activeTab === 'glossary' && (
            <div className="space-y-3">
              {glossaryItems.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900">{item.term}</div>
                  <p className="text-slate-600 leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'protocols' && (
            <div className="space-y-3 text-slate-700">
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 space-y-1 text-sky-950">
                <div className="font-bold">Step 1: Calibration & Framing</div>
                <p>Ensure patient is in natural daylight or well-lit room. Stand 3 meters away with camera at waist height.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 space-y-1 text-sky-950">
                <div className="font-bold">Step 2: Dual Concordance Check</div>
                <p>If IMU sensor and video estimates differ by &gt;12°, reposition sensor over anterior tibial crest and re-record.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 space-y-1 text-sky-950">
                <div className="font-bold">Step 3: Rural Counseling</div>
                <p>Always open 'Patient Counseling Mode' to show the 3D joint and pirha stool adaptation before patient departs.</p>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Assam Medical College Hospital (AMCH)</div>
                  <div className="text-slate-500">Department of Orthopedics & Tele-Hub • Dibrugarh</div>
                </div>
                <span className="font-mono font-bold text-sky-700">+91 373 2300080</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Regional Institute of Medical Sciences (RIMS)</div>
                  <div className="text-slate-500">Orthopedic Telemedicine Node • Imphal</div>
                </div>
                <span className="font-mono font-bold text-sky-700">+91 385 2414559</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>OsteoSense NER Clinical Knowledge Base v1.2</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
