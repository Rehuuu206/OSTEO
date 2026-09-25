import React from 'react';
import { ShieldAlert, AlertCircle, Info } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const FooterDisclaimer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5 max-w-4xl">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-700">
              Healthcare Regulatory & Decision-Support Notice:
            </p>
            <p className="text-[11px] leading-relaxed text-slate-600">
              OsteoSense NER is an AI-assisted multimodal early osteoarthritis risk screening and biomechanical decision-support platform designed for primary healthcare centers in the North Eastern Region. It <strong>MUST NOT</strong> be used as a standalone diagnostic system and <strong>DOES NOT</strong> replace a physical clinical examination, radiographic Kellgren-Lawrence grading, or clinical consultation by a certified orthopedic surgeon.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono flex-shrink-0">
          <span>AI Model: v1.2-alpha</span>
          <span>•</span>
          <span>Offline Capable</span>
          <span>•</span>
          <span>Ayushman Bharat Aligned</span>
        </div>
      </div>
    </footer>
  );
};
