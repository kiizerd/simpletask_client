import { Button, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import sectionFormStyles from "./SectionInputStyles";

interface SectionInputProps {
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

const SectionInput = ({
  focused,
  setFocused,
  formProps,
}: SectionInputProps): JSX.Element => {
  const { classes } = sectionFormStyles();

  return (
    <>
      <Button
        onClick={() => {
          setFocused(true);
        }}
        leftIcon={<IconPlus />}
        variant="default"
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
          {...formProps}
        />
      ) : null}
    </>
  );
};

export default SectionInput;
