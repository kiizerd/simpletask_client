import { keyframes } from "@emotion/react";
import { createStyles } from "@mantine/core";

const btnAppear = keyframes({
  "from, 0%, to": { opacity: 15, transform: "translateX(-16px)" },
  "60%": { opacity: 40, transform: "translateX(2px)" },
  "100%": { opacity: 100, transform: "translateX(0)" },
});

const sectionFormStyles = createStyles(() => ({
  formWrapper: { width: "250px" },
  button: { animation: `${btnAppear} 0.3s linear` },
}));

export default sectionFormStyles;
