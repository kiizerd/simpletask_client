import { Link } from "react-router-dom";
import { Text, Button, Group, Paper, Title } from "@mantine/core";
import getImage from "@helpers/imageHelpers";
import projectCardStyles from "./ProjectCardStyles";
import ProjectCardMenu from "./ProjectCardMenu";
import type Project from "types/Project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps): JSX.Element => {
  const { classes } = projectCardStyles(getImage(project.id));

  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      className={classes.card}
    >
      <div>
        <Group position="apart" className={classes.titleRow}>
          <Title lineClamp={4} order={3} className={classes.title}>
            {project.title}
          </Title>
          <ProjectCardMenu
            classNames={{ link: classes.link }}
            project={project}
          />
        </Group>

        <Text lineClamp={6} size="xs" className={classes.description}>
          {project.description}
        </Text>
      </div>
      <Button component={Link} to={`/projects/${project.id}`}>
        View
      </Button>
    </Paper>
  );
};

export default ProjectCard;
