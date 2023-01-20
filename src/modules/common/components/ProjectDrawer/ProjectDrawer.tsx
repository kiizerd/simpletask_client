import { useState } from "react";
import { Accordion, ActionIcon, Affix, Divider, Drawer } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import useProjectIndex from "@hooks/useProjectIndex";
import DrawerProject from "./DrawerProject";

const ProjectDrawer = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { projects } = useProjectIndex();

  return (
    <>
      <Affix position={{ top: 120, left: 20 }}>
        <ActionIcon
          onClick={() => setDrawerOpened(true)}
          variant="outline"
          color="violet"
        >
          <IconChevronRight />
        </ActionIcon>
      </Affix>
      <Drawer
        size="lg"
        title="Projects"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        sx={{
          ".drawer-title": { margin: "1rem 0 0 1rem" },
          ".drawer-close": { margin: "1rem 1rem 0 0" },
        }}
      >
        <Divider />
        <Accordion sx={{borderRight: '2px solid grey'}}>
          {projects.map((project) => (
            <DrawerProject key={project.id} projectId={project.id} />
          ))}
        </Accordion>
      </Drawer>
    </>
  );
};

export default ProjectDrawer;
