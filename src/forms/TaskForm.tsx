import { ActionIcon, Box, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { createProjectTask } from "../api/tasks";
import TaskInput from "../components/TaskList/TaskInput";
import TaskIndexContext from "../contexts/TaskIndexContext";
import { errorTimeout } from "../helpers/formHelpers";
import useMatchMutate from "../hooks/useMatchMutate";
import taskFormStyles from "../styles/TaskFormStyles";
import Task from "../types/Task";

interface TaskFormProps {
  sectionId: number;
}

interface TaskFormValues {
  name: string;
}

const nameValidation = (name: string) => {
  const len = name.length;
  if (len == 0) return "Name is required.";

  const tooShortMsg = `Name too short.\n Min 3 chars, currently ${len}.`;
  if (len <= 2) return tooShortMsg;

  const tooLongMsg = `Name too long.\n Max 60 chars, currently ${len}.`;
  if (len > 60) return tooLongMsg;

  return null;
};

export const validate = { name: nameValidation };

const TaskForm = ({ sectionId }: TaskFormProps) => {
  const projectId = Number(useLoaderData());
  const [focused, setFocused] = useState<boolean | undefined>();
  const { tasks = [], mutate } = useContext(TaskIndexContext);
  const matchMutate = useMatchMutate();
  const { classes } = taskFormStyles();

  const form = useForm({ initialValues: { name: "" }, validate });
  const clickRef = useClickOutside(() => {
    if (focused != undefined) setFocused(false);
    form.clearErrors();
  });

  const submit = async (formValues: TaskFormValues) => {
    if (!mutate) return console.error("No SWR mutate method found.");

    const taskData = { sectionId, projectId, ...formValues };
    const newTask = await createProjectTask(projectId, taskData);
    await mutate([...tasks, newTask], {
      optimisticData: [...tasks, new Task(0, taskData)],
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });

    await matchMutate(newTask.sectionRoute);

    form.setValues({ name: "" });
  };

  return (
    <form
      onSubmit={form.onSubmit(submit)}
      style={{ width: "100%", position: "relative" }}
    >
      <Flex gap="sm" ref={clickRef}>
        <TaskInput
          focused={focused}
          setFocused={setFocused}
          {...form.getInputProps("name")}
        />
        <Box display={focused ? "" : "none"} className={classes.button} pt={4}>
          <ActionIcon
            variant="filled"
            color="violet"
            type="submit"
            onClick={() => errorTimeout(form)}
          >
            <IconPlus />
          </ActionIcon>
        </Box>
      </Flex>
    </form>
  );
};

export default TaskForm;
