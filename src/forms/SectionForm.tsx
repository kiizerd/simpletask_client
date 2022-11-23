import { Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { createProjectSection } from "../api/sections";

interface SectionFormProps {
  projectId: number;
  update(): void;
}

interface SectionFormValues {
  name: string;
}

const sectionNameValidation = (name: string) => {
  if (name.length > 22) return "Cannot exceed 21 chars.";
  if (name.length == 0) return "Name is required.";

  return null;
};

const SectionForm = ({ projectId, update }: SectionFormProps) => {
  const form = useForm({
    initialValues: { name: "" },
    validate: { name: sectionNameValidation },
  });

  const submit = async (formValues: SectionFormValues) => {
    await createProjectSection(projectId, formValues);
    form.setValues({ name: "" });
    update();
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex gap="sm">
        <TextInput placeholder="New Section" {...form.getInputProps("name")} />
        <Button type="submit">
          <IconPlus />
        </Button>
      </Flex>
    </form>
  );
};

export default SectionForm;
