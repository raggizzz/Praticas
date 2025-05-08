import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';
import { Bell, Calendar, Heart, LogOut, Settings, User } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, userType, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
        </View>
        
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user?.name || 'Usuário'}</Text>
          <Text style={styles.profileType}>
            {userType === 'patient' ? 'Usuário do SUS' : 'Profissional de Saúde'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.infoRow}>
            <User size={20} color={colors.neutral[600]} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nome Completo</Text>
              <Text style={styles.infoValue}>{user?.name || 'Nome não informado'}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.iconPlaceholder}>@</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>{user?.email || 'Email não informado'}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.iconPlaceholder}>#</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>CPF</Text>
              <Text style={styles.infoValue}>{user?.cpf || 'CPF não informado'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceLeft}>
              <Bell size={20} color={colors.neutral[600]} />
              <Text style={styles.preferenceText}>Notificações</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.neutral[300], true: colors.primary[300] }}
              thumbColor={true ? colors.primary[500] : colors.neutral[100]}
            />
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <Heart size={20} color={colors.primary[500]} />
            <Text style={styles.menuItemText}>Práticas Favoritas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Calendar size={20} color={colors.primary[500]} />
            <Text style={styles.menuItemText}>Meus Agendamentos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={20} color={colors.primary[500]} />
            <Text style={styles.menuItemText}>Configurações</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <LogOut size={20} color={colors.error[500]} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[800],
    fontFamily: 'Poppins-Bold',
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral[800],
    marginBottom: 4,
    fontFamily: 'Poppins-Bold',
  },
  profileType: {
    fontSize: 14,
    color: colors.primary[500],
    fontFamily: 'Poppins-Medium',
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[800],
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 2,
    fontFamily: 'Poppins-Regular',
  },
  infoValue: {
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Medium',
  },
  iconPlaceholder: {
    width: 20,
    fontSize: 16,
    textAlign: 'center',
    color: colors.neutral[600],
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: colors.error[50],
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.error[500],
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});