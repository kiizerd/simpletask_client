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
import { getProjectSection } from "@api/sections";
import TaskIndexContext from "@contexts/TaskIndexContext";
import useMatchMutate from "@hooks/useMatchMutate";
import TaskModal from "./TaskModal";
import Task from "types/Task";

interface TaskMenuProps {
  task: Task;
  opened: boolean;
  setOpened(value: boolean): void;
  setEditMode(value: boolean): void;
}

const TaskMenu = (props: TaskMenuProps) => {
  const { task, opened, ...setters } = props;
  const { id, projectId } = task;
  const { setOpened, setEditMode } = setters;
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const { tasks = [], mutate } = useContext(TaskIndexContext);
  const matchMutate = useMatchMutate();

  useEffect(() => {
    setConfirmDelete(false);
  }, [opened, modalOpened]);

  const deleteTask = async () => {
    if (!mutate) return console.error("No SWR mutate method found");

    setOpened(false);
    await mutate(deleteProjectTask(projectId, id), {
      optimisticData: tasks.filter((task) => id != task.id),
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });

    await matchMutate(
      task.sectionRoute,
      () => getProjectSection(projectId, task.sectionId),
      { revalidate: false }
    );
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
          onClick={() => setModalOpened(true)}
          icon={<IconInfoCircle size={16} />}
        >
          Info
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
          <Group position="center" py={4}>
            <ActionIcon color="red" onClick={() => setOpened(false)}>
              <IconX size={16} />
            </ActionIcon>

            <ActionIcon color="green" onClick={deleteTask}>
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
