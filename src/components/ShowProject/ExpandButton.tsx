import { ActionIcon, Box } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";

interface ExpandBtnProps {
  className: string;
  isExpanded: boolean;
  setIsExpanded(value: boolean): void;
}

const ExpandButton = (props: ExpandBtnProps) => {
  const { className, isExpanded, setIsExpanded } = props;

  return (
    <Box className={className}>
      <ActionIcon
        variant="subtle"
        color="violet"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <IconChevronUp /> : <IconChevronDown />}
      </ActionIcon>
    </Box>
  );
};

export default ExpandButton;
