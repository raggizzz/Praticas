import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Heart } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
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
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[600]} />
      <LinearGradient
        colors={[colors.primary[500], colors.primary[700]]}
        style={styles.headerGradient}
      >
        <IntegrativePracticesBackground />
        <Animated.View style={[styles.header, {opacity: fadeAnim}]}>
          <View style={styles.titleContainer}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Práticas Integrativas</Text>
              <View style={styles.titleIcon}>
                <Ionicons name="leaf" size={24} color={colors.white} />
              </View>
            </View>
            <UBSlogo size={32} style={styles.susLogo} />
          </View>
          
          <Text style={styles.subtitle}>Descubra o bem-estar através das práticas oferecidas pelo SUS</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{filteredPractices.length}</Text>
              <Text style={styles.statLabel}>Práticas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Heart size={16} color={colors.white} />
              <Text style={styles.statLabel}>Bem-estar</Text>
            </View>
          </View>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color={colors.primary[400]} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar prática integrativa..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor={colors.neutral[400]}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={colors.primary[500]} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary[500]} />
            <Text style={styles.loadingText}>Carregando práticas...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPractices}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Animated.View 
                style={[styles.cardContainer, {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0]
                    })
                  }]
                }]}
              >
                <PracticeCard practice={item} onPress={() => handlePracticePress(item.id)} />
              </Animated.View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={colors.neutral[300]} />
                <Text style={styles.emptyTitle}>Nenhuma prática encontrada</Text>
                <Text style={styles.emptyText}>Tente buscar com outros termos</Text>
              </View>
            }
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Todas as Práticas</Text>
                <Text style={styles.sectionSubtitle}>Explore as {filteredPractices.length} práticas disponíveis</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleIcon: {
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 6,
    borderRadius: 12,
  },
  susLogo: {
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backdropFilter: 'blur(10px)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    marginRight: 8,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  filterButton: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listHeader: {
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: 'Poppins-Regular',
  },
  cardContainer: {
    marginBottom: 4,
  },
  listContent: {
    padding: 20,
    paddingTop: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.primary[600],
    fontFamily: 'Poppins-Medium',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[700],
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
});