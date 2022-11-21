import React from "react";
import { MantineProvider, ButtonProps } from "@mantine/core";

const ButtonDefaultProps: Partial<ButtonProps> = {
  p: 'xs',
  color: "dark",
  variant: "white",
};

const MantineApp = ({ children }: React.PropsWithChildren) => (
  <MantineProvider
    theme={{
      colorScheme: "dark",
      components: {
        Button: { defaultProps: ButtonDefaultProps }
      }
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    {children}
  </MantineProvider>
);

export default MantineApp;
