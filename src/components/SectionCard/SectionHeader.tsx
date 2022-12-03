import { useState } from "react";
import { ActionIcon, Group, Menu, Title } from "@mantine/core";
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons";
import { Section } from "../../types/models";
import EditSectionForm from "../../forms/EditSectionForm";
import sectionCardStyles from "../../styles/SectionCardStyles";

interface SectionHeaderProps {
  section: Section;
  remove(): void;
  update(sectionId: number, newName: string): void;
}

const SectionCardHeader = ({ section, remove, update }: SectionHeaderProps) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>();
  const { classes } = sectionCardStyles();
  const { id, name } = section;

  if (editMode)
    return (
      <EditSectionForm
        setEditMode={setEditMode}
        update={function updateSection(newName: string) {
          update(id, newName);
        }}
        {...{ section }}
      />
    );

  return (
    <Group position="apart" className={classes.header}>
      {/* Prevent animation on first render */}
      <Title
        className={editMode === undefined ? "" : classes.title}
        order={5}
        sx={{ cursor: "pointer" }}
        onClick={() => setEditMode(true)}
      >
        {name}
      </Title>

      <Group spacing="sm" my={2}>
        <ActionIcon color="blue" onClick={() => setEditMode(true)}>
          <IconEdit size={16} />
        </ActionIcon>

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
              <ActionIcon color="red" onClick={() => setMenuOpened(false)}>
                <IconX size={18} />
              </ActionIcon>
              <ActionIcon
                color="green"
                onClick={() => {
                  setMenuOpened(false);
                  remove();
                }}
              >
                <IconCheck size={18} />
              </ActionIcon>
            </Group>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default SectionCardHeader;
