import { useContext } from "react";
import { ActionIcon, Box, Divider, Flex, Menu } from "@mantine/core";
import {
  IconArchive,
  IconCheck,
  IconChevronLeft,
  IconDotsVertical,
  IconSquare,
  IconSquareCheck,
  IconTrash,
  IconX,
} from "@tabler/icons";
import {
  SectionContext,
  SectionDispatchContext,
} from "@contexts/SectionContext";

const SectionMenu = (): JSX.Element => {
  const { menuOpened, showComplete, sortMenuOpened } =
    useContext(SectionContext);
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
      // Close sort menu when main menu closes
      onClose={() => {
        dispatch({ type: "SET_SORT_MENU_OPENED", payload: false });
      }}
      styles={{ item: { textAlign: "center", fontSize: "13px" } }}
      transitionProps={{ transition: "slide-down" }}
    >
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown className="section-card-menu">
        <Menu.Item
          onClick={() => {
            dispatch({
              type: "SET_SORT_MENU_OPENED",
              payload: !sortMenuOpened,
            });
          }}
          icon={
            <IconChevronLeft
              size={16}
              style={{
                transform: sortMenuOpened
                  ? "translateX(20px) rotate(180deg)"
                  : "",
                transition: "transform 0.3s linear",
              }}
            />
          }
        >
          <Menu
            position="left"
            withinPortal
            opened={sortMenuOpened}
            styles={{ item: { fontSize: "11px" } }}
            closeOnItemClick={false}
            transitionProps={{ transition: "slide-right" }}
          >
            <Menu.Target>
              <Box>Sort by</Box>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Default</Menu.Item>
              <Menu.Item>Name</Menu.Item>
              <Menu.Item>Random</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            dispatch({ type: "SET_SHOW_COMPLETE", payload: !showComplete });
          }}
          icon={
            showComplete ? (
              <IconSquareCheck size={16} />
            ) : (
              <IconSquare size={16} />
            )
          }
        >
          Show complete
        </Menu.Item>
        <Menu.Item icon={<IconArchive size={16} />}>Archive</Menu.Item>
        {/* Add another state value to detect if Delete confirmation is open */}
        {/* Toggle the state when clicking on below item */}
        {/* When true, expand item down and show buttons to either confirm or cancel deletion */}
        <Menu.Item icon={<IconTrash size={16} />} color="red">
          Delete
        </Menu.Item>
        <Box style={{ fontSize: "12px" }}>
          <Divider my={4} />
          <Box my={4} style={{ textAlign: "center" }}>Are you sure?</Box>
          <Flex gap='xs' mx="auto" px="auto" w={100} justify="center">
            <ActionIcon size="sm">
              <IconCheck />
            </ActionIcon>
            <ActionIcon size="sm">
              <IconX />
            </ActionIcon>
          </Flex>
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SectionMenu;
