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
    transition: "transform 0.3s linear, background-color 0.3s linear",
    maxWidth: "100%",
    ["&[data-complete='true']"]: {
      backgroundColor: theme.colors.dark[5],
      textDecoration: "line-through",
    },
    // Had to set padding like this
    "&": { padding: theme.spacing.xs },
  },
  text: {
    cursor: "pointer",
    transition: "text-shadow 0.3s linear",
    overflowWrap: "break-word",
    animation: "unset",
    "&:hover": { textShadow: "0 0 0 white" },
    ["&[data-edit-mode='true']"]: {
      opacity: 0,
      animation: "none",
    },
    ["&[data-edit-mode='false']"]: {
      animation: `${reappear} 0.3s linear`,
    },
  },
  taskControls: {
    position: "absolute",
    right: theme.spacing.xs,
    transition: "opacity 0.2s linear",
    backgroundColor: theme.colors.dark[4],
    ["&[data-complete='true']"]: {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

export default taskCardStyles;
