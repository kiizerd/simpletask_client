import { Box, Button, Group, Loader, Text, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { Link } from "react-router-dom";
import useDeleteModal from "../hooks/useDeleteModal";
import { Project } from "../types/models";

interface ProjectHeaderProps {
  project?: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  if (!project) return <Loader />;

  const { openModal } = useDeleteModal(project.id);
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
