import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import useDeleteModal from "@hooks/useDeleteModal";

interface DeleteButtonProps {
  projectId: number;
}

const DeleteProjectBtn = ({ projectId }: DeleteButtonProps) => {
  const { openModal } = useDeleteModal(projectId);
  return (
    <Button size="xs" onClick={openModal} rightIcon={<IconTrash size={16} />}>
      Delete
    </Button>
  );
};

export default DeleteProjectBtn;
