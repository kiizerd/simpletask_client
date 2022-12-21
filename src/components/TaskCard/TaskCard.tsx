import { ActionIcon, Box, Card, Group, Text } from "@mantine/core";
import { IconCheck, IconInfoCircle } from "@tabler/icons";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import Task from "../../types/Task";
import taskCardStyles from "../../styles/TaskCardStyles";
import EditTaskForm from "../../forms/EditTaskForm";
import TaskModal from "./TaskModal";
import TaskMenu from "./TaskMenu";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>();
  const { hovered, ref: hoverRef } = useHover();
  const { classes } = taskCardStyles();

  return (
    <Box style={{ position: "relative" }}>
      <TaskModal task={task} opened={modalOpened} setOpened={setModalOpened} />
      <Card p="xs" className={classes.card} ref={hoverRef}>
        <Group
          position="apart"
          align="flex-start"
          style={{ opacity: editMode ? 0 : 100 }}
        >
          <Box>
            <Text
              // Prevent animation on first render
              className={editMode === undefined ? "" : classes.text}
              // Make text outside form invisible when editing
              style={editMode ? { opacity: 0 } : undefined}
            >
              {task.name}
            </Text>
          </Box>
          <Group
            className={classes.taskControls}
            spacing="xs"
            // Hide buttons unless hovering card or menu is open
            sx={{ opacity: hovered || menuOpened ? 100 : 0 }}
          >
            <ActionIcon color="green" size="sm">
              <IconCheck size={17} />
            </ActionIcon>
            <ActionIcon
              size="sm"
              variant="filled"
              onClick={() => setModalOpened(true)}
            >
              <IconInfoCircle size={17} />
            </ActionIcon>

            {/* Vertical Dots Icon */}
            <TaskMenu
              task={task}
              opened={menuOpened}
              setOpened={setMenuOpened}
              setEditMode={setEditMode}
              setModalOpened={setModalOpened}
            />
          </Group>
        </Group>
      </Card>
      {editMode && <EditTaskForm task={task} setEditMode={setEditMode} />}
    </Box>
  );
};

export default TaskCard;
