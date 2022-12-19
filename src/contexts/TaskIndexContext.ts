import { createContext } from "react";
import { KeyedMutator } from "swr";
import Task from "../types/Task";

interface TaskIndexContextValue {
  tasks: Task[] | undefined;
  mutate: KeyedMutator<Task[]> | undefined;
}

const TaskIndexContext = createContext({} as TaskIndexContextValue);
export default TaskIndexContext;
