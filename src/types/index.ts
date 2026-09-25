export type UserRole = 'health_worker' | 'doctor' | 'admin' | 'patient';

export type LanguageCode = 'en' | 'hi' | 'as' | 'bn' | 'mni';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export type TestType = 'walking' | 'sit_to_stand' | 'knee_flexion' | 'balance';

export type CameraAngle = 'front' | 'side' | 'combined';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  facility: string;
  designation: string;
  email: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  customId: string; // e.g. "OST-2026-042"
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  phone: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bmiCategory: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  occupation: string;
  village: string;
  district: string;
  state: string;
  registeredAt: string;
  lastScreeningDate?: string;
  overallRisk?: RiskLevel;
}

export interface ClinicalSymptoms {
  painScoreVas: number; // 0 to 10
  painLocation: ('Left Knee' | 'Right Knee' | 'Bilateral' | 'Hip' | 'Ankle')[];
  morningStiffnessMinutes: number;
  hasDifficultyWalking: boolean;
  hasDifficultyStairs: boolean;
  mobilityLimitationLevel: 'None' | 'Mild' | 'Moderate' | 'Severe';
  priorFracture: boolean;
  priorJointSurgery: boolean;
  priorJointInjury: boolean;
  activeJointDisease: boolean;
  familyHistoryOA: boolean;
  familyOnsetAge?: number;
  physicalActivityLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Vigorous';
  frequentSquattingOrKneeling: boolean;
  sleepDisruptionDueToPain: boolean;
}

export interface PoseLandmark {
  name: string;
  x: number;
  y: number;
  z?: number;
  visibility: number;
}

export interface BiomechanicalFeatures {
  source: 'Estimated from video';
  confidence: number;
  confidenceScore?: number;
  dataQuality: 'POOR' | 'ACCEPTABLE' | 'GOOD' | 'EXCELLENT';
  maxKneeFlexionDeg: number;
  minKneeFlexionDeg: number;
  kneeRomDeg: number;
  hipFlexionDeg: number;
  ankleRomDeg: number;
  trunkInclinationDeg: number;
  gaitSymmetryPercent: number; // 100% = perfect symmetry
  cadenceStepsPerMin: number;
  estimatedWalkingSpeedMps: number;
  strideDurationSeconds: number;
  movementSmoothnessScore: number; // 0 to 100
  lateralSwayCm: number;
  sitToStandRepsCount?: number;
  sitToStandAvgDurationSec?: number;
  sitToStandConsistencyScore?: number;
}

export interface SensorReading {
  timestamp: number;
  kneeAngleDeg: number;
  accelX: number;
  accelY: number;
  accelZ: number;
  gyroX: number;
  gyroY: number;
  gyroZ: number;
  loadIndexEstimated: number; // 0 to 100
}

export interface SensorFusionComparison {
  sensorKneeAngleDeg: number;
  videoKneeAngleDeg: number;
  absoluteDifferenceDeg: number;
  percentageDifference: number;
  agreementLevel: 'High' | 'Moderate' | 'Review Required';
  fusionConfidenceScore: number; // 0 to 100
  combinedEstimateAngleDeg: number;
  disagreementFlag: boolean;
  recommendationNote: string;
}

export interface ExplainableFeature {
  name: string;
  category: 'Clinical' | 'Biomechanical' | 'Sensor' | 'Demographic';
  valueDisplay: string;
  contributionPercent: number; // e.g. 28%
  impactDirection: 'Increases Risk' | 'Neutral' | 'Decreases Risk';
  clinicalContext: string;
}

export interface AIRiskAssessment {
  overallRisk: RiskLevel;
  riskIndexScore: number; // 0 to 100
  compositeRiskScore?: number; // 0 to 100
  clinicalRiskScore: number; // 0 to 100
  movementRiskScore: number; // 0 to 100
  fusionConfidence: number; // 0 to 100
  modelVersion: string;
  featureEngineVersion: string;
  timestamp: string;
  isPrototype: boolean;
  contributingFeatures: ExplainableFeature[];
  topContributingFactors?: Array<{
    factor: string;
    weightPercent: number;
    clinicalRationale: string;
  }>;
  clinicalSummary: string;
  keyIndicators: string[];
}

export interface DigitalTwinSimulation {
  baselineWeightKg: number;
  simulatedWeightKg: number;
  assistanceDevice: 'None' | 'Cane / Stick' | 'Knee Brace' | 'Walker';
  simulatedSymmetryPercent: number;
  baselineRelativeLoad: number; // index 0-100
  simulatedRelativeLoad: number; // index 0-100
  loadReductionPercent: number;
  medialCompartmentStressIndex: number;
  lateralCompartmentStressIndex: number;
  patellofemoralStressIndex: number;
  explanationText: string;
  explanation?: string;
}

export interface MovementSession {
  id: string;
  patientId: string;
  testType: TestType;
  cameraAngle: CameraAngle;
  durationSeconds: number;
  fps: number;
  qualityScore: number; // 0 to 100
  videoUrl?: string;
  biomechanics: BiomechanicalFeatures;
  recordedAt: string;
}

export interface AssessmentRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  facility: string;
  healthWorkerName: string;
  createdAt: string;
  symptoms: ClinicalSymptoms;
  movementSessions: MovementSession[];
  sensorComparison?: SensorFusionComparison;
  aiAssessment: AIRiskAssessment;
  digitalTwin: DigitalTwinSimulation;
  preventiveGuidance: PreventiveGuidanceItem[];
  referral?: DoctorReferral;
  followUpSchedule?: FollowUpItem;
  syncStatus: 'SYNCED' | 'PENDING_SYNC' | 'LOCAL_ONLY';
}

export interface PreventiveGuidanceItem {
  id: string;
  category: 'Joint Care' | 'Physical Activity' | 'Weight Management' | 'Daily Habits' | 'Safety';
  title: string;
  description: string;
  safetyNote: string;
  iconName: string;
  relevantExerciseId?: string;
}

export interface ExerciseVideo {
  id: string;
  title: string;
  category: 'Mobility' | 'Strength' | 'Warm-up' | 'Low-impact' | 'Daily Movement';
  durationMinutes: number;
  difficulty: 'Gentle / Easy' | 'Moderate' | 'Advanced';
  targetArea: string;
  thumbnailUrl: string;
  videoUrl: string;
  instructions: string[];
  safetyNotes: string;
  suitableForRisk: RiskLevel[];
}

export interface AwarenessVideo {
  id: string;
  title: string;
  topic: string;
  durationMinutes: number;
  description: string;
  thumbnailUrl: string;
  keyTakeaways: string[];
}

export interface DoctorReferral {
  id: string;
  patientId: string;
  patientName: string;
  patientAge?: number;
  assessmentId: string;
  referringWorker?: string;
  referredByHealthWorker?: string;
  referredToDoctor?: string;
  targetFacilityOrDoctor?: string;
  referredFacility?: string;
  priority?: 'Routine' | 'Priority' | 'Urgent';
  urgency?: 'ROUTINE' | 'PRIORITY' | 'IMMEDIATE';
  reasonForReferral: string;
  clinicalSummary?: string;
  clinicalSummaryNotes?: string;
  status: 'PENDING_REVIEW' | 'ACCEPTED' | 'EVALUATED' | 'COMPLETED' | 'CANCELLED';
  referredAt?: string;
  createdAt?: string;
  doctorNotes?: string;
  prescribedPlan?: string[];
  recommendedEvaluation?: string;
}

export type ReferralRecord = DoctorReferral;

export interface FollowUpItem {
  id: string;
  patientId: string;
  patientName: string;
  assessmentId: string;
  dueDate: string;
  status: 'UPCOMING' | 'DUE' | 'COMPLETED' | 'MISSED';
  targetGoals: string[];
  notes: string;
  reminderSent: boolean;
}

export interface SyncQueueItem {
  id: string;
  entityType: 'patient' | 'assessment' | 'referral' | 'followup';
  entityId: string;
  action: 'CREATE' | 'UPDATE';
  payload: any;
  timestamp: number;
  retryCount: number;
  status: 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED';
}
