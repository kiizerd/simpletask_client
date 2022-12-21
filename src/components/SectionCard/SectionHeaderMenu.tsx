import { ActionIcon, Group, Menu } from "@mantine/core";
import { IconCheck, IconTrash, IconX } from "@tabler/icons";
import { useContext, useState } from "react";
import { deleteProjectSection } from "../../api/sections";
import SectionContext from "../../contexts/SectionContext";
import SectionIndexContext from "../../contexts/SectionIndexContext";

const SectionHeaderMenu = () => {
  const { projectId, id } = useContext(SectionContext);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const { sections = [], mutate } = useContext(SectionIndexContext);

  const closeMenu = () => setMenuOpened(false);
  const deleteSection = async () => {
    if (!mutate) return console.error("No SWR mutate method found.");

    await mutate(deleteProjectSection(projectId, id), {
      optimisticData: sections.filter((section) => section.id != id),
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });
  };

  return (
    <Menu
      withArrow
      offset={2}
      position="left-start"
      opened={menuOpened}
      onChange={setMenuOpened}
    >
      <Menu.Target>
        <ActionIcon color="red">
          <IconTrash size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label sx={{ fontSize: 14, color: "white" }}>
          Delete section?
        </Menu.Label>
        <Group position="center" my="xs">
          <ActionIcon color="red" onClick={closeMenu}>
            <IconX size={18} />
          </ActionIcon>
          <ActionIcon
            color="green"
            onClick={() => {
              closeMenu();
              deleteSection();
            }}
          >
            <IconCheck size={18} />
          </ActionIcon>
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SectionHeaderMenu;
