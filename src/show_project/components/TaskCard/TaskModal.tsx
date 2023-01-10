import { Box, Modal } from "@mantine/core";
import Task from "types/Task";

interface TaskModalProps {
  task: Task;
  opened: boolean;
  setOpened(value: boolean): void;
}

const TaskModal = ({ task, opened, setOpened }: TaskModalProps) => (
  <Modal
    opened={opened}
    onClose={() => setOpened(false)}
    title={task.name}
    closeOnClickOutside
  >
    <Box>fooBar</Box>
  </Modal>
);

export default TaskModal;
