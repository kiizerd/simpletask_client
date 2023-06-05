import useSWR, { type Fetcher, type KeyedMutator } from "swr";
import { getSectionTasks } from "@api/tasks";
import type Task from "types/Task";

interface TaskIndexData {
  tasks: Task[];
  error: Error | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<Task[]>;
}

export default function useTaskIndex(
  projectId: number,
  sectionId: number
): TaskIndexData {
  const fetcher: Fetcher<Task[], string> = async () =>
    await getSectionTasks(projectId, sectionId);
  const index = useSWR(`sections/${sectionId}/tasks/`, fetcher);
  const { data: tasks = [], error, isLoading, mutate } = index;

  return { tasks, error, isLoading, mutate };
}
