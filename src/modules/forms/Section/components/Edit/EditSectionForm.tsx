import { useContext } from "react";
import { Box, Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { mutate } from "swr";
import { useClickOutside } from "@mantine/hooks";
import { updateProjectSection } from "@api/sections";
import { SectionContext } from "@contexts/SectionContext";
import { errorTimeout } from "@helpers/formHelpers";
import sectionFormStyles from "./EditSectionFormStyles";
import { validate } from "../New/SectionForm";
import Section from "types/Section";

interface SectionFormProps {
  toggleEditMode: () => void;
}

const EditSectionForm = ({ toggleEditMode }: SectionFormProps): JSX.Element => {
  const {
    sectionData: { section },
  } = useContext(SectionContext);
  const { id, name, projectId, route } = section;
  const { classes } = sectionFormStyles();

  const clickRef = useClickOutside(toggleEditMode);
  const form = useForm({
    initialValues: { name },
    validate,
  });

  const submit = (formValues: Partial<Section>): void => {
    const newSection = new Section(id, { ...section, ...formValues });
    void mutate(
      route,
      async () => await updateProjectSection(projectId, newSection),
      {
        optimisticData: newSection,
      }
    );
    toggleEditMode();
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex ref={clickRef} gap="sm" className={classes.container}>
        <TextInput
          autoFocus
          size="xs"
          classNames={{ wrapper: classes.wrapper, input: classes.input }}
          {...form.getInputProps("name")}
        />
        <Box pt={2}>
          <Button
            type="submit"
            compact
            onClick={() => {
              errorTimeout(form);
            }}
          >
            Update
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default EditSectionForm;
