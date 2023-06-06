import { createStyles } from "@mantine/core";

const projectCardStyles = createStyles((theme, image: string) => ({
  card: {
    borderBottomRightRadius: 0,
    height: "21rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "bottom right",
    backgroundImage: `linear-gradient(160deg, #333130 0%, rgba(44, 40, 40, 0.3) 55%), url(${image})`,
    zIndex: 95,

    "& > div": {
      width: "100%",
    },
  },

  titleRow: {
    alignItems: "start",
  },

  title: {
    fontFamily: 'Greycliff CF, sans-serif',
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
    color: "unset",
    textDecoration: "none",
  },
}));

export default projectCardStyles;
