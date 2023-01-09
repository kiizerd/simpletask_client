import { Box, Button, Textarea } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React from "react";
import {
  flushTextAreaCursor,
  preventTextAreaSubmitOnEnter,
} from "../../helpers/formHelpers";
import taskFormStyles from "../../styles/TaskFormStyles";

interface TaskInputProps {
  focused: boolean | undefined;
  setFocused(value: boolean): void;
  props: React.ComponentPropsWithoutRef<"input" | "textarea">;
}

const TaskInput = ({ focused, setFocused, ...props }: TaskInputProps) => {
  const { classes } = taskFormStyles();

  return (
    <Box style={{ width: "100%" }}>
      <Button
        onClick={() => setFocused(true)}
        leftIcon={<IconPlus />}
        variant="subtle"
        data-is-focused={focused}
        className={classes.inactive}
      >
        Add new task
      </Button>
      {focused ? (
        <Textarea
          autoFocus
          placeholder="New task name"
          onFocusCapture={flushTextAreaCursor}
          onKeyDownCapture={preventTextAreaSubmitOnEnter}
          variant="unstyled"
          size="md"
          classNames={classes}
          className={classes.textarea}
          maxRows={4}
          {...props}
        />
      ) : null}
    </Box>
  );
};

export default TaskInput;
