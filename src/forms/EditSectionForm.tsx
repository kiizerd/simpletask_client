import { Box, Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { updateProjectSection } from "../api/sections";
import sectionFormStyles from "../styles/SectionFormStyles";
import { Section } from "../types/models";
import { SectionFormValues, sectionNameValidation } from "./SectionForm";

interface SectionFormProps {
  section: Section;
  update(newName: string): void;
  setEditMode(value: boolean): void;
}

const EditSectionForm = (props: SectionFormProps) => {
  const { section, setEditMode, update } = props;
  const { id, name, projectId } = section;
  const { classes } = sectionFormStyles();
  const ref = useClickOutside(() => setEditMode(false));
  const form = useForm({
    initialValues: { name },
    validate: { name: sectionNameValidation },
  });

  const submit = async (formValues: SectionFormValues) => {
    // Replace name variable in local scope
    const { name } = formValues;
    const newSection: Section = { id, name, projectId };
    await updateProjectSection(projectId, newSection);
    form.setValues({ name: "" });
    update(name);
    setEditMode(false);
  };

  const errorTimeout = () => setTimeout(() => form.clearErrors(), 3000);
  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex ref={ref} gap="sm" className={classes.container}>
        <TextInput
          size="xs"
          classNames={{ wrapper: classes.wrapper, input: classes.input }}
          {...form.getInputProps("name")}
        />
        <Box pt={2}>
          <Button type="submit" compact onClick={errorTimeout}>
            Update
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default EditSectionForm;
