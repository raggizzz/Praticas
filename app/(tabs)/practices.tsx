import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { router } from 'expo-router';
import PracticeCard from '@/components/practices/PracticeCard';
import { colors } from '@/constants/colors';
import { getPractices } from '@/services/practicesService';
import { Practice } from '@/types/practice';
import { SUSLogo, IntegrativePracticesBackground, UBSlogo } from '@/components/ui/IntegrativePracticesElements';

export default function PracticesScreen() {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [filteredPractices, setFilteredPractices] = useState<Practice[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, []);

  useEffect(() => {
    // Fetch practices
    const loadPractices = async () => {
      try {
        const data = await getPractices();
        setPractices(data);
        setFilteredPractices(data);
      } catch (error) {
        console.error('Error loading practices:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPractices();
  }, []);

  // Filter practices based on search input
  useEffect(() => {
    if (searchText) {
      const filtered = practices.filter(practice => 
        practice.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPractices(filtered);
    } else {
      setFilteredPractices(practices);
    }
  }, [searchText, practices]);

  const handlePracticePress = (practiceId: string) => {
    router.push(`/practice/${practiceId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <IntegrativePracticesBackground />
      <Animated.View style={[styles.header, {opacity: fadeAnim}]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Práticas Integrativas</Text>
          <UBSlogo size={30} style={styles.susLogo} />
        </View>
        <Text style={styles.subtitle}>Conheça as práticas oferecidas pelo SUS</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.neutral[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar prática"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={colors.neutral[400]}
          />
        </View>
      </Animated.View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </View>
      ) : (
        <FlatList
          data={filteredPractices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PracticeCard practice={item} onPress={() => handlePracticePress(item.id)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma prática encontrada</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 26,
    color: colors.primary[600],
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  susLogo: {
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[600],
    marginTop: 4,
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: colors.primary[300],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.neutral[500],
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});