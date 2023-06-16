import useSWR, { type Key, type Fetcher, type KeyedMutator } from "swr";
import { getProjectSection as getSection } from "@api/sections";
import type Section from "types/Section";

export interface SectionHookData {
  section: undefined | Section;
  error: undefined | Error;
  isLoading: boolean;
  mutate: KeyedMutator<Section>;
}

export default function useSection(
  projectId: number,
  sectionId: number
): SectionHookData {
  const ids = [projectId, sectionId] as const;
  const key: Key = `projects/${projectId}/sections/${sectionId}`;
  // Converts array into `readonly` tuple`
  const fetcher: Fetcher<Section, string> = async () => await getSection(...ids);
  const response = useSWR(key, fetcher);
  const { data: section, error, isLoading, mutate } = response;

  return { section, error, isLoading, mutate };
}
