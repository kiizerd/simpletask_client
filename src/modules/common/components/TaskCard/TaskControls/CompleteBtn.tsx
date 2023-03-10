import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconCheck, IconRefresh } from "@tabler/icons";
import { KeyedMutator, mutate as globalMutate } from "swr";
import { updateProjectTask } from "@api/tasks";
import useTask from "@hooks/useTask";
import Task from "types/Task";

interface CompleteBtnProps {
  task: Task;
}

const toggleCompletion = async (
  task: Task,
  mutate: KeyedMutator<Task>,
  setter: (value: boolean) => void
) => {
  setter(task.toggleCompletion() === "complete");
  const newTask = await updateProjectTask(task.projectId, task);
  await mutate(newTask);
  await globalMutate(`projects/${task.projectId}/sections/${task.sectionId}`);
};

const CompleteBtn = ({ task }: CompleteBtnProps) => {
  const [isComplete, setIsComplete] = useState<boolean>(task.isComplete());
  const { mutate } = useTask(task.projectId, task.id);

  return (
    <ActionIcon
      // color="green"
      variant="filled"
      onClick={() => toggleCompletion(task, mutate, setIsComplete)}
    >
      {isComplete ? <IconRefresh size={18} /> : <IconCheck size={18} />}
    </ActionIcon>
  );
};

export default CompleteBtn;
