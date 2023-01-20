import { useContext } from "react";
import { Button, Group, Indicator } from "@mantine/core";
import TimerContext from "@contexts/TimerContext";

type TimerCompletionKey = "work" | "short" | "long";

const TimerSelector = () => {
  const timerData = useContext(TimerContext);
  const { state, dispatch, controller } = timerData;
  const { set: setTimerLength } = controller;

  const keys: TimerCompletionKey[] = ["work", "short", "long"];
  const lengths = [25, 5, 15];

  return (
    <Group spacing="xl">
      {lengths.map((timerLength, index) => {
        const key = keys[index];
        const count = state.completions[key];

        return (
          <Indicator
            key={key}
            disabled={count === 0}
            label={count}
            size={21}
            color={["orange", "yellow", "green"][(count % 3) - 1]}
            sx={{ textShadow: "0 0 3px black" }}
          >
            <Button onClick={() => setTimerLength(dispatch, timerLength)}>
              {key[0].toUpperCase() + key.slice(1)}
            </Button>
          </Indicator>
        );
      })}
    </Group>
  );
};

export default TimerSelector;
