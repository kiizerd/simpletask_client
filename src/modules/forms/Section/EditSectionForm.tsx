import { useContext } from "react";
import { Box, Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { updateProjectSection } from "@api/sections";
import SectionContext from "@contexts/SectionContext";
import SectionIndexContext from "@contexts/SectionIndexContext";
import { errorTimeout } from "@helpers/formHelpers";
import sectionFormStyles from "./SectionFormStyles";
import { validate } from "./SectionForm";
import Section from "types/Section";

interface SectionFormProps {
  setEditMode(value: boolean): void;
}

const EditSectionForm = ({ setEditMode }: SectionFormProps) => {
  const section = useContext(SectionContext);
  const { id, name, projectId } = section;
  const { sections = [], mutate } = useContext(SectionIndexContext);
  const { classes } = sectionFormStyles();

  const clickRef = useClickOutside(() => setEditMode(false));
  const form = useForm({
    initialValues: { name },
    validate,
  });

  const submit = async (formValues: Partial<Section>) => {
    if (!mutate) return console.error("No SWR mutate method found.");

    const newSection = new Section(id, { ...formValues });
    const optimisticData = sections.map((section) =>
      section.id == id ? newSection : section
    );

    const applySectionUpdate = async () => {
      const updated = await updateProjectSection(projectId, newSection);
      return sections.map((section) => (section.id == id ? updated : section));
    };

    await mutate(applySectionUpdate, {
      optimisticData,
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });

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
