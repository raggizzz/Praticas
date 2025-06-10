import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';

interface AccessibilityContextData {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  magnifierEnabled: boolean;
  updateAccessibilitySettings: (settings: User['accessibility']) => void;
  getFontSize: () => number;
  getScaledSize: (baseSize: number) => number;
}

const AccessibilityContext = createContext<AccessibilityContextData>({} as AccessibilityContextData);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    // Return default values if context is not available
    return {
      fontSize: 'medium' as const,
      highContrast: false,
      magnifierEnabled: false,
      updateAccessibilitySettings: () => {},
      getFontSize: () => 16,
      getScaledSize: (baseSize: number) => baseSize,
    };
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
  initialSettings?: User['accessibility'];
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children, initialSettings }) => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'extra-large'>(
    initialSettings?.fontSize || 'medium'
  );
  const [highContrast, setHighContrast] = useState(initialSettings?.highContrast || false);
  const [magnifierEnabled, setMagnifierEnabled] = useState(initialSettings?.magnifierEnabled || false);

  const getFontSize = (): number => {
    switch (fontSize) {
      case 'small': return 14;
      case 'medium': return 16;
      case 'large': return 18;
      case 'extra-large': return 22;
      default: return 16;
    }
  };

  const getScaledSize = (baseSize: number): number => {
    const scale = getFontSize() / 16; // 16 is the base medium size
    return Math.round(baseSize * scale);
  };

  const updateAccessibilitySettings = (settings: User['accessibility']) => {
    if (settings) {
      setFontSize(settings.fontSize || 'medium');
      setHighContrast(settings.highContrast || false);
      setMagnifierEnabled(settings.magnifierEnabled || false);
    }
  };

  const value: AccessibilityContextData = {
    fontSize,
    highContrast,
    magnifierEnabled,
    updateAccessibilitySettings,
    getFontSize,
    getScaledSize,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export { AccessibilityContext };