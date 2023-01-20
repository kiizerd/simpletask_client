import { createStyles } from "@mantine/core";

interface TimerProps {
  progress: number;
  angle: number;
  time: string;
}

const timerStyles = createStyles(
  (theme, { progress, angle, time }: TimerProps) => ({
    wrapper: {
      ".group": {
        justifyContent: "center",
        ".button-root": { width: "120px" },
      },
    },
    box: { margin: `${theme.spacing.xl}px auto` },
    timer: {
      padding: "13rem",
      fontSize: "2rem",
      borderRadius: "50%",
      background: `linear-gradient(${angle + 12}deg,
        rgba(54, 244, 192, 1) ${100 - progress - 63}%,
        rgba(244, 215, 54, 1) ${100 - progress + 150}%)`,

      "&::after": {
        color: theme.white,
        textShadow: `1px 1px 2px black`,
        content: `"${time}"`,
        fontFamily: "monospace",
      },

      "@media (max-width: 768px)": {
        padding: "8rem",
      },
    },
  })
);

export default timerStyles;
