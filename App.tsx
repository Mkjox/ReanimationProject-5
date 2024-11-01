import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const { width: SIZE } = Dimensions.get('window')

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function App() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const doubleTapRef = useRef();

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: Math.max(scale.value, 0) }
    ]
  }));

  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(0));
      }
    });
  }, []);

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(1));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <TapGestureHandler
          waitFor={doubleTapRef}
          onActivated={onSingleTap}
        >
          <TapGestureHandler
            maxDelayMs={250}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}>
            <Animated.View style={styles.container}>
              <ImageBackground source={require('./assets/image.jpeg')} style={styles.image}>
                <AnimatedImage
                  source={require('./assets/heart.png')}
                  style={[
                    styles.image,
                    {
                      shadowOffset: { width: 0, height: 20 },
                      shadowOpacity: 0.35,
                      shadowRadius: 35
                    },
                    rStyle
                  ]}
                  resizeMode='center' />
              </ImageBackground>
              <Animated.Text style={[styles.moyai, rTextStyle]}>🗿🗿🗿🗿</Animated.Text>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE
  },
  moyai: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 35
  }
});
