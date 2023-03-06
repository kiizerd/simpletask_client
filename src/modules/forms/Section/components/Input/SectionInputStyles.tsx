import { keyframes } from "@emotion/react";
import { createStyles } from "@mantine/core";

const appear = keyframes({
  "from, 0%, to": { opacity: 0, transform: "translateX(0px)" },
  "60%": { opacity: 40, transform: "translateX(2px)" },
  "100%": { opacity: 100, transform: "translateX(0)" },
});

const inactiveAppear = keyframes({
  "from, 0%, to": { opacity: 0, transform: "translateX(8px)" },
  "100%": { opacity: 100, transform: "translateX(0)" },
});

const sectionInputStyles = createStyles(() => ({
  newInput: { animation: `${appear} 0.3s linear` },
  inactive: {
    width: "100%",
    animation: "unset",
    ["&[data-is-focused='true']"]: {
      opacity: 0,
      display: "none",
      animation: "none",
    },
    ["&[data-is-focused='false']"]: {
      animation: `${inactiveAppear} 0.2s linear`,
    },
  },
}));

export default sectionInputStyles;
