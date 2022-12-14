import { Box, SimpleGrid } from "@mantine/core";
import SectionForm from "../../forms/SectionForm";
import SectionCard from "../SectionCard/SectionCard";
import { ProjectHookData } from "../../hooks/useProject";

interface SectionGridProps {
  projectData: ProjectHookData;
}

const SectionGrid = ({ projectData }: SectionGridProps) => {
  const { project, ...sectionControls } = projectData;
  const { addSection, removeSection, updateSection } = sectionControls;
  
  if (!project || !project.sections) return <></>;

  const sectionCards = project.sections.map((section) => (
    <Box key={section.id}>
      <SectionCard
        section={section}
        remove={removeSection}
        update={updateSection}
      />
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
      {sectionCards}
      <SectionForm projectId={project.id} add={addSection} />
    </SimpleGrid>
  );
};

export default SectionGrid;
