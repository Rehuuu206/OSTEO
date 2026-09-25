import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  disclaimerShort: string;
  disclaimerFull: string;
  nav: {
    dashboard: string;
    patients: string;
    assessments: string;
    movementLab: string;
    sensors: string;
    fusion: string;
    aiInsights: string;
    digitalTwin: string;
    exercises: string;
    awareness: string;
    reports: string;
    referrals: string;
    followups: string;
    analytics: string;
    presentationMode: string;
  };
  roles: {
    healthWorker: string;
    doctor: string;
    admin: string;
    patient: string;
  };
  actions: {
    startAssessment: string;
    registerPatient: string;
    exploreDemo: string;
    recordVideo: string;
    startTest: string;
    calibrate: string;
    analyzeMovement: string;
    connectSensor: string;
    viewSkeleton: string;
    simulateLoad: string;
    explainToPatient: string;
    generateReport: string;
    createReferral: string;
    saveOffline: string;
    syncNow: string;
  };
  risk: {
    low: string;
    moderate: string;
    high: string;
    preliminaryRisk: string;
    decisionSupportOnly: string;
  };
  digitalTwin: {
    title: string;
    subtitle: string;
    relativeLoad: string;
    weightSlider: string;
    assistiveDevice: string;
    stressHeatmap: string;
    cartilagePreservation: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: "OsteoSense NER",
    tagline: "AI-Assisted Multimodal Early Osteoarthritis Risk Screening & Biomechanical Assessment",
    disclaimerShort: "Preliminary screening only. Does not diagnose or replace a physician.",
    disclaimerFull: "OsteoSense NER is a clinical decision-support and risk-stratification prototype for community health workers. It does not provide medical diagnoses or replace physical clinical examinations.",
    nav: {
      dashboard: "Dashboard",
      patients: "Patients",
      assessments: "Assessments",
      movementLab: "Movement Lab",
      sensors: "Sensors Center",
      fusion: "Sensor-Video Fusion",
      aiInsights: "AI Insights",
      digitalTwin: "3D Digital Twin",
      exercises: "Daily Exercises",
      awareness: "Awareness Center",
      reports: "Clinical Reports",
      referrals: "Doctor Referrals",
      followups: "Follow-Up Care",
      analytics: "Screening Analytics",
      presentationMode: "Presentation Mode"
    },
    roles: {
      healthWorker: "Community Health Worker",
      doctor: "Consulting Orthopedist / Doctor",
      admin: "Regional Health Administrator",
      patient: "Patient Portal"
    },
    actions: {
      startAssessment: "Start New Assessment",
      registerPatient: "Register New Patient",
      exploreDemo: "Explore Live Demo",
      recordVideo: "Record Movement Video",
      startTest: "Begin Movement Test",
      calibrate: "Calibrate Camera",
      analyzeMovement: "Run AI Biomechanical Analysis",
      connectSensor: "Connect Wearable Sensor",
      viewSkeleton: "Inspect AI Skeleton",
      simulateLoad: "Run Joint Load Simulation",
      explainToPatient: "Explain to Patient",
      generateReport: "Generate Digital Report",
      createReferral: "Create Doctor Referral",
      saveOffline: "Save Offline",
      syncNow: "Synchronize Data"
    },
    risk: {
      low: "Low Screening Risk",
      moderate: "Moderate Screening Risk",
      high: "High Screening Risk",
      preliminaryRisk: "Preliminary OA Risk Stratification",
      decisionSupportOnly: "Decision-support indicator. Clinical consultation recommended."
    },
    digitalTwin: {
      title: "3D Knee Digital Twin",
      subtitle: "Patient-Specific Biomechanical Joint Load Simulator",
      relativeLoad: "Estimated Relative Joint Stress",
      weightSlider: "Simulate Weight Adjustment",
      assistiveDevice: "Walking Assistance Intervention",
      stressHeatmap: "Tibiofemoral Stress Heatmap",
      cartilagePreservation: "Simulated Joint Offloading Benefit"
    }
  },
  hi: {
    appName: "ऑस्टियोसेंस एनईआर (OsteoSense NER)",
    tagline: "एआई-सहायता प्राप्त प्रारंभिक ऑस्टियोआर्थराइटिस जोखिम जांच और बायोमैकेनिकल मूल्यांकन",
    disclaimerShort: "केवल प्रारंभिक जांच। यह डॉक्टर की जांच का स्थान नहीं लेता है।",
    disclaimerFull: "ऑस्टियोसेंस एनईआर स्वास्थ्य कार्यकर्ताओं के लिए एक प्रारंभिक जांच और निर्णय-सहायता प्रणाली है। यह कोई मेडिकल निदान नहीं करता है।",
    nav: {
      dashboard: "डैशबोर्ड",
      patients: "मरीज",
      assessments: "मूल्यांकन",
      movementLab: "मूवमेंट लैब",
      sensors: "सेंसर केंद्र",
      fusion: "सेंसर-वीडियो तुलना",
      aiInsights: "एआई अंतर्दृष्टि",
      digitalTwin: "3D डिजिटल ट्विन",
      exercises: "दैनिक व्यायाम",
      awareness: "जागरूकता केंद्र",
      reports: "डिजिटल रिपोर्ट",
      referrals: "डॉक्टर रेफरल",
      followups: "फॉलो-अप देखभाल",
      analytics: "स्क्रीनिंग विश्लेषण",
      presentationMode: "प्रस्तुति मोड"
    },
    roles: {
      healthWorker: "स्वास्थ्य कार्यकर्ता",
      doctor: "सलाहकार चिकित्सक",
      admin: "प्रशासक",
      patient: "मरीज पोर्टल"
    },
    actions: {
      startAssessment: "नई जांच शुरू करें",
      registerPatient: "नया मरीज पंजीकृत करें",
      exploreDemo: "डेमो देखें",
      recordVideo: "मूवमेंट वीडियो रिकॉर्ड करें",
      startTest: "परीक्षण शुरू करें",
      calibrate: "कैमरा कैलिब्रेट करें",
      analyzeMovement: "एआई बायोमैकेनिकल विश्लेषण",
      connectSensor: "सेंसर कनेक्ट करें",
      viewSkeleton: "एआई स्केलेटन देखें",
      simulateLoad: "संयुक्त भार सिमुलेशन",
      explainToPatient: "मरीज को समझाएं",
      generateReport: "डिजिटल रिपोर्ट बनाएं",
      createReferral: "डॉक्टर को रेफर करें",
      saveOffline: "ऑफलाइन सहेजें",
      syncNow: "डेटा सिंक करें"
    },
    risk: {
      low: "कम जोखिम",
      moderate: "मध्यम जोखिम",
      high: "उच्च जोखिम",
      preliminaryRisk: "प्रारंभिक ओए जोखिम वर्गीकरण",
      decisionSupportOnly: "केवल निर्णय सहायता। डॉक्टर से परामर्श लें।"
    },
    digitalTwin: {
      title: "3D घुटने का डिजिटल ट्विन",
      subtitle: "मरीज-विशिष्ट संयुक्त भार सिम्युलेटर",
      relativeLoad: "अनुमानित संयुक्त तनाव",
      weightSlider: "वजन समायोजन सिमुलेशन",
      assistiveDevice: "चलने में सहायता उपकरण",
      stressHeatmap: "तनाव हीटमैप",
      cartilagePreservation: "सिम्युलेटेड कार्टिलेज सुरक्षा"
    }
  },
  as: {
    appName: "অষ্টিঅ'চেন্স এন.ই.আৰ (OsteoSense NER)",
    tagline: "এআই-সহায়তাকৃত প্ৰাথমিক অষ্টিঅ'আৰ্থ্ৰাইটিছ আশংকা চিনাক্তকৰণ আৰু গতি বিশ্লেষণ",
    disclaimerShort: "কেৱল প্ৰাথমিক পৰীক্ষণ। ই চিকিৎসকৰ বিকল্প নহয়।",
    disclaimerFull: "অষ্টিঅ'চেন্স এন.ই.আৰ স্বাস্থ্য কৰ্মীসকলৰ বাবে এটা সিদ্ধান্ত-সহায়তা প্ৰণালী। ই কোনো চিকিৎসা নিদান নিদিয়ে।",
    nav: {
      dashboard: "ডেশ্বব'ৰ্ড",
      patients: "ৰোগীসকল",
      assessments: "পৰীক্ষণ",
      movementLab: "গতিশীলতা পৰীক্ষাগাৰ",
      sensors: "চেন্সৰ কেন্দ্ৰ",
      fusion: "চেন্সৰ-ভিডিঅ' তুলনা",
      aiInsights: "এআই তথ্য",
      digitalTwin: "৩ডি ডিজিটেল টুইন",
      exercises: "দৈনিক ব্যায়াম",
      awareness: "সচেতনতা কেন্দ্ৰ",
      reports: "চিকিৎসা প্ৰতিবেদন",
      referrals: "ডাক্তৰৰ পৰামৰ্শ",
      followups: "অনুসৰণমূলক যত্ন",
      analytics: "পৰিসংখ্যা",
      presentationMode: "প্ৰদৰ্শন মোড"
    },
    roles: {
      healthWorker: "স্বাস্থ্য কৰ্মী",
      doctor: "চিকিৎসক",
      admin: "প্ৰশাসক",
      patient: "ৰোগীৰ ব্যৱস্থা"
    },
    actions: {
      startAssessment: "নতুন পৰীক্ষা আৰম্ভ কৰক",
      registerPatient: "নতুন ৰোগী পঞ্জীয়ন",
      exploreDemo: "ডেমো চাওক",
      recordVideo: "ভিডিঅ' ৰেকৰ্ড কৰক",
      startTest: "পৰীক্ষা আৰম্ভ কৰক",
      calibrate: "কেমেৰা মিলাওক",
      analyzeMovement: "এআই গতি বিশ্লেষণ",
      connectSensor: "চেন্সৰ সংযোগ কৰক",
      viewSkeleton: "কংকাল চাওক",
      simulateLoad: "গাঁথিৰ চাপ অনুকৰণ",
      explainToPatient: "ৰোগীক বুজাই দিয়ক",
      generateReport: "প্ৰতিবেদন প্ৰস্তুত কৰক",
      createReferral: "ডাক্তৰলৈ প্ৰেৰণ কৰক",
      saveOffline: "অফলাইনত ৰাখক",
      syncNow: "তথ্য সংমিশ্ৰণ"
    },
    risk: {
      low: "কম আশংকা",
      moderate: "মধ্যম আশংকা",
      high: "উচ্চ আশংকা",
      preliminaryRisk: "প্ৰাথমিক বিপদৰ মাত্ৰা",
      decisionSupportOnly: "কেৱল সহায়ক সূচনা। ডাক্তৰৰ পৰামৰ্শ লওক।"
    },
    digitalTwin: {
      title: "৩ডি আঁঠুৰ ডিজিটেল টুইন",
      subtitle: "ৰোগীভিত্তিক গাঁথিৰ চাপ অনুকৰণ",
      relativeLoad: "আনুমানিক গাঁথিৰ চাপ",
      weightSlider: "ওজন পৰিবৰ্তনৰ প্ৰভাৱ",
      assistiveDevice: "লাঠি বা সহায়ক ব্যৱস্থা",
      stressHeatmap: "চাপৰ হিটমেপ",
      cartilagePreservation: "কাৰ্টিলেজ সুৰক্ষাৰ সুযোগ"
    }
  },
  bn: {
    appName: "অস্টিওসেন্স এনইআর (OsteoSense NER)",
    tagline: "এআই-সহায়তাপ্রাপ্ত প্রাথমিক অস্টিওআর্থারাইটিস ঝুঁকি স্ক্রিনিং ও বায়োমেকানিকাল মূল্যায়ন",
    disclaimerShort: "শুধুমাত্র প্রাথমিক স্ক্রিনিং। চিকিৎসকের বিকল্প নয়।",
    disclaimerFull: "অস্টিওসেন্স এনইআর প্রাথমিক স্বাস্থ্যকর্মীদের জন্য একটি সিদ্ধান্ত-সহায়তা প্ল্যাটফর্ম। এটি কোনো রোগ নির্ণয় করে না।",
    nav: {
      dashboard: "ড্যাশবোর্ড",
      patients: "রোগী তালিকা",
      assessments: "মূল্যায়ন",
      movementLab: "মুভমেন্ট ল্যাব",
      sensors: "সেন্সর কেন্দ্র",
      fusion: "সেন্সর-ভিডিও তুলনা",
      aiInsights: "এআই বিশ্লেষণ",
      digitalTwin: "থ্রিডি ডিজিটাল টুইন",
      exercises: "নিয়মিত ব্যায়াম",
      awareness: "সচেতনতা কেন্দ্র",
      reports: "মেডিকেল রিপোর্ট",
      referrals: "ডাক্তার রেফারাল",
      followups: "ফলো-আপ সেবা",
      analytics: "স্ক্রিনিং পরিসংখ্যান",
      presentationMode: "প্রেজেন্টেশন মোড"
    },
    roles: {
      healthWorker: "স্বাস্থ্যকর্মী",
      doctor: "পরামর্শদাতা চিকিৎসক",
      admin: "প্রশাসক",
      patient: "রোগী পোর্টাল"
    },
    actions: {
      startAssessment: "নতুন স্ক্রিনিং শুরু",
      registerPatient: "নতুন রোগী নথিভুক্তকরণ",
      exploreDemo: "লাইভ ডেমো দেখুন",
      recordVideo: "ভিডিও রেকর্ড করুন",
      startTest: "টেস্ট শুরু করুন",
      calibrate: "ক্যালিব্রেট করুন",
      analyzeMovement: "মুভমেন্ট বিশ্লেষণ চালান",
      connectSensor: "সেন্সর সংযোগ করুন",
      viewSkeleton: "এআই কঙ্কাল দেখুন",
      simulateLoad: "জয়েন্ট লোড সিমুলেশন",
      explainToPatient: "রোগীকে সহজভাবে বোঝান",
      generateReport: "রিপোর্ট তৈরি করুন",
      createReferral: "রেফারাল তৈরি করুন",
      saveOffline: "অফলাইনে সংরক্ষণ",
      syncNow: "ডাটা সিঙ্ক করুন"
    },
    risk: {
      low: "কম ঝুঁকি",
      moderate: "মাঝারি ঝুঁকি",
      high: "উচ্চ ঝুঁকি",
      preliminaryRisk: "প্রাথমিক ওএ ঝুঁকি স্তর",
      decisionSupportOnly: "সিদ্ধান্ত সহায়তা সূচক। ডাক্তারের পরামর্শ নিন।"
    },
    digitalTwin: {
      title: "থ্রিডি হাঁটুর ডিজিটাল টুইন",
      subtitle: "বায়োমেকানিকাল জয়েন্ট লোড সিমুলেটর",
      relativeLoad: "আনুমানিক জয়েন্ট চাপ",
      weightSlider: "ওজন পরিবর্তনের প্রভাব",
      assistiveDevice: "হাঁটার সহায়ক লাঠি",
      stressHeatmap: "স্ট্রেস হিটম্যাপ",
      cartilagePreservation: "কার্টিলেজ সুরক্ষার সম্ভাবনা"
    }
  },
  mni: {
    appName: "ওষ্টিওসেন্স এন.ই.আৰ (OsteoSense NER)",
    tagline: "এআই-তেংবাংদগী অহানবা ওষ্টিওআৰ্থ্ৰাইটিছ কিশীং অমসুং খোংচৎ চাংয়েং",
    disclaimerShort: "অহানবা চাংয়েংনি। দোক্তরগী মহুত শীঞ্জবা নত্তে।",
    disclaimerFull: "ওষ্টিওসেন্স এন.ই.আৰ অসি হকশেলগী শিন্মীশিংগী তেংবাং পাম্বৈনি। মসি লায়না লেপপগী খুৎশু নত্তে।",
    nav: {
      dashboard: "দ্যাশবোর্ড",
      patients: "অনাবশিং",
      assessments: "চাংয়েংশিং",
      movementLab: "খোংচৎ লেব",
      sensors: "সেন্সর পাম্বৈ",
      fusion: "সেন্সর-ভিডিও চাংয়েং",
      aiInsights: "এআই ৱাফম",
      digitalTwin: "৩ডি মমি (টুইন)",
      exercises: "নুমিৎখুদিংগী এক্সরসাইজ",
      awareness: "ৱাখল তাহনবগী কেন্দ্র",
      reports: "রিপোর্ট",
      referrals: "দোক্তরদা তাকপা",
      followups: "কনখৎপা য়েংশিনবা",
      analytics: "লেংশিং পাউদম",
      presentationMode: "উৎপগী মোদ"
    },
    roles: {
      healthWorker: "হকশেলগী শিন্মী",
      doctor: "দোক্তর",
      admin: "মকোক লুচীংবা",
      patient: "অনাবগী পোৰ্টেল"
    },
    actions: {
      startAssessment: "অনৌবা চাংয়েং হৌবা",
      registerPatient: "অনৌবা অনাবা ইশিনবা",
      exploreDemo: "উৎপা য়েংবা",
      recordVideo: "ভিডিও রেকোর্দিং",
      startTest: "চাংয়েং হৌবা",
      calibrate: "কেমেরা শেম্বা",
      analyzeMovement: "খোংচৎ চাংয়েংবা",
      connectSensor: "সেন্সর শমজিনবা",
      viewSkeleton: "শরুগী মমি য়েংবা",
      simulateLoad: "খুক্কী ৱাখলদা য়েংবা",
      explainToPatient: "অনাবদা তাকপীবা",
      generateReport: "রিপোর্ট শেম্বা",
      createReferral: "দোক্তরদা হন্না থাবা",
      saveOffline: "অফলাইনদা থম্বা",
      syncNow: "পাউ শমজিনবা"
    },
    risk: {
      low: "অহিংবা নেমবা",
      moderate: "ময়াং চাবা",
      high: "অহিংবা ৱাংবা",
      preliminaryRisk: "অহানবা কিশীং চাং",
      decisionSupportOnly: "তেংবাং পাম্বৈনি। দোক্তরগা তান্নবীয়ু।"
    },
    digitalTwin: {
      title: "৩ডি খুক্কী ডিজিটাল টুইন",
      subtitle: "অনাবগী খুক্কী চাপ চাংয়েং",
      relativeLoad: "খুক্কী চাপকী চাং",
      weightSlider: "লুম্বা হোংদোকপদা য়েংবা",
      assistiveDevice: "খোং চৎপগী চেক",
      stressHeatmap: "চাপকী মমি",
      cartilagePreservation: "শরু ফনা থম্বগী পাম্বৈ"
    }
  }
};
