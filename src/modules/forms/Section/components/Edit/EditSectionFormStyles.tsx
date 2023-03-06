import { keyframes } from "@emotion/react";
import { createStyles } from "@mantine/core";

const slide = keyframes({
  "from, 0%, to": {
    opacity: 15,
    transform: "translate3D(-6px, 2px, 0)",
  },
  "65%": { opacity: 80, transform: "translate3D(3px, -1px, 0)" },
  "100%": { opacity: 100, transform: "translate3D(0, 0, 0)" },
});

const sectionFormStyles = createStyles((theme) => ({
  button: { animation: `${slide} 0.2s linear` },
  wrapper: { animation: `${slide} 0.2s linear` },
  input: { fontSize: 16, fontWeight: 700 },
  container: { paddingBottom: 7 },
}));

export default sectionFormStyles;
