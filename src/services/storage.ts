import { Patient, AssessmentRecord, DoctorReferral, FollowUpItem, SyncQueueItem } from '../types';
import { DEMO_PATIENTS, DEMO_ASSESSMENT_RECORD } from './demoData';

const STORAGE_KEYS = {
  PATIENTS: 'osteosense_patients_v1',
  ASSESSMENTS: 'osteosense_assessments_v1',
  REFERRALS: 'osteosense_referrals_v1',
  FOLLOWUPS: 'osteosense_followups_v1',
  SYNC_QUEUE: 'osteosense_sync_queue_v1',
  SIMULATED_OFFLINE: 'osteosense_sim_offline_v1'
};

export class StorageService {
  public static getPatients(): Patient[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      if (!data) {
        this.savePatients(DEMO_PATIENTS);
        return DEMO_PATIENTS;
      }
      return JSON.parse(data);
    } catch {
      return DEMO_PATIENTS;
    }
  }

  public static savePatients(patients: Patient[]): void {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  }

  public static addPatient(patient: Patient): void {
    const patients = this.getPatients();
    const existingIndex = patients.findIndex(p => p.id === patient.id);
    if (existingIndex >= 0) {
      patients[existingIndex] = patient;
    } else {
      patients.unshift(patient);
    }
    this.savePatients(patients);
    this.enqueueSync({
      id: 'sync-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      entityType: 'patient',
      entityId: patient.id,
      action: 'CREATE',
      payload: patient,
      timestamp: Date.now(),
      retryCount: 0,
      status: 'PENDING'
    });
  }

  public static getAssessments(): AssessmentRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      if (!data) {
        this.saveAssessments([DEMO_ASSESSMENT_RECORD]);
        return [DEMO_ASSESSMENT_RECORD];
      }
      return JSON.parse(data);
    } catch {
      return [DEMO_ASSESSMENT_RECORD];
    }
  }

  public static saveAssessments(assessments: AssessmentRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
  }

  public static addAssessment(assessment: AssessmentRecord): void {
    const list = this.getAssessments();
    const existingIndex = list.findIndex(a => a.id === assessment.id);
    if (existingIndex >= 0) {
      list[existingIndex] = assessment;
    } else {
      list.unshift(assessment);
    }
    this.saveAssessments(list);

    // Update patient's overall risk and last screening date
    const patients = this.getPatients();
    const pat = patients.find(p => p.id === assessment.patientId);
    if (pat) {
      pat.overallRisk = assessment.aiAssessment.overallRisk;
      pat.lastScreeningDate = assessment.createdAt;
      this.savePatients(patients);
    }

    this.enqueueSync({
      id: 'sync-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      entityType: 'assessment',
      entityId: assessment.id,
      action: 'CREATE',
      payload: assessment,
      timestamp: Date.now(),
      retryCount: 0,
      status: 'PENDING'
    });
  }

  public static getReferrals(): DoctorReferral[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REFERRALS);
      if (!data) {
        const initial = DEMO_ASSESSMENT_RECORD.referral ? [DEMO_ASSESSMENT_RECORD.referral] : [];
        this.saveReferrals(initial);
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  public static saveReferrals(referrals: DoctorReferral[]): void {
    localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(referrals));
  }

  public static addReferral(referral: DoctorReferral): void {
    const list = this.getReferrals();
    const existing = list.findIndex(r => r.id === referral.id);
    if (existing >= 0) {
      list[existing] = referral;
    } else {
      list.unshift(referral);
    }
    this.saveReferrals(list);
    this.enqueueSync({
      id: 'sync-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      entityType: 'referral',
      entityId: referral.id,
      action: 'CREATE',
      payload: referral,
      timestamp: Date.now(),
      retryCount: 0,
      status: 'PENDING'
    });
  }

  public static updateReferral(referral: DoctorReferral): void {
    const list = this.getReferrals();
    const idx = list.findIndex(r => r.id === referral.id);
    if (idx >= 0) {
      list[idx] = referral;
      this.saveReferrals(list);
      this.enqueueSync({
        id: 'sync-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        entityType: 'referral',
        entityId: referral.id,
        action: 'UPDATE',
        payload: referral,
        timestamp: Date.now(),
        retryCount: 0,
        status: 'PENDING'
      });
    }
  }

  public static getFollowUps(): FollowUpItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FOLLOWUPS);
      if (!data) {
        const initial = DEMO_ASSESSMENT_RECORD.followUpSchedule ? [DEMO_ASSESSMENT_RECORD.followUpSchedule] : [];
        this.saveFollowUps(initial);
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  public static saveFollowUps(followUps: FollowUpItem[]): void {
    localStorage.setItem(STORAGE_KEYS.FOLLOWUPS, JSON.stringify(followUps));
  }

  public static addFollowUp(item: FollowUpItem): void {
    const list = this.getFollowUps();
    const idx = list.findIndex(f => f.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    this.saveFollowUps(list);
    this.enqueueSync({
      id: 'sync-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      entityType: 'followup',
      entityId: item.id,
      action: 'CREATE',
      payload: item,
      timestamp: Date.now(),
      retryCount: 0,
      status: 'PENDING'
    });
  }

  public static getSyncQueue(): SyncQueueItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static enqueueSync(item: SyncQueueItem): void {
    const queue = this.getSyncQueue();
    queue.push(item);
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
  }

  public static clearSyncQueue(): void {
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify([]));
  }

  public static getSimulatedOffline(): boolean {
    return localStorage.getItem(STORAGE_KEYS.SIMULATED_OFFLINE) === 'true';
  }

  public static setSimulatedOffline(val: boolean): void {
    localStorage.setItem(STORAGE_KEYS.SIMULATED_OFFLINE, val ? 'true' : 'false');
  }
}
