import { useContext } from "react";
import { Box, Menu } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import {
  SectionContext,
  SectionDispatchContext,
} from "@contexts/SectionContext";

const SectionSortMenu = (): JSX.Element => {
  const { sortMenuOpened, sortMethod } = useContext(SectionContext);
  const dispatch = useContext(SectionDispatchContext);

  return (
    <Menu.Item
      onClick={() => {
        dispatch({ type: "SET_SORT_MENU_OPENED", payload: !sortMenuOpened });
      }}
      icon={
        <IconChevronLeft
          size={16}
          style={{
            transform: sortMenuOpened ? "translateX(20px) rotate(180deg)" : "",
            transition: "transform 0.3s linear",
          }}
        />
      }
    >
      <Menu
        position="left"
        opened={sortMenuOpened}
        styles={{
          item: {
            fontSize: "11px",
            "&[data-active='true']": { outline: "1px solid gray" },
          },
        }}
        closeOnItemClick={false}
        transitionProps={{ transition: "slide-right" }}
      >
        <Menu.Target>
          <Box>Sort by</Box>
        </Menu.Target>
        <Menu.Dropdown
          sx={(theme) => ({ backgroundColor: theme.colors.dark[8] })}
        >
          <Menu.Item
            data-active={sortMethod === "default"}
            onClick={() => {
              dispatch({ type: "SET_SORT_METHOD", payload: "default" });
            }}
          >
            Default
          </Menu.Item>
          <Menu.Item
            data-active={sortMethod === "status"}
            onClick={() => {
              dispatch({ type: "SET_SORT_METHOD", payload: "status" });
            }}
          >
            Status
          </Menu.Item>
          <Menu.Item
            data-active={sortMethod === "name"}
            onClick={() => {
              dispatch({ type: "SET_SORT_METHOD", payload: "name" });
            }}
          >
            Name
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Menu.Item>
  );
};

export default SectionSortMenu;
