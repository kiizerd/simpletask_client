import { createContext } from "react";
import { Timer } from "types/timer";

const TimerContext = createContext({} as Timer);
export default TimerContext;
