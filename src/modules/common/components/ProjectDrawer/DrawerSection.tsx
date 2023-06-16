import { Accordion, ActionIcon, Box } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import TaskList from "@common/components/TaskList";
import { SectionContext } from "@contexts/SectionContext";
import useSectionCard from "@hooks/useSectionCard";
import useTimerPin from "@hooks/useTimerPin";
import DrawerLoader from "./DrawerLoader";
import drawerStyles from "./DrawerStyles";
import type Section from "types/Section";

interface DrawerSectionProps {
  section: Section;
}

const DrawerSection = ({
  section: _section,
}: DrawerSectionProps): JSX.Element => {
  const { state } = useSectionCard(_section);
  const {
    sectionData: { section, error, isLoading },
  } = state;
  const { id, projectId } = section;
  const { classes } = drawerStyles();
  const [currentPinned, setPin] = useTimerPin(projectId, id);
  const pinnedIds = currentPinned?.split("-");

  if (error) throw error;
  if (!section || isLoading) return <DrawerLoader id={id} />;

  return (
    <Accordion.Item key={section.id} value={section.name}>
      <SectionContext.Provider value={state}>
        <Box className={classes.controlWrapper}>
          <Accordion.Control className={classes.control}>
            {section.name}
          </Accordion.Control>
          <ActionIcon
            onClick={setPin}
            variant={pinnedIds && +pinnedIds[1] === id ? "filled" : "outline"}
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
