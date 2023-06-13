import { useState } from "react";
import { ActionIcon, Affix, Divider, Drawer } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import DrawerList from "./DrawerProjectList";
import { useRouteLoaderData } from "react-router-dom";

const ProjectDrawer = (): JSX.Element => {
  const userSignedIn = useRouteLoaderData("root");
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <>
      <Affix position={{ top: 120, left: 20 }}>
        <ActionIcon
          onClick={() => {
            setDrawerOpened(true);
          }}
          variant="outline"
          color="violet"
          disabled={!userSignedIn}
        >
          <IconChevronRight />
        </ActionIcon>
      </Affix>
      <Drawer
        size="lg"
        title="Projects"
        opened={drawerOpened}
        onClose={() => {
          setDrawerOpened(false);
        }}
        sx={(theme) => ({
          ".drawer-title": { margin: "1rem 0 0 1rem" },
          ".mantine-Drawer-close": { margin: "1rem 1rem 0 0" },
          [theme.fn.smallerThan("sm")]: {
            ".drawer-title": { margin: "3rem 0 0 1rem" },
            ".mantine-Drawer-close": {
              margin: "2rem 1rem 0 0",
              paddingTop: "1rem",
            },
          },
        })}
      >
        <Divider />
        <DrawerList />
      </Drawer>
    </>
  );
};

export default ProjectDrawer;
