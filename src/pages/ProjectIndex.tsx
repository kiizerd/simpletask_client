import { Button, Container, Group, SimpleGrid, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getAllProjects } from "../api/api";
import { Project } from "../types/models";
import ProjectCard from "../components/ProjectCard";
import imageUrl from "../assets/CountryRoadStormy.jpg";
import anotherImageUrl from "../assets/DesertMountains.jpg";
import oneMoreImageUrl from "../assets/MossyCanyon.jpg";
import { IconPlus } from "@tabler/icons";
import { Link } from "react-router-dom";

const ProjectIndexPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    updateProjects();
  }, []);

  const updateProjects = async () => {
    const projectList = await getAllProjects();

    setProjects(projectList);
  };

  const MOCK = [
    {
      image:
        "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    },
    { image: imageUrl },
    { image: anotherImageUrl },
    { image: oneMoreImageUrl },
  ];
  const randomImage = () => MOCK[Math.floor(Math.random() * MOCK.length)].image;

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
      <SimpleGrid
        spacing="lg"
        cols={3}
        breakpoints={[
          { maxWidth: 980, cols: 3 },
          { maxWidth: 755, cols: 2 },
          { maxWidth: 550, cols: 1 },
        ]}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            image={randomImage()}
            updateIndex={updateProjects}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ProjectIndexPage;
