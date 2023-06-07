import { createContext } from "react";
import { type KeyedMutator } from "swr";
import type Section from "types/Section";

interface SectionIndexContextValue {
  sections: Section[];
  mutate: KeyedMutator<Section[]>;
}

const emptySectionIndexContext: SectionIndexContextValue = {
  sections: [],
  mutate: async () => [],
};

const SectionIndexContext = createContext(emptySectionIndexContext);
export default SectionIndexContext;
