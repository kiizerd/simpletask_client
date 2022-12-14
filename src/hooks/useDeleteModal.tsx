import { useLocation, useNavigate } from "react-router-dom";
import { openConfirmModal } from "@mantine/modals";
import { deleteProject } from "../api/projects";
import { Text } from "@mantine/core";
import { mutate } from "swr";

const modalOptions = {
  title: "Delete this project",
  children: (
    <Text size="sm">
      Are you sure you want to delete this project?
      <br />
      All associated sections and tasks will also be deleted.
    </Text>
  ),
  labels: { confirm: "Delete", cancel: "Cancel" },
  confirmProps: { color: "red" },
};

// Returned method opens a modal to confirm deletion of a project.
// Deletes the project matching the id passed
function useDeleteModal(projectId?: number) {
  const location = useLocation();
  const navigate = useNavigate();
  const onConfirm = async () => {
    if (!projectId) return false;

    await deleteProject(projectId);
    mutate("projectIndex");
    if (location.pathname != "/") navigate("/");
  };

  const openModal = () => openConfirmModal({ ...modalOptions, onConfirm });

  return { openModal };
}

export default useDeleteModal;
