import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Textarea,
  Container,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { newProject } from "../api/api";

const ProjectForm = () => {
  const titleValidation = (titleString: string) => {
    if (!titleString) return "Title is required.";
    if (titleString.length < 3) return "Title too short.";
    if (titleString.length > 22) return "Title too long.";

    return null;
  };
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },

    validate: {
      title: (value) => titleValidation(value),
    },
  });

  return (
    <Box sx={{ maxWidth: 450 }} mx="auto" px={13}>
      <Title order={2} mb={7}>
        New Project
      </Title>
      <form
        onSubmit={form.onSubmit(
          async (values) => await newProject(values.title, values.description)
        )}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Sweet ass project"
          {...form.getInputProps("title")}
        />

        <Textarea label="Description" />

        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default ProjectForm;
