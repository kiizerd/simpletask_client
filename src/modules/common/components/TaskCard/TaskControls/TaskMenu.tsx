import { useContext, useEffect, useState } from "react";
import { ActionIcon, Group, Menu } from "@mantine/core";
import {
  IconCheck,
  IconDots,
  IconEdit,
  IconInfoCircle,
  IconTrash,
  IconX,
} from "@tabler/icons";
import { deleteProjectTask } from "@api/tasks";
import TaskIndexContext from "@contexts/TaskIndexContext";
import TaskModal from "./TaskModal";
import type Task from "types/Task";

interface TaskMenuProps {
  task: Task;
  opened: boolean;
  setOpened: (value: boolean) => void;
  setEditMode: (value: boolean) => void;
}

const TaskMenu = (props: TaskMenuProps): JSX.Element => {
  const { task, opened, ...setters } = props;
  const { id, projectId } = task;
  const { setOpened, setEditMode } = setters;
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const { tasks = [], mutate } = useContext(TaskIndexContext);

  useEffect(() => {
    setConfirmDelete(false);
  }, [opened, modalOpened]);

  const deleteTask = async (): Promise<void> => {
    if (!mutate) {
      console.error("No SWR mutate method found");
      return;
    }

    setOpened(false);
    const optimisticData = tasks.filter((task) => id !== task.id);
    await deleteProjectTask(projectId, id);
    await mutate(optimisticData, { optimisticData, populateCache: true });
  };

  return (
    <Menu withinPortal position="left" opened={opened} onChange={setOpened}>
      <TaskModal task={task} opened={modalOpened} setOpened={setModalOpened} />
      <Menu.Target>
        <ActionIcon variant="filled">
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Task options</Menu.Label>
        <Menu.Item
          onClick={() => {
            setModalOpened(true);
          }}
          icon={<IconInfoCircle size={16} />}
        >
          Info
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setEditMode(true);
          }}
          color="blue"
          icon={<IconEdit size={16} />}
        >
          Edit
        </Menu.Item>
        <Menu.Divider />
        {confirmDelete ? (
          <Group position="center" py={4}>
            <ActionIcon
              color="red"
              onClick={() => {
                setOpened(false);
              }}
            >
              <IconX size={16} />
            </ActionIcon>

            <ActionIcon
              color="green"
              onClick={() => {
                void deleteTask();
              }}
            >
              <IconCheck size={16} />
            </ActionIcon>
          </Group>
        ) : (
          <Menu.Item
            onClick={() => {
              setConfirmDelete(true);
            }}
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
