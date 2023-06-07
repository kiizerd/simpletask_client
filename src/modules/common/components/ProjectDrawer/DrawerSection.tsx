import { Accordion, ActionIcon, Box } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import TaskList from "@common/components/TaskList";
import SectionContext from "@contexts/SectionContext";
import useSection from "@hooks/useSection";
import useTimerPin from "@hooks/useTimerPin";
import DrawerLoader from "./DrawerLoader";
import drawerStyles from "./DrawerStyles";

interface DrawerSectionProps {
  projectId: number;
  sectionId: number;
}

const DrawerSection = ({ projectId, sectionId }: DrawerSectionProps): JSX.Element => {
  const { section, error, isLoading } = useSection(projectId, sectionId);
  const { classes } = drawerStyles();
  const [currentPinned, setPin] = useTimerPin(projectId, sectionId);
  const pinnedIds = currentPinned?.split("-");

  if (error) throw error;
  if (!section || isLoading) return <DrawerLoader id={sectionId} />;

  return (
    <Accordion.Item key={section.id} value={section.name}>
      <SectionContext.Provider value={section}>
        <Box className={classes.controlWrapper}>
          <Accordion.Control className={classes.control}>
            {section.name}
          </Accordion.Control>
          <ActionIcon
            onClick={setPin}
            variant={
              pinnedIds && +pinnedIds[1] === sectionId ? "filled" : "outline"
            }
            color="violet"
            mx="xs"
          >
            <IconPin />
          </ActionIcon>
        </Box>
        <Accordion.Panel className={classes.panel}>
          <TaskList />
        </Accordion.Panel>
      </SectionContext.Provider>
    </Accordion.Item>
  );
};

export default DrawerSection;
