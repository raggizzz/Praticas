import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Camera, Upload, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { presetAvatars, getAvatarsByCategory, PresetAvatar } from '@/services/avatarService';
import { colors } from '@/constants/colors';

interface AvatarSelectorProps {
  visible: boolean;
  onClose: () => void;
  currentAvatar?: { type: 'preset' | 'custom'; value: string };
  onAvatarSelect: (avatar: { type: 'preset' | 'custom'; value: string }) => void;
}

const { width } = Dimensions.get('window');
const AVATAR_SIZE = (width - 80) / 4; // 4 avatars per row with margins

export default function AvatarSelector({
  visible,
  onClose,
  currentAvatar,
  onAvatarSelect,
}: AvatarSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos', icon: '👥' },
    { id: 'diverse-ethnicity', name: 'Diversidade Étnica', icon: '🌍' },
    { id: 'accessibility', name: 'Acessibilidade', icon: '♿' },
    { id: 'lgbtq+', name: 'LGBTQ+', icon: '🏳️‍🌈' },
    { id: 'age-diverse', name: 'Todas as Idades', icon: '👶👴' },
    { id: 'general', name: 'Geral', icon: '👤' },
  ];

  const filteredAvatars = selectedCategory === 'all' 
    ? presetAvatars 
    : getAvatarsByCategory(selectedCategory);

  const handlePresetSelect = (avatar: PresetAvatar) => {
    onAvatarSelect({ type: 'preset', value: avatar.id });
    onClose();
  };

  const handleCustomUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permissão Necessária',
          'É necessário permitir o acesso à galeria para selecionar uma foto.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onAvatarSelect({ type: 'custom', value: result.assets[0].uri });
        onClose();
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const handleCameraCapture = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permissão Necessária',
          'É necessário permitir o acesso à câmera para tirar uma foto.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onAvatarSelect({ type: 'custom', value: result.assets[0].uri });
        onClose();
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Escolher Avatar</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.neutral[600]} />
          </TouchableOpacity>
        </View>

        {/* Custom Upload Options */}
        <View style={styles.customSection}>
          <Text style={styles.sectionTitle}>Foto Personalizada</Text>
          <View style={styles.customButtons}>
            <TouchableOpacity style={styles.customButton} onPress={handleCameraCapture}>
              <Camera size={24} color={colors.primary[600]} />
              <Text style={styles.customButtonText}>Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={handleCustomUpload}>
              <Upload size={24} color={colors.primary[600]} />
              <Text style={styles.customButtonText}>Galeria</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Avatares Inclusivos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Avatar Grid */}
        <ScrollView style={styles.avatarGrid} showsVerticalScrollIndicator={false}>
          <View style={styles.avatarContainer}>
            {filteredAvatars.map((avatar) => {
              const isSelected = currentAvatar?.type === 'preset' && currentAvatar.value === avatar.id;
              return (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    styles.avatarItem,
                    isSelected && styles.avatarItemSelected,
                  ]}
                  onPress={() => handlePresetSelect(avatar)}
                >
                  <Image source={{ uri: avatar.imageUrl }} style={styles.avatarImage} />
                  <Text style={styles.avatarName} numberOfLines={2}>
                    {avatar.name}
                  </Text>
                  {isSelected && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
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
  customSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 12,
  },
  customButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  customButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primary[300],
    borderRadius: 8,
    gap: 8,
  },
  customButtonText: {
    color: colors.primary[600],
    fontWeight: '500',
  },
  categorySection: {
    backgroundColor: 'white',
    paddingVertical: 16,
    marginBottom: 8,
  },
  categoryScroll: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    minWidth: 80,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary[100],
  },
  categoryIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: colors.neutral[600],
    textAlign: 'center',
  },
  categoryTextActive: {
    color: colors.primary[700],
    fontWeight: '500',
  },
  avatarGrid: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  avatarItem: {
    width: AVATAR_SIZE,
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.neutral[50],
    position: 'relative',
  },
  avatarItemSelected: {
    backgroundColor: colors.primary[50],
    borderWidth: 2,
    borderColor: colors.primary[500],
  },
  avatarImage: {
    width: AVATAR_SIZE - 16,
    height: AVATAR_SIZE - 16,
    borderRadius: (AVATAR_SIZE - 16) / 2,
    marginBottom: 8,
  },
  avatarName: {
    fontSize: 11,
    color: colors.neutral[700],
    textAlign: 'center',
    lineHeight: 14,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});