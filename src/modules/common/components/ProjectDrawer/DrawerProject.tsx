import { Link } from "react-router-dom";
import { Accordion, ActionIcon, Box, Text } from "@mantine/core";
import { IconLink } from "@tabler/icons";
import useProject from "@hooks/useProject";
import DrawerLoader from "./DrawerLoader";
import DrawerSection from "./DrawerSection";
import drawerStyles from "./DrawerStyles";

interface DrawerProjectProps {
  projectId: number;
}

const DrawerProject = ({ projectId }: DrawerProjectProps): JSX.Element => {
  const { project, error, isLoading } = useProject(projectId);
  const { classes } = drawerStyles();

  if (error) throw error;
  if (!project || isLoading) return <DrawerLoader id={projectId} />;

  return (
    <Accordion.Item key={project.id} value={project.title}>
      <Box className={classes.controlWrapper}>
        <Accordion.Control className={classes.control}>
          {project.title}
        </Accordion.Control>
        <ActionIcon
          component={Link}
          to={"/" + project.route}
          variant="outline"
          color="violet"
          mx="xs"
        >
          <IconLink />
        </ActionIcon>
      </Box>
      <Accordion.Panel>
        <Text>{project.description}</Text>
        <Accordion chevronPosition="left" variant="contained">
          {project.sections.map((section) => (
            <DrawerSection
              key={section.id}
              projectId={project.id}
              sectionId={section.id}
            />
          ))}
        </Accordion>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default DrawerProject;
