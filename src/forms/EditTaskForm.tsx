import { Box, Button, Stack } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { updateProjectTask } from "../api/tasks";
import TaskIndexContext from "../contexts/TaskIndexContext";
import TaskInput from "../components/TaskList/TaskInput";
import Task from "../types/Task";
import { validate } from "./TaskForm";
import taskFormStyles from "../styles/TaskFormStyles";
import { errorTimeout } from "../helpers/formHelpers";

interface EditTaskForm {
  task: Task;
  setEditMode(value: boolean): void;
}

const EditTaskForm = ({ task, setEditMode }: EditTaskForm) => {
  const { id, name, projectId } = task;
  const { tasks = [], mutate } = useContext(TaskIndexContext);
  const { classes } = taskFormStyles();

  const clickRef = useClickOutside(() => setEditMode(false));
  const form = useForm({ initialValues: { name }, validate });

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
    });

    setEditMode(false);
  };

  return (
    <form
      style={{ top: 0, zIndex: 250, width: "100%", position: "absolute" }}
      onSubmit={form.onSubmit(submit)}
    >
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
  );
};

export default EditTaskForm;
