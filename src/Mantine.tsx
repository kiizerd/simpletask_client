import React from "react";
import { MantineProvider, ButtonProps } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

const ButtonDefaultProps: Partial<ButtonProps> = {
  p: "xs",
  color: "violet",
};

const MantineApp = ({ children }: React.PropsWithChildren) => (
  <MantineProvider
    theme={{
      colorScheme: "dark",
      components: {
        Button: {
          defaultProps: ButtonDefaultProps,
          styles: { label: { overflow: "visible" } },
        },
        TextInput: {
          styles: { error: { whiteSpace: "pre-line" } },
        },
        Textarea: {
          styles: { error: { whiteSpace: "pre-line" } },
        },
      },
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    <ModalsProvider>{children}</ModalsProvider>
  </MantineProvider>
);

export default MantineApp;
