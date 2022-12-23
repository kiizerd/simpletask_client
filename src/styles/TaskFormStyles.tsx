import { createStyles, keyframes } from "@mantine/core";

const appear = keyframes({
  "from, 0%, to": { opacity: 0, transform: "translateX(0px)" },
  "60%": { opacity: 40, transform: "translateX(2px)" },
  "100%": { opacity: 100, transform: "translateX(0)" },
});

const btnAppear = keyframes({
  "from, 0%, to": { opacity: 15, transform: "translateX(-16px)" },
  "60%": { opacity: 40, transform: "translateX(2px)" },
  "100%": { opacity: 100, transform: "translateX(0)" },
});

const taskFormStyles = createStyles((theme) => ({
  textarea: {
    position: "relative",
    animation: `${appear} 0.3s linear`,
    borderRadius: theme.radius.sm,
    paddingLeft: theme.spacing.xs,
    backgroundColor: theme.colors.dark[5],
    boxShadow: `0 0 36px 8px ${theme.colors.dark[8]}`,
  },
  button: {
    animation: `${btnAppear} 0.3s linear`,
  },
  error: {
    fontSize: "0.8rem",
    padding: "0 6px 6px 0",
  },
}));

export default taskFormStyles;
