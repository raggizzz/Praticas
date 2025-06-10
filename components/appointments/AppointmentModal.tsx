import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform
} from 'react-native';
import { Calendar, Clock, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Practice } from '@/types/practice';
import { createAppointment } from '@/services/appointmentService';
import { useAuth } from '@/context/AuthContext';

type AppointmentModalProps = {
  visible: boolean;
  onClose: () => void;
  practice: Practice;
};

export default function AppointmentModal({ visible, onClose, practice }: AppointmentModalProps) {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available times
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  // Future dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const handleScheduleAppointment = async () => {
    if (!selectedDate || !selectedTime) return;
    
    try {
      setIsSubmitting(true);
      
      // Create appointment datetime string
      const appointmentDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      appointmentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      
      await createAppointment({
        practiceId: practice.id,
        dateTime: appointmentDate.toISOString(),
        userId: user?.id || '',
        notes: notes,
      });
      
      // Close modal and show success message
      onClose();
      // In a real app, you might want to show a success notification
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      // In a real app, you might want to show an error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Agendar Consulta</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={colors.neutral[600]} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.practiceInfo}>
              <Text style={styles.practiceTitle}>{practice.name}</Text>
              <Text style={styles.practiceDescription}>
                Selecione a data e horário para sua consulta
              </Text>
            </View>
            
            <View style={styles.sectionTitle}>
              <Calendar size={18} color={colors.primary[600]} />
              <Text style={styles.sectionTitleText}>Selecione uma data</Text>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.datesContainer}
            >
              {getAvailableDates().map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateCard,
                    selectedDate && date.toDateString() === selectedDate.toDateString() && styles.selectedDateCard
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text 
                    style={[
                      styles.dateText,
                      selectedDate && date.toDateString() === selectedDate.toDateString() && styles.selectedDateText
                    ]}
                  >
                    {formatDate(date)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.sectionTitle}>
              <Clock size={18} color={colors.primary[600]} />
              <Text style={styles.sectionTitleText}>Selecione um horário</Text>
            </View>
            
            <View style={styles.timesContainer}>
              {availableTimes.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeCard,
                    selectedTime === time && styles.selectedTimeCard
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text 
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.selectedTimeText
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Observações (opcional)</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Adicione informações relevantes para sua consulta"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[
                styles.scheduleButton,
                (!selectedDate || !selectedTime || isSubmitting) && styles.disabledButton
              ]}
              onPress={handleScheduleAppointment}
              disabled={!selectedDate || !selectedTime || isSubmitting}
            >
              <Text style={styles.scheduleButtonText}>
                {isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Bold',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    maxHeight: Platform.OS === 'ios' ? '70%' : '65%',
  },
  practiceInfo: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary[600],
    marginBottom: 8,
    fontFamily: 'Poppins-Medium',
  },
  practiceDescription: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Poppins-Regular',
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
    marginLeft: 8,
    fontFamily: 'Poppins-Medium',
  },
  datesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  dateCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.neutral[100],
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedDateCard: {
    backgroundColor: colors.primary[500],
  },
  dateText: {
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  selectedDateText: {
    color: colors.white,
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  timeCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.neutral[100],
    margin: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTimeCard: {
    backgroundColor: colors.primary[500],
  },
  timeText: {
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  selectedTimeText: {
    color: colors.white,
  },
  notesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
    marginBottom: 12,
    fontFamily: 'Poppins-Medium',
  },
  notesInput: {
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  scheduleButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  disabledButton: {
    backgroundColor: colors.neutral[300],
  },
});