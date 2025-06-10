import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/user';

type UserType = 'patient' | 'professional';

interface AuthContextData {
  user: User | null;
  userType: UserType;
  isAuthenticated: boolean;
  signIn: (data: { email: string; password: string; userType: UserType }) => void;
  signUp: (data: { name: string; email: string; password: string; cpf: string; userType: UserType }) => void;
  signOut: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Context Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>('patient');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate loading user from storage when app starts
  useEffect(() => {
    // In a real app, we would check AsyncStorage or SecureStore for tokens/user data
    const loadStoredUser = async () => {
      try {
        // Simulate getting data from storage
        // For this demo, we'll start unauthenticated
        setIsAuthenticated(false);
        setUser(null);
      } catch (error) {
        console.error('Error loading stored user:', error);
      }
    };

    loadStoredUser();
  }, []);

  const signIn = async (data: { email: string; password: string; userType: UserType }) => {
    // In a real app, we would make an API call to authenticate
    // For this demo, we'll simulate a successful login
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set mock user data
      const mockUser: User = {
        id: '1',
        name: data.userType === 'patient' ? 'Carlos Silva' : 'Dr. Augusto Mendes',
        email: data.email,
        cpf: '12345678900',
        role: data.userType,
      };
      
      setUser(mockUser);
      setUserType(data.userType);
      setIsAuthenticated(true);
      
      // In a real app, we would store tokens in AsyncStorage or SecureStore
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (data: { 
    name: string; 
    email: string; 
    password: string; 
    cpf: string;
    userType: UserType;
  }) => {
    // In a real app, we would make an API call to register
    // For this demo, we'll simulate a successful registration
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set mock user data
      const mockUser: User = {
        id: '2',
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        role: data.userType,
      };
      
      setUser(mockUser);
      setUserType(data.userType);
      setIsAuthenticated(true);
      
      // In a real app, we would store tokens in AsyncStorage or SecureStore
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = () => {
    // In a real app, we would clear tokens from AsyncStorage or SecureStore
    setUser(null);
    setIsAuthenticated(false);
    
    // In a real app, additional cleanup might be needed
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userType,
      isAuthenticated, 
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};