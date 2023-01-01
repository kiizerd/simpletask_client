import { createContext, MutableRefObject } from "react";
import { KeyedMutator } from "swr";
import Task from "../types/Task";

interface TaskIndexContextValue {
  tasks: Task[] | undefined;
  mutate: KeyedMutator<Task[]> | undefined;
  ref: MutableRefObject<HTMLDivElement | null>
}

const TaskIndexContext = createContext({} as TaskIndexContextValue);
export default TaskIndexContext;
