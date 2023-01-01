import { keyframes } from "@emotion/react";
import { createStyles } from "@mantine/core";

const slide = keyframes({
  "from, 0%, to": {
    opacity: 15,
    transform: "translate3D(6px, 2px, 0)",
  },
  "65%": { opacity: 70, transform: "translate3D(-3px, 0, 0)" },
  "100%": { opacity: 100, transform: "translate3D(0, 0, 0)" },
});

const sectionCardStyles = createStyles(() => ({
  title: { animation: `${slide} 0.2s linear` },
  header: { paddingBottom: "5px" },
}));

export default sectionCardStyles;
