import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import { colors } from '@/constants/colors';
import { SUSLogo, IntegrativePracticesBackground } from '@/components/ui/IntegrativePracticesElements';
import { Users, BriefcaseMedical  } from 'lucide-react-native';

export default function LoginScreen() {
  const [userType, setUserType] = useState<'patient' | 'professional' | null>(null);
  const { signIn } = useAuth();
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  // Handle login with selected user type
  const handleLogin = (data: { email: string; password: string }) => {
    signIn({ ...data, userType: userType || 'patient' });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <IntegrativePracticesBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View style={[styles.logoContainer, {opacity: fadeAnim}]}>
            <View style={styles.susLogoContainer}>
              <SUSLogo size={120} />
              <Text style={styles.appSubtitle}>Este é um aplicativo voltado para informar sobre as PICS além de oferer outras funcionalidades</Text>
            </View>
          </Animated.View>

          {!userType ? (
            <View style={styles.userTypeContainer}>
              <Text style={styles.selectTitle}>Selecione seu perfil</Text>
              
              <TouchableOpacity 
                style={styles.userTypeButton} 
                onPress={() => setUserType('patient')}
              >
                <View style={styles.userTypeIcon}>
                  <Text style={styles.userTypeIconText}>
                    <Users size={24} color={colors.primary[500]} />
                  </Text>
                </View>
                <Text style={styles.userTypeText}>Usuário do SUS</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.userTypeButton} 
                onPress={() => setUserType('professional')}
              >
                <View style={styles.userTypeIcon}>
                  <Text style={styles.userTypeIconText}>
                    <BriefcaseMedical size={24} color={colors.primary[500]} />
                  </Text>
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
              
              <Text style={styles.loginTitle}>
                {userType === 'patient' ? 'Login de Usuário' : 'Login Profissional'}
              </Text>
              
              <LoginForm onSubmit={handleLogin} />
              
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Não tem uma conta? </Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                  <Text style={styles.registerLink}>Cadastre-se</Text>
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  susLogoContainer: {
    marginBottom: 16,
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  appTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: colors.primary[600],
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  appSubtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.neutral[600],
    textAlign: 'center',
    marginTop: 4,
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
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: colors.primary[300],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  userTypeIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: colors.primary[200],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
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
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: colors.primary[500],
    fontSize: 16,
  },
  loginTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: colors.primary[600],
    marginBottom: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: colors.neutral[600],
  },
  registerLink: {
    color: colors.primary[500],
    fontWeight: '500',
  },
});