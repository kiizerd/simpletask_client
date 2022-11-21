import { Box, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getProject } from "../api/api";
import ProjectForm from "../forms/ProjectForm";
import { Project } from "../types/models";

const EditProjectPage = () => {
  const projectId = Number(useLoaderData());
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    getProjectToEdit();
  }, []);

  const getProjectToEdit = async () => {
    setProject(await getProject(projectId));
  };

  return (
    <Box sx={{ maxWidth: 450 }} mx="auto" px={13}>
      <Title order={2} mb={7}>
        Edit Project
      </Title>
      <ProjectForm project={project} />
    </Box>
  );
};

export default EditProjectPage;
