import { Container, Group, Loader, Title } from "@mantine/core";
import useProjectIndex from "@hooks/useProjectIndex";
import NewProjectBtn from "./components/NewProjectBtn";
import ProjectGrid from "./components/ProjectGrid";
import { useContext } from "react";
import UserContext from "@contexts/UserContext";
import { Navigate } from "react-router-dom";

const ProjectIndexPage = (): JSX.Element => {
  const { currentUser } = useContext(UserContext)
  const { projects, error, isLoading } = useProjectIndex();

  if (!currentUser) return <Navigate to="/welcome" />

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
