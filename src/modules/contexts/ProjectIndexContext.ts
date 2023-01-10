import { createContext } from "react";
import { KeyedMutator } from "swr";
import Project from "types/Project";

interface ProjectIndexContextValue {
  projects: Project[] | undefined;
  mutate: KeyedMutator<Project[]> | undefined;
}

const ProjectIndexContext = createContext({} as ProjectIndexContextValue);
export default ProjectIndexContext;
