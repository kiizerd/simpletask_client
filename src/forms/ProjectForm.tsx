import { TextInput, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createProject, updateProject } from "../api/api";
import { Project } from "../types/models";

interface ProjectFormProps {
  project?: Project;
}

const ProjectForm = ({ project }: ProjectFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const originPage = String(Object.fromEntries([...searchParams]).from);
  const titleValidation = (title: string) => {
    if (!title) return "Title is required.";
    if (title.length < 3) return "Title too short.";
    if (title.length > 32) return "Title too long.";

    return null;
  };

  const descriptionValidation = (description?: string) => {
    if (!description) return null;

    const len = description.length;
    if (len > 0 && len > 240) return "Description exceeds limit. (200)";

    return null;
  };

  const form = useForm({
    initialValues: { title: "", description: "" },
    validate: {
      title: (value) => titleValidation(value),
      description: (value) => descriptionValidation(value),
    },
  });

  useEffect(() => {
    if (!project) return;

    form.setValues({
      title: project?.title,
      description: project?.description,
    });
  }, [project]);

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        const { title, description } = values;
        const newProject = await (project
          ? updateProject({ id: project.id, title, description })
          : createProject({ title, description }));

        if (originPage == "root") return navigate("/");

        navigate(newProject ? `/projects/${newProject.id}` : "/projects");
      })}
    >
      <TextInput
        mt="md"
        withAsterisk
        label="Title"
        placeholder="Sweet ass project"
        {...form.getInputProps("title")}
      />

      <Textarea
        label="Description"
        mt="md"
        {...form.getInputProps("description")}
      />

      <Group>
        <Button mt="md" type="submit">
          {project ? "Update " : "Create "}project
        </Button>
      </Group>
    </form>
  );
};

export default ProjectForm;
