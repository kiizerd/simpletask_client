import { ActionIcon, Box, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { useLoaderData } from "react-router-dom";
import { createProjectTask } from "../api/tasks";
import { Task } from "../types/models";

interface TaskFormProps {
  sectionId: number;
  add(newTask: Task): void;
}

interface TaskFormValues {
  name: string;
}

const nameValidation = (name: string) => {
  if (name && name !== "" && name.length > 3) return null;
  // if (name && name !== "" && name.length > 3 && name.length < 24) return null;

  if (!name || name === "") return "Name is required.";
  if (name.length < 3) return "Name must be at 3 chars.";
  // if (name.length > 24) return "Name cannot exceed 24 chars.";
};

const TaskForm = ({ sectionId, add }: TaskFormProps) => {
  const projectId = Number(useLoaderData());
  const form = useForm({
    initialValues: { name: "" },
    validate: { name: nameValidation },
  });

  const submit = async (formValues: TaskFormValues) => {
    const taskData = { sectionId, ...formValues };
    const newTask = await createProjectTask(projectId, taskData);

    if (!newTask) return;

    form.setValues({ name: "" });
    add(newTask);
  };

  const errorTimeout = () => setTimeout(() => form.clearErrors(), 3000);
  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex gap="sm">
        <TextInput
          w="100%"
          placeholder="New task"
          {...form.getInputProps("name")}
        />
        <Box pt={4}>
          <ActionIcon
            variant="filled"
            color="violet"
            type="submit"
            onClick={errorTimeout}
          >
            <IconPlus />
          </ActionIcon>
        </Box>
      </Flex>
    </form>
  );
};

export default TaskForm;
