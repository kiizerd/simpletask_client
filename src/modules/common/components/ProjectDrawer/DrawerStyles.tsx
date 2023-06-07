import { createStyles } from "@mantine/core";

const drawerStyles = createStyles((theme) => ({
  controlWrapper: { display: "flex", alignItems: "center" },
  control: {
    borderRight: "1px solid transparent",
    transition: "all 0.3s linear",
    "&:hover": { borderRight: `1px solid ${theme.colors.gray[7]}` },
    "&[data-active='true']": { borderRight: "1px solid transparent" },
  },
  pinButton: { margin: theme.spacing.xs },
  panel: {
    padding: 0,
    maxHeight: "16rem",
    overflow: "scroll",
  }
}));

export default drawerStyles;
