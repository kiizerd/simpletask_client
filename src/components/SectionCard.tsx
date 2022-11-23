import {
  ActionIcon,
  Box,
  Card,
  createStyles,
  Group,
  keyframes,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
import { deleteProjectSection } from "../api/sections";
import { getProjectTasks, getSectionTasks } from "../api/tasks";
import SectionForm from "../forms/SectionForm";
import EditSectionForm from "../forms/EditSectionForm";
import TaskForm from "../forms/TaskForm";
import { Section, Task } from "../types/models";
import SectionTask from "./SectionTask";

const slide = keyframes({
  "from, 0%, to": {
    opacity: 15,
    transform: "translate3D(6px, -2px, 0)",
  },
  "65%": { opacity: 80, transform: "translate3D(-3px, 1px, 0)" },
  "100%": { opacity: 100, transform: "translate3D(0, 0, 0)" },
});

const useStyles = createStyles((theme) => ({
  title: {
    animation: `${slide} 0.2s linear`,
  },
}));

interface SectionCardProps {
  projectId: number;
  update(): Promise<void>;
  section?: Section;
}

const SectionCard = ({ projectId, section, update }: SectionCardProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const editFormRef = useRef<HTMLInputElement>(null);
  const { classes } = useStyles();
  const id = section?.id || 0;

  useEffect(() => {
    getAndSetTasks();
  }, []);

  // Set edit mode to false if clicked outside form
  useEffect(() => {
    if (!editFormRef) return;

    const ref = editFormRef;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setEditMode(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editFormRef]);

  const getAndSetTasks = async () => {
    if (!section) return;

    setTasks(await getSectionTasks(projectId, section.id));
  };

  const deleteSection = async () => {
    await deleteProjectSection(projectId, id);
    update();
  };

  if (!section)
    return (
      <Card p="xs">
        <SectionForm {...{ projectId, update }} />
      </Card>
    );

  return (
    <Card p="xs">
      <LoadingOverlay visible={Boolean(!section || id == 0)} overlayBlur={2} />
      {editMode ? (
        <EditSectionForm
          ref={editFormRef}
          update={() => {
            setEditMode(false);
            update();
          }}
          {...{ section, projectId }}
        />
      ) : (
        <Group
          position="apart"
          sx={(theme) => ({
            paddingBottom: "5px",
            borderBottom: `1px solid ${theme.colors.dark[3]}`,
          })}
        >
          <Title className={classes.title} order={5}>
            {section?.name}
          </Title>

          <Group spacing="sm" my={2}>
            <ActionIcon color="blue" onClick={() => setEditMode(true)}>
              <IconEdit size={16} />
            </ActionIcon>

            <ActionIcon color="red" onClick={() => deleteSection()}>
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Group>
      )}
      <Box py={2} px="xs">
        {tasks &&
          tasks.map((task, index) => (
            <SectionTask key={index} sectionId={section.id} task={task} />
          ))}
      </Box>
      <TaskForm sectionId={section.id} update={getAndSetTasks} />
    </Card>
  );
};

export default SectionCard;
