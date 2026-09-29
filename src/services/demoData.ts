import { Patient, AssessmentRecord, ExerciseVideo, AwarenessVideo, DoctorReferral, FollowUpItem } from '../types';
import seatedQuadImg from '../assets/images/seated_quadriceps_exercise_1790577099680.jpg';
import kneeHeelSlideImg from '../assets/images/knee_heel_slide_exercise_1790577116666.jpg';

export const DEMO_PATIENTS: Patient[] = [
  {
    id: 'pat-001',
    customId: 'OST-2026-042',
    name: 'Devi Saikia',
    age: 58,
    sex: 'Female',
    phone: '+91 94350 12890',
    heightCm: 165,
    weightKg: 78,
    bmi: 28.65,
    bmiCategory: 'Overweight',
    occupation: 'Tea Plantation Agricultural Worker',
    village: 'Chabua',
    district: 'Dibrugarh',
    state: 'Assam',
    registeredAt: '2026-08-14T09:30:00.000Z',
    lastScreeningDate: '2026-09-20T10:15:00.000Z',
    overallRisk: 'HIGH'
  },
  {
    id: 'pat-002',
    customId: 'OST-2026-043',
    name: 'Rajeshwar Sharma',
    age: 52,
    sex: 'Male',
    phone: '+91 98640 45123',
    heightCm: 172,
    weightKg: 76,
    bmi: 25.69,
    bmiCategory: 'Overweight',
    occupation: 'Commercial Vehicle Driver & Farmer',
    village: 'Hajo',
    district: 'Kamrup Rural',
    state: 'Assam',
    registeredAt: '2026-08-18T11:00:00.000Z',
    lastScreeningDate: '2026-09-18T14:30:00.000Z',
    overallRisk: 'MODERATE'
  },
  {
    id: 'pat-003',
    customId: 'OST-2026-044',
    name: 'Thoibi Devi',
    age: 46,
    sex: 'Female',
    phone: '+91 96120 78901',
    heightCm: 156,
    weightKg: 55,
    bmi: 22.6,
    bmiCategory: 'Normal',
    occupation: 'Handloom Weaver',
    village: 'Nambol',
    district: 'Bishnupur',
    state: 'Manipur',
    registeredAt: '2026-09-02T10:00:00.000Z',
    lastScreeningDate: '2026-09-12T09:45:00.000Z',
    overallRisk: 'LOW'
  }
];

export const DEMO_EXERCISES: ExerciseVideo[] = [
  {
    id: 'ex-001',
    title: 'Seated Knee Extension & Quadriceps Activation',
    category: 'Strength',
    durationMinutes: 6,
    difficulty: 'Gentle / Easy',
    targetArea: 'Vastus Medialis & Quadriceps',
    thumbnailUrl: seatedQuadImg,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructions: [
      'Sit tall in a sturdy chair with feet flat on the floor.',
      'Slowly straighten your affected leg out in front of you until your knee is straight.',
      'Hold the contraction at the top for 3 to 5 seconds.',
      'Gently lower the foot back down. Perform 2 sets of 10 repetitions per leg.'
    ],
    safetyNotes: 'Do not lock or hyperextend the knee forcibly. Keep movements smooth and pain-free.',
    suitableForRisk: ['LOW', 'MODERATE', 'HIGH']
  },
  {
    id: 'ex-002',
    title: 'Straight Leg Raise for Knee Stability',
    category: 'Strength',
    durationMinutes: 8,
    difficulty: 'Gentle / Easy',
    targetArea: 'Hip Flexors & Anterior Thigh',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructions: [
      'Lie flat on your back on a firm mat or bed.',
      'Bend one knee placing foot flat on the bed, keep the other leg completely straight.',
      'Tighten thigh muscles on the straight leg and slowly raise it about 12 inches (30 cm).',
      'Hold for 3 seconds, then gently lower down. Repeat 10 times.'
    ],
    safetyNotes: 'Maintain a flat lower back; do not arch your lumbar spine.',
    suitableForRisk: ['LOW', 'MODERATE', 'HIGH']
  },
  {
    id: 'ex-003',
    title: 'Gentle Heel Slides for Knee Range of Motion',
    category: 'Mobility',
    durationMinutes: 5,
    difficulty: 'Gentle / Easy',
    targetArea: 'Knee Joint Flexion & Hamstrings',
    thumbnailUrl: kneeHeelSlideImg,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructions: [
      'Lie on your back or sit with legs outstretched.',
      'Slowly slide your heel toward your buttocks, bending your knee smoothly.',
      'Hold the gentle stretch for 5 seconds, then slowly slide the heel back out.',
      'Repeat 8-10 times for each leg.'
    ],
    safetyNotes: 'Stop if you feel sharp pain. Only bend as far as comfortable.',
    suitableForRisk: ['LOW', 'MODERATE', 'HIGH']
  },
  {
    id: 'ex-004',
    title: 'Calf & Achilles Standing Stretch',
    category: 'Warm-up',
    durationMinutes: 5,
    difficulty: 'Gentle / Easy',
    targetArea: 'Gastrocnemius & Ankle Dorsiflexion',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructions: [
      'Stand facing a wall with hands resting against it at shoulder height.',
      'Step one leg back, keeping the heel firmly planted on the floor and knee straight.',
      'Bend the front knee slightly until you feel a gentle stretch in the back calf.',
      'Hold for 20-30 seconds. Repeat 3 times per side.'
    ],
    safetyNotes: 'Keep both feet pointing straight ahead. Never bounce.',
    suitableForRisk: ['LOW', 'MODERATE']
  },
  {
    id: 'ex-005',
    title: 'Supported Mini-Squats (Chair Assisted)',
    category: 'Low-impact',
    durationMinutes: 7,
    difficulty: 'Moderate',
    targetArea: 'Gluteals, Quadriceps & Balance',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    instructions: [
      'Stand holding the back of a sturdy chair for balance.',
      'Place feet shoulder-width apart.',
      'Slowly bend knees as if starting to sit, going down no more than 30-40 degrees.',
      'Ensure knees stay aligned over feet and do not pass your toes.',
      'Return to standing. Perform 2 sets of 8 reps.'
    ],
    safetyNotes: 'Avoid deep squats beyond 45 degrees if you have knee stiffness or pain.',
    suitableForRisk: ['LOW', 'MODERATE']
  }
];

export const DEMO_AWARENESS_VIDEOS: AwarenessVideo[] = [
  {
    id: 'aw-001',
    title: 'What is Knee Osteoarthritis?',
    topic: 'Pathology & Joint Anatomy',
    durationMinutes: 4,
    description: 'Learn how protective articular cartilage gradually wears down over time, why joints become stiff, and how early interventions help preserve joint mobility.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    keyTakeaways: [
      'OA is a degenerative condition of joint cartilage, not a bone infection.',
      'Early detection allows behavioral and biomechanical interventions before severe cartilage loss.',
      'Movement is essential: joints need gentle motion to circulate synovial fluid nutrition.'
    ]
  },
  {
    id: 'aw-002',
    title: 'Why Early Community Screening Matters',
    topic: 'Prevention & Health Worker Role',
    durationMinutes: 3,
    description: 'Discover how rural and community health workers can identify biomechanical movement changes years before advanced joint damage occurs.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    keyTakeaways: [
      'Screening identifies early asymmetry and walking alterations.',
      'Timely referral prevents unnecessary progression to severe disability.',
      'Community empowerment enables sustainable preventive lifestyle guidance.'
    ]
  },
  {
    id: 'aw-003',
    title: 'Body Weight, Joint Load, and the 4x Multiplier Rule',
    topic: 'Biomechanical Joint Stress',
    durationMinutes: 5,
    description: 'Understanding the knee joint multiplier: every 1 kilogram of body weight exerts approximately 3 to 4 kilograms of force across the tibiofemoral joint during walking.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
    keyTakeaways: [
      'Losing 5 kg of body weight removes up to 20 kg of stress per step.',
      'Nutritional choices and safe non-impact activities protect cartilage.',
      'Assistive devices like canes further reduce peak joint moments.'
    ]
  },
  {
    id: 'aw-004',
    title: 'When to Seek Immediate Professional Evaluation',
    topic: 'Red Flags & Clinical Escalation',
    durationMinutes: 4,
    description: 'Critical clinical warning signs that indicate urgent orthopedist or medical evaluation beyond community screening.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&auto=format&fit=crop&q=80',
    keyTakeaways: [
      'Sudden joint swelling, warmth, severe redness, or fever (septic arthritis warning).',
      'Inability to bear any weight on the leg after acute injury.',
      'Joint locking or sensation of giving way leading to dangerous falls.'
    ]
  }
];

export const DEMO_ASSESSMENT_RECORD: AssessmentRecord = {
  id: 'rec-demo-001',
  patientId: 'pat-001',
  patientName: 'Devi Saikia',
  patientAge: 58,
  facility: 'Chabua Community Health Centre (CHC)',
  healthWorkerName: 'Priyanka Gogoi, ANM',
  createdAt: '2026-09-20T10:15:00.000Z',
  symptoms: {
    painScoreVas: 7,
    painLocation: ['Bilateral', 'Right Knee'],
    morningStiffnessMinutes: 35,
    hasDifficultyWalking: true,
    hasDifficultyStairs: true,
    mobilityLimitationLevel: 'Moderate',
    priorFracture: false,
    priorJointSurgery: false,
    priorJointInjury: true,
    activeJointDisease: false,
    familyHistoryOA: true,
    familyOnsetAge: 60,
    physicalActivityLevel: 'Moderate',
    frequentSquattingOrKneeling: true,
    sleepDisruptionDueToPain: true
  },
  movementSessions: [
    {
      id: 'sess-001',
      patientId: 'pat-001',
      testType: 'walking',
      cameraAngle: 'side',
      durationSeconds: 14,
      fps: 30,
      qualityScore: 92,
      biomechanics: {
        source: 'Estimated from video',
        confidence: 0.89,
        dataQuality: 'GOOD',
        maxKneeFlexionDeg: 79.2,
        minKneeFlexionDeg: 6.4,
        kneeRomDeg: 72.8,
        hipFlexionDeg: 28.5,
        ankleRomDeg: 18.2,
        trunkInclinationDeg: 12.4,
        gaitSymmetryPercent: 81.2,
        cadenceStepsPerMin: 88,
        estimatedWalkingSpeedMps: 0.82,
        strideDurationSeconds: 1.36,
        movementSmoothnessScore: 68,
        lateralSwayCm: 6.8
      },
      recordedAt: '2026-09-20T10:20:00.000Z'
    },
    {
      id: 'sess-002',
      patientId: 'pat-001',
      testType: 'sit_to_stand',
      cameraAngle: 'front',
      durationSeconds: 22,
      fps: 30,
      qualityScore: 88,
      biomechanics: {
        source: 'Estimated from video',
        confidence: 0.86,
        dataQuality: 'GOOD',
        maxKneeFlexionDeg: 88.0,
        minKneeFlexionDeg: 8.5,
        kneeRomDeg: 79.5,
        hipFlexionDeg: 72.0,
        ankleRomDeg: 16.0,
        trunkInclinationDeg: 24.5,
        gaitSymmetryPercent: 79.0,
        cadenceStepsPerMin: 0,
        estimatedWalkingSpeedMps: 0,
        strideDurationSeconds: 0,
        movementSmoothnessScore: 62,
        lateralSwayCm: 5.4,
        sitToStandRepsCount: 5,
        sitToStandAvgDurationSec: 3.8,
        sitToStandConsistencyScore: 65
      },
      recordedAt: '2026-09-20T10:25:00.000Z'
    }
  ],
  sensorComparison: {
    sensorKneeAngleDeg: 82.0,
    videoKneeAngleDeg: 79.2,
    absoluteDifferenceDeg: 2.8,
    percentageDifference: 3.4,
    agreementLevel: 'High',
    fusionConfidenceScore: 91,
    combinedEstimateAngleDeg: 80.6,
    disagreementFlag: false,
    recommendationNote: 'Sensor and video estimates demonstrate high concordant agreement (Δ < 4°). Sensor validates video pose estimation reliability.'
  },
  aiAssessment: {
    overallRisk: 'HIGH',
    riskIndexScore: 78,
    clinicalRiskScore: 74,
    movementRiskScore: 82,
    fusionConfidence: 89,
    modelVersion: 'OsteoSense-Multimodal v1.2-alpha-prototype',
    featureEngineVersion: 'CV-PoseBio-v2.0',
    timestamp: '2026-09-20T10:30:00.000Z',
    isPrototype: true,
    clinicalSummary: 'Multimodal risk screening indicates elevated risk indicators driven by prominent bilateral knee pain (VAS 7/10), morning stiffness >30 min, marked gait asymmetry (81.2%), reduced peak knee flexion (79.2° vs normal >110°), and elevated lateral sway during transition.',
    keyIndicators: [
      'Elevated pain severity (VAS 7/10) with stairs & walking impairment',
      'Restricted knee flexion range (79.2° video / 82° sensor vs >110° reference)',
      'Gait asymmetry of 81.2% showing significant antalgic weight-bearing avoidance on right knee',
      'Extended sit-to-stand repetition cycle (19.4s for 5 reps) with excessive trunk compensatory flexion',
      'BMI 28.65 kg/m² contributing approximately 3.8x baseline joint load'
    ],
    contributingFeatures: [
      {
        name: 'Gait Asymmetry',
        category: 'Biomechanical',
        valueDisplay: '81.2% (18.8% defect)',
        contributionPercent: 26,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Indicates protective antalgic limb offloading and uneven compartment loading.'
      },
      {
        name: 'Knee Flexion Range',
        category: 'Biomechanical',
        valueDisplay: '79.2° (Restricted)',
        contributionPercent: 22,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Below age-matched mobility reference (>110° typical active flexion).'
      },
      {
        name: 'Pain Severity Score (VAS)',
        category: 'Clinical',
        valueDisplay: '7 / 10 (Moderate to Severe)',
        contributionPercent: 18,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Bilateral pain disrupting sleep and stair ascent.'
      },
      {
        name: 'Body Mass Index (BMI)',
        category: 'Demographic',
        valueDisplay: '28.65 kg/m² (Overweight)',
        contributionPercent: 14,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Increases tibiofemoral mechanical ground-reaction torque.'
      },
      {
        name: 'Morning Stiffness Duration',
        category: 'Clinical',
        valueDisplay: '35 minutes',
        contributionPercent: 12,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Consistent with degenerative joint capsule and synovial congestion.'
      },
      {
        name: 'Occupational Kneeling',
        category: 'Clinical',
        valueDisplay: 'Frequent (Tea Picking)',
        contributionPercent: 8,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Repeated high-flexion deep load over decades.'
      }
    ]
  },
  digitalTwin: {
    baselineWeightKg: 78,
    simulatedWeightKg: 72,
    assistanceDevice: 'Cane / Stick',
    simulatedSymmetryPercent: 92,
    baselineRelativeLoad: 88,
    simulatedRelativeLoad: 56,
    loadReductionPercent: 36.4,
    medialCompartmentStressIndex: 84,
    lateralCompartmentStressIndex: 45,
    patellofemoralStressIndex: 68,
    explanationText: 'Simulated 6 kg weight reduction combined with contralateral cane assistance reduces peak medial compartment ground-reaction moment by an estimated 36.4%, substantially offloading vulnerable cartilage.'
  },
  preventiveGuidance: [
    {
      id: 'g-1',
      category: 'Joint Care',
      title: 'Contralateral Walking Support',
      description: 'Using a lightweight walking stick in the left hand (opposite to the more painful right knee) transfers up to 25% of body weight away from the damaged joint compartment.',
      safetyNote: 'Ensure cane handle height reaches the crease of the wrist when standing relaxed.',
      iconName: 'Shield',
      relevantExerciseId: 'ex-001'
    },
    {
      id: 'g-2',
      category: 'Weight Management',
      title: 'Targeted Joint Offloading via Weight Optimization',
      description: 'A modest weight loss of 5-6 kg relieves approximately 20-24 kg of cumulative compressive force on each knee step during daily walking.',
      safetyNote: 'Focus on balanced indigenous nutritious foods with high fiber and adequate hydration.',
      iconName: 'Scale',
      relevantExerciseId: 'ex-003'
    },
    {
      id: 'g-3',
      category: 'Physical Activity',
      title: 'Low-Impact Quadriceps Strengthening',
      description: 'Non-weight-bearing exercises like seated knee extensions and straight leg raises build muscular shock absorbers around the joint without cartilage grinding.',
      safetyNote: 'Never exercise through sharp, stabbing joint pain. Mild muscular fatigue is normal.',
      iconName: 'Activity',
      relevantExerciseId: 'ex-001'
    },
    {
      id: 'g-4',
      category: 'Daily Habits',
      title: 'Modify Deep Squatting and Floor Sitting',
      description: 'Use a low stool (pirha/chair) rather than full floor squats during daily tea processing and household activities to prevent peak patellofemoral shearing forces.',
      safetyNote: 'Avoid staying in one rigid posture for longer than 30 minutes without stretching.',
      iconName: 'Clock'
    }
  ],
  referral: {
    id: 'ref-001',
    patientId: 'pat-001',
    patientName: 'Devi Saikia',
    assessmentId: 'rec-demo-001',
    referredByHealthWorker: 'Priyanka Gogoi, ANM',
    targetFacilityOrDoctor: 'Dr. Bhaskar Barua, Consultant Orthopedic Surgeon, AMC Dibrugarh',
    priority: 'Priority',
    reasonForReferral: 'High preliminary screening risk with restricted flexion (79.2°), gait asymmetry (81.2%), morning stiffness >30 min, and sleep-disturbing bilateral pain.',
    clinicalSummary: '58-year-old agricultural worker with progressive knee pain (VAS 7/10). Sensor-video fusion confirms restricted flexion and 18.8% gait asymmetry. Digital twin indicates severe medial compartment stress. Recommended for formal clinical evaluation, weight-bearing bilateral knee radiography (Kellgren-Lawrence grading), and guided physiotherapy.',
    status: 'ACCEPTED',
    referredAt: '2026-09-20T11:00:00.000Z',
    doctorNotes: 'Referral accepted. Scheduled for clinical examination and standing AP/Lateral radiographs on Thursday 10:30 AM at Orthopedic OPD.',
    recommendedEvaluation: 'Standing AP/Lateral knee X-Ray, Serum Uric Acid, ESR, and physical joint line tenderness / crepitus assessment.'
  },
  followUpSchedule: {
    id: 'fol-001',
    patientId: 'pat-001',
    patientName: 'Devi Saikia',
    assessmentId: 'rec-demo-001',
    dueDate: '2026-10-20',
    status: 'UPCOMING',
    targetGoals: [
      'Adhere to daily seated quadriceps strengthening exercises',
      'Use walking stick for long walks to tea garden',
      'Attend hospital orthopedic radiographic evaluation',
      'Repeat movement assessment in 30 days to measure gait symmetry progression'
    ],
    notes: 'CHW Priyanka to visit household during weekly village health round to check exercise adherence and pain levels.',
    reminderSent: true
  },
  syncStatus: 'SYNCED'
};
