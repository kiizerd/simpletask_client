import useSWR from "swr";
import { getProjectSections } from "@api/sections";
import type { KeyedMutator, Fetcher } from "swr";
import type Section from "types/Section";

interface SectionIndexData {
  sections: Section[];
  error: Error | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<Section[]>;
}

export default function useSectionIndex(projectId: number): SectionIndexData {
  const fetcher: Fetcher<Section[], string> = async () =>
    await getProjectSections(projectId);
  const index = useSWR(`projects/${projectId}/sections/`, fetcher);
  const { data: sections = [], error, isLoading, mutate } = index;

  return { sections, error, isLoading, mutate };
}
