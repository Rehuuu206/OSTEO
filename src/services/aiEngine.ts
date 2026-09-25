import { ClinicalSymptoms, BiomechanicalFeatures, AIRiskAssessment, RiskLevel, ExplainableFeature, DigitalTwinSimulation } from '../types';

export class AIEngine {
  public static readonly MODEL_VERSION = 'OsteoSense-Multimodal v1.2-alpha-prototype';
  public static readonly FEATURE_VERSION = 'CV-PoseBio-v2.0';

  public static evaluateMultimodalRisk(
    patientAge: number,
    bmi: number,
    symptoms: ClinicalSymptoms,
    biomechanics: BiomechanicalFeatures,
    sensorKneeAngle?: number
  ): AIRiskAssessment {
    // 1. Calculate Clinical Score (0 to 100)
    let clinicalPoints = 0;
    // Pain score (0-10) -> max 25 points
    clinicalPoints += (symptoms.painScoreVas / 10) * 25;
    // Morning stiffness -> max 15 points
    if (symptoms.morningStiffnessMinutes >= 30) clinicalPoints += 15;
    else if (symptoms.morningStiffnessMinutes > 15) clinicalPoints += 10;
    else if (symptoms.morningStiffnessMinutes > 0) clinicalPoints += 5;
    // Difficulty walking/stairs -> max 20 points
    if (symptoms.hasDifficultyStairs) clinicalPoints += 10;
    if (symptoms.hasDifficultyWalking) clinicalPoints += 10;
    // Age factor (>50 years) -> max 12 points
    if (patientAge >= 65) clinicalPoints += 12;
    else if (patientAge >= 50) clinicalPoints += 8;
    else if (patientAge >= 40) clinicalPoints += 4;
    // BMI factor (>25) -> max 12 points
    if (bmi >= 30) clinicalPoints += 12;
    else if (bmi >= 25) clinicalPoints += 8;
    // Joint trauma & family history -> max 16 points
    if (symptoms.priorJointInjury) clinicalPoints += 6;
    if (symptoms.priorJointSurgery) clinicalPoints += 5;
    if (symptoms.familyHistoryOA) clinicalPoints += 5;

    const clinicalRiskScore = Math.min(100, Math.round(clinicalPoints));

    // 2. Calculate Movement Biomechanical Score (0 to 100)
    let movementPoints = 0;
    // Knee Flexion Range: Reference active flexion > 110 deg
    if (biomechanics.maxKneeFlexionDeg < 80) movementPoints += 30;
    else if (biomechanics.maxKneeFlexionDeg < 95) movementPoints += 20;
    else if (biomechanics.maxKneeFlexionDeg < 110) movementPoints += 10;
    // Gait Symmetry: Reference 95-100%
    if (biomechanics.gaitSymmetryPercent < 82) movementPoints += 28;
    else if (biomechanics.gaitSymmetryPercent < 90) movementPoints += 18;
    else if (biomechanics.gaitSymmetryPercent < 95) movementPoints += 8;
    // Cadence & Walking Speed
    if (biomechanics.cadenceStepsPerMin > 0 && biomechanics.cadenceStepsPerMin < 90) movementPoints += 15;
    if (biomechanics.estimatedWalkingSpeedMps > 0 && biomechanics.estimatedWalkingSpeedMps < 0.9) movementPoints += 12;
    // Smoothness / Sway
    if (biomechanics.lateralSwayCm > 5.5) movementPoints += 15;

    const movementRiskScore = Math.min(100, Math.round(movementPoints));

    // 3. Fusion Layer (Weighted combined index: 45% clinical, 45% biomechanical, 10% sensor concordance)
    let compositeScore = Math.round(clinicalRiskScore * 0.48 + movementRiskScore * 0.52);

    let overallRisk: RiskLevel = 'LOW';
    if (compositeScore >= 65) {
      overallRisk = 'HIGH';
    } else if (compositeScore >= 40) {
      overallRisk = 'MODERATE';
    } else {
      overallRisk = 'LOW';
    }

    // 4. Generate Transparent Explainability Features
    const contributingFeatures: ExplainableFeature[] = [];

    if (biomechanics.gaitSymmetryPercent < 92) {
      contributingFeatures.push({
        name: 'Gait Asymmetry',
        category: 'Biomechanical',
        valueDisplay: `${biomechanics.gaitSymmetryPercent.toFixed(1)}% (${(100 - biomechanics.gaitSymmetryPercent).toFixed(1)}% defect)`,
        contributionPercent: 26,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Indicates antalgic offloading and uneven tibiofemoral weight distribution.'
      });
    }

    if (biomechanics.maxKneeFlexionDeg < 105) {
      contributingFeatures.push({
        name: 'Knee Flexion Range',
        category: 'Biomechanical',
        valueDisplay: `${biomechanics.maxKneeFlexionDeg.toFixed(1)}° (Restricted)`,
        contributionPercent: 22,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Active flexion is restricted compared to standard normative reference (>110°).'
      });
    }

    if (symptoms.painScoreVas >= 4) {
      contributingFeatures.push({
        name: 'Pain Severity Score (VAS)',
        category: 'Clinical',
        valueDisplay: `${symptoms.painScoreVas} / 10`,
        contributionPercent: 18,
        impactDirection: 'Increases Risk',
        clinicalContext: `Patient reports moderate-to-severe joint discomfort located in ${symptoms.painLocation.join(', ')}.`
      });
    }

    if (bmi >= 25) {
      contributingFeatures.push({
        name: 'Body Mass Index (BMI)',
        category: 'Demographic',
        valueDisplay: `${bmi.toFixed(1)} kg/m²`,
        contributionPercent: 14,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Elevates tibiofemoral ground-reaction moment by ~3.5x to 4x per kilogram of mass.'
      });
    }

    if (symptoms.morningStiffnessMinutes > 15) {
      contributingFeatures.push({
        name: 'Morning Stiffness Duration',
        category: 'Clinical',
        valueDisplay: `${symptoms.morningStiffnessMinutes} minutes`,
        contributionPercent: 12,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Reflective of degenerative synovial capsule stiffness and early inflammatory response.'
      });
    }

    if (symptoms.priorJointInjury) {
      contributingFeatures.push({
        name: 'Prior Joint Injury / Trauma',
        category: 'Clinical',
        valueDisplay: 'Reported',
        contributionPercent: 8,
        impactDirection: 'Increases Risk',
        clinicalContext: 'Post-traumatic osteoarthritis risk factor secondary to mechanical insult.'
      });
    }

    // 5. Clinical Summary & Indicators
    const keyIndicators: string[] = [];
    if (symptoms.painScoreVas >= 5) keyIndicators.push(`Elevated joint pain VAS ${symptoms.painScoreVas}/10 with mobility impairment`);
    if (biomechanics.maxKneeFlexionDeg < 95) keyIndicators.push(`Restricted knee range of motion (${biomechanics.maxKneeFlexionDeg.toFixed(1)}° active flexion)`);
    if (biomechanics.gaitSymmetryPercent < 90) keyIndicators.push(`Significant gait asymmetry (${biomechanics.gaitSymmetryPercent.toFixed(1)}%) suggesting limb unloading`);
    if (symptoms.morningStiffnessMinutes >= 30) keyIndicators.push(`Prolonged morning joint stiffness (${symptoms.morningStiffnessMinutes} min)`);
    if (bmi >= 27) keyIndicators.push(`Elevated BMI (${bmi.toFixed(1)} kg/m²) compounding mechanical joint torque`);

    const clinicalSummary = overallRisk === 'HIGH'
      ? `Preliminary multimodal screening stratified this patient into the HIGH risk category (Index ${compositeScore}/100). Movement analysis identified marked asymmetry (${biomechanics.gaitSymmetryPercent.toFixed(1)}%) and restricted active knee flexion, which corroborate reported pain severity and functional limitations. Recommend prompt orthopedic evaluation.`
      : overallRisk === 'MODERATE'
      ? `Preliminary screening indicates MODERATE risk (Index ${compositeScore}/100). Moderate pain symptoms or mild movement asymmetries are present. Preventive exercise therapy and weight monitoring are advised, with follow-up re-screening in 60-90 days.`
      : `Preliminary screening indicates LOW risk (Index ${compositeScore}/100). Joint mobility and gait symmetry are within anticipated parameters. Reinforce healthy physical activity and ergonomic joint protection habits.`;

    return {
      overallRisk,
      riskIndexScore: compositeScore,
      clinicalRiskScore,
      movementRiskScore,
      fusionConfidence: Math.round(biomechanics.confidence * 100),
      modelVersion: this.MODEL_VERSION,
      featureEngineVersion: this.FEATURE_VERSION,
      timestamp: new Date().toISOString(),
      isPrototype: true,
      contributingFeatures,
      clinicalSummary,
      keyIndicators
    };
  }

  public static simulateDigitalTwin(
    baselineWeightKg: number,
    simulatedWeightKg: number,
    assistanceDevice: 'None' | 'Cane / Stick' | 'Knee Brace' | 'Walker',
    baselineSymmetryPercent: number = 82
  ): DigitalTwinSimulation {
    // Biomechanical Joint Load Model (Simulation approximation)
    // Baseline load normalized to 100 based on weight and asymmetry
    const weightFactor = baselineWeightKg / 70; // 70 kg normalized
    const asymmetryLoadMultiplier = 1 + Math.max(0, (95 - baselineSymmetryPercent) / 100);
    const baselineRelativeLoad = Math.min(100, Math.round(75 * weightFactor * (asymmetryLoadMultiplier * 0.8)));

    // Weight reduction offload (4x multiplier: ~3-4% joint load drop per kg reduction)
    const weightDeltaKg = Math.max(0, baselineWeightKg - simulatedWeightKg);
    const weightOffloadPercent = Math.min(35, (weightDeltaKg / baselineWeightKg) * 100 * 2.8);

    // Assistive device offload
    let deviceOffloadPercent = 0;
    if (assistanceDevice === 'Cane / Stick') deviceOffloadPercent = 22; // transfers up to 20-25% body weight
    else if (assistanceDevice === 'Knee Brace') deviceOffloadPercent = 14; // improves alignment & unloads compartment
    else if (assistanceDevice === 'Walker') deviceOffloadPercent = 38;

    // Simulated symmetry improvement
    const simulatedSymmetry = assistanceDevice !== 'None' 
      ? Math.min(96, baselineSymmetryPercent + 12) 
      : baselineSymmetryPercent;

    const totalReduction = Math.min(65, Math.round(weightOffloadPercent + deviceOffloadPercent));
    const simulatedRelativeLoad = Math.max(20, Math.round(baselineRelativeLoad * (1 - totalReduction / 100)));

    // Compartment stress indices (medial compartment typically carries 60-70% of compressive load)
    const medialCompartmentStressIndex = Math.min(100, Math.round(simulatedRelativeLoad * 1.15));
    const lateralCompartmentStressIndex = Math.min(100, Math.round(simulatedRelativeLoad * 0.72));
    const patellofemoralStressIndex = Math.min(100, Math.round(simulatedRelativeLoad * 0.88));

    const explanationText = weightDeltaKg > 0 || assistanceDevice !== 'None'
      ? `Simulated adjustment (${weightDeltaKg > 0 ? `${weightDeltaKg} kg weight reduction` : ''}${weightDeltaKg > 0 && assistanceDevice !== 'None' ? ' + ' : ''}${assistanceDevice !== 'None' ? assistanceDevice : ''}) results in an estimated ${totalReduction}% decrease in peak tibiofemoral joint stress.`
      : 'Baseline simulation parameters reflect current clinical weight and unassisted walking dynamics.';

    return {
      baselineWeightKg,
      simulatedWeightKg,
      assistanceDevice,
      simulatedSymmetryPercent: simulatedSymmetry,
      baselineRelativeLoad,
      simulatedRelativeLoad,
      loadReductionPercent: totalReduction,
      medialCompartmentStressIndex,
      lateralCompartmentStressIndex,
      patellofemoralStressIndex,
      explanationText
    };
  }
}
