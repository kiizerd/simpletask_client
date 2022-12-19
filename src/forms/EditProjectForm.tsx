import { Button, Group, Loader, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { updateProject } from "../api/projects";
import ProjectIndexContext from "../contexts/ProjectIndexContext";
import useProject from "../hooks/useProject";
import Project from "../types/Project";
import {
  descriptionValidation,
  ProjectFormValues,
  titleValidation,
} from "./ProjectForm";

interface EditProjectFormProps {
  projectId: number;
}

const EditProjectForm = ({ projectId }: EditProjectFormProps) => {
  const navigate = useNavigate();
  const { project, error, isLoading } = useProject(projectId);
  const { projects = [] } = useContext(ProjectIndexContext);

  if (error) throw error;
  if (!project || isLoading) return <Loader />;
  const { title, description } = project;

  const form = useForm({
    initialValues: { title, description },
    validate: { title: titleValidation, description: descriptionValidation },
  });

  const submit = async (formValues: ProjectFormValues) => {
    const newProject = new Project(projectId, formValues);
    if (!mutate) return console.error("No SWR mutate method found.");

    const optimisticData = projects.map((project) =>
      project.id == projectId ? newProject : project
    );

    const updateProjectIndex = async () => {
      const updated = await updateProject(newProject);
      return projects.map((project) =>
        project.id == projectId ? updated : project
      );
    };

    await mutate(["projects/", `projects/${projectId}`], updateProjectIndex, {
      optimisticData,
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

export default EditProjectForm;
