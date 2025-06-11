import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { Practice } from '@/types/practice';

const { width } = Dimensions.get('window');

type PracticeCardProps = {
  practice: Practice;
  onPress: () => void;
};

export default function PracticeCard({ practice, onPress }: PracticeCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: practice.imageUrl || 'https://images.pexels.com/photos/3758056/pexels-photo-3758056.jpeg' }} 
          style={styles.image} 
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)']}
          style={styles.imageOverlay}
        />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{practice.name}</Text>
          <View style={styles.iconContainer}>
            <Ionicons name="leaf-outline" size={16} color={colors.primary[500]} />
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={3}>
          {practice.definition}
        </Text>
        
        <View style={styles.footer}>
          <LinearGradient
            colors={[colors.primary[500], colors.primary[600]]}
            style={styles.tag}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.tagText}>Saiba mais</Text>
            <Ionicons name="arrow-forward" size={12} color={colors.white} style={styles.tagIcon} />
          </LinearGradient>
          
          <View style={styles.benefitsContainer}>
            <Ionicons name="heart-outline" size={14} color={colors.primary[400]} />
            <Text style={styles.benefitsText}>Bem-estar</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 120,
    height: 140,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Bold',
    flex: 1,
    marginRight: 8,
  },
  iconContainer: {
    backgroundColor: colors.primary[50],
    padding: 6,
    borderRadius: 8,
  },
  description: {
    fontSize: 13,
    color: colors.neutral[600],
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tagText: {
    fontSize: 12,
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  tagIcon: {
    marginLeft: 4,
  },
  benefitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  benefitsText: {
    fontSize: 11,
    color: colors.primary[600],
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
});