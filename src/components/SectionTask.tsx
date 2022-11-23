import { Box, Text } from "@mantine/core";
import { Task } from "../types/models";

interface SectionTaskProps {
  task: Task;
  sectionId: number;
}

const SectionTask = ({ sectionId, task }: SectionTaskProps) => {
  return (
      <Text>{task.name}</Text>
  );
};

export default SectionTask;
