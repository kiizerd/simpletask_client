import type { Dispatch } from "react";

interface TimerCompletions {
  work: number;
  long: number;
  short: number;
}

type TimerLength = 5 | 15 | 25;

export interface TimerState {
  time: number;
  timerLength: TimerLength;
  isPaused: boolean;
  isStarted: boolean;
  gradientAngle: number;
  completions: TimerCompletions;
}

export interface Action {
  type: string;
  payload?: TimerLength;
}

export interface TimerController {
  start: (d: Dispatch<Action>) => void;
  pause: (d: Dispatch<Action>) => void;
  resume: (d: Dispatch<Action>) => void;
  reset: (d: Dispatch<Action>) => void;
  set: (d: Dispatch<Action>, v: TimerLength) => void;
  tick: (d: Dispatch<Action>) => void;
  angle: (d: Dispatch<Action>) => void;
  complete: (d: Dispatch<Action>, v: TimerLength) => void;
  reducer: (s: TimerState, a: Action) => TimerState;
  initialState: TimerState;
}

export interface Timer {
  state: TimerState;
  dispatch: Dispatch<Action>;
  controller: TimerController;
  classes: Record<"wrapper" | "box" | "timer", string>;
}
