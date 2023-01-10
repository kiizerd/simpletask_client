import useSWR, { Fetcher } from "swr";
import { getProjectSections } from "@api/sections";
import Section from "types/Section";

export default function useSectionIndex(projectId: number) {
  const fetcher: Fetcher<Section[], string> = () =>
    getProjectSections(projectId);
  const index = useSWR(`projects/${projectId}/sections/`, fetcher);
  const { data: sections = [], error, isLoading, mutate } = index;

  return { sections, error, isLoading, mutate };
}
