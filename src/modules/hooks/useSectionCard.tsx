import {
  type Action,
  type SectionCardState,
  initialState,
  reducer,
} from "@state/sectionCard";
import { type Dispatch, useReducer, useEffect } from "react";
import useSection from "./useSection";
import type Section from "types/Section";

interface SectionCardData {
  state: SectionCardState;
  dispatch: Dispatch<Action>;
}

// Combines the sectionCard reducer with the useSectionHook
// to provide state for the section and the UI encapsulating it
//
// `state` and `dispatch` to be split into separate Context Providers
export default function useSectionCard(_section: Section): SectionCardData {
  const { id, projectId } = _section;
  const sectionData = useSection(projectId, id);
  const { section = _section, isLoading } = sectionData;
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    sectionData: { ...sectionData, section },
  });

  // Freshen sectionData when IsLoading or section update
  useEffect(() => {
    dispatch({
      type: "SET_SECTION_DATA",
      payload: { ...sectionData, section },
    });
  }, [section, isLoading]);

  return { state, dispatch };
}
