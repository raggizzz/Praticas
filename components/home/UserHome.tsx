import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';
import { Calendar, ChevronRight, Clock } from 'lucide-react-native';
import { getUpcomingAppointments } from '@/services/appointmentService';
import { getPractices } from '@/services/practicesService';
import { Appointment } from '@/types/appointment';
import { Practice } from '@/types/practice';
import PracticeCard from '@/components/practices/PracticeCard';
import { UBSlogo, SUSLogo, IntegrativePracticesBackground } from '@/components/ui/IntegrativePracticesElements';
import { getAllEvents } from '@/services/eventsService';
import EventCard from '@/components/events/EventCard';
import { Event as CustomEvent } from '@/types/event';

export default function UserHome() {
  const { user } = useAuth();
  const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null);
  const [practices, setPractices] = useState<Practice[]>([]);
  const [activeTab, setActiveTab] = useState<'activities' | 'insights'>('activities');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(20))[0];
  const [events, setEvents] = useState<CustomEvent[]>([]);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  useEffect(() => {
    // Fetch upcoming appointment
    const loadAppointments = async () => {
      try {
        const data = await getUpcomingAppointments();
        if (data.length > 0) {
          setUpcomingAppointment(data[0]);
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
      
    };

    const loadEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    // Fetch practices
    const loadPractices = async () => {
      try {
        const data = await getPractices();
        setPractices(data);
      } catch (error) {
        console.error('Error loading practices:', error);
      }
    };

    loadEvents();
    loadAppointments();
    loadPractices();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePracticePress = (practiceId: string) => {
    router.push(`/practice/${practiceId}`);
  };

  const handleViewProfessionals = () => {
    // Navigate to professionals screen
    // In a real app, this would redirect to a list of professionals
    console.log('View professionals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <IntegrativePracticesBackground />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[styles.header, 
            {opacity: fadeAnim, transform: [{translateY: slideAnim}]}
          ]}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Usuário'} 👋</Text>
              <Text style={styles.subGreeting}>Como está se sentindo hoje?</Text>
            </View>
            
            <UBSlogo size={12} style={styles.ubslogo} />
          </View>
          <TouchableOpacity onPress={handleViewProfessionals} style={styles.viewProfButton}>
            <Text style={styles.viewProfText}>Ver profissionais</Text>
            <ChevronRight size={16} color={colors.primary[600]} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'activities' && styles.activeTab
            ]}
            onPress={() => setActiveTab('activities')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'activities' && styles.activeTabText
              ]}
            >
              Encontros
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'insights' && styles.activeTab
            ]}
            onPress={() => setActiveTab('insights')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'insights' && styles.activeTabText
              ]}
            >
              Análises
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo condicional das abas */} 
        {activeTab === 'activities' && (
          <View> {/* Adicione um View para agrupar o conteúdo da aba */} 
            {/* Upcoming Appointment - Mantenha esta seção se ela deve aparecer na aba Encontros */} 
            {upcomingAppointment ? (
              <View style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Calendar size={20} color={colors.primary[600]} />
                  <Text style={styles.appointmentHeaderText}>Próximo agendamento</Text>
                </View>
                
                <View style={styles.appointmentContent}>
                  <Image 
                    source={{ uri: upcomingAppointment.practitionerImageUrl }}
                    style={styles.practitionerImage}
                  />
                  
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.practitionerName}>
                      {upcomingAppointment.practitionerName}
                    </Text>
                    <Text style={styles.practiceType}>
                      {upcomingAppointment.practiceName}
                    </Text>
                    
                    <View style={styles.dateTimeContainer}>
                      <View style={styles.dateTime}>
                        <Calendar size={16} color={colors.neutral[600]} />
                        <Text style={styles.dateTimeText}>
                          {formatDate(upcomingAppointment.dateTime)}
                        </Text>
                      </View>
                      
                      <View style={styles.dateTime}>
                        <Clock size={16} color={colors.neutral[600]} />
                        <Text style={styles.dateTimeText}>
                          {formatTime(upcomingAppointment.dateTime)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>Ver detalhes</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.noAppointmentCard}>
                <Calendar size={24} color={colors.neutral[400]} />
                <Text style={styles.noAppointmentText}>
                  Sem agendamentos próximos
                </Text>
                <TouchableOpacity style={styles.scheduleButton}>
                  <Text style={styles.scheduleButtonText}>Agendar consulta</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Lista de Eventos - Coloque a FlatList aqui */} 
            <Text style={styles.sectionTitle2}>Eventos</Text> {/* Título opcional para a lista de eventos */} 
            <FlatList 
              data={events} 
              renderItem={({ item }) => <EventCard {...item} />} 
              keyExtractor={(item) => item.id} 
              contentContainerStyle={styles.eventsList} // Certifique-se de definir este estilo
              showsVerticalScrollIndicator={false} // Para evitar duas barras de rolagem
              ListEmptyComponent={<Text style={styles.noEventsText}>Nenhum encontro disponível no momento.</Text>} // Mensagem para lista vazia
            />
          </View>
        )}

        {activeTab === 'insights' && (
          <View style={styles.insightsContainer}> 
            {/* Conteúdo da aba Análises (Insights) aqui */} 
            <Text style={styles.tabContentText}>Conteúdo da aba Análises</Text>
          </View>
        )}

        {/* Practices Section - Esta seção parece ser global e não específica de uma aba */} 
        <View style={styles.practicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Práticas integrativas</Text>
            <TouchableOpacity onPress={() => router.push('/practices')}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Practices List */}
          <FlatList
            horizontal
            data={practices.slice(0, 5)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.practiceItem}
                onPress={() => handlePracticePress(item.id)}
              >
                <Image 
                  source={{ uri: item.imageUrl }}
                  style={styles.practiceImage}
                />
                <Text style={styles.practiceName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.practicesList}
          />
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  ubslogo: {
    marginLeft: 10,
    elevation: 10,
  },
  
  susLogo: {
    marginLeft: 10,
    elevation: 10,
  },
  greeting: {
    fontSize: 24,
    color: colors.primary[600],
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subGreeting: {
    fontSize: 16,
    color: colors.neutral[600],
    marginTop: 4,
    fontFamily: 'Poppins-Medium',
  },
  viewProfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    shadowColor: colors.primary[300],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  viewProfText: {
    fontSize: 14,
    color: colors.primary[600],
    marginRight: 6,
    fontFamily: 'Poppins-Medium',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    paddingBottom: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: colors.primary[50],
    shadowColor: colors.primary[200],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 15,
    color: colors.neutral[600],
    fontFamily: 'Poppins-Medium',
  },
  activeTabText: {
    color: colors.primary[600],
  },
  appointmentCard: {
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    shadowColor: colors.primary[300],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentHeaderText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Medium',
  },
  appointmentContent: {
    flexDirection: 'row',
  },
  practitionerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  appointmentInfo: {
    marginLeft: 16,
    flex: 1,
  },
  practitionerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Medium',
  },
  practiceType: {
    fontSize: 14,
    color: colors.primary[500],
    marginTop: 2,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.neutral[600],
    fontFamily: 'Poppins-Regular',
  },
  viewDetailsButton: {
    alignSelf: 'center',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
  },
  viewDetailsText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  noAppointmentCard: {
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noAppointmentText: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
    marginVertical: 12,
    fontFamily: 'Poppins-Regular',
  },
  scheduleButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  practicesSection: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle2: {
    marginLeft: 10,
    fontSize: 20,
    color: colors.primary[600],
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  sectionTitle: {
    fontSize: 20,
    color: colors.primary[600],
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  seeAllText: {
    fontSize: 15,
    color: colors.primary[500],
    fontFamily: 'Poppins-Medium',
  },
  practicesList: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  practiceItem: {
    marginRight: 16,
    width: 140,
  },
  practiceImage: {
    width: 140,
    height: 130,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: colors.primary[400],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  practiceName: {
    fontSize: 15,
    color: colors.primary[700],
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    marginTop: 4,
  },
  tabContentText: {
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginVertical: 20,
  },
  insightsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  eventsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  noEventsText: {
    fontSize: 16,
    color: colors.neutral[500],
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginVertical: 20,
  },
});