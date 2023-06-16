import {
  type Action,
  type SectionCardState,
  initialState,
} from "@state/sectionCard";
import { type Dispatch, createContext } from "react";

export const SectionContext = createContext<SectionCardState>(initialState);
export const SectionDispatchContext = createContext<Dispatch<Action>>(() => {});
