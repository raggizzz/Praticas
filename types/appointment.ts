export interface Appointment {
  id: string;
  practiceId: string;
  practiceName: string;
  patientId: string;
  patientName: string;
  patientImageUrl?: string;
  practitionerId: string;
  practitionerName: string;
  practitionerImageUrl: string;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string;
}