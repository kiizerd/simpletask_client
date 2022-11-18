import { MantineProvider } from "@mantine/core";
import React from "react";

const MantineApp = ({ children }: React.PropsWithChildren) => (
  <MantineProvider
    theme={{ colorScheme: "dark" }}
    withGlobalStyles
    withNormalizeCSS
  >
    {children}
  </MantineProvider>
);

export default MantineApp;
