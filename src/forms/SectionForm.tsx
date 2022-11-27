import { ActionIcon, Box, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { createProjectSection } from "../api/sections";
import { Section } from "../types/models";

interface SectionFormProps {
  projectId: number;
  add(sectionData: Section): void;
}

export interface SectionFormValues {
  name: string;
}

export const sectionNameValidation = (name: string) => {
  const tooLongMsg = `Cannot exceed 21 chars. Currently ${name.length}`;
  if (name.length > 21) return tooLongMsg;
  if (name.length == 0) return "Name is required.";

  return null;
};

const SectionForm = ({ projectId, add }: SectionFormProps) => {
  const form = useForm({
    initialValues: { name: "" },
    validate: { name: sectionNameValidation },
  });

  const submit = async (formValues: SectionFormValues) => {
    const newSection = await createProjectSection(projectId, formValues);
    form.setValues({ name: "" });
    add(newSection);
  };

  const errorTimeout = () => setTimeout(() => form.clearErrors(), 3000);
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
            onClick={errorTimeout}
          >
            <IconPlus />
          </ActionIcon>
        </Box>
      </Flex>
    </form>
  );
};

export default SectionForm;
