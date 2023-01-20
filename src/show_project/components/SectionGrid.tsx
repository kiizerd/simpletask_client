import { Box, Loader, SimpleGrid } from "@mantine/core";
import SectionIndexContext from "@contexts/SectionIndexContext";
import SectionForm from "@forms/Section";
import useSectionIndex from "@hooks/useSectionIndex";
import SectionCard from "@common/components/SectionCard";
import Project from "types/Project";

interface SectionGridProps {
  project: Project;
}

const SectionGrid = ({ project }: SectionGridProps) => {
  const { sections, error, isLoading, mutate } = useSectionIndex(project.id);

  if (error) throw error;
  if (isLoading) return <Loader />;

  const sectionCards = sections?.map((section) => (
    <Box key={section.id}>
      <SectionCard section={section} />
    </Box>
  ));

  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 2, spacing: "sm" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      <SectionIndexContext.Provider value={{ sections, mutate }}>
        {sectionCards}
        <SectionForm projectId={project.id} />
      </SectionIndexContext.Provider>
    </SimpleGrid>
  );
};

export default SectionGrid;
