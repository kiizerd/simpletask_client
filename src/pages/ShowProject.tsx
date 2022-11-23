import {
  Box,
  Button,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getProject, getProjectSections } from "../api/api";
import { Project, Section } from "../types/models";
import SectionCard from "../components/SectionCard";

const ShowProjectPage = () => {
  const id = Number(useLoaderData());
  const [project, setProject] = useState<Project>();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    getAndSetProject();
    getAndSetSections();
  }, []);

  useEffect(() => {
    getAndSetSections();
  }, [project]);

  const getAndSetProject = async () => {
    setProject(await getProject(id));
  };

  const getAndSetSections = async () => {
    setSections(await getProjectSections(id));
  };

  if (!project) return <></>;
  return (
    <Container>
      <Group position="apart">
        <Title>{project.title}</Title>
        <Group>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Group>
      </Group>
      <Text>{project.description}</Text>

      <hr />
      {/* <Title order={3}>Tasks</Title> */}
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {sections.map((section) => (
          <Box key={section.id} sx={{ transition: 'height 0.3s linear' }}>
            <SectionCard
              projectId={id}
              section={section}
              update={getAndSetSections}
            />
          </Box>
        ))}
        {/* --- */}
        <Box>
          <SectionCard projectId={id} update={getAndSetSections} />
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default ShowProjectPage;
