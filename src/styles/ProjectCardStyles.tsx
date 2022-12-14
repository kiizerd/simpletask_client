import { createStyles } from "@mantine/core";

const projectCardStyles = createStyles((theme) => ({
  card: {
    height: "21rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 95,

    "& > div": {
      width: "100%",
    },
  },

  titleRow: {
    alignItems: "start",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    fontSize: 22,
    maxWidth: "75%",
    overflowWrap: "break-word",
  },

  description: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 600,
    whiteSpace: "pre-line",
    textTransform: "uppercase",
    overflowWrap: "break-word",
  },

  link: {
    display: "block",
    lineHeight: 1,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {},

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
    },
  },
}));

export default projectCardStyles;
