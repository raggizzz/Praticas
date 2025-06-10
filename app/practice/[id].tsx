import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Heart, Calendar, Share2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { getPracticeById } from '@/services/practicesService';
import { Practice } from '@/types/practice';
import AppointmentModal from '@/components/appointments/AppointmentModal';

export default function PracticeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [practice, setPractice] = useState<Practice | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  useEffect(() => {
    // Fetch practice details
    const loadPractice = async () => {
      try {
        if (typeof id === 'string') {
          const data = await getPracticeById(id);
          setPractice(data);
        }
      } catch (error) {
        console.error('Error loading practice:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPractice();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, save this to user's favorites
  };

  const handleShare = async () => {
    if (!practice) return;
    
    try {
      await Share.share({
        message: `Conheça a prática integrativa ${practice.name} no app Práticas Integrativas UBS!`,
        // url: 'https://praticasintegrativasubs.app' - for iOS
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading || !practice) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{ uri: practice.imageUrl || 'https://images.pexels.com/photos/3758056/pexels-photo-3758056.jpeg' }}
            style={styles.coverImage}
          />
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={toggleFavorite}
            >
              <Heart 
                size={20} 
                color={isFavorite ? colors.accent[500] : colors.white} 
                fill={isFavorite ? colors.accent[500] : 'none'}
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share2 size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{practice.name}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Definição</Text>
            <Text style={styles.sectionText}>{practice.definition}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Origem</Text>
            <Text style={styles.sectionText}>{practice.origin}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aplicação</Text>
            <Text style={styles.sectionText}>{practice.application}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Indicações</Text>
            <Text style={styles.sectionText}>{practice.indications}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefícios</Text>
            <Text style={styles.sectionText}>{practice.benefits}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contraindicações</Text>
            <Text style={styles.sectionText}>{practice.contraindications}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => setShowAppointmentModal(true)}
          >
            <Calendar size={20} color={colors.white} />
            <Text style={styles.scheduleButtonText}>Agendar consulta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <AppointmentModal
        visible={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        practice={practice}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'relative',
    height: 240,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.white,
  },
  actions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[800],
    marginBottom: 16,
    fontFamily: 'Poppins-Bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary[600],
    marginBottom: 8,
    fontFamily: 'Poppins-Medium',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.neutral[700],
    fontFamily: 'Poppins-Regular',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 40,
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'Poppins-Medium',
  },
});