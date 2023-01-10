import { Box, Group, Text, Title } from "@mantine/core";
import useShowProjectHeader from "@hooks/useShowProjectHeader";
import projectHeaderStyles from "./ProjectHeaderStyles";
import DeleteProjectBtn from "../DeleteProjectBtn";
import EditProjectBtn from "../EditProjectBtn";
import ExpandButton from "../ExpandButton";
import Project from "types/Project";

interface HeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: HeaderProps) => {
  const { id, title, description } = project;
  const { classes } = projectHeaderStyles();

  const { hoveredRef, lineClamp, ...expand } = useShowProjectHeader(project);
  const { showExpandBtn, isExpanded, setIsExpanded } = expand;

  return (
    <Box className={classes.container} ref={hoveredRef}>
      <Group position="apart">
        <Title lineClamp={lineClamp} className={classes.title}>
          {title}
        </Title>
        <Group>
          <EditProjectBtn projectId={id} />
          <DeleteProjectBtn projectId={id} />
        </Group>
      </Group>
      <Text lineClamp={lineClamp} className={classes.description}>
        {description}
      </Text>

      {showExpandBtn && (
        <ExpandButton
          className={classes.expandBtn}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      )}
    </Box>
  );
};

export default ProjectHeader;
