import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import RegisterForm from '@/components/auth/RegisterForm';
import { colors } from '@/constants/colors';

export default function RegisterScreen() {
  const [userType, setUserType] = useState<'patient' | 'professional' | null>(null);
  const { signUp } = useAuth();

  // Handle registration with selected user type
  const handleRegister = (data: { name: string; email: string; password: string; cpf: string }) => {
    signUp({ ...data, userType: userType || 'patient' });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Criar Conta</Text>
          </View>

          {!userType ? (
            <View style={styles.userTypeContainer}>
              <Text style={styles.selectTitle}>Selecione seu perfil</Text>
              
              <TouchableOpacity 
                style={styles.userTypeButton} 
                onPress={() => setUserType('patient')}
              >
                <View style={styles.userTypeIcon}>
                  <Text style={styles.userTypeIconText}>👤</Text>
                </View>
                <Text style={styles.userTypeText}>Usuário do SUS</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.userTypeButton} 
                onPress={() => setUserType('professional')}
              >
                <View style={styles.userTypeIcon}>
                  <Text style={styles.userTypeIconText}>👨‍⚕️</Text>
                </View>
                <Text style={styles.userTypeText}>Profissional de Saúde</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => setUserType(null)}
              >
                <Text style={styles.backButtonText}>← Voltar</Text>
              </TouchableOpacity>
              
              <Text style={styles.registerTitle}>
                {userType === 'patient' ? 'Cadastro de Usuário' : 'Cadastro Profissional'}
              </Text>
              
              <RegisterForm onSubmit={handleRegister} userType={userType} />
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={styles.loginLink}>Faça login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    padding: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: colors.primary[500],
    fontSize: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[800],
  },
  userTypeContainer: {
    padding: 20,
  },
  selectTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: colors.neutral[800],
  },
  userTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userTypeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userTypeIconText: {
    fontSize: 24,
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[800],
  },
  formContainer: {
    padding: 20,
  },
  registerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.neutral[800],
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: colors.neutral[600],
  },
  loginLink: {
    color: colors.primary[500],
    fontWeight: '500',
  },
});