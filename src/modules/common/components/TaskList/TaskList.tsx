import { useContext } from "react";
import { Box, Divider } from "@mantine/core";
import TaskForm from "@forms/Task";
import { SectionContext } from "@contexts/SectionContext";
import TaskIndexContext from "@contexts/TaskIndexContext";
import useTaskIndex from "@hooks/useTaskIndex";
import TaskCard from "../TaskCard";

const TaskList = (): JSX.Element => {
  const {
    showComplete,
    sectionData: { section },
  } = useContext(SectionContext);
  const { tasks = [], mutate } = useTaskIndex(section.projectId, section.id);

  return (
    <TaskIndexContext.Provider value={{ tasks, mutate }}>
      <Box className="task-list">
        {tasks.map((task) =>
          !showComplete && task.isComplete() ? null : (
            <TaskCard key={task.id} task={task} />
          )
        )}
      </Box>
      <Divider />
      <TaskForm ids={[section.projectId, section.id]} />
    </TaskIndexContext.Provider>
  );
};

export default TaskList;
