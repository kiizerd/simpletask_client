import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { mutate } from "swr";
import { createProject } from "@api/api";
import ProjectIndexContext from "@contexts/ProjectIndexContext";
import Project from "types/Project";

export interface ProjectFormValues {
  title: string;
  description: string;
}

const titleValidation = (title: string) => {
  if (!title) return "Title is required.";

  const len = title.length;
  const tooShortMsg = `Title too short.\n Min 3 characters, currently ${len}.`;
  if (len < 3) return tooShortMsg;

  const tooLongMsg = `Title too long.\n Max 62 characters, currently ${len}.`;
  if (len > 62) return tooLongMsg;

  return null;
};

const descriptionValidation = (description?: string) => {
  if (!description) return null;

  const len = description.length;
  const tooLongMsg = `Description too long.\n Max 200 characters, currently ${len}`;
  if (len > 0 && len > 240) return tooLongMsg;

  return null;
};

export const validate = {
  title: titleValidation,
  description: descriptionValidation,
};

const ProjectForm = () => {
  const navigate = useNavigate();
  // Context not currently provided.
  // Will be given a value when form
  // is child of index page instead of its own route
  const { projects = [] } = useContext(ProjectIndexContext);

  const form = useForm({
    initialValues: { title: "", description: "" },
    validate,
  });

  const submit = async (formValues: ProjectFormValues) => {
    if (!mutate) return console.error("No SWR mutate method found.");

    const newProject = await createProject(formValues);
    await mutate("projects/", [...projects, newProject], {
      optimisticData: (projects: Project[]) => [
        ...projects,
        new Project(0, formValues),
      ],
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });

    navigate(`/projects/${newProject.id}`);
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
        <Button
          onClick={() => {
            navigate(-1);
          }}
          mt="md"
          variant="subtle"
        >
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
