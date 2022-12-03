import { keyframes } from "@emotion/react";
import { createStyles } from "@mantine/core";

const reappear = keyframes({
  "from, 0%, to": { opacity: 0, transform: "translateX(8px)" },
  "80%": { transform: "translateX(-2px)" },
  "100%": { opacity: 100, transform: "translateX(0)" },
});

const taskCardStyles = createStyles((theme) => ({
  card: {
    margin: `${theme.spacing.xs}px 0`,
    backgroundColor: theme.colors.dark[4],
    transition: "transform 0.3s linear",
    overflow: "visible",
    maxWidth: "100%",
  },
  text: {
    animation: `${reappear} 0.3s linear`,
    cursor: "pointer",
    transition: "text-shadow 0.3s linear",
    wordBreak: "break-all",
    "&:hover": { textShadow: "0 0 0 white" },
  },
  taskControls: {
    position: "absolute",
    right: theme.spacing.xs,
    transition: "opacity 0.2s linear",
    backgroundColor: theme.colors.dark[4],
  },
}));

export default taskCardStyles;
