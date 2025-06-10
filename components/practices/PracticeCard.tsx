import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Practice } from '@/types/practice';

type PracticeCardProps = {
  practice: Practice;
  onPress: () => void;
};

export default function PracticeCard({ practice, onPress }: PracticeCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: practice.imageUrl || 'https://images.pexels.com/photos/3758056/pexels-photo-3758056.jpeg' }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        <Text style={styles.title}>{practice.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {practice.definition}
        </Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Saiba mais</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 'auto',
    aspectRatio: 2/3,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
    marginBottom: 6,
    fontFamily: 'Poppins-Medium',
  },
  description: {
    fontSize: 12,
    color: colors.neutral[600],
    lineHeight: 18,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    color: colors.primary[600],
    fontFamily: 'Poppins-Medium',
  },
});