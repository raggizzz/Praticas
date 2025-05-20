import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Svg, Path, Circle, G } from 'react-native-svg';
import { colors } from '@/constants/colors';



type ElementProps = {
  size?: number;
  color?: string;
  style?: any;
};

// Componente do símbolo do SUS
export const SUSLogo: React.FC<ElementProps> = ({ size = 40, color = colors.primary[500], style }) => {
  return (
    <View style={[styles.container, style]}>
      
      <Svg 
          clip-rule="evenodd" 
          fill-rule="evenodd" 
          height="40mm" 
          image-rendering="optimizeQuality" 
          shape-rendering="geometricPrecision" 
          text-rendering="geometricPrecision" 
          viewBox="9134 7362 12588 6892" 
          width="65mm" 
          >
          
          <G fill="#005bab">
              <Path d="M17257 7362h2176v2176h-2176zm-1939 2324h6404v2221h-2583l-2087-2107zm3864 2381 251 11 45 1617-148-1446zm-2148 199h2176c28 669 55 1334 189 1988l-2181-3c-129-608-146-1285-183-1985z"/>
              <Path d="M14934 9754c677 83 1354 135 2030 158l2164 2244c-1398 23-2796-60-4194-249zm-4983 259h570v-268h-775c-282 0-612 291-609 612 2 281 167 594 550 655 100 16 171 29 265 65 113 44 179 160 171 262-9 118-95 234-273 234h-649v313h837c297 0 609-273 655-578 31-206-13-493-148-626-180-179-379-181-592-253-86-29-171-120-171-211 0-89 82-205 171-205zm954 1128 3-1381 629 3-3 1466c0 205 189 385 407 367 197-16 352-148 352-329l-1-1513 310-3v1350c0 519-290 717-581 806-147 45-308 39-456 14-373-62-661-401-661-780zm2634-1128h570v-268h-775c-282 0-612 291-609 612 2 281 167 594 550 655 100 16 171 29 265 65 113 44 179 160 171 262-9 118-95 234-273 234h-649v313h837c297 0 609-273 655-578 31-206-13-493-148-626-180-179-379-181-592-253-86-29-171-120-171-211 0-89 82-205 171-205z"/>
          </G>
      </Svg>
    </View>
  );
};

// Elemento visual para Meditação
export const MeditationElement: React.FC<ElementProps> = ({ size = 40, color = colors.accent[500], style }) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx="50" cy="40" r="15" fill={color} />
        <Path
          d="M30,70 Q50,50 70,70 Q60,90 50,85 Q40,90 30,70 Z"
          fill={color}
          opacity="0.8"
        />
      </Svg>
    </View>
  );
};

// Elemento visual para Acupuntura
export const AcupunctureElement: React.FC<ElementProps> = ({ size = 40, color = colors.secondary[500], style }) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path
          d="M20,80 L80,20"
          stroke={color}
          strokeWidth="2"
        />
        <Circle cx="30" cy="70" r="3" fill={color} />
        <Circle cx="40" cy="60" r="3" fill={color} />
        <Circle cx="50" cy="50" r="3" fill={color} />
        <Circle cx="60" cy="40" r="3" fill={color} />
        <Circle cx="70" cy="30" r="3" fill={color} />
      </Svg>
    </View>
  );
};

// Elemento visual para Fitoterapia
export const PhytotherapyElement: React.FC<ElementProps> = ({ size = 40, color = colors.secondary[400], style }) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path
          d="M50,20 C30,40 30,60 50,80 C70,60 70,40 50,20 Z"
          fill={color}
          opacity="0.8"
        />
        <Path
          d="M50,30 C40,45 40,55 50,70 C60,55 60,45 50,30 Z"
          fill="white"
          opacity="0.3"
        />
        <Path
          d="M50,80 L50,90"
          stroke={color}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

// Elemento visual para Yoga
export const YogaElement: React.FC<ElementProps> = ({ size = 40, color = colors.accent[400], style }) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="30" fill={color} opacity="0.2" />
        <Path
          d="M50,20 L50,80 M20,50 L80,50"
          stroke={color}
          strokeWidth="2"
        />
        <Circle cx="50" cy="50" r="5" fill={color} />
      </Svg>
    </View>
  );
};

// Elemento visual para Aromaterapia
export const AromatherapyElement: React.FC<ElementProps> = ({ size = 40, color = colors.primary[400], style }) => {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path
          d="M40,70 L40,40 C40,30 60,30 60,40 L60,70 C60,80 40,80 40,70 Z"
          fill={color}
          opacity="0.8"
        />
        <Path
          d="M45,30 L55,30 L55,25 C55,20 45,20 45,25 L45,30 Z"
          fill={color}
        />
        <Path
          d="M45,40 C45,40 50,50 55,40"
          stroke="white"
          strokeWidth="1"
          opacity="0.6"
        />
      </Svg>
    </View>
  );
};

// Componente de fundo animado para as práticas integrativas
export const IntegrativePracticesBackground: React.FC<{style?: any}> = ({ style }) => {
  return (
    <View style={[styles.backgroundContainer, style]}>
      <MeditationElement size={60} style={styles.bgElement1} color={colors.primary[200]} />
      <AcupunctureElement size={80} style={styles.bgElement2} color={colors.secondary[200]} />
      <PhytotherapyElement size={70} style={styles.bgElement3} color={colors.accent[200]} />
      <YogaElement size={90} style={styles.bgElement4} color={colors.primary[100]} />
      <AromatherapyElement size={50} style={styles.bgElement5} color={colors.secondary[100]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
    zIndex: -1,
  },
  bgElement1: {
    position: 'absolute',
    top: '10%',
    left: '5%',
  },
  bgElement2: {
    position: 'absolute',
    top: '30%',
    right: '10%',
  },
  bgElement3: {
    position: 'absolute',
    bottom: '20%',
    left: '15%',
  },
  bgElement4: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
  },
  bgElement5: {
    position: 'absolute',
    top: '60%',
    left: '50%',
  },
});