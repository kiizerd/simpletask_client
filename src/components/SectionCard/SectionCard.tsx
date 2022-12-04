import { Box, Card, Loader } from "@mantine/core";
import { deleteProjectSection } from "../../api/sections";
import SectionCardHeader from "./SectionHeader";
import TaskCard from "../TaskCard/TaskCard";
import TaskForm from "../../forms/TaskForm";
import useSection from "../../hooks/useSection";
import { Section } from "../../types/models";

interface SectionCardProps {
  section: Section;
  remove(id: number): Promise<void>;
  update(id: number, newName: string): Promise<void>;
}

const SectionCard = (props: SectionCardProps) => {
  // Use section from project to keep state fresh
  const { remove, update } = props;
  const { projectId, id: sectionId } = props.section;
  //  use tasks from sections for same reason
  const { section, ...taskControls } = useSection(projectId, sectionId);
  const { addTask, updateTask, removeTask } = taskControls;

  if (!section || !section?.tasks) return <Loader />;

  const { id, tasks } = section;

  const deleteSection = async () => {
    await deleteProjectSection(projectId, id);
    remove(id);
  };

  return (
    <Card p="xs">
      <SectionCardHeader
        section={props.section}
        remove={deleteSection}
        update={update}
      />
      <Box my={3} py={2}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            update={updateTask}
            remove={removeTask}
          />
        ))}
      </Box>
      <TaskForm sectionId={id} add={addTask} />
    </Card>
  );
};

export default SectionCard;
