import { createContext } from "react";
import { type KeyedMutator } from "swr";
import type Project from "types/Project";

interface ProjectIndexContextValue {
  projects: Project[];
  mutate: KeyedMutator<Project[]>;
}

const emptyProjectIndexContext: ProjectIndexContextValue = {
  projects: [],
  mutate: async () => [],
};

const ProjectIndexContext = createContext(emptyProjectIndexContext);
export default ProjectIndexContext;
