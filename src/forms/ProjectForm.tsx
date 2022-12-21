import { TextInput, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { createProject } from "../api/api";
import ProjectIndexContext from "../contexts/ProjectIndexContext";
import Project from "../types/Project";

export interface ProjectFormValues {
  title: string;
  description: string;
}

export const titleValidation = (title: string) => {
  if (!title) return "Title is required.";
  if (title.length < 3) return "Title too short.";

  const tooLongMessage = `Title too long, max 62 chars.\nCurrently ${title.length}.`;
  if (title.length > 62) return tooLongMessage;

  return null;
};

export const descriptionValidation = (description?: string) => {
  if (!description) return null;

  const len = description.length;
  if (len > 0 && len > 240) return "Description exceeds limit. (200)";

  return null;
};

const ProjectForm = () => {
  const navigate = useNavigate();
  // Context not currently provided.
  // Will be given a value when form
  // is child of index page instead of its own route
  const { projects = [] } = useContext(ProjectIndexContext);

  const form = useForm({
    initialValues: { title: "", description: "" },
    validate: { title: titleValidation, description: descriptionValidation },
  });

  const submit = async (formValues: ProjectFormValues) => {
    if (!mutate) return console.error("No SWR mutate method found.");

    const newProject = await createProject(formValues);
    await mutate("projects/", [...projects, newProject], {
      optimisticData: (projects: Project[]) => [...projects, newProject],
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });

    navigate("/");
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <TextInput
        mt="md"
        withAsterisk
        label="Title"
        placeholder="Sweet ass project"
        {...form.getInputProps("title")}
      />

      <Textarea
        label="Description"
        autosize
        mt="md"
        {...form.getInputProps("description")}
      />

      <Group>
        <Button component={Link} to="/" mt="md" variant="subtle">
          Cancel
        </Button>
        <Button mt="md" type="submit">
          Create project
        </Button>
      </Group>
    </form>
  );
};

export default ProjectForm;
