import { Container, Group, Loader, Title } from "@mantine/core";
import useProjectIndex from "@hooks/useProjectIndex";
import NewProjectBtn from "./components/NewProjectBtn";
import ProjectGrid from "./components/ProjectGrid";

const ProjectIndexPage = () => {
  const { projects, error, isLoading } = useProjectIndex();

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
