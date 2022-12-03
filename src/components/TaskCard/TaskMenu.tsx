import { ActionIcon, Group, Menu } from "@mantine/core";
import {
  IconArrowUpRight,
  IconCheck,
  IconDots,
  IconEdit,
  IconTrash,
  IconX,
} from "@tabler/icons";
import { useState } from "react";
import { deleteProjectTask } from "../../api/tasks";
import { Task } from "../../types/models";

interface TaskMenuProps {
  task: Task;
  opened: boolean;
  setOpened: (value: boolean) => void;
  setEditMode: (value: boolean) => void;
  setModalOpened: (value: boolean) => void;
}

const TaskMenu = (props: TaskMenuProps) => {
  const { task, opened, setOpened, setEditMode, setModalOpened } = props;
  const [confirmDelete, setConfirmDelete] = useState<boolean>();

  return (
    <Menu
      position="left"
      opened={opened}
      onChange={setOpened}
      onClose={() => setConfirmDelete(false)}
      onOpen={() => setConfirmDelete(false)}
    >
      <Menu.Target>
        <ActionIcon size="sm" variant="filled">
          <IconDots size={17} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Task options</Menu.Label>
        <Menu.Item
          onClick={() => setModalOpened(true)}
          icon={<IconArrowUpRight size={16} />}
        >
          View
        </Menu.Item>
        <Menu.Item
          onClick={() => setEditMode(true)}
          color="blue"
          icon={<IconEdit size={16} />}
        >
          Edit
        </Menu.Item>
        <Menu.Divider />
        {confirmDelete ? (
          <Group position="center">
            <ActionIcon color="red" onClick={() => setOpened(false)}>
              <IconX size={16} />
            </ActionIcon>
            <ActionIcon
              color="green"
              onClick={() => {
                setOpened(false);
                deleteProjectTask(task.projectId, task.id);
              }}
            >
              <IconCheck size={16} />
            </ActionIcon>
          </Group>
        ) : (
          <Menu.Item
            onClick={() => setConfirmDelete(true)}
            closeMenuOnClick={false}
            color="red"
            icon={<IconTrash size={16} />}
          >
            Delete
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default TaskMenu;
