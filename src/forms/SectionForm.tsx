import { ActionIcon, Box, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { useContext } from "react";
import { createProjectSection } from "../api/sections";
import SectionIndexContext from "../contexts/SectionIndexContext";
import { errorTimeout } from "../helpers/formHelpers";
import Section from "../types/Section";

interface SectionFormProps {
  projectId: number;
}

const nameValidation = (name: string) => {
  if (name.length == 0) return "Name is required.";

  const tooLongMsg = `Name too long.\n Max 21 chars, currently ${name.length}.`;
  if (name.length > 21) return tooLongMsg;

  return null;
};

export const validate = { name: nameValidation };

const SectionForm = ({ projectId }: SectionFormProps) => {
  const { sections = [], mutate } = useContext(SectionIndexContext);
  const form = useForm({
    initialValues: { name: "" },
    validate,
  });

  const submit = async (formValues: Partial<Section>) => {
    if (!mutate) return console.error("No SWR mutate method found.");

    const newSection = await createProjectSection(projectId, formValues);
    await mutate([...sections, newSection], {
      optimisticData: [...sections, new Section(0, formValues)],
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });

    form.setValues({ name: "" });
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex gap="sm">
        <TextInput
          w="100%"
          placeholder="New Section"
          {...form.getInputProps("name")}
        />
        <Box pt={4}>
          <ActionIcon
            variant="filled"
            color="violet"
            type="submit"
            onClick={() => errorTimeout(form)}
          >
            <IconPlus />
          </ActionIcon>
        </Box>
      </Flex>
    </form>
  );
};

export default SectionForm;
