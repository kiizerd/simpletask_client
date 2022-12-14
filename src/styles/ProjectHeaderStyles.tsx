import { createStyles } from "@mantine/core";

const projectHeaderStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    marginBottom: theme.spacing.sm,
    borderBottom: `1px solid ${theme.colors.dark[3]}`,
  },
  title: {
    overflowWrap: "break-word",
    maxWidth: "48vw",
    "@media (min-width: 768px)": {
      maxWidth: "60vw",
    },
    "@media (min-width: 1280px)": {
      maxWidth: "48vw",
    },
    "@media (min-width: 1680px)": {
      maxWidth: '40vw'
    }
  },
  description: {
    margin: `${theme.spacing.sm}`,
    marginTop: 0,
    maxWidth: "60%",
    whiteSpace: "pre-line",
  },
  expandBtn: {
    position: "absolute",
    margin: "0 auto",
    padding: 'auto',
    width: "50%",
    bottom: 5,
    right: '1rem'
  },
}));

export default projectHeaderStyles;
