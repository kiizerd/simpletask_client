import { Group } from "@mantine/core";
import { useState } from "react";
import type Task from "types/Task";
import TaskMenu from "./TaskMenu";
import StatusToggleBtn from "./StatusToggleBtn";

interface TaskControlsProps {
  task: Task;
  hovered: boolean;
  className: string;
  setEditMode: (value: boolean) => void;
}

const TaskControls = ({
  task,
  hovered,
  className,
  setEditMode,
}: TaskControlsProps): JSX.Element => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  return (
    <Group
      className={className}
      data-complete={task.isComplete()}
      spacing="xs"
      // Hide buttons unless hovering card or menu is open
      sx={{ opacity: hovered || menuOpened ? 100 : 0 }}
    >
      <StatusToggleBtn task={task} />
      {/* Vertical Dots Icon */}
      <TaskMenu
        task={task}
        opened={menuOpened}
        setOpened={setMenuOpened}
        setEditMode={setEditMode}
      />
    </Group>
  );
};

export default TaskControls;
