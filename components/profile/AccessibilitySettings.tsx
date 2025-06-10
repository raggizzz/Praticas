import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { X, Eye, Type, Contrast, Search } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { User } from '@/types/user';

interface AccessibilitySettingsProps {
  visible: boolean;
  onClose: () => void;
  currentSettings?: User['accessibility'];
  onSettingsChange: (settings: User['accessibility']) => void;
}

const fontSizeOptions = [
  { id: 'small', name: 'Pequeno', size: 14, description: 'Texto menor' },
  { id: 'medium', name: 'Médio', size: 16, description: 'Tamanho padrão' },
  { id: 'large', name: 'Grande', size: 18, description: 'Texto maior' },
  { id: 'extra-large', name: 'Extra Grande', size: 22, description: 'Texto muito grande' },
] as const;

export default function AccessibilitySettings({
  visible,
  onClose,
  currentSettings,
  onSettingsChange,
}: AccessibilitySettingsProps) {
  const [settings, setSettings] = useState({
    fontSize: currentSettings?.fontSize || 'medium',
    highContrast: currentSettings?.highContrast || false,
    magnifierEnabled: currentSettings?.magnifierEnabled || false,
  });

  const handleSave = () => {
    onSettingsChange(settings);
    onClose();
  };

  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const selectedFontSize = fontSizeOptions.find(option => option.id === settings.fontSize);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Configurações de Acessibilidade</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.neutral[600]} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Font Size Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Type size={20} color={colors.primary[600]} />
              <Text style={styles.sectionTitle}>Tamanho do Texto</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Ajuste o tamanho do texto para melhor legibilidade
            </Text>
            
            <View style={styles.fontSizeOptions}>
              {fontSizeOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.fontSizeOption,
                    settings.fontSize === option.id && styles.fontSizeOptionSelected,
                  ]}
                  onPress={() => updateSetting('fontSize', option.id)}
                >
                  <Text style={[
                    styles.fontSizeOptionText,
                    { fontSize: option.size },
                    settings.fontSize === option.id && styles.fontSizeOptionTextSelected,
                  ]}>
                    Aa
                  </Text>
                  <View style={styles.fontSizeOptionInfo}>
                    <Text style={[
                      styles.fontSizeOptionName,
                      settings.fontSize === option.id && styles.fontSizeOptionNameSelected,
                    ]}>
                      {option.name}
                    </Text>
                    <Text style={styles.fontSizeOptionDescription}>
                      {option.description}
                    </Text>
                  </View>
                  {settings.fontSize === option.id && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* High Contrast Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Contrast size={20} color={colors.primary[600]} />
              <Text style={styles.sectionTitle}>Alto Contraste</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Aumenta o contraste das cores para melhor visibilidade
            </Text>
            
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={styles.switchLabel}>Ativar Alto Contraste</Text>
                <Text style={styles.switchDescription}>
                  Melhora a legibilidade para pessoas com baixa visão
                </Text>
              </View>
              <Switch
                value={settings.highContrast}
                onValueChange={(value) => updateSetting('highContrast', value)}
                trackColor={{ false: colors.neutral[300], true: colors.primary[300] }}
                thumbColor={settings.highContrast ? colors.primary[600] : colors.neutral[500]}
              />
            </View>
          </View>

          {/* Magnifier Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Search size={20} color={colors.primary[600]} />
              <Text style={styles.sectionTitle}>Lupa de Aumento</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Ativa uma lupa para ampliar partes específicas da tela
            </Text>
            
            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={styles.switchLabel}>Ativar Lupa</Text>
                <Text style={styles.switchDescription}>
                  Toque duplo em qualquer área para ampliar o conteúdo
                </Text>
              </View>
              <Switch
                value={settings.magnifierEnabled}
                onValueChange={(value) => updateSetting('magnifierEnabled', value)}
                trackColor={{ false: colors.neutral[300], true: colors.primary[300] }}
                thumbColor={settings.magnifierEnabled ? colors.primary[600] : colors.neutral[500]}
              />
            </View>
          </View>

          {/* Preview Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Eye size={20} color={colors.primary[600]} />
              <Text style={styles.sectionTitle}>Visualização</Text>
            </View>
            <View style={[
              styles.previewContainer,
              settings.highContrast && styles.previewHighContrast,
            ]}>
              <Text style={[
                styles.previewText,
                { fontSize: selectedFontSize?.size || 16 },
                settings.highContrast && styles.previewTextHighContrast,
              ]}>
                Este é um exemplo de como o texto aparecerá com suas configurações atuais.
              </Text>
              <Text style={[
                styles.previewSubtext,
                { fontSize: (selectedFontSize?.size || 16) - 2 },
                settings.highContrast && styles.previewSubtextHighContrast,
              ]}>
                Texto secundário também será ajustado proporcionalmente.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.neutral[600],
    marginBottom: 16,
    lineHeight: 20,
  },
  fontSizeOptions: {
    gap: 12,
  },
  fontSizeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    gap: 12,
    position: 'relative',
  },
  fontSizeOptionSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  fontSizeOptionText: {
    fontWeight: '600',
    color: colors.neutral[700],
    width: 40,
    textAlign: 'center',
  },
  fontSizeOptionTextSelected: {
    color: colors.primary[700],
  },
  fontSizeOptionInfo: {
    flex: 1,
  },
  fontSizeOptionName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[900],
  },
  fontSizeOptionNameSelected: {
    color: colors.primary[700],
  },
  fontSizeOptionDescription: {
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: 2,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[900],
  },
  switchDescription: {
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: 2,
    lineHeight: 18,
  },
  previewContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.neutral[50],
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  previewHighContrast: {
    backgroundColor: colors.neutral[900],
    borderColor: colors.neutral[700],
  },
  previewText: {
    color: colors.neutral[900],
    lineHeight: 24,
    marginBottom: 8,
  },
  previewTextHighContrast: {
    color: colors.neutral[50],
  },
  previewSubtext: {
    color: colors.neutral[600],
    lineHeight: 20,
  },
  previewSubtextHighContrast: {
    color: colors.neutral[300],
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  saveButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});