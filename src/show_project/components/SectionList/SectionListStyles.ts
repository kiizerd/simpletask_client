import { createStyles } from "@mantine/core";

const sectionListStyles = createStyles((theme) => {
  const darkBg = theme.colors.dark[7];
  const violet = theme.colors.violet[7];

  return {
    list: {
      overflow: "scroll",
      ".section-card": {
        display: "list-item",
        width: "280px",
        [theme.fn.smallerThan("xs")]: {
          width: "unset",
          padding: theme.spacing.md,
          marginBottom: theme.spacing.xs,
        },
        ".task-list": {
          overflow: "scroll",
          maxHeight: "65vh",
          [theme.fn.smallerThan("xs")]: { maxHeight: "25vh" },
        },
      },
      backgroundImage: `
        /* Shadows */
        linear-gradient(to right, ${darkBg}, ${darkBg}),
        linear-gradient(to right, ${darkBg}, ${darkBg}),

        /* Shadow covers */
        linear-gradient(to right, ${violet}, ${darkBg}),
        linear-gradient(to left, ${violet}, ${darkBg})`,
      backgroundPosition:
        "left center, right center, left center, right center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "30px 100%, 30px 100%, 15px 100%, 15px 100%",
      backgroundAttachment: "local, local, scroll, scroll",
      backgroundColor: darkBg,
    },
  };
});

export default sectionListStyles;
