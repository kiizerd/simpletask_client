import { useContext, useEffect } from "react";
import { Box, Button, Portal, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { updateProjectTask } from "@api/tasks";
import TaskIndexContext from "@contexts/TaskIndexContext";
import { errorTimeout } from "@helpers/formHelpers";
import useMatchMutate from "@hooks/useMatchMutate";
import taskFormStyles from "./TaskFormStyles";
import TaskInput from "./TaskInput";
import { validate } from "./TaskForm";
import Task from "types/Task";

interface EditTaskForm {
  task: Task;
  setEditMode(value: boolean): void;
}

const portalContainer = document.createElement("div");
portalContainer.style.top = "0";
portalContainer.style.zIndex = "300";
portalContainer.style.position = "absolute";
document.body.appendChild(portalContainer);

const EditTaskForm = ({ task, setEditMode }: EditTaskForm) => {
  const { id, name, projectId } = task;
  const { tasks = [], mutate, ref } = useContext(TaskIndexContext);
  const { classes } = taskFormStyles();
  const matchMutate = useMatchMutate();

  const clickRef = useClickOutside(() => setEditMode(false));
  const form = useForm({ initialValues: { name }, validate });

  useEffect(() => {
    if (ref.current) {
      Array.from(ref.current.children).forEach((child) => {
        if (child.getAttribute("data-task-id") == `${id}`) {
          const taskCardRect = child.getBoundingClientRect();
          portalContainer.style.top = `${taskCardRect.top}px`;
          portalContainer.style.left = `${taskCardRect.left}px`;
          portalContainer.style.width = `${taskCardRect.width}px`;
        }
      });
    }
  }, [ref.current]);

  const submit = async (formValues: Partial<Task>) => {
    if (!mutate) return console.error("No SWR mutate method found.");

    const newTask = new Task(id, { ...task, ...formValues });
    const optimisticData = tasks.map((task) =>
      task.id === id ? newTask : task
    );

    const applyTaskUpdate = async () => {
      const updated = await updateProjectTask(projectId, newTask);
      return tasks.map((task) => (task.id == id ? updated : task));
    };

    await mutate(applyTaskUpdate, {
      optimisticData,
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });

    await matchMutate(task.route);

    setEditMode(false);
  };

  return (
    <Portal target={portalContainer}>
      <form className={classes.editForm} onSubmit={form.onSubmit(submit)}>
        <Stack ref={clickRef} spacing={3}>
          <TaskInput
            focused
            setFocused={() => null}
            {...form.getInputProps("name")}
          />
          <Box pt={4} px="md">
            <Button
              className={classes.button}
              type="submit"
              w="100%"
              compact
              onClick={() => errorTimeout(form)}
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
