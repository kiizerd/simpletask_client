import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "app/components/Header/HeaderStyles";

const authFormStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: "cover",
    backgroundImage: "url(https://iili.io/H6BbDJV.png)",
    backgroundPosition: "bottom right",
    position: "absolute",
    top: HEADER_HEIGHT,
    bottom: 0,
    right: 0,
    left: 0,
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: "100%",
    maxWidth: 450,
    padding: theme.spacing.xl,
    borderRadius: 0,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily ?? "Arial"}`,
  },
}));

export default authFormStyles;
