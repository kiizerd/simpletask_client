import { useEffect, useState } from "react";
import { Box, Card, Loader } from "@mantine/core";
import { Section, Task } from "../types/models";
import { getSectionTasks } from "../api/tasks";
import { deleteProjectSection } from "../api/sections";
import SectionCardHeader from "./SectionHeader";
import SectionTask from "./SectionTask";
import TaskForm from "../forms/TaskForm";

interface SectionCardProps {
  section: Section;
  remove(id: number): Promise<void>;
  update(id: number, newName: string): Promise<void>;
}

const SectionCard = ({ section, remove, update }: SectionCardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { id, projectId } = section;

  useEffect(() => {
    const setup = async () => {
      setTasks(await getSectionTasks(projectId, id));
    };

    setup();
  }, []);

  const deleteSection = async () => {
    await deleteProjectSection(projectId, id);
    remove(id);
  };

  const addTask = async (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <Card p="xs">
      <SectionCardHeader
        section={section}
        remove={deleteSection}
        update={update}
      />
      <Box my={3} py={2}>
        {tasks ? (
          tasks.map((task) => <SectionTask key={task.id} task={task} />)
        ) : (
          <Loader size="xs" />
        )}
      </Box>
      <TaskForm sectionId={id} add={addTask} />
    </Card>
  );
};

export default SectionCard;
