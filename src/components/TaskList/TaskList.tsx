import { Box } from "@mantine/core";
import { useContext } from "react";
import SectionContext from "../../contexts/SectionContext";
import TaskIndexContext from "../../contexts/TaskIndexContext";
import useTaskIndex from "../../hooks/useTaskIndex";
import TaskCard from "../TaskCard/TaskCard";
import TaskForm from "../../forms/TaskForm";

const TaskList = () => {
  const section = useContext(SectionContext);
  const { tasks = [], mutate } = useTaskIndex(section.projectId, section.id);

  return (
    <TaskIndexContext.Provider value={{ tasks, mutate }}>
      <Box my={3} py={2}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
      <TaskForm sectionId={section.id} />
    </TaskIndexContext.Provider>
  );
};

export default TaskList;
