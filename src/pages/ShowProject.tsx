import { Container, Loader } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import SectionGrid from "../components/ShowProject/SectionGrid";
import ProjectHeader from "../components/ShowProject/ProjectHeader";
import useProject from "../hooks/useProject";

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
