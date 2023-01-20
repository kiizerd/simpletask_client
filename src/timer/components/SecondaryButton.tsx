import { useContext } from "react";
import { Button } from "@mantine/core";
import { IconPlayerStop, IconRefresh } from "@tabler/icons";
import TimerContext from "@contexts/TimerContext";

const SecondaryButton = () => {
  const timerData = useContext(TimerContext);
  const { state: timer, dispatch, controller } = timerData;
  const reset = () => controller.reset(dispatch);

  const ResetBtn = () => (
    <Button onClick={reset} leftIcon={<IconRefresh />}>
      Reset
    </Button>
  );

  if (timer.time === 0) return <ResetBtn />;

  return (
    <Button
      onClick={reset}
      leftIcon={<IconPlayerStop />}
      disabled={!timer.isStarted}
    >
      Stop
    </Button>
  );
};

export default SecondaryButton;
