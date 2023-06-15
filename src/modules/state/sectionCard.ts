import type { SectionHookData } from "@hooks/useSection";
import Section from "types/Section";

interface SafeSectionHookData extends SectionHookData {
  section: Section;
}

export interface SectionCardState {
  editMode: boolean;
  menuOpened: boolean;
  dragLocked: boolean;
  showComplete: boolean;
  sortMenuOpened: boolean;
  sectionData: SafeSectionHookData;
}

export type Action =
  | { type: "SET_EDIT_MODE"; payload: boolean }
  | { type: "SET_MENU_OPENED"; payload: boolean }
  | { type: "SET_DRAG_LOCKED"; payload: boolean }
  | { type: "SET_SHOW_COMPLETE"; payload: boolean }
  | { type: "SET_SORT_MENU_OPENED"; payload: boolean }
  | { type: "SET_SECTION_DATA"; payload: SafeSectionHookData };

const initialState: SectionCardState = {
  editMode: false,
  menuOpened: false,
  dragLocked: false,
  showComplete: true,
  sortMenuOpened: false,
  sectionData: {
    section: new Section(0, {}),
    error: undefined,
    isLoading: false,
    mutate: async () => undefined,
  },
};

function reducer(state: SectionCardState, action: Action): SectionCardState {
  switch (action.type) {
    case "SET_EDIT_MODE":
      return { ...state, editMode: action.payload };
    case "SET_MENU_OPENED":
      return { ...state, menuOpened: action.payload };
    case "SET_DRAG_LOCKED":
      return { ...state, dragLocked: action.payload };
    case "SET_SHOW_COMPLETE":
      return { ...state, showComplete: action.payload };
    case "SET_SORT_MENU_OPENED":
      return { ...state, sortMenuOpened: action.payload };
    case "SET_SECTION_DATA":
      return { ...state, sectionData: action.payload };
    default:
      return state;
  }
}

export { reducer, initialState };
