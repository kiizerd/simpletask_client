import { Box, Group, Stack } from "@mantine/core";
import TimerContext from "@contexts/TimerContext";
import TimerDrawer from "@common/components/ProjectDrawer";
import TimerSelector from "./components/TimerSelector";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";
import PinnedSection from "./components/PinnedSection";
import { useContext } from "react";

const Timer = () => {
  const timerData = useContext(TimerContext);
  const { classes } = timerData

  return (
    <>
      <TimerDrawer />
      <PinnedSection />
      <Stack className={classes.wrapper}>
        <TimerSelector />

        <Box className={classes.box}>
          <section className={classes.timer} />
        </Box>

        <Group>
          <PrimaryButton />
          <SecondaryButton />
        </Group>
      </Stack>
    </>
  );
};

export default Timer;
