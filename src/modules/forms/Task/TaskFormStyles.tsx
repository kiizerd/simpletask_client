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

const inactiveAppear = keyframes({
  "from, 0%, to": { opacity: 0, transform: "translateX(8px)" },
  "100%": { opacity: 100, transform: "translateX(0)" },
});

const taskFormStyles = createStyles((theme) => ({
  textarea: {
    position: "relative",
    animation: `${appear} 0.3s linear`,
    borderRadius: theme.radius.sm,
    marginTop: theme.spacing.xs,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    backgroundColor: theme.colors.dark[5],
    boxShadow: `0 0     36px 8px ${theme.colors.dark[8]},
                0 3rem  3rem 0 ${theme.colors.dark[8]}`,
  },
  button: {
    marginTop: theme.spacing.xs,
    animation: `${btnAppear} 0.3s linear`,
  },
  error: {
    fontSize: "0.8rem",
    padding: "0 6px 6px 0",
  },
  editForm: { width: "100%" },
  inactive: {
    marginTop: theme.spacing.xs,
    animation: "unset",
    "&[data-is-focused='true']": {
      opacity: 0,
      display: "none",
      animation: "none",
    },
    "&[data-is-focused='false']": {
      animation: `${inactiveAppear} 0.2s linear`,
    },
  },
}));

export default taskFormStyles;
