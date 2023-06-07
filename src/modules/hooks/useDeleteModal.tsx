import { useNavigate } from "react-router-dom";
import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { mutate } from "swr";
import { deleteProject } from "@api/projects";
import type Project from "types/Project";

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

interface DeleteModal {
  openModal: () => void;
}

export default function useDeleteModal(projectId: number): DeleteModal {
  const navigate = useNavigate();

  const onConfirm = (): void => {
    void mutate(
      "projects/",
      async (currentData: Project[] | undefined) => {
        await deleteProject(projectId);
        return currentData?.filter((project) => project.id !== projectId);
      },
      {
        optimisticData: (currentData: Project[]) =>
          currentData?.filter((project) => project.id !== projectId),
      }
    );
    navigate("/projects");
  };

  const openModal = (): void => {
    openConfirmModal({ ...modalOptions, onConfirm });
  };

  return { openModal };
}
