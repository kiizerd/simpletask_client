import { Space, Spoiler, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";

interface ProjectDescriptionProps {
  description: string;
  classNames: Record<"control" | "description", string>;
}

const ProjectDescription = ({
  description,
  classNames,
}: ProjectDescriptionProps): JSX.Element => {
  if (!description || description.length < 1) return <Space h={4} />;

  return (
    <Spoiler
      classNames={{ control: classNames.control }}
      maxHeight={2}
      pb={2}
      showLabel={<IconChevronDown />}
      hideLabel={<IconChevronUp />}
    >
      <Text className={classNames.description}>{description}</Text>
    </Spoiler>
  );
};

export default ProjectDescription;
