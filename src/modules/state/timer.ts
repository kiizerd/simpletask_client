import type { Dispatch } from "react";
import {
  Action,
  TimerCompletions,
  TimerController,
  TimerLength,
  TimerState,
} from "types/timer";

const initialState: TimerState = {
  time: 25 * 60, // 25 minutes in seconds
  isStarted: false,
  isPaused: false,
  gradientAngle: 0,
  timerLength: 25,
  completions: { work: 0, long: 0, short: 0 },
};

function start(dispatch: Dispatch<Action>) {
  dispatch({ type: "START" });
}

function pause(dispatch: Dispatch<Action>) {
  dispatch({ type: "PAUSE" });
}

function resume(dispatch: Dispatch<Action>) {
  dispatch({ type: "RESUME" });
}

function reset(dispatch: Dispatch<Action>) {
  dispatch({ type: "RESET" });
}

function set(dispatch: Dispatch<Action>, payload: TimerLength) {
  dispatch({ type: "SET", payload });
}

function tick(dispatch: Dispatch<Action>) {
  dispatch({ type: "TICK" });
}

function angle(dispatch: Dispatch<Action>) {
  dispatch({ type: "ANGLE" });
}

function complete(dispatch: Dispatch<Action>, payload: TimerLength) {
  dispatch({ type: "COMPLETE", payload });
}

const incrementCompletions = (
  oldCompletions: TimerCompletions,
  timerLength: TimerLength
): TimerCompletions => {
  if (timerLength === 5) {
    return { ...oldCompletions, short: oldCompletions.short + 1 };
  } else if (timerLength === 15) {
    return { ...oldCompletions, long: oldCompletions.long + 1 };
  } else if (timerLength === 25) {
    return { ...oldCompletions, work: oldCompletions.work + 1 };
  } else return { ...oldCompletions };
};

function reducer(state: TimerState, action: Action): TimerState {
  switch (action.type) {
    case "START":
      return { ...state, isStarted: true };
    case "PAUSE":
      return { ...state, isPaused: true };
    case "RESUME":
      return { ...state, isPaused: false };
    case "RESET":
      return {
        ...initialState,
        time: state.timerLength * 60,
        timerLength: state.timerLength,
        completions: state.completions,
      };
    case "SET":
      if (!action.payload) return { ...state };

      return {
        ...initialState,
        time: action.payload * 60,
        timerLength: action.payload as TimerLength,
        completions: state.completions,
      };
    case "TICK":
      return { ...state, time: Math.max(state.time - 1, 0) };
    case "ANGLE":
      return {
        ...state,
        gradientAngle: (state.gradientAngle + 0.314) % 360,
      };

    case "COMPLETE":
      if (!action.payload) return { ...state };

      return {
        ...state,
        completions: incrementCompletions(
          state.completions,
          action.payload as TimerLength
        ),
      };
    default:
      return state;
  }
}

const controller: TimerController = {
  start,
  pause,
  resume,
  reset,
  set,
  tick,
  angle,
  complete,
  reducer,
  initialState,
};

export default controller;
