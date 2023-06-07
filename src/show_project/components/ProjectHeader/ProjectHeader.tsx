import { Box, Group, Title } from "@mantine/core";
import EditProjectBtn from "./EditProjectBtn";
import DeleteProjectBtn from "./DeleteProjectBtn";
import ProjectDescription from "./ProjectDescription";
import projectHeaderStyles from "./ProjectHeaderStyles";
import type Project from "types/Project";

interface HeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: HeaderProps): JSX.Element => {
  const { id, title, description } = project;
  const { classes } = projectHeaderStyles();

  return (
    <Box className={classes.container}>
      <Group spacing="xl" className={classes.group}>
        <Title lineClamp={1} order={5} className={classes.title}>
          {title}
        </Title>
        <Group spacing="xs" ml="xl">
          <EditProjectBtn projectId={id} />
          <DeleteProjectBtn projectId={id} />
        </Group>
      </Group>
      <ProjectDescription description={description} classNames={classes} />
    </Box>
  );
};

export default ProjectHeader;
