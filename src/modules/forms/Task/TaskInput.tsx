import { Box, Button, Textarea } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import {
  flushTextAreaCursor,
  preventTextAreaSubmitOnEnter,
} from "@helpers/formHelpers";
import taskFormStyles from "./TaskFormStyles";

interface TaskInputProps {
  focused: boolean | undefined;
  setFocused: (value: boolean) => void;
  formProps: {
    value: any;
    onChange: any;
    onFocus?: any;
    onBlur?: any;
    error?: any;
  };
}

const TaskInput = ({
  focused,
  setFocused,
  formProps
}: TaskInputProps): JSX.Element => {
  const { classes } = taskFormStyles();

  return (
    <Box style={{ width: "100%" }}>
      <Button
        onClick={() => {
          setFocused(true);
        }}
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
          {...formProps}
        />
      ) : null}
    </Box>
  );
};

export default TaskInput;
