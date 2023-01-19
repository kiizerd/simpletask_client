import { TimerState } from "@state/timer";

export const calculateProgress = (timer: TimerState) => {
  return (timer.time * 100) / (timer.timerLength * 60);
};

export const formatTime = (time: number): string => {
  const seconds = time % 60;
  const secondsString = String(seconds > 9 ? seconds : `0${seconds}`);
  const minutes = Math.floor(time / 60);
  const minutesString = String(minutes > 9 ? minutes : `0${minutes}`);

  return `${minutesString}:${secondsString}`;
};
