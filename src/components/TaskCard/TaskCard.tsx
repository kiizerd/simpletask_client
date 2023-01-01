import { Box, Card, Group, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import Task from "../../types/Task";
import taskCardStyles from "../../styles/TaskCardStyles";
import EditTaskForm from "../../forms/EditTaskForm";
import TaskControls from "./TaskControls";
import useTask from "../../hooks/useTask";

interface TaskCardProps {
  task: Task;
}

const TaskCard = (props: TaskCardProps) => {
  const { id, projectId } = props.task;
  const [editMode, setEditMode] = useState<boolean>();
  const { task = props.task } = useTask(projectId, id);
  const { hovered, ref: hoverRef } = useHover();
  const { classes } = taskCardStyles();

  return (
    <Box
      data-task-id={id}
      style={{ position: "relative", overflow: "visible" }}
    >
      <Card
        ref={hoverRef}
        className={classes.card}
        data-complete={task.isComplete()}
      >
        <Group position="apart" align="flex-start">
          <Box>
            <Text className={classes.text} data-edit-mode={editMode}>
              {task.name}
            </Text>
          </Box>
          <TaskControls
            task={task}
            hovered={hovered}
            className={classes.taskControls}
            setEditMode={setEditMode}
          />
        </Group>
      </Card>
      {editMode && <EditTaskForm task={task} setEditMode={setEditMode} />}
    </Box>
  );
};

export default TaskCard;
