import useSWR, { Fetcher } from "swr";
import { getSectionTasks } from "@api/tasks";
import Task from "types/Task";

export default function useTaskIndex(projectId: number, sectionId: number) {
  const fetcher: Fetcher<Task[], string> = () =>
    getSectionTasks(projectId, sectionId);
  const index = useSWR(`sections/${sectionId}/tasks/`, fetcher);
  const { data: tasks = [], error, isLoading, mutate } = index;

  return { tasks, error, isLoading, mutate };
}
