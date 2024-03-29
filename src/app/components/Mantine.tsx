import type React from "react";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
  type ButtonProps,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

const MantineApp = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const primaryColor = colorScheme === "dark" ? "violet" : "indigo";
  const toggleColorScheme = (value?: ColorScheme): void => {
    setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));
  };

  const ButtonDefaultProps: Partial<ButtonProps> = { p: "xs" };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          primaryColor,
          fontFamily: "Verdana, sans-serif",
          fontFamilyMonospace: "Monaco, Courier, monospace",
          components: {
            Button: {
              defaultProps: ButtonDefaultProps,
              styles: { label: { overflow: "visible" } },
              classNames: { root: "button-root" },
            },
            Drawer: {
              classNames: {
                title: "drawer-title",
                closeButton: "drawer-close",
              },
            },
            Group: { classNames: { root: "group" } },
            TextInput: { styles: { error: { whiteSpace: "pre-line" } } },
            Textarea: { styles: { error: { whiteSpace: "pre-line" } } },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default MantineApp;
