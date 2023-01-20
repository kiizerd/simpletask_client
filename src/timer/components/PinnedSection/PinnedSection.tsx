import { useEffect, useState } from "react";
import { ActionIcon, Affix, Dialog } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import useTimerPin from "@hooks/useTimerPin";
import PinnedSectionCard from "./PinnedSectionCard";

const PinnedSection = () => {
  const [opened, setOpened] = useState(false);
  const [pin] = useTimerPin();
  const ids = pin?.split("-").map((s) => Number(s));

  useEffect(() => {
    if (pin === "0") setOpened(false);
  }, [pin]);

  return (
    <>
      <Affix position={{ top: 120, right: 20 }}>
        <ActionIcon
          onClick={() => setOpened(!opened)}
          variant="outline"
          color="violet"
          disabled={pin === "0"}
          data-rotate={opened}
          sx={{
            transition: "all 0.3s linear",
            ["&[data-rotate='true']"]: { transform: "rotate(-180deg)" },
          }}
        >
          <IconChevronLeft />
        </ActionIcon>
      </Affix>
      {ids && ids[0] !== 0 ? (
        <Dialog
          opened={opened}
          withCloseButton
          transition="slide-left"
          onClose={() => setOpened(false)}
          position={{ top: 155, right: 15 }}
          p={0}
          styles={{ closeButton: { zIndex: 350, marginTop: "4px" } }}
          // Move section card buttons to left to accomodate Dialog close button
          sx={() => ({
            "& > .section-card": {
              "& > .section-header": {
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
          <PinnedSectionCard ids={ids} />
        </Dialog>
      ) : null}
    </>
  );
};

export default PinnedSection;
