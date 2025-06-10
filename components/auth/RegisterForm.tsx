import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

type RegisterFormProps = {
  onSubmit: (data: { name: string; email: string; password: string; cpf: string }) => void;
  userType: 'patient' | 'professional';
};

export default function RegisterForm({ onSubmit, userType }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    cpf?: string;
    password?: string; 
    confirmPassword?: string; 
  }>({});

  const validate = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      cpf?: string;
      password?: string; 
      confirmPassword?: string; 
    } = {};
    
    if (!name) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (cpf.length !== 11 && !isNaN(Number(cpf.replace(/\D/g, '')))) {
      newErrors.cpf = 'CPF inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ name, email, password, cpf });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome completo"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{userType === 'patient' ? 'CPF ou Cartão SUS' : 'CPF'}</Text>
        <TextInput
          style={styles.input}
          placeholder={userType === 'patient' ? "Digite seu CPF ou nº do Cartão SUS" : "Digite seu CPF"}
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Crie uma senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>
      
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.neutral[700],
    fontFamily: 'Poppins-Medium',
  },
  input: {
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.neutral[800],
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    color: colors.error[500],
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  submitButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
});