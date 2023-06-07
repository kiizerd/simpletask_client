import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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

const titleValidation = (title: string): string | null => {
  if (!title) return "Title is required.";

  const len = title.length;
  const tooShortMsg = `Title too short.\n Min 3 characters, currently ${len}.`;
  if (len < 3) return tooShortMsg;

  const tooLongMsg = `Title too long.\n Max 62 characters, currently ${len}.`;
  if (len > 62) return tooLongMsg;

  return null;
};

const descriptionValidation = (description?: string): string | null => {
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

const ProjectForm = (): JSX.Element => {
  const navigate = useNavigate();
  // Context not currently provided.
  // Will be given a value when form
  // is child of index page instead of its own route
  const { projects = [] } = useContext(ProjectIndexContext);

  const form = useForm({
    initialValues: { title: "", description: "" },
    validate,
  });

  const submit = (formValues: ProjectFormValues): void => {
    if (!mutate) {
      console.error("No SWR mutate method found.");
      return;
    }

    const newProject = new Project(0, formValues);
    void mutate(
      "projects/",
      async () => {
        newProject.id = (await createProject(formValues)).id;
        navigate(`/${newProject.route}`);
        return [...projects, newProject];
      },
      { optimisticData: (projects: Project[]) => [...projects, newProject] }
    );
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
