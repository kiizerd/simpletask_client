import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import useDeleteModal from "@hooks/useDeleteModal";

interface DeleteButtonProps {
  projectId: number;
}

const DeleteProjectBtn = ({ projectId }: DeleteButtonProps) => {
  const { openModal } = useDeleteModal(projectId);
  return (
    <Button onClick={openModal} rightIcon={<IconTrash size={18} />}>
      Delete
    </Button>
  );
};

export default DeleteProjectBtn;
