import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import useDeleteModal from "../hooks/useDeleteModal";
import { Project } from "../types/models";

interface CardMenuProps {
  classNames: { link: string };
  project: Project;
  update(): void;
}

const ProjectCardMenu = ({ classNames, project, update }: CardMenuProps) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const { openModal } = useDeleteModal(project.id, update);

  return (
    <Menu position={"left-start"} opened={menuOpened} onChange={setMenuOpened}>
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          className={classNames.link}
          // Assign from search parameter to allow returning
          // to index page on edit completion or cancellation
          to={`projects/${project.id}/edit?from=root`}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          closeMenuOnClick={false}
          className={classNames.link}
          onClick={openModal}
        >
          Delete
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          component={Link}
          className={classNames.link}
          to={`projects/${project.id}/share`}
        >
          Share
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProjectCardMenu;
