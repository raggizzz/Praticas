import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';
import { Bell, Calendar, Heart, LogOut, Settings, User, Camera, Eye, Type } from 'lucide-react-native';
import AvatarSelector from '@/components/profile/AvatarSelector';
import AccessibilitySettings from '@/components/profile/AccessibilitySettings';
import { getAvatarById, getDefaultAvatar } from '@/services/avatarService';
import Magnifier from '@/components/ui/Magnifier';

export default function ProfileScreen() {
  const { user, userType, signOut } = useAuth();
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false);
  
  // Get current avatar
  const currentAvatar = user?.avatar;
  const avatarSource = currentAvatar?.type === 'preset' 
    ? getAvatarById(currentAvatar.value)?.imageUrl || getDefaultAvatar().imageUrl
    : currentAvatar?.type === 'custom' 
    ? currentAvatar.value
    : getDefaultAvatar().imageUrl;
    
  // Get accessibility settings
  const accessibilitySettings = user?.accessibility;
  const fontSize = accessibilitySettings?.fontSize || 'medium';
  const magnifierEnabled = accessibilitySettings?.magnifierEnabled || false;
  
  const handleAvatarChange = (avatar: { type: 'preset' | 'custom'; value: string }) => {
    // In a real app, this would update the user profile via API
    console.log('Avatar changed:', avatar);
  };
  
  const handleAccessibilityChange = (settings: typeof accessibilitySettings) => {
    // In a real app, this would update the user profile via API
    console.log('Accessibility settings changed:', settings);
  };

  return (
    <Magnifier enabled={magnifierEnabled}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Meu Perfil</Text>
          </View>
          
          <View style={styles.profileCard}>
            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={() => setShowAvatarSelector(true)}
            >
              <Image
                source={{ uri: avatarSource }}
                style={styles.profileImage}
              />
              <View style={styles.avatarEditIcon}>
                <Camera size={16} color="white" />
              </View>
            </TouchableOpacity>
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

        {/* Accessibility Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acessibilidade</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowAccessibilitySettings(true)}
          >
            <Type size={20} color={colors.primary[500]} />
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemText}>Tamanho do Texto</Text>
              <Text style={styles.menuItemSubtext}>
                {fontSize === 'small' ? 'Pequeno' : 
                 fontSize === 'medium' ? 'Médio' : 
                 fontSize === 'large' ? 'Grande' : 'Extra Grande'}
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowAccessibilitySettings(true)}
          >
            <Eye size={20} color={colors.primary[500]} />
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemText}>Lupa de Aumento</Text>
              <Text style={styles.menuItemSubtext}>
                {magnifierEnabled ? 'Ativada' : 'Desativada'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <LogOut size={20} color={colors.error[500]} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
        
        {/* Modals */}
        <AvatarSelector
          visible={showAvatarSelector}
          onClose={() => setShowAvatarSelector(false)}
          currentAvatar={currentAvatar}
          onAvatarSelect={handleAvatarChange}
        />
        
        <AccessibilitySettings
          visible={showAccessibilitySettings}
          onClose={() => setShowAccessibilitySettings(false)}
          currentSettings={accessibilitySettings}
          onSettingsChange={handleAccessibilityChange}
        />
      </ScrollView>
    </SafeAreaView>
    </Magnifier>
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarEditIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
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
  menuItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuItemSubtext: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 2,
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