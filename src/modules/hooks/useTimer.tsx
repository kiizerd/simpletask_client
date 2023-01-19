import { calculateProgress, formatTime } from "@helpers/timerHelper";
import controller from "@state/timer";
import { useEffect, useReducer } from "react";
import timerStyles from "timer/TimerStyles";
import { Timer, TimerState } from "types/timer";

const { complete, reducer, initialState } = controller;

function createTimerState(newState: TimerState) {
  return { ...initialState, ...newState };
}

export default function useTimer() {
  const [state, dispatch] = useReducer(reducer, initialState, createTimerState);
  const { time, timerLength, isStarted, isPaused } = state;
  const { classes } = timerStyles({
    angle: state.gradientAngle,
    time: formatTime(time),
    progress: calculateProgress(state),
  });

  useEffect(() => {
    const timerRunning = isStarted && !isPaused && time >= 1;
    const tickInterval = setInterval(() => {
      if (timerRunning) controller.tick(dispatch);
    }, 1000);

    // const angleInterval = setInterval(() => {
    //   if (timerRunning) controller.angle(dispatch);
    // }, 30);

    if (time === 0) complete(dispatch, timerLength);

    return () => {
      clearInterval(tickInterval);
      // clearInterval(angleInterval);
    };
  }, [isStarted, isPaused, time]);

  return { state, dispatch, controller, classes } as Timer;
}
