import React, { useRef } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Easing,
  Clock,
  block,
  timing,
  cond,
  eq,
  set,
  not,
  useCode,
  startClock,
  concat,
  clockRunning,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

const SVG_CANVAS_W = width / 2;
const RADIUS = SVG_CANVAS_W / 2;
const ITEMS_SIZE = [1, 2, 3, 4];
const SUB_ITEMS_W = SVG_CANVAS_W / ITEMS_SIZE.length;

const runProgress = (clock: Clock, intialPosition: number, toValue: number) => {
  const state = {
    finished: new Animated.Value(0),
    position: new Animated.Value(intialPosition),
    frameTime: new Animated.Value(0),
    time: new Animated.Value(0),
  };

  const config = {
    toValue: new Animated.Value(toValue),
    duration: 3000,
    easing: Easing.inOut(Easing.linear),
  };

  return block([
    cond(not(clockRunning(clock)), startClock(clock)),
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.position, intialPosition),
      set(state.time, 0),
      state.position,
    ]),
    state.position,
  ]);
};

export default function SvgComponent() {
  const clock = useRef(new Clock()).current;

  const progress = useRef(new Animated.Value(0)).current;

  useCode(() => [set(progress, runProgress(clock, 0, 365))], []);

  const opacity = interpolate(progress, {
    inputRange: [270, 310, 360],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(4, 3, 4, 1)',
      }}
    >
      <View
        style={{
          width: SVG_CANVAS_W,
          height: SVG_CANVAS_W,
          borderRadius: RADIUS,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'rgba(63, 89, 64, 1)',
          overflow: 'hidden',
        }}
      >
        {[0, 1, 2].map((item) => {
          const left = SVG_CANVAS_W * (0.2 + item / 10);
          const top = SVG_CANVAS_W * (0.15 + (item * 10) / 100);
          return (
            <Animated.View
              key={item.toString()}
              style={{
                opacity,
                zIndex: 333,
                position: 'absolute',
                left,
                top,
                width: SVG_CANVAS_W * 0.06,
                height: SVG_CANVAS_W * 0.06,
                borderRadius: (SVG_CANVAS_W * 0.06) / 2,
                backgroundColor: 'rgba(255, 199, 35, 1)',
              }}
            />
          );
        })}
        {ITEMS_SIZE.map((item) => {
          const size = SUB_ITEMS_W * item;
          return (
            <View
              key={item.toString()}
              style={{
                position: 'absolute',
                top: RADIUS - size / 2,
                left: RADIUS - size / 2,
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'rgba(63, 89, 64, 1)',
                zIndex: 3333,
              }}
            />
          );
        })}

        <Animated.View
          style={{
            position: 'absolute',
            left: RADIUS / 2,
            backgroundColor: '#fff',
            width: 0,
            height: 0,
            borderLeftWidth: RADIUS / 2,
            borderRightWidth: RADIUS / 2,
            borderTopWidth: RADIUS,
            borderTopColor: 'rgba(33, 199, 35, .9)',
            transform: [
              { translateY: RADIUS / 2 },
              { rotate: concat(progress, 'deg') },
              { translateY: -(RADIUS / 2) },
            ],
          }}
        />
      </View>
    </View>
  );
}
