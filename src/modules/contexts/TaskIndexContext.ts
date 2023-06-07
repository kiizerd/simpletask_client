import { createContext } from "react";
import type { KeyedMutator } from "swr";
import type Task from "types/Task";

interface TaskIndexContextValue {
  tasks: Task[];
  mutate: KeyedMutator<Task[]>;
}

const emptyTaskIndexContext: TaskIndexContextValue = {
  tasks: [],
  mutate: async () => [],
};

const TaskIndexContext = createContext(emptyTaskIndexContext);
export default TaskIndexContext;
