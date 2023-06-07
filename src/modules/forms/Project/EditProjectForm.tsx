// import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Group, Loader, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
// import { mutate as globalMutate } from "swr";
import { updateProject } from "@api/projects";
// import ProjectIndexContext from "@contexts/ProjectIndexContext";
import useProject from "@hooks/useProject";
import { validate, type ProjectFormValues } from "./ProjectForm";
import Project from "types/Project";

interface EditProjectFormProps {
  projectId: number;
}

const EditProjectForm = ({ projectId }: EditProjectFormProps): JSX.Element => {
  const navigate = useNavigate();
  const { project, error, isLoading, mutate } = useProject(projectId);
  // Context not currently provided.
  // Will be given a value when form
  // is child of index page instead of its own route
  // const { projects = [] } = useContext(ProjectIndexContext);

  if (error) throw error;
  if (!project || isLoading) return <Loader />;

  const { title, description } = project;
  const form = useForm({
    initialValues: { title, description },
    validate,
  });

  const submit = (formValues: ProjectFormValues): void => {
    if (!mutate) {
      console.error("No SWR mutate method found.");
      return;
    }

    const newProject = new Project(projectId, { ...project, ...formValues });
    const applyProjectUpdate = async (): Promise<Project> => {
      const updated = await updateProject(newProject);
      // Navigate to previous page for now
      navigate(-1);
      return updated;
    };

    void mutate(applyProjectUpdate, { optimisticData: newProject });

    // Not yet needed
    //
    // void globalMutate(
    //   "projects/",
    //   projects.map((project) =>
    //     project.id === projectId ? newProject : project
    //   )
    // );
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
          Update project
        </Button>
      </Group>
    </form>
  );
};

export default EditProjectForm;
