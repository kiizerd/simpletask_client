import { useLocation, useNavigate } from "react-router-dom";
import { openConfirmModal } from "@mantine/modals";
import { deleteProject } from "../api/projects";
import { Text } from "@mantine/core";
import { mutate } from "swr";
import Project from "../types/Project";

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

export default function useDeleteModal(projectId: number) {
  const navigate = useNavigate();
  const location = useLocation();
  const atRoot = location.pathname == "/";

  const onConfirm = async () => {
    await mutate("projects/", await deleteProject(projectId), {
      populateCache: true,
      revalidate: !atRoot,
      rollbackOnError: false,
      optimisticData: (projects: Project[]): Project[] => {
        return projects.filter((project) => project.id != projectId);
      },
    });
    if (!atRoot) navigate("/");
  };

  const openModal = () => openConfirmModal({ ...modalOptions, onConfirm });

  return { openModal };
}
