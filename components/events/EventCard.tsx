import { Event } from '@/types/event';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Calendar, MapPin } from 'phosphor-react-native';
import { colors } from '@/constants/colors';

type EventProps = Event; 

export default function EventCard({ eventName, date, location, imageUrl }: EventProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{eventName}</Text>
        <View style={styles.details}>
          <Calendar size={16} color={colors.neutral[600]} />
          <Text style={styles.text}>{date}</Text>
        </View>
        <View style={styles.details}>
          <MapPin size={16} color={colors.neutral[600]} />
          <Text style={styles.text}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    margin: 8,
    shadowColor: colors.primary[300],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: colors.primary[700],
    fontSize: 16,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: colors.neutral[600],
    marginLeft: 6,
    fontSize: 14,
  },
});