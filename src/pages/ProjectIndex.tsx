import { Container, Group, Loader, Title } from "@mantine/core";
import NewProjectBtn from "../components/ProjectIndex/NewProjectBtn";
import ProjectGrid from "../components/ProjectIndex/ProjectGrid";
import useIndex from "../hooks/useIndex";

const ProjectIndexPage = () => {
  const { projects, error, isLoading } = useIndex();

  if (isLoading) return <Loader />;
  if (error) throw error;

  return (
    <Container>
      <Group
        sx={{
          padding: "2 0",
          marginBottom: 20,
          "@media (max-width: 755px)": {
            justifyContent: "space-between",
          },
        }}
      >
        <Title order={3}>Projects</Title>
        <NewProjectBtn />
      </Group>
      <ProjectGrid projects={projects} />
    </Container>
  );
};

export default ProjectIndexPage;
