import { SimpleGrid } from "@mantine/core";
import getImage from "../../helpers/imageHelpers";
import { Project } from "../../types/models";
import ProjectCard from "../ProjectCard/ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  update(): void;
}

const ProjectGrid = ({ projects, update }: ProjectGridProps) => {
  return (
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
          image={getImage()}
          updateIndex={update}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProjectGrid;
