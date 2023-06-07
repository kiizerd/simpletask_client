import { useContext, useEffect } from "react";
import { Box, Button, Portal, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { updateProjectTask } from "@api/tasks";
import TaskIndexContext from "@contexts/TaskIndexContext";
import { errorTimeout } from "@helpers/formHelpers";
import { mutate as globalMutate } from "swr";
import taskFormStyles from "./TaskFormStyles";
import TaskInput from "./TaskInput";
import { validate } from "./TaskForm";
import Task from "types/Task";

interface EditTaskFormProps {
  task: Task;
  setEditMode: (value: boolean) => void;
}

const portalContainer = document.createElement("div");
portalContainer.style.top = "0";
portalContainer.style.zIndex = "300";
portalContainer.style.position = "absolute";
document.body.appendChild(portalContainer);

const EditTaskForm = ({
  task,
  setEditMode,
}: EditTaskFormProps): JSX.Element => {
  const { id, name, projectId } = task;
  const { tasks = [], mutate } = useContext(TaskIndexContext);
  const { classes } = taskFormStyles();

  const clickRef = useClickOutside(() => {
    setEditMode(false);
  });
  const form = useForm({ initialValues: { name }, validate });

  useEffect(() => {
    Array.from(document.querySelectorAll(".task-card")).forEach((child) => {
      if (child.getAttribute("data-task-id") === `${id}`) {
        const taskCardRect = child.getBoundingClientRect();
        portalContainer.style.top = `${taskCardRect.top}px`;
        portalContainer.style.left = `${taskCardRect.left}px`;
        portalContainer.style.width = `${taskCardRect.width}px`;
      }
    });
  }, []);

  const submit = async (formValues: Partial<Task>): Promise<void> => {
    if (!mutate) {
      console.error("No SWR mutate method found.");
      return;
    }

    const newTask = new Task(id, { ...task, ...formValues });
    const updateResponse = await updateProjectTask(projectId, newTask);

    // Revalidate if response is not a Task object, indicating failure from server
    if (!(updateResponse instanceof Task)) {
      // Set errors from server if client validation succeeds
      form.setErrors({ name: updateResponse.messages?.name?.join("\n") });
      console.debug(updateResponse);

      return;
    }
    await mutate(tasks?.map((task) => (task.id === id ? newTask : task)));

    // Mutate actual task
    await globalMutate(task.route, newTask, {
      optimisticData: newTask,
    });

    setEditMode(false);
  };

  return (
    <Portal target={portalContainer}>
      <form
        className={classes.editForm}
        onSubmit={form.onSubmit((formValues) => {
          void submit(formValues);
        })}
      >
        <Stack ref={clickRef} spacing={3}>
          <TaskInput
            focused
            setFocused={() => null}
            formProps={form.getInputProps("name")}
          />
          <Box pt={4} px="md">
            <Button
              className={classes.button}
              type="submit"
              w="100%"
              compact
              onClick={() => {
                errorTimeout(form);
              }}
            >
              Update
            </Button>
          </Box>
        </Stack>
      </form>
    </Portal>
  );
};

export default EditTaskForm;
