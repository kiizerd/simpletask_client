import { createContext } from "react";
import controller from "@state/timer";
import type { Timer } from "types/timer";

const emptyTimer: Timer = {
  state: controller.initialState,
  dispatch: () => {},
  controller,
  classes: { wrapper: "", box: "", timer: "" },
};

const TimerContext = createContext(emptyTimer);
export default TimerContext;
