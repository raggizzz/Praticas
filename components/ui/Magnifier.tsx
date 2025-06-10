import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { colors } from '@/constants/colors';

interface MagnifierProps {
  children: React.ReactNode;
  enabled: boolean;
  magnification?: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const MAGNIFIER_SIZE = 120;
const MAGNIFIED_SIZE = MAGNIFIER_SIZE * 2;

export default function Magnifier({ 
  children, 
  enabled, 
  magnification = 2 
}: MagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0);
  const magnifierX = useSharedValue(0);
  const magnifierY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
      if (!enabled) return;
      
      magnifierX.value = event.x;
      magnifierY.value = event.y;
      
      // Position magnifier to avoid going off screen
      let targetX = event.x - MAGNIFIER_SIZE / 2;
      let targetY = event.y - MAGNIFIER_SIZE - 20; // Above the touch point
      
      // Adjust if magnifier would go off screen
      if (targetX < 10) targetX = 10;
      if (targetX > screenWidth - MAGNIFIER_SIZE - 10) {
        targetX = screenWidth - MAGNIFIER_SIZE - 10;
      }
      if (targetY < 10) {
        targetY = event.y + 20; // Below the touch point
      }
      
      translateX.value = targetX;
      translateY.value = targetY;
      
      runOnJS(setShowMagnifier)(true);
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    });

  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      if (showMagnifier) {
        scale.value = withSpring(0, { damping: 15, stiffness: 200 });
        runOnJS(setShowMagnifier)(false);
      }
    });

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (!enabled || !showMagnifier) return;
      
      magnifierX.value = event.x;
      magnifierY.value = event.y;
      
      // Update magnifier position
      let targetX = event.x - MAGNIFIER_SIZE / 2;
      let targetY = event.y - MAGNIFIER_SIZE - 20;
      
      if (targetX < 10) targetX = 10;
      if (targetX > screenWidth - MAGNIFIER_SIZE - 10) {
        targetX = screenWidth - MAGNIFIER_SIZE - 10;
      }
      if (targetY < 10) {
        targetY = event.y + 20;
      }
      
      translateX.value = withSpring(targetX, { damping: 20, stiffness: 300 });
      translateY.value = withSpring(targetY, { damping: 20, stiffness: 300 });
    })
    .onEnd(() => {
      if (showMagnifier) {
        scale.value = withSpring(0, { damping: 15, stiffness: 200 });
        runOnJS(setShowMagnifier)(false);
      }
    });

  const composedGesture = Gesture.Race(doubleTap, singleTap, pan);

  const magnifierStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: scale.value,
    };
  });

  const magnifiedContentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          translateX: -magnifierX.value * magnification + MAGNIFIER_SIZE / 2 
        },
        { 
          translateY: -magnifierY.value * magnification + MAGNIFIER_SIZE / 2 
        },
        { scale: magnification },
      ],
    };
  });

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <View style={styles.container}>
          {children}
          
          {showMagnifier && (
            <Animated.View style={[styles.magnifier, magnifierStyle]}>
              <View style={styles.magnifierContent}>
                <Animated.View style={[styles.magnifiedView, magnifiedContentStyle]}>
                  {children}
                </Animated.View>
              </View>
              <View style={styles.magnifierBorder} />
              <View style={styles.crosshair} />
            </Animated.View>
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  magnifier: {
    position: 'absolute',
    width: MAGNIFIER_SIZE,
    height: MAGNIFIER_SIZE,
    borderRadius: MAGNIFIER_SIZE / 2,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  magnifierContent: {
    width: MAGNIFIER_SIZE,
    height: MAGNIFIER_SIZE,
    borderRadius: MAGNIFIER_SIZE / 2,
    overflow: 'hidden',
  },
  magnifiedView: {
    width: screenWidth,
    height: screenHeight,
  },
  magnifierBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: MAGNIFIER_SIZE / 2,
    borderWidth: 3,
    borderColor: colors.primary[500],
  },
  crosshair: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    marginTop: -10,
    marginLeft: -10,
    borderWidth: 1,
    borderColor: colors.primary[600],
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
});