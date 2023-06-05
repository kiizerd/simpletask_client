import useSWR, { type KeyedMutator, type Fetcher } from "swr";
import { getAllProjects } from "@api/projects";
import type Project from "types/Project";

interface ProjectIndexData {
  projects: Project[];
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<Project[]>;
}

export default function useProjectIndex(): ProjectIndexData {
  const fetcher: Fetcher<Project[], string> = async (): Promise<Project[]> =>
    await getAllProjects();
  const index = useSWR("projects/", fetcher);

  const { data: projects = [], error, isLoading, mutate } = index;

  return { projects, error, isLoading, mutate };
}
