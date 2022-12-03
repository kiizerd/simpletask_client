import { Box, SimpleGrid } from "@mantine/core";
import { Project, Section } from "../../types/models";
import SectionForm from "../../forms/SectionForm";
import SectionCard from "../SectionCard/SectionCard";

interface SectionGridProps {
  projectData: ProjectHookData | undefined;
}

interface ProjectHookData {
  project?: Project;
  sections?: Section[];
  addSection(sectionData: Section): void;
  removeSection(sectionId: number): Promise<void>;
  updateSection(sectionId: number, newName: string): Promise<void>;
}

const SectionGrid = ({ projectData }: SectionGridProps) => {
  if (!projectData) return <></>;

  const { project, sections, ...sectionControls } = projectData;
  const { addSection, removeSection, updateSection } = sectionControls;

  if (!project || !sections) return <></>;

  const sectionCards = sections.map((section) => (
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