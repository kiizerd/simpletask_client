import { Box, Title } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import EditProjectForm from "../forms/EditProjectForm";

const EditProjectPage = () => {
  const projectId = Number(useLoaderData());

  return (
    <Box sx={{ maxWidth: 450 }} mx="auto" px={13}>
      <Title order={2} mb={7}>
        Edit Project
      </Title>
      <EditProjectForm projectId={projectId} />
    </Box>
  );
};

export default EditProjectPage;
