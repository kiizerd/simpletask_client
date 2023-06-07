import { useEffect, useState } from "react";
import { ActionIcon, Affix, Dialog } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import useTimerPin from "@hooks/useTimerPin";
import PinnedSectionCard from "./PinnedSectionCard";

const PinnedSection = (): JSX.Element => {
  const [opened, setOpened] = useState(false);
  const [pin] = useTimerPin();
  const [projectId, sectionId] = pin?.split("-").map((s) => Number(s)) ?? [
    0, 0,
  ];

  const isSectionPinned = (): boolean => !!pin && !!projectId && !!sectionId;
  useEffect(() => {
    if (!isSectionPinned()) setOpened(false);
  }, [pin]);

  const toggleOpened = (): void => {
    setOpened(!opened);
  };

  return (
    <>
      <Affix position={{ top: 120, right: 20 }}>
        <ActionIcon
          onClick={toggleOpened}
          variant="outline"
          color="violet"
          disabled={!isSectionPinned()}
          data-rotate={opened}
          sx={{
            transition: "all 0.3s linear",
            "&[data-rotate='true']": { transform: "rotate(-180deg)" },
          }}
        >
          <IconChevronLeft />
        </ActionIcon>
      </Affix>
      {isSectionPinned() ? (
        <Dialog
          opened={opened}
          withCloseButton
          transition="slide-left"
          onClose={() => {
            setOpened(false);
          }}
          position={{ top: 155, right: 15 }}
          p={0}
          styles={{ closeButton: { zIndex: 350, marginTop: "4px" } }}
          // Move section card buttons to left to accomodate Dialog close button
          sx={(theme) => ({
            "& > .section-card": {
              "& > .section-header": {
                marginBottom: theme.spacing.xs,
                "& > form": { marginRight: "2rem" },
                "& > *": {
                  "& > .section-button-group": {
                    marginRight: "2rem",
                  },
                },
              },
            },
          })}
        >
          <PinnedSectionCard projectId={projectId} sectionId={sectionId} />
        </Dialog>
      ) : null}
    </>
  );
};

export default PinnedSection;
