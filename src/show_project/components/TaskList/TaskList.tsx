import { useContext, useRef } from "react";
import { Box } from "@mantine/core";
import TaskForm from "@forms/Task";
import SectionContext from "@contexts/SectionContext";
import TaskIndexContext from "@contexts/TaskIndexContext";
import useTaskIndex from "@hooks/useTaskIndex";
import TaskCard from "../TaskCard/TaskCard";

const TaskList = () => {
  const section = useContext(SectionContext);
  const { tasks = [], mutate } = useTaskIndex(section.projectId, section.id);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <TaskIndexContext.Provider value={{ tasks, mutate, ref }}>
      <Box ref={ref} style={{ maxHeight: "60vh", overflow: "scroll" }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
      <TaskForm sectionId={section.id} />
    </TaskIndexContext.Provider>
  );
};

export default TaskList;
