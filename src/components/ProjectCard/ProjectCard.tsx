import { Text, Button, Group, Paper, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Project } from "../../types/models";
import projectCardStyles from "../../styles/ProjectCardStyles";
import ProjectCardMenu from "./ProjectCardMenu";

interface ProjectCardProps {
  image: string;
  project: Project;
}

const ProjectCard = ({ image, project }: ProjectCardProps) => {
  const { classes } = projectCardStyles();

  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      sx={{
        backgroundImage: `linear-gradient(160deg, #333130 0%, rgba(44, 40, 40, 0.3) 55%), url(${image})`,
      }}
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
