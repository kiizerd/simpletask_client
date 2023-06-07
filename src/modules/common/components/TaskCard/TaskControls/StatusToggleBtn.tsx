import { ActionIcon } from "@mantine/core";
import { IconCheck, IconRefresh } from "@tabler/icons";
import { mutate as globalMutate } from "swr";
import { updateProjectTask } from "@api/tasks";
import useTask from "@hooks/useTask";
import Task from "types/Task";

interface StatusToggleBtnProps {
  task: Task;
}

const StatusToggleBtn = ({ task }: StatusToggleBtnProps): JSX.Element => {
  const { mutate } = useTask(task.projectId, task.id);

  const toggleCompletion = (): void => {
    task.toggleCompletion();
    const updateProjectStatus = async (): Promise<Task> => {
      const statusToggleResponse = await updateProjectTask(
        task.projectId,
        task
      );
      if (!(statusToggleResponse instanceof Task)) {
        console.error(statusToggleResponse);
        return task;
      }

      await globalMutate(task.sectionRoute);
      return task;
    };

    void mutate(updateProjectStatus);
  };

  return (
    <ActionIcon
      // color="green"
      variant="filled"
      onClick={toggleCompletion}
    >
      {task.isComplete() ? <IconRefresh size={18} /> : <IconCheck size={18} />}
    </ActionIcon>
  );
};

export default StatusToggleBtn;
