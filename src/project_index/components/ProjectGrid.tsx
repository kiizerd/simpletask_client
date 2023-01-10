import { SimpleGrid } from "@mantine/core";
import getImage from "@helpers/imageHelpers";
import ProjectCard from "./ProjectCard";
import Project from "types/Project";

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
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
        <ProjectCard key={index} project={project} image={getImage()} />
      ))}
    </SimpleGrid>
  );
};

export default ProjectGrid;
