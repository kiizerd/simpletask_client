import { useContext, useState } from "react";
import { ActionIcon, Box, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import { createProjectTask } from "@api/tasks";
import TaskIndexContext from "@contexts/TaskIndexContext";
import { errorTimeout } from "@helpers/formHelpers";
import taskFormStyles from "./TaskFormStyles";
import TaskInput from "./TaskInput";
import Task from "types/Task";

interface TaskFormProps {
  ids: number[];
}

interface TaskFormValues {
  name: string;
}

const nameValidation = (name: string): string | null => {
  const len = name.length;
  if (len === 0) return "Name is required.";

  const tooShortMsg = `Name too short.\n Min 3 chars, currently ${len}.`;
  if (len <= 2) return tooShortMsg;

  const tooLongMsg = `Name too long.\n Max 60 chars, currently ${len}.`;
  if (len > 60) return tooLongMsg;

  return null;
};

export const validate = { name: nameValidation };

const TaskForm = ({ ids }: TaskFormProps): JSX.Element => {
  const [projectId, sectionId] = ids;
  const [focused, setFocused] = useState<boolean | undefined>();
  const { tasks = [], mutate } = useContext(TaskIndexContext);
  const { classes } = taskFormStyles();

  const form = useForm({ initialValues: { name: "" }, validate });
  const clickRef = useClickOutside(() => {
    if (focused !== undefined) setFocused(false);
    form.clearErrors();
  });

  const submit = async (formValues: TaskFormValues): Promise<void> => {
    if (!mutate) {
      console.error("No SWR mutate method found.");
      return;
    }

    const taskData = { sectionId, projectId, ...formValues };
    const createResponse = await createProjectTask(projectId, taskData);
    if (!(createResponse instanceof Task)) {
      form.setErrors({ name: createResponse.messages?.name?.join("\n") });
      console.debug(createResponse);

      return;
    }

    form.setValues({ name: "" });
    const newTask: Task = createResponse;
    await mutate([...tasks, newTask]);
  };

  return (
    <form
      onSubmit={form.onSubmit((formValues) => {
        void submit(formValues);
      })}
      style={{ width: "100%", position: "relative" }}
    >
      <Flex gap="sm" ref={clickRef}>
        <TaskInput
          focused={focused}
          setFocused={setFocused}
          formProps={form.getInputProps("name")}
        />
        <Box display={focused ? "" : "none"} className={classes.button} pt={4}>
          <ActionIcon
            variant="filled"
            color="violet"
            type="submit"
            onClick={() => {
              errorTimeout(form);
            }}
          >
            <IconPlus />
          </ActionIcon>
        </Box>
      </Flex>
    </form>
  );
};

export default TaskForm;
