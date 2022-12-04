import {
  Box,
  Button,
  createStyles,
  Flex,
  keyframes,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClickOutside } from "@mantine/hooks";
import { updateProjectTask } from "../api/tasks";
import { Task } from "../types/models";

const appear = keyframes({
  "from, 0%, to": { opacity: 0, transform: "translateX(-8px)" },
  "80%": { transform: "translateX(2px)" },
  "100%": { opacity: 100, transform: "translateX(0)" },
});

const useStyles = createStyles((theme) => ({
  form: {
    animation: `${appear} 0.3s linear`,
    paddingTop: 3,
  },
  textarea: {
    borderRadius: theme.radius.sm,
    paddingLeft: theme.spacing.xs,
    backgroundColor: theme.colors.dark[5],
    boxShadow: `0 0 35px ${theme.colors.dark[8]}`,
  },
}));

interface EditTaskForm {
  task: Task;
  setEditMode(value: boolean): void;
  update(taskId: number, newTask: Task): void;
}

const EditTaskForm = (props: EditTaskForm) => {
  const { task, setEditMode, update } = props;
  const { classes } = useStyles();
  const clickRef = useClickOutside(() => setEditMode(false));
  const form = useForm({ initialValues: { name: task.name } });

  const submit = async (formValues: Partial<Task>) => {
    const newTask = { ...task, ...formValues };
    updateProjectTask(task.projectId, newTask);
    setEditMode(false);
    update(newTask.id, newTask);
  };

  return (
    <form
      className={classes.form}
      style={{ position: "absolute", top: 0, zIndex: 250 }}
      onSubmit={form.onSubmit(submit)}
    >
      <Flex ref={clickRef} gap={3}>
        <Textarea
          // autosize
          variant="unstyled"
          size="md"
          className={classes.textarea}
          maxRows={4}
          {...form.getInputProps("name")}
        />
        <Box py={3} px={4}>
          <Button type="submit" compact>
            Update
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default EditTaskForm;
