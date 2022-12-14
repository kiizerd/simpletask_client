import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { getAllProjects } from "../api/api";
import { Project } from "../types/models";

export default function useIndex() {
  const [projects, setProjects] = useState<Project[]>([]);
  const fetcher: Fetcher<Project[], string> = () => getAllProjects();
  const index = useSWR("projectIndex", fetcher);

  const { data, error, isLoading, mutate } = index;

  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  const refresh = () => mutate();

  return { projects, error, isLoading, refresh };
}
