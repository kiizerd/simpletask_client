import { createContext } from "react";
import { KeyedMutator } from "swr";
import Section from "types/Section";

interface SectionIndexContextValue {
  sections: Section[] | undefined;
  mutate: KeyedMutator<Section[]> | undefined;
}

const SectionIndexContext = createContext({} as SectionIndexContextValue);
export default SectionIndexContext;
