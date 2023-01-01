import { Box } from "@mantine/core";
import { useContext, useRef } from "react";
import SectionContext from "../../contexts/SectionContext";
import TaskIndexContext from "../../contexts/TaskIndexContext";
import useTaskIndex from "../../hooks/useTaskIndex";
import TaskCard from "../TaskCard/TaskCard";
import TaskForm from "../../forms/TaskForm";

const TaskList = () => {
  const section = useContext(SectionContext);
  const { tasks = [], mutate } = useTaskIndex(section.projectId, section.id);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <TaskIndexContext.Provider value={{ tasks, mutate, ref }}>
      <Box
        ref={ref}
        my={3}
        py={3}
        style={{ maxHeight: "60vh", overflow: "scroll" }}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
      <TaskForm sectionId={section.id} />
    </TaskIndexContext.Provider>
  );
};

export default TaskList;
