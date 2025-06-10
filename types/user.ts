export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: 'patient' | 'professional';
  avatar?: {
    type: 'preset' | 'custom';
    value: string; // URL for custom or preset ID for preset avatars
  };
  accessibility?: {
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
    highContrast: boolean;
    magnifierEnabled: boolean;
  };
}