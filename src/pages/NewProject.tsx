import { Box, Title } from "@mantine/core";
import ProjectForm from "@forms/Project";

const NewProjectPage = () => {
  return (
    <Box sx={{ maxWidth: 450 }} mx="auto" px={13}>
      <Title order={2} mb={7}>
        New Project
      </Title>
      <ProjectForm />
    </Box>
  );
};

export default NewProjectPage;
