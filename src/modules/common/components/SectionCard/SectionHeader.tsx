import { useContext } from "react";
import { ActionIcon, Box, Group, Progress, Title } from "@mantine/core";
import { IconEdit, IconLock, IconLockOpen } from "@tabler/icons";
import {
  SectionContext,
  SectionDispatchContext,
} from "@contexts/SectionContext";
import { EditSectionForm } from "@forms/Section";
import SectionMenu from "./SectionMenu";
import sectionCardStyles from "./SectionCardStyles";

const SectionCardHeader = (): JSX.Element => {
  const { classes } = sectionCardStyles();
  const {
    editMode,
    dragLocked,
    sectionData: {
      section: { name, progress },
    },
  } = useContext(SectionContext);
  const dispatch = useContext(SectionDispatchContext);
  const toggleDragLocked = (): void => {
    dispatch({ type: "SET_DRAG_LOCKED", payload: !dragLocked });
  };
  const toggleEditMode = (): void => {
    dispatch({ type: "SET_EDIT_MODE", payload: !editMode });
  };

  return (
    <Box className="section-header">
      {editMode ? (
        <EditSectionForm toggleEditMode={toggleEditMode} />
      ) : (
        <Group position="apart" className={classes.header}>
          {/* Prevent animation on first render */}
          <Title
            className={editMode === undefined ? "" : classes.title}
            order={5}
            style={{ cursor: "pointer" }}
            onClick={toggleEditMode}
          >
            {name}
          </Title>

          <Group spacing="sm" my={2} className="section-button-group">
            <ActionIcon variant="outline" color="cyan" onClick={toggleEditMode}>
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon
              variant="outline"
              color={dragLocked ? "orange" : "blue"}
              onClick={toggleDragLocked}
            >
              {dragLocked ? <IconLock size={16} /> : <IconLockOpen size={16} />}
            </ActionIcon>
            <SectionMenu />
          </Group>
        </Group>
      )}
      <Progress size="xs" value={progress} />
    </Box>
  );
};

export default SectionCardHeader;
