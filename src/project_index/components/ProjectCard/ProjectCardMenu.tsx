import { ActionIcon, Menu } from "@mantine/core";
import {
  IconDotsVertical,
  IconEdit,
  IconShare,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import useDeleteModal from "@hooks/useDeleteModal";
import Project from "types/Project";

interface CardMenuProps {
  classNames: { link: string };
  project: Project;
}

const ProjectCardMenu = ({ classNames, project }: CardMenuProps) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const { openModal } = useDeleteModal(project.id);
  const { link } = classNames;

  return (
    <Menu position={"left-start"} opened={menuOpened} onChange={setMenuOpened}>
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Project options</Menu.Label>
        <Menu.Item color="blue" icon={<IconEdit size={16} />}>
          <Link className={link} to={`projects/${project.id}/edit?from=root`}>
            Edit
          </Link>
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
        <Menu.Item
          className={link}
          icon={<IconShare size={16} color="green" />}
        >
          <Link className={link} to={`projects/${project.id}/share`}>
            Share
          </Link>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProjectCardMenu;
