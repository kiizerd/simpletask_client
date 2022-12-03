import { Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import SectionGrid from "../components/ShowProject/SectionGrid";
import ProjectHeader from "../components/ShowProject/ProjectHeader";
import useProject from "../hooks/useProject";

const ShowProjectPage = () => {
  const id = Number(useLoaderData());
  const { ...projectData } = useProject(id);

  if (!projectData) return <></>;

  return (
    <Container size="lg" sx={{ position: "relative" }}>
      <ProjectHeader projectData={projectData} />
      <SectionGrid projectData={projectData} />
    </Container>
  );
};

export default ShowProjectPage;
