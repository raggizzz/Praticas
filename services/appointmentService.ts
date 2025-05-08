import { Appointment } from '@/types/appointment';

// Mock appointments data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    practiceId: '1',
    practiceName: 'Acupuntura',
    patientId: '1',
    patientName: 'Carlos Silva',
    patientImageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    practitionerId: '3',
    practitionerName: 'Dr. Augusto Mendes',
    practitionerImageUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    dateTime: '2025-05-20T10:00:00Z',
    status: 'confirmed',
    notes: 'Primeira sessão de avaliação',
  },
  {
    id: '2',
    practiceId: '2',
    practiceName: 'Yoga',
    patientId: '1',
    patientName: 'Carlos Silva',
    patientImageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    practitionerId: '4',
    practitionerName: 'Dra. Julia Santos',
    practitionerImageUrl: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg',
    dateTime: '2025-05-25T15:00:00Z',
    status: 'pending',
    notes: 'Aula introdutória de yoga',
  },
  {
    id: '3',
    practiceId: '4',
    practiceName: 'Meditação',
    patientId: '2',
    patientName: 'Amanda Costa',
    patientImageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    practitionerId: '3',
    practitionerName: 'Dr. Augusto Mendes',
    practitionerImageUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    dateTime: new Date().toISOString(), // Today
    status: 'confirmed',
    notes: 'Sessão de meditação guiada',
  },
  {
    id: '4',
    practiceId: '5',
    practiceName: 'Reiki',
    patientId: '3',
    patientName: 'Roberto Alves',
    patientImageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    practitionerId: '3',
    practitionerName: 'Dr. Augusto Mendes',
    practitionerImageUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    dateTime: new Date().toISOString(), // Today
    status: 'confirmed',
    notes: 'Sessão para equilíbrio energético',
  },
];

// Simulate API calls
export const getUpcomingAppointments = async (): Promise<Appointment[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const now = new Date();
  const appointments = mockAppointments.filter(appointment => 
    new Date(appointment.dateTime) > now
  ).sort((a, b) => 
    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
  
  return appointments;
};

export const getTodayAppointments = async (): Promise<Appointment[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const appointments = mockAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.dateTime);
    return appointmentDate >= today && appointmentDate < tomorrow;
  }).sort((a, b) => 
    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
  
  return appointments;
};

export const createAppointment = async (appointmentData: {
  practiceId: string;
  dateTime: string;
  userId: string;
  notes?: string;
}): Promise<Appointment> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be a POST to an API
  // For this demo, we'll create a mock response
  
  // Find the practice
  const practice = mockAppointments.find(a => a.practiceId === appointmentData.practiceId);
  
  if (!practice) {
    throw new Error('Practice not found');
  }
  
  const newAppointment: Appointment = {
    id: `${Date.now()}`, // Generate a unique ID
    practiceId: appointmentData.practiceId,
    practiceName: practice.practiceName,
    patientId: appointmentData.userId,
    patientName: 'Carlos Silva', // Mock name
    patientImageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    practitionerId: practice.practitionerId,
    practitionerName: practice.practitionerName,
    practitionerImageUrl: practice.practitionerImageUrl,
    dateTime: appointmentData.dateTime,
    status: 'pending',
    notes: appointmentData.notes || '',
  };
  
  // In a real app, we would add this to the database
  // For this demo, we'll just return it
  return newAppointment;
};