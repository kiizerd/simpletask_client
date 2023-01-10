import { useContext, useState } from "react";
import { ActionIcon, Box, Group, Progress, Title } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import SectionContext from "@contexts/SectionContext";
import { EditSectionForm } from "@forms/Section";
import sectionCardStyles from "./SectionCardStyles";
import SectionHeaderMenu from "./SectionHeaderMenu";

const SectionCardHeader = () => {
  const [editMode, setEditMode] = useState<boolean>();
  const { name, progress } = useContext(SectionContext);
  const { classes } = sectionCardStyles();

  return (
    <Box>
      {editMode ? (
        <EditSectionForm setEditMode={setEditMode} />
      ) : (
        <Group position="apart" className={classes.header}>
          {/* Prevent animation on first render */}
          <Title
            className={editMode === undefined ? "" : classes.title}
            order={5}
            style={{ cursor: "pointer" }}
            onClick={() => setEditMode(true)}
          >
            {name}
          </Title>

          <Group spacing="sm" my={2}>
            <ActionIcon color="blue" onClick={() => setEditMode(true)}>
              <IconEdit size={16} />
            </ActionIcon>

            <SectionHeaderMenu />
          </Group>
        </Group>
      )}
      <Progress size="xs" value={progress} />
    </Box>
  );
};

export default SectionCardHeader;
