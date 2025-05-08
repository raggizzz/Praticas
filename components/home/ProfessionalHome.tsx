import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';
import { Calendar, Clock, Users, CirclePlus as PlusCircle, ChartBar as BarChart2, Calendar as CalendarIcon } from 'lucide-react-native';
import { getTodayAppointments } from '@/services/appointmentService';
import { Appointment } from '@/types/appointment';

export default function ProfessionalHome() {
  const { user } = useAuth();
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'past'>('today');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await getTodayAppointments();
        setTodayAppointments(data);
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    };

    loadAppointments();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stats = [
    { icon: CalendarIcon, value: todayAppointments.length, label: 'Hoje', color: colors.primary },
    { icon: Users, value: 45, label: 'Pacientes', color: colors.secondary },
    { icon: BarChart2, value: 8, label: 'Práticas', color: colors.accent }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Olá, Dr. {user?.name?.split(' ')[0] || 'Profissional'} 👋
            </Text>
            <Text style={styles.subGreeting}>Confira seus agendamentos</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <PlusCircle size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: stat.color[100] }]}>
                <stat.icon size={20} color={stat.color[600]} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Calendário</Text>
          <View style={styles.calendarContainer}>
            {/* Calendar UI would go here */}
          </View>
        </View>

        {/* Appointments Section */}
        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>Agendamentos</Text>
          
          {/* Tabs */}
          <View style={styles.tabContainer}>
            {['today', 'upcoming', 'past'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab as typeof activeTab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab === 'today' ? 'Hoje' : tab === 'upcoming' ? 'Próximos' : 'Passados'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Appointments List */}
          {todayAppointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.timeIndicator}>
                <Text style={styles.timeText}>{formatTime(appointment.dateTime)}</Text>
              </View>
              
              <View style={styles.appointmentContent}>
                <Image 
                  source={{ uri: appointment.patientImageUrl }}
                  style={styles.patientImage}
                />
                
                <View style={styles.appointmentInfo}>
                  <Text style={styles.patientName}>{appointment.patientName}</Text>
                  <Text style={styles.practiceType}>{appointment.practiceName}</Text>
                  <View style={styles.statusContainer}>
                    <View 
                      style={[
                        styles.statusIndicator, 
                        { backgroundColor: appointment.status === 'confirmed' ? colors.success[500] : colors.warning[500] }
                      ]} 
                    />
                    <Text style={styles.statusText}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Ver</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Bold',
  },
  subGreeting: {
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 4,
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: colors.neutral[600],
    fontFamily: 'Poppins-Regular',
  },
  calendarSection: {
    padding: 20,
    backgroundColor: colors.white,
    marginTop: 8,
  },
  calendarContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  appointmentsSection: {
    padding: 20,
    backgroundColor: colors.white,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[800],
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: colors.primary[50],
  },
  tabText: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Poppins-Medium',
  },
  activeTabText: {
    color: colors.primary[600],
  },
  appointmentCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeIndicator: {
    backgroundColor: colors.primary[50],
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  timeText: {
    fontSize: 12,
    color: colors.primary[600],
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Medium',
  },
  practiceType: {
    fontSize: 14,
    color: colors.primary[500],
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: colors.neutral[600],
    fontFamily: 'Poppins-Regular',
  },
  actionButton: {
    backgroundColor: colors.primary[50],
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.primary[600],
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});