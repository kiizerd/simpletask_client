import { useContext } from "react";
import { Button } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons";
import TimerContext from "@contexts/TimerContext";
import PlayPauseButton from "./PlayPauseButton";

const PrimaryButton = () => {
  const timerData = useContext(TimerContext);
  const { state: timer, dispatch, controller } = timerData;
  const { start, pause, resume } = controller;
  const { time, isStarted, isPaused } = timer;

  const StartBtn = () => (
    <Button
      disabled={time === 0}
      leftIcon={<IconPlayerPlay />}
      onClick={() => start(dispatch)}
    >
      Start
    </Button>
  );

  if (!isStarted) return <StartBtn />;

  return (
    <PlayPauseButton
      isPaused={isPaused}
      disabled={time === 0}
      pause={() => pause(dispatch)}
      resume={() => resume(dispatch)}
    />
  );
};

export default PrimaryButton;
