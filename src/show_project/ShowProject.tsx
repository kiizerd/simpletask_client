import { useLoaderData } from "react-router-dom";
import { Container, Loader } from "@mantine/core";
import useProject from "@hooks/useProject";
import ProjectHeader from "./components/ProjectHeader";
import SectionGrid from "./components/SectionGrid";

const ShowProjectPage = () => {
  const id = Number(useLoaderData());
  const projectData = useProject(id);
  const { project, error, isLoading } = projectData;

  if (error) throw error;
  if (isLoading) return <Loader />;

  return (
    <Container size="lg" sx={{ position: "relative" }}>
      {project && <ProjectHeader project={project} />}
      {project && <SectionGrid project={project} />}
    </Container>
  );
};

export default ShowProjectPage;
