import { useContext } from "react";
import { ActionIcon, Divider, Menu } from "@mantine/core";
import { IconArchive, IconDotsVertical } from "@tabler/icons";
import {
  SectionContext,
  SectionDispatchContext,
} from "@contexts/SectionContext";
import SectionDeleteBtn from "./SectionDeleteBtn";
import SectionSortMenu from "./SectionSortMenu";
import ToggleShowCompleteBtn from "./ToggleShowCompleteBtn";

const SectionMenu = (): JSX.Element => {
  const { menuOpened } = useContext(SectionContext);
  const dispatch = useContext(SectionDispatchContext);

  return (
    <Menu
      closeOnItemClick={false}
      withinPortal
      withArrow
      offset={-2}
      opened={menuOpened}
      onChange={() => {
        dispatch({ type: "SET_MENU_OPENED", payload: !menuOpened });
      }}
      // Close submenus when main menu closes
      onClose={() => {
        dispatch({ type: "SET_SORT_MENU_OPENED", payload: false });
        dispatch({ type: "SET_SHOW_DELETE_CONFIRM", payload: false });
      }}
      styles={{ item: { textAlign: "center", fontSize: "13px" } }}
      transitionProps={{ transition: "slide-down" }}
    >
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown
        className="section-card-menu"
        sx={(theme) => ({ backgroundColor: theme.colors.dark[7] })}
      >
        <Menu.Label>Section controls</Menu.Label>
        <SectionSortMenu />
        <ToggleShowCompleteBtn />
        <Divider />
        {/* Waiting to add error-handling to Section API before adding archive functionality */}
        {/* Basically going to be the same as DeleteBtn but without the safety timer */}
        <Menu.Item icon={<IconArchive size={16} />}>Archive</Menu.Item>
        <SectionDeleteBtn />
      </Menu.Dropdown>
    </Menu>
  );
};

export default SectionMenu;
