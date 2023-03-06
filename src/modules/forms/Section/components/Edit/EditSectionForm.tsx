import { useContext } from "react";
import { Box, Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { mutate } from "swr";
import { useClickOutside } from "@mantine/hooks";
import { updateProjectSection } from "@api/sections";
import SectionContext from "@contexts/SectionContext";
import { errorTimeout } from "@helpers/formHelpers";
import sectionFormStyles from "./EditSectionFormStyles";
import { validate } from "../New/SectionForm";
import Section from "types/Section";

interface SectionFormProps {
  setEditMode(value: boolean): void;
}

const EditSectionForm = ({ setEditMode }: SectionFormProps) => {
  const section = useContext(SectionContext);
  const { id, name, projectId, route } = section;
  const { classes } = sectionFormStyles();

  const clickRef = useClickOutside(() => setEditMode(false));
  const form = useForm({
    initialValues: { name },
    validate,
  });

  const submit = async (formValues: Partial<Section>) => {
    const newSection = new Section(id, { ...section, ...formValues });
    await mutate(route, updateProjectSection(projectId, newSection));
    setEditMode(false);
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
          <Button type="submit" compact onClick={() => errorTimeout(form)}>
            Update
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default EditSectionForm;
