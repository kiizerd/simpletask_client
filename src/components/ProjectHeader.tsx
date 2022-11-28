import { Box, Button, Group, Loader, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { Link } from "react-router-dom";
import useDeleteModal from "../hooks/useDeleteModal";
import { Project } from "../types/models";

interface ProjectHeaderProps {
  project?: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  // Keep calls to hooks above conditional render
  //https://github.com/facebook/react/issues/24391#issuecomment-1131531946
  const { openModal } = useDeleteModal(project?.id);
  if (!project) return <Loader />;

  const { id, title, description } = project;
  return (
    <Box
      sx={(theme) => ({
        marginBottom: theme.spacing.sm,
        borderBottom: `1px solid ${theme.colors.dark[3]}`,
      })}
    >
      <Group position="apart">
        <Title>{title}</Title>
        <Group>
          <Button
            component={Link}
            to={`/projects/${id}/edit`}
            rightIcon={<IconEdit size={18} />}
          >
            Edit
          </Button>
          <Button onClick={openModal} rightIcon={<IconTrash size={18} />}>
            Delete
          </Button>
        </Group>
      </Group>
      <Text>{description}</Text>
    </Box>
  );
};

export default ProjectHeader;
