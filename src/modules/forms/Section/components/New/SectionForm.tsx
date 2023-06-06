import { useContext, useState } from "react";
import { ActionIcon, Box, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import { createProjectSection } from "@api/sections";
import SectionIndexContext from "@contexts/SectionIndexContext";
import { errorTimeout } from "@helpers/formHelpers";
import Section from "types/Section";
import SectionInput from "../Input";
import { useClickOutside } from "@mantine/hooks";
import sectionFormStyles from "./SectionFormStyles";

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
  const [focused, setFocused] = useState<boolean | undefined>();
  const { sections = [], mutate } = useContext(SectionIndexContext);
  const { classes } = sectionFormStyles();
  const form = useForm({ initialValues: { name: "" }, validate });
  const clickRef = useClickOutside(() => {
    if (focused != undefined) setFocused(false);
    form.clearErrors();
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

    setFocused(false);
  };

  return (
    <form onSubmit={form.onSubmit(submit)} className="section-form">
      <Flex gap="sm" ref={clickRef} className={classes.formWrapper}>
        <SectionInput
          focused={focused}
          setFocused={setFocused}
          formProps={form.getInputProps("name")}
        />
        <Box display={focused ? "" : "none"} className={classes.button}>
          <ActionIcon
            variant="filled"
            color="violet"
            type="submit"
            mt={4}
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
