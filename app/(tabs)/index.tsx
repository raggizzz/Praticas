import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import UserHome from '@/components/home/UserHome';
import ProfessionalHome from '@/components/home/ProfessionalHome';

export default function HomeScreen() {
  const { userType } = useAuth();
  
  return (
    <View style={styles.container}>
      {userType === 'patient' ? <UserHome /> : <ProfessionalHome />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});