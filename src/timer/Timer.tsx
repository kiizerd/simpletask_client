import { Box, Group, Stack } from "@mantine/core";
import TimerContext from "@contexts/TimerContext";
import useTimer from "@hooks/useTimer";
import TimerDrawer from "@common/components/ProjectDrawer";
import TimerSelector from "./components/TimerSelector";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";
import PinnedSection from "./components/PinnedSection";

const Timer = () => {
  const timerData = useTimer();
  const { classes } = timerData;

  return (
    <TimerContext.Provider value={timerData}>
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
    </TimerContext.Provider>
  );
};

export default Timer;
