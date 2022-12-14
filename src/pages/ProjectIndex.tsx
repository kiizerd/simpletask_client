import { Button, Container, Group, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getAllProjects } from "../api/api";
import { Project } from "../types/models";
import { IconPlus } from "@tabler/icons";
import { Link } from "react-router-dom";
import ProjectGrid from "../components/ProjectIndex/ProjectGrid";

const ProjectIndexPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    updateProjects();
  }, []);

  const updateProjects = async () => {
    const projectList = await getAllProjects();

    setProjects(projectList);
  };

  return (
    <Container>
      <Group
        mb={20}
        py={2}
        sx={{
          "@media (max-width: 755px)": {
            justifyContent: "space-between",
          },
        }}
      >
        <Title order={3}>Projects</Title>
        <Button
          component={Link}
          to="/projects/new"
          rightIcon={<IconPlus size={18} />}
        >
          New Project
        </Button>
      </Group>
      <ProjectGrid projects={projects} />
    </Container>
  );
};

export default ProjectIndexPage;
