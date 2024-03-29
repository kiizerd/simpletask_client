import useSWR, { type Fetcher, type KeyedMutator } from "swr";
import { getProject } from "@api/projects";
import type Project from "types/Project";

export interface ProjectHookData {
  project: Project | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<Project>;
}

export default function useProject(projectId: number): ProjectHookData {
  const getId = (key: string): number => Number(key.split("/")[1]);
  const fetcher: Fetcher<Project, string> = async (key) =>
    await getProject(getId(key));
  const response = useSWR(`projects/${projectId}`, fetcher);
  const { data: project, error, isLoading, mutate } = response;

  return { project, error, isLoading, mutate };
}
