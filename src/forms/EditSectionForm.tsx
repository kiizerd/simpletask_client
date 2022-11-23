import {
  Button,
  createStyles,
  Flex,
  keyframes,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef } from "react";
import { updateProjectSection } from "../api/sections";
import { Section } from "../types/models";

const slide = keyframes({
  "from, 0%, to": {
    opacity: 15,
    transform: "translate3D(-6px, 2px, 0)",
  },
  "65%": { opacity: 80, transform: "translate3D(3px, -1px, 0)" },
  "100%": { opacity: 100, transform: "translate3D(0, 0, 0)" },
});

const useStyles = createStyles(() => ({
  button: {
    animation: `${slide} 0.2s linear`,
  },
  wrapper: {
    animation: `${slide} 0.2s linear`,
  },
}));

interface SectionFormProps {
  projectId: number;
  section: Section;
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

const EditSectionForm = forwardRef(function SectionForm(
  { projectId, section, update }: SectionFormProps,
  ref
) {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: { name: section.name },
    validate: { name: sectionNameValidation },
  });

  const submit = async (formValues: SectionFormValues) => {
    const newSection: Section = { id: section.id, name: formValues.name };
    await updateProjectSection(projectId, newSection);
    form.setValues({ name: "" });
    update();
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex
        gap="sm"
        sx={(theme) => ({
          paddingBottom: "7px",
          borderBottom: `1px solid ${theme.colors.dark[3]}`,
        })}
        align="center"
      >
        <TextInput
          ref={ref}
          size="xs"
          classNames={{ wrapper: classes.wrapper }}
          styles={{ input: { fontSize: 16, fontWeight: 700 } }}
          {...form.getInputProps("name")}
        />
        <Button
          type="submit"
          compact
          styles={{ label: { overflow: "visible" } }}
        >
          Update
        </Button>
      </Flex>
    </form>
  );
});

export default EditSectionForm;
