import React, { useState } from 'react';
import { 
  PlayCircle, 
  BookOpen, 
  Download, 
  Globe, 
  Heart, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Share2, 
  Volume2, 
  Eye,
  ShieldCheck,
  Video
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const AwarenessHubView: React.FC = () => {
  const { language } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language || 'as');
  const [activeMediaModal, setActiveMediaModal] = useState<string | null>(null);

  const videoResources = [
    {
      id: 'vid-tea-garden',
      title: 'Joint Protection for Tea Garden & Farm Workers',
      titleNative: 'চাহ বাগিচাৰ শ্ৰমিকসকলৰ বাবে আঁঠু সুৰক্ষা কৌশল',
      duration: '4 min 15 sec',
      language: 'Assamese & Hindi',
      category: 'Ergonomics',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      description: 'Techniques for distributing load when carrying heavy leaf baskets, minimizing deep squatting stress, and adopting biomechanical rest pauses.'
    },
    {
      id: 'vid-home-quads',
      title: 'Daily 5-Minute Isometric Knee Strengthening',
      titleNative: 'প্ৰতিদিনে ৫ মিনিটৰ সহজ আঁঠু শক্তিশালী ব্যায়াম',
      duration: '5 min 30 sec',
      language: 'Multilingual Audio',
      category: 'Physical Therapy',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
      description: 'Seated straight leg raises and towel-press exercises that reinforce the vastus medialis without compressing joint cartilage.'
    },
    {
      id: 'vid-cane-posture',
      title: 'How to Correctly Use a Walking Cane for OA',
      titleNative: 'লাঠি বা কেন ব্যৱহাৰ কৰাৰ সঠিক পদ্ধতি',
      duration: '3 min 40 sec',
      language: 'Hindi & Bengali',
      category: 'Assistive Devices',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
      description: 'Demonstrating how holding an indigenous bamboo cane in the contralateral hand reduces medial knee contact forces by over 30%.'
    }
  ];

  const printableLeaflets = [
    {
      title: 'Knee Health Guide for Tea Garden Communities',
      languages: 'Assamese / English',
      format: 'Bilingual A4 Leaflet (PDF)',
      pages: '2 pages',
      downloads: 412
    },
    {
      title: 'Early Warning Signs of Joint Wear & When to Visit CHC',
      languages: 'Hindi / Bengali',
      format: 'Pictographic Poster',
      pages: '1 page',
      downloads: 620
    },
    {
      title: 'Ayushman Bharat & PMJAY Orthopedic Care Entitlements',
      languages: 'Assamese / Hindi / English',
      format: 'Scheme Informational Booklet',
      pages: '4 pages',
      downloads: 285
    }
  ];

  const mythsAndFacts = [
    {
      myth: '"Resting completely and never walking is the only cure for painful knees."',
      fact: 'Controlled, low-impact movement circulates synovial fluid to nourish articular cartilage. Prolonged inactivity accelerates muscle atrophy and worsens joint stiffness.',
      icon: Heart
    },
    {
      myth: '"Knee pain is just natural aging and nothing can be done."',
      fact: 'Early intervention with quadriceps strengthening, weight modulation, and simple gait corrections can stabilize cartilage degeneration and prevent knee replacement surgery.',
      icon: ShieldCheck
    },
    {
      myth: '"Cracking joints means the bone is grinding away."',
      fact: 'Painless joint crepitus is often harmless gas bubble cavitation in synovial fluid. However, cracking accompanied by persistent pain or swelling warrants screening.',
      icon: HelpCircle
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
              Community Health Education
            </span>
            <span className="text-xs text-slate-500">
              Culturally Adapted for North East Region
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1.5">
            Patient Awareness & Educational Resources
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Multilingual video demonstrations, printable community leaflets, and joint-protective ergonomic counseling tools.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-600 font-medium">Select Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-1.5 bg-white text-slate-800 font-semibold focus:ring-2 focus:ring-purple-500"
          >
            <option value="as">অসমীয়া (Assamese)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="mni">মৈতৈলোন্ (Manipuri)</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Video Education Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-600" />
            <span>Community Video Counseling Modules</span>
          </h2>
          <span className="text-xs text-slate-500">Audio narration in regional dialects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {videoResources.map((vid) => (
            <div 
              key={vid.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img 
                  src={vid.thumbnail} 
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="px-2 py-0.5 rounded bg-black/60 font-mono text-[10px]">
                    {vid.duration}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-600/80 font-semibold text-[10px]">
                    {vid.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setActiveMediaModal(vid.title)}
                    className="w-12 h-12 rounded-full bg-white/90 text-purple-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition active:scale-95"
                    title="Play educational video"
                  >
                    <PlayCircle className="w-7 h-7 fill-purple-600 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-purple-700 mb-1">
                    {vid.titleNative}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {vid.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{vid.language}</span>
                  <button
                    onClick={() => setActiveMediaModal(vid.title)}
                    className="text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1"
                  >
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Community Posters & Leaflets */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Download className="w-5 h-5 text-purple-600" />
          <span>Printable Community Health Leaflets & Posters</span>
        </h2>
        <p className="text-xs text-slate-500">
          Handout materials formatted for standard monochrome or color village clinic printing:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {printableLeaflets.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="font-semibold text-purple-700">{item.format}</span>
                  <span>{item.pages}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Available in: {item.languages}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{item.downloads} printed</span>
                <button
                  onClick={() => alert(`Downloading ${item.title} (${item.languages})`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 transition"
                >
                  <Download className="w-3.5 h-3.5 text-purple-600" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Myths vs Clinical Evidence */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-600" />
          <span>Busting Rural Myths: Joint Health Facts vs Evidence</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mythsAndFacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                  <Icon className="w-4 h-4" />
                  <span>Common Misconception</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 italic">
                  {item.myth}
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <strong className="text-teal-800 block mb-1">Clinical Reality:</strong>
                  {item.fact}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Simulation */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-slate-900 text-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white truncate max-w-md">
                {activeMediaModal}
              </h3>
              <button 
                onClick={() => setActiveMediaModal(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>
            <div className="aspect-video bg-black rounded-xl flex flex-col items-center justify-center text-center p-6 border border-slate-800">
              <PlayCircle className="w-12 h-12 text-purple-400 mb-2 animate-pulse" />
              <p className="text-xs font-semibold text-slate-200">Playing Localized Educational Video Demonstration</p>
              <p className="text-[11px] text-slate-400 mt-1">Simulating audio playback in {selectedLanguage.toUpperCase()} dialect</p>
            </div>
            <div className="text-right">
              <button
                onClick={() => setActiveMediaModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
              >
                Finished Viewing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
