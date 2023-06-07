import { calculateProgress, formatTime } from "@helpers/timerHelper";
import controller from "@state/timer";
import { useEffect, useReducer } from "react";
import timerStyles from "timer/TimerStyles";
import { type Timer } from "types/timer";

const { complete, reducer, initialState } = controller;

export default function useTimer(): Timer {
  const [state, dispatch] = useReducer(reducer, initialState);
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

  return { state, dispatch, controller, classes };
}
