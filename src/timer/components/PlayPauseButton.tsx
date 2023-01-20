import { Button } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons";

interface ButtonProps {
  isPaused: boolean;
  disabled: boolean;
  pause(): void;
  resume(): void;
}

const PlayPauseButton = ({ isPaused, disabled, pause, resume }: ButtonProps) =>
  isPaused ? (
    <Button disabled={disabled} onClick={resume} leftIcon={<IconPlayerPlay />}>
      Resume
    </Button>
  ) : (
    <Button disabled={disabled} onClick={pause} leftIcon={<IconPlayerPause />}>
      Pause
    </Button>
  );

export default PlayPauseButton;
