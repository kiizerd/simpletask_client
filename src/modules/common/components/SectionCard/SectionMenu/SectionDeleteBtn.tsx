import { useContext, useState } from "react";
import { mutate } from "swr";
import { Box, Button, Flex, Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { deleteProjectSection } from "@api/sections";
import {
  SectionContext,
  SectionDispatchContext,
} from "@contexts/SectionContext";
import type { Section } from "types/models";
import { useTimeout } from "@mantine/hooks";

const SectionDeleteBtn = (): JSX.Element => {
  // Disable confirm delete for a second after appearing
  const [buttonReady, setButtonReady] = useState(false);
  const { start, clear } = useTimeout(() => {
    setButtonReady(true);
  }, 1000);
  const {
    showDeleteConfirm: showConfirm,
    sectionData: {
      section: { projectId, id },
    },
  } = useContext(SectionContext);
  const dispatch = useContext(SectionDispatchContext);
  const closeConfirm = (): void => {
    clear();
    dispatch({ type: "SET_SHOW_DELETE_CONFIRM", payload: false });
  };

  const deleteSection = (): void => {
    closeConfirm();
    const filter = (section: Section): boolean => section.id !== id;
    void mutate(
      `projects/${projectId}/sections/`,
      async (sections?: Section[]) => {
        await deleteProjectSection(projectId, id);

        return sections?.filter(filter);
      },
      {
        optimisticData: (sections?: Section[]) => sections?.filter(filter),
      }
    );
  };

  return showConfirm ? (
    <Box
      style={{
        padding: "7px 12px",
        fontSize: "12px",
        opacity: showConfirm ? 100 : 0,
        transition: "opacity 0.3s linear",
      }}
    >
      <Flex gap="xs" mx="auto" px="auto" w={100} justify="center">
        <Button
          compact
          size="xs"
          variant="outline"
          color="red"
          onClick={deleteSection}
          disabled={!buttonReady}
        >
          Delete
        </Button>
        <Button compact size="xs" variant="outline" onClick={closeConfirm}>
          Cancel
        </Button>
      </Flex>
    </Box>
  ) : (
    <Menu.Item
      icon={<IconTrash size={16} />}
      color="red"
      styles={{ opacity: showConfirm ? 0 : 100 }}
      onClick={() => {
        start();
        dispatch({
          type: "SET_SHOW_DELETE_CONFIRM",
          payload: !showConfirm,
        });
      }}
    >
      Delete
    </Menu.Item>
  );
};

export default SectionDeleteBtn;
