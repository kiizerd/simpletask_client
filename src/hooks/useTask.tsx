import useSWR, { Fetcher, Key } from "swr";
import { getProjectTask as getTask } from "../api/tasks";
import Task from "../types/Task";

export default function useTask(projectId: number, taskId: number) {
  const ids = [projectId, taskId] as const;
  const key: Key = `projects/${projectId}/tasks/${taskId}`;
  const fetcher: Fetcher<Task, string> = () => getTask(...ids);
  const response = useSWR(key, fetcher);
  const { data: task, error, isLoading, mutate } = response;

  return { task, error, isLoading, mutate };
}
