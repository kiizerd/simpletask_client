import { useLoaderData } from "react-router-dom";
import { Box, Loader } from "@mantine/core";
import useProject from "@hooks/useProject";
import ProjectHeader from "./components/ProjectHeader";
import SectionList from "./components/SectionList";

const ShowProjectPage = () => {
  const id = Number(useLoaderData());
  const projectData = useProject(id);
  const { project, error, isLoading } = projectData;

  if (error) throw error;
  if (isLoading) return <Loader />;
  // TODO: Replace misplaced loader with a Mantine Skeleton

  return (
    <Box>
      {project && <ProjectHeader project={project} />}
      {project && <SectionList projectId={project.id} />}
    </Box>
  );
};

export default ShowProjectPage;
