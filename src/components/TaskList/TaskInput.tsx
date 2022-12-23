import { Box, Textarea, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React, { KeyboardEvent } from "react";
import taskFormStyles from "../../styles/TaskFormStyles";

interface TaskInputProps {
  focused: boolean;
  setFocused(value: boolean): void;
  props: React.ComponentPropsWithoutRef<"input" | "textarea">;
}

const TaskInput = ({ focused, setFocused, ...props }: TaskInputProps) => {
  const { classes } = taskFormStyles();

  return (
    <Box style={{ width: "100%" }}>
      {!focused ? (
        <TextInput
          icon={<IconPlus />}
          onFocusCapture={() => setFocused(true)}
          placeholder="Add new task"
          {...props}
        />
      ) : (
        <Textarea
          autoFocus
          placeholder="New task title"
          onFocusCapture={(e) => {
            const len = e.currentTarget.value.length;
            e.currentTarget.setSelectionRange(len, len);
          }}
          onKeyDownCapture={(e: KeyboardEvent) => {
            if (e.key == "Enter" && !e.shiftKey) {
              const target = e.target as HTMLTextAreaElement;
              const form = target.form;
              e.preventDefault();
              form?.requestSubmit();
            }
          }}
          variant="unstyled"
          size="md"
          classNames={classes}
          className={classes.textarea}
          maxRows={4}
          {...props}
        />
      )}
    </Box>
  );
};

export default TaskInput;
