import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Scale, 
  Activity, 
  MapPin, 
  HeartPulse, 
  Users, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { StorageService } from '../../services/storage';
import { AIEngine } from '../../services/aiEngine';
import { CVEngine } from '../../services/cvEngine';
import { Patient, ClinicalSymptoms, AssessmentRecord } from '../../types';

interface PatientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientRegistrationModal: React.FC<PatientRegistrationModalProps> = ({ isOpen, onClose }) => {
  const { refreshPatients, refreshAssessments, setSelectedPatient, setActiveAssessment, setCurrentView } = useApp();
  const [step, setStep] = useState(1);

  // Form State
  const [patientId] = useState(`OST-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(54);
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [phone, setPhone] = useState('+91 ');
  
  // Anthropometrics
  const [heightCm, setHeightCm] = useState<number>(162);
  const [weightKg, setWeightKg] = useState<number>(72);
  
  // Location
  const [occupation, setOccupation] = useState('Tea Garden Agricultural Worker');
  const [village, setVillage] = useState('Chabua');
  const [district, setDistrict] = useState('Dibrugarh');
  const [state, setState] = useState('Assam');

  // Symptoms & Clinical History
  const [painVas, setPainVas] = useState<number>(6);
  const [painLocations, setPainLocations] = useState<string[]>(['Right Knee']);
  const [morningStiffness, setMorningStiffness] = useState<number>(25);
  const [difficultyWalking, setDifficultyWalking] = useState(true);
  const [difficultyStairs, setDifficultyStairs] = useState(true);
  const [mobilityLevel, setMobilityLevel] = useState<'None' | 'Mild' | 'Moderate' | 'Severe'>('Moderate');
  
  // Joint History
  const [priorFracture, setPriorFracture] = useState(false);
  const [priorJointSurgery, setPriorJointSurgery] = useState(false);
  const [priorJointInjury, setPriorJointInjury] = useState(true);
  const [activeJointDisease, setActiveJointDisease] = useState(false);
  
  // Family & Lifestyle
  const [familyHistoryOA, setFamilyHistoryOA] = useState(true);
  const [frequentSquatting, setFrequentSquatting] = useState(true);
  const [sleepDisruption, setSleepDisruption] = useState(true);

  if (!isOpen) return null;

  // Calculate BMI
  const heightMeters = heightCm / 100;
  const bmi = Math.round((weightKg / (heightMeters * heightMeters)) * 10) / 10;
  let bmiCategory: 'Underweight' | 'Normal' | 'Overweight' | 'Obese' = 'Normal';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 24.9) bmiCategory = 'Normal';
  else if (bmi < 29.9) bmiCategory = 'Overweight';
  else bmiCategory = 'Obese';

  const toggleLocation = (loc: string) => {
    if (painLocations.includes(loc)) {
      setPainLocations(painLocations.filter(l => l !== loc));
    } else {
      setPainLocations([...painLocations, loc]);
    }
  };

  const handleSaveAndStartAssessment = () => {
    const newPatient: Patient = {
      id: 'pat-' + Date.now(),
      customId: patientId,
      name: name.trim() || 'Beneficiary ' + patientId,
      age,
      sex,
      phone,
      heightCm,
      weightKg,
      bmi,
      bmiCategory,
      occupation,
      village,
      district,
      state,
      registeredAt: new Date().toISOString()
    };

    const symptoms: ClinicalSymptoms = {
      painScoreVas: painVas,
      painLocation: (painLocations.length > 0 ? painLocations : ['Right Knee']) as any,
      morningStiffnessMinutes: morningStiffness,
      hasDifficultyWalking: difficultyWalking,
      hasDifficultyStairs: difficultyStairs,
      mobilityLimitationLevel: mobilityLevel,
      priorFracture,
      priorJointSurgery,
      priorJointInjury,
      activeJointDisease,
      familyHistoryOA,
      physicalActivityLevel: 'Moderate',
      frequentSquattingOrKneeling: frequentSquatting,
      sleepDisruptionDueToPain: sleepDisruption
    };

    // Synthesize baseline movement & AI assessment
    const defaultBiomechanics = CVEngine.extractBiomechanicalFeatures('walking', 'HIGH_RISK');
    const aiAssessment = AIEngine.evaluateMultimodalRisk(age, bmi, symptoms, defaultBiomechanics, 82);
    const digitalTwin = AIEngine.simulateDigitalTwin(weightKg, Math.max(45, weightKg - 6), 'Cane / Stick', defaultBiomechanics.gaitSymmetryPercent);

    const assessmentRecord: AssessmentRecord = {
      id: 'rec-' + Date.now(),
      patientId: newPatient.id,
      patientName: newPatient.name,
      patientAge: newPatient.age,
      facility: 'Chabua Community Health Centre',
      healthWorkerName: 'Priyanka Gogoi, ANM',
      createdAt: new Date().toISOString(),
      symptoms,
      movementSessions: [
        {
          id: 'sess-' + Date.now(),
          patientId: newPatient.id,
          testType: 'walking',
          cameraAngle: 'side',
          durationSeconds: 12,
          fps: 30,
          qualityScore: 90,
          biomechanics: defaultBiomechanics,
          recordedAt: new Date().toISOString()
        }
      ],
      sensorComparison: {
        sensorKneeAngleDeg: 82.0,
        videoKneeAngleDeg: defaultBiomechanics.maxKneeFlexionDeg,
        absoluteDifferenceDeg: 2.8,
        percentageDifference: 3.5,
        agreementLevel: 'High',
        fusionConfidenceScore: 92,
        combinedEstimateAngleDeg: 80.6,
        disagreementFlag: false,
        recommendationNote: 'Sensor and video estimates demonstrate high concordant agreement.'
      },
      aiAssessment,
      digitalTwin,
      preventiveGuidance: [
        {
          id: 'g-1',
          category: 'Joint Care',
          title: 'Contralateral Walking Support',
          description: 'Using a lightweight walking stick in the opposite hand offloads peak knee compressive forces by up to 25%.',
          safetyNote: 'Ensure cane height is adjusted to wrist level.',
          iconName: 'Shield',
          relevantExerciseId: 'ex-001'
        },
        {
          id: 'g-2',
          category: 'Weight Management',
          title: 'Tibiofemoral Joint Offload',
          description: 'A modest 5 kg weight reduction relieves approximately 20 kg of stress per step.',
          safetyNote: 'Maintain adequate protein and hydration.',
          iconName: 'Scale',
          relevantExerciseId: 'ex-003'
        }
      ],
      syncStatus: 'PENDING_SYNC'
    };

    StorageService.addPatient(newPatient);
    StorageService.addAssessment(assessmentRecord);
    
    refreshPatients();
    refreshAssessments();
    setSelectedPatient(newPatient);
    setActiveAssessment(assessmentRecord);
    
    onClose();
    setCurrentView('movement');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Modal Header with Steps Indicator */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
              Step {step} of 4 • Patient Registration & Screening
            </div>
            <h2 className="text-base font-bold">
              {step === 1 && 'Patient Demographics'}
              {step === 2 && 'Anthropometrics & BMI Gauge'}
              {step === 3 && 'Location & Occupational History'}
              {step === 4 && 'Joint Symptoms & Clinical Profile'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5">
          <div 
            className="bg-sky-600 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: DEMOGRAPHICS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    System Patient ID
                  </label>
                  <input
                    type="text"
                    disabled
                    value={patientId}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 text-xs font-mono text-slate-600 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Minati Das"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={100}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Biological Sex
                  </label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BMI & ANTHROPOMETRICS */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Height (cm): <span className="font-bold text-sky-700">{heightCm} cm</span>
                  </label>
                  <input
                    type="range"
                    min={130}
                    max={205}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>130 cm</span>
                    <span>165 cm</span>
                    <span>205 cm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Weight (kg): <span className="font-bold text-sky-700">{weightKg} kg</span>
                  </label>
                  <input
                    type="range"
                    min={35}
                    max={140}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>35 kg</span>
                    <span>70 kg</span>
                    <span>140 kg</span>
                  </div>
                </div>
              </div>

              {/* BMI Visual Gauge Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Calculated Body Mass Index (BMI)
                </div>
                <div className="text-3xl font-extrabold font-mono text-slate-900">
                  {bmi} <span className="text-sm font-normal text-slate-500">kg/m²</span>
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold border bg-white shadow-xs">
                  Category: <span className={
                    bmiCategory === 'Obese' ? 'text-red-600' :
                    bmiCategory === 'Overweight' ? 'text-amber-600' :
                    bmiCategory === 'Normal' ? 'text-emerald-600' : 'text-blue-600'
                  }>{bmiCategory}</span>
                </div>

                {/* Spectrum bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex mt-2">
                  <div className="w-1/4 bg-blue-400" title="Underweight (<18.5)" />
                  <div className="w-1/4 bg-emerald-500" title="Normal (18.5 - 24.9)" />
                  <div className="w-1/4 bg-amber-400" title="Overweight (25.0 - 29.9)" />
                  <div className="w-1/4 bg-red-500" title="Obese (>=30.0)" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>&lt;18.5</span>
                  <span>18.5–24.9</span>
                  <span>25–29.9</span>
                  <span>≥30</span>
                </div>

                <p className="text-[11px] text-slate-500 italic mt-2">
                  Notice: BMI is evaluated as a mechanical load co-factor and does not constitute an OA diagnosis on its own.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: OCCUPATION & LOCATION */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Occupation / Daily Postural Demands
                </label>
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                >
                  <option value="Tea Garden Agricultural Worker">Tea Garden Agricultural Worker (Heavy kneeling/slopes)</option>
                  <option value="Paddy Farmer / Rice Cultivator">Paddy Farmer / Rice Cultivator (Deep squatting)</option>
                  <option value="Handloom Silk / Cotton Weaver">Handloom Silk / Cotton Weaver (Repetitive seated pedal flexion)</option>
                  <option value="Commercial Vehicle Driver">Commercial Vehicle Driver (Vibration & prolonged flexion)</option>
                  <option value="Homemaker / Domestic Caretaker">Homemaker / Domestic Caretaker (Floor cleaning/cooking)</option>
                  <option value="Shopkeeper / Desk Worker">Shopkeeper / Desk Worker (Sedentary)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Village / Locality
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  >
                    <option value="Assam">Assam</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Sikkim">Sikkim</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SYMPTOMS & CLINICAL HISTORY */}
          {step === 4 && (
            <div className="space-y-4">
              
              {/* Pain VAS 0-10 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Knee Pain Severity (VAS 0–10 Scale)
                  </label>
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                    painVas >= 7 ? 'bg-red-100 text-red-700' : painVas >= 4 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {painVas} / 10 ({painVas >= 7 ? 'Severe' : painVas >= 4 ? 'Moderate' : 'Mild'})
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={painVas}
                  onChange={(e) => setPainVas(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0 (No Pain)</span>
                  <span>5 (Moderate)</span>
                  <span>10 (Worst Pain)</span>
                </div>
              </div>

              {/* Pain Location Chips */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pain Location(s)
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Right Knee', 'Left Knee', 'Bilateral', 'Hip Joint', 'Ankle'].map((loc) => {
                    const isSelected = painLocations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleLocation(loc)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                          isSelected
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Morning Stiffness Minutes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Morning Joint Stiffness Duration: <span className="font-bold text-sky-700">{morningStiffness} minutes</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={5}
                  value={morningStiffness}
                  onChange={(e) => setMorningStiffness(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0 min</span>
                  <span>15 min</span>
                  <span>30 min (Clinical flag)</span>
                  <span>60+ min</span>
                </div>
              </div>

              {/* Quick Clinical Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={difficultyStairs}
                    onChange={(e) => setDifficultyStairs(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>Difficulty Climbing Stairs</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={difficultyWalking}
                    onChange={(e) => setDifficultyWalking(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>Difficulty Walking &gt;500m</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={priorJointInjury}
                    onChange={(e) => setPriorJointInjury(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>Prior Knee Trauma / Ligament Injury</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={familyHistoryOA}
                    onChange={(e) => setFamilyHistoryOA(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>Family History of Knee OA</span>
                </label>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md transition"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSaveAndStartAssessment}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition"
            >
              <Check className="w-4 h-4" />
              <span>Complete & Start Movement Lab</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
