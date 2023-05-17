import { createStyles } from "@mantine/core";

const projectHeaderStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    padding: `0 ${theme.spacing.xs}`,
    marginBottom: theme.spacing.xs,
    borderBottom: `1px solid ${theme.colors.dark[3]}`,
  },
  group: {
    justifyContent: "flex-start",
    [theme.fn.smallerThan("md")]: { justifyContent: "space-between" },
    [theme.fn.smallerThan("sm")]: { wrap: "no-wrap", gap: "4px" },
  },
  title: {
    overflowWrap: "break-word",
    maxWidth: "50%",
    [theme.fn.smallerThan("sm")]: {
      maxWidth: "55%",
    },
  },
  control: {
    position: "absolute",
    top: -30,
    left: "50%",
    right: "50%",
    "&::after": {
      position: "absolute",
      top: -3,
      left: -3,
      content: '""',
      padding: "14px 14px",
      border: `1px solid ${theme.colors.violet[9]}`,
      borderRadius: "4px",
      transition: "border-color 0.3s linear",
    },
    "&:hover::after": {
      borderColor: `${theme.colors.violet[4]}`,
    },
  },
  description: {
    marginTop: 2,
    marginLeft: theme.spacing.xs,
    paddingLeft: theme.spacing.xs,
    borderLeft: `2px solid ${theme.colors.dark[4]}`,
    whiteSpace: "pre-line",
    maxHeight: "8rem",
    overflowY: "scroll",
  },
}));

export default projectHeaderStyles;
