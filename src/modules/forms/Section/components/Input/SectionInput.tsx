import React from "react";
import { Button, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import sectionFormStyles from "./SectionInputStyles";

interface TaskInputProps {
  focused: boolean | undefined;
  setFocused(value: boolean): void;
  props: React.ComponentPropsWithoutRef<"input" | "textarea">;
}

const SectionInput = ({ focused, setFocused, ...props }: TaskInputProps) => {
  const { classes } = sectionFormStyles();

  return (
    <>
      <Button
        onClick={() => setFocused(true)}
        leftIcon={<IconPlus />}
        variant='default'
        data-is-focused={focused}
        className={classes.inactive}
      >
        Add new list
      </Button>
      {focused ? (
        <TextInput
          autoFocus
          size="md"
          placeholder="New section"
          className={classes.newInput}
          {...props}
        />
      ) : null}
    </>
  );
};

export default SectionInput;
