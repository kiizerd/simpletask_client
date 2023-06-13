import { createStyles } from "@mantine/core";

const sectionListStyles = createStyles((theme) => {
  const isDarkModeOn = theme.colorScheme === "dark";
  const violet = theme.colors.violet[7];

  const darkBg = theme.colors.dark[7];
  const lightBg = theme.colors.gray[1];
  const bgColor = isDarkModeOn ? darkBg : lightBg;

  const listDarkBg = "#16161D";
  const listLightBg = theme.colors.gray[4];
  const listBg = isDarkModeOn ? listDarkBg : listLightBg;

  return {
    list: {
      overflow: "scroll",
      ".section-card": {
        display: "list-item",
        width: "280px",
        backgroundColor: listBg,
        [theme.fn.smallerThan("xs")]: {
          width: "unset",
          padding: theme.spacing.md,
          marginBottom: theme.spacing.xs,
        },
        ".task-list": {
          paddingTop: `${theme.spacing.xs}`,
          overflow: "scroll",
          maxHeight: "65vh",
          [theme.fn.smallerThan("xs")]: { maxHeight: "25vh" },
        },
      },
      backgroundImage: `
        /* Shadows */
        linear-gradient(to right, ${bgColor}, ${bgColor}),
        linear-gradient(to right, ${bgColor}, ${bgColor}),

        /* Shadow covers */
        linear-gradient(to right, ${violet}, ${bgColor}),
        linear-gradient(to left, ${violet}, ${bgColor})`,
      backgroundPosition:
        "left center, right center, left center, right center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "30px 100%, 30px 100%, 15px 100%, 15px 100%",
      backgroundAttachment: "local, local, scroll, scroll",
    },
  };
});

export default sectionListStyles;
