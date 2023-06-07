import useSWR from "swr";
import { getProjectTask as getTask } from "@api/tasks";
import type { KeyedMutator, Fetcher, Key } from "swr";
import type Task from "types/Task";

interface TaskHookData {
  task: Task | undefined;
  error: Error | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<Task>;
}

export default function useTask(
  projectId: number,
  taskId: number
): TaskHookData {
  const ids = [projectId, taskId] as const;
  const key: Key = `projects/${projectId}/tasks/${taskId}`;
  const fetcher: Fetcher<Task, string> = async () => await getTask(...ids);
  const response = useSWR(key, fetcher);
  const { data: task, error, isLoading, mutate } = response;

  return { task, error, isLoading, mutate };
}
