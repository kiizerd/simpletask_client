import useSWR, { Fetcher } from "swr";
import { getAllProjects } from "@api/projects";
import Project from "types/Project";

export default function useProjectIndex() {
  const fetcher: Fetcher<Project[], string> = () => getAllProjects();
  const index = useSWR("projects/", fetcher);

  const { data: projects = [], error, isLoading, mutate } = index;

  return { projects, error, isLoading, mutate };
}
