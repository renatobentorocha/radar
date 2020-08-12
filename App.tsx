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
  debug,
  clockRunning,
  stopClock,
  interpolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

const SVG_CANVAS_W = width / 2;
const RADIUS = SVG_CANVAS_W / 2;

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

export default function SvgComponent(props) {
  const clock = useRef(new Clock()).current;

  const progress_line_1 = useRef(new Animated.Value(0)).current;
  const progress_line_2 = useRef(new Animated.Value(0)).current;

  useCode(
    () => [
      set(progress_line_1, runProgress(clock, 0, 365)),
      set(progress_line_2, runProgress(clock, 45, 410)),
    ],
    []
  );

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
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: RADIUS,
            height: StyleSheet.hairlineWidth,
            width: RADIUS,
            backgroundColor: 'rgba(63, 89, 64, 1)',
            transform: [
              { translateX: RADIUS / 2 },
              { rotate: concat(progress_line_1, 'deg') },
              { translateX: -(RADIUS / 2) },
            ],
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            top: RADIUS,
            height: StyleSheet.hairlineWidth,
            width: RADIUS,
            backgroundColor: 'rgba(63, 89, 64, 1)',
            transform: [
              { translateX: RADIUS / 2 },
              { rotate: concat(progress_line_2, 'deg') },
              { translateX: -(RADIUS / 2) },
            ],
          }}
        />
      </View>
      {/* <Svg
        height={SVG_CANVAS_H}
        width={SVG_CANVAS_W}
        viewBox={`0 0 ${SVG_CANVAS_W * 1.06} ${SVG_CANVAS_H * 1.06}`}
        {...props}
        style={{ borderWidth: 1, borderColor: 'red' }}
      > */}
      {/* <Circle
          translateX={RADIUS * 1.06}
          translateY={SVG_CANVAS_H / 2}
          r={RADIUS}
          stroke="rgba(63, 89, 64, 1)"
          strokeWidth={StyleSheet.hairlineWidth}
        />
        <View
          style={{
            position: 'absolute',
            top: SVG_CANVAS_H / 2 - StyleSheet.hairlineWidth,
            height: StyleSheet.hairlineWidth,
            width: RADIUS,
            transform: [
              // { translateX: (RADIUS * 1.06 - StyleSheet.hairlineWidth) / 2 },
              { translateX: RADIUS * 0.06 },
              { translateX: RADIUS / 2 },
              { rotate: '90deg' },

              { translateX: RADIUS / -2 },
              { translateX: RADIUS * -0.06 },
              // { translateX: (-RADIUS * 1.06 - StyleSheet.hairlineWidth) / 2 },
            ],
            backgroundColor: 'rgba(33, 199, 35, 1)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: SVG_CANVAS_H / 2,
            height: StyleSheet.hairlineWidth,
            width: RADIUS * 1.06 - StyleSheet.hairlineWidth,
            transform: [
              { translateX: (RADIUS * 1.06) / 2 },
              { rotate: '45deg' },
              { translateX: (-RADIUS * 1.06) / 2 },
            ],
            backgroundColor: 'rgba(255, 100, 0, 1)',
          }}
        /> */}
      {/* <Circle
          cx="50"
          cy="50"
          r="35"
          stroke="rgba(63, 89, 64, 1)"
          strokeWidth={StyleSheet.hairlineWidth}
        />
        <Circle
          cx="50"
          cy="50"
          r="25"
          stroke="rgba(63, 89, 64, 1)"
          strokeWidth={StyleSheet.hairlineWidth}
        />
        <Circle
          cx="50"
          cy="50"
          r="15"
          stroke="rgba(63, 89, 64, 1)"
          strokeWidth={StyleSheet.hairlineWidth}
        />
        <View
          style={{
            position: 'absolute',
            top: SVG_CANVAS_H / 2,
            height: StyleSheet.hairlineWidth,
            width: 30,
            backgroundColor: 'rgba(33, 199, 35, 1)',
          }}
        /> */}
      {/* <Line
          x1="0"
          y1="50"
          x2="90"
          y2="50"
          stroke="rgba(33, 199, 35, 1)"
          strokeWidth={StyleSheet.hairlineWidth}
          translateX={5}
        />
        <Line
          x1="0"
          y1="80"
          x2="90"
          y2="80"
          stroke="rgba(33, 199, 35, 1)"
          strokeWidth={StyleSheet.hairlineWidth}
        /> */}
      {/* </Svg> */}
    </View>
  );
}
