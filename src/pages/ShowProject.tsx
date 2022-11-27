import { Box, Container, SimpleGrid } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import SectionForm from "../forms/SectionForm";
import ProjectHeader from "../components/ProjectHeader";
import useProject from "../hooks/useProject";

const ShowProjectPage = () => {
  const id = Number(useLoaderData());
  const { project, sections, ...sectionControls } = useProject(id);
  const { addSection, removeSection, updateSection } = sectionControls;

  const sectionCards = sections.map((section) => (
    <Box key={section.id}>
      <SectionCard
        section={section}
        remove={removeSection}
        update={updateSection}
      />
    </Box>
  ));

  const SectionGrid = () => (
    <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 2, spacing: "sm" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      {sectionCards}
      <SectionForm projectId={id} add={addSection} />
    </SimpleGrid>
  );

  return (
    <Container size="lg" sx={{ position: "relative" }}>
      <ProjectHeader project={project} />
      <SectionGrid />
    </Container>
  );
};

export default ShowProjectPage;
