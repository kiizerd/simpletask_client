import { ActionIcon, Menu } from "@mantine/core";
import {
  IconDotsVertical,
  IconEdit,
  IconShare,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteModal from "@hooks/useDeleteModal";
import type Project from "types/Project";

interface CardMenuProps {
  project: Project;
}

const ProjectCardMenu = ({ project }: CardMenuProps): JSX.Element => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const { openModal } = useDeleteModal(project.id);
  const navigate = useNavigate();

  return (
    <Menu position={"left-start"} opened={menuOpened} onChange={setMenuOpened}>
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Project options</Menu.Label>
        <Menu.Item
          onClick={() => {
            navigate(`/${project.route}/edit`);
          }}
          color="blue"
          icon={<IconEdit size={16} />}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          closeMenuOnClick={false}
          onClick={openModal}
          color="red"
          icon={<IconTrash size={16} />}
        >
          Delete
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<IconShare size={16} color="green" />}>
          Share
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProjectCardMenu;
