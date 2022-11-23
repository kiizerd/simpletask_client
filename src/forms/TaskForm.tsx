import { ActionIcon, Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { useLoaderData } from "react-router-dom";
import { createProjectTask } from "../api/tasks";

interface TaskFormProps {
  sectionId: number;
  update(): void;
}

interface TaskFormValues {
  name: string;
}

const TaskForm = ({ sectionId, update }: TaskFormProps) => {
  const projectId = Number(useLoaderData());
  const form = useForm({
    initialValues: { name: "" },
    validate: { name: (value) => (value.length > 0 ? null : "Name required") },
  });

  const submit = async (formValues: TaskFormValues) => {
    await createProjectTask(projectId, { ...formValues, sectionId });
    form.setValues({ name: "" });
    update();
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex gap="sm">
        <TextInput placeholder="New task" {...form.getInputProps("name")} />
        <Button type="submit">
          <IconPlus />
        </Button>
      </Flex>
    </form>
  );
};

export default TaskForm;
