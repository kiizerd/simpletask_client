import { type FC, memo, useState, useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { Box, Card, Group, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { EditTaskForm } from "@forms/Task";
import useTask from "@hooks/useTask";
import taskCardStyles from "./TaskCardStyles";
import TaskControls from "./TaskControls";
import type Task from "types/Task";
import { ItemTypes } from "types/dragndrop";

interface TaskCardProps {
  task: Task;
  index: number;
  moveTask: (id: number, to: number) => void;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
  task: Task;
}

const DraggableTaskCard: FC<TaskCardProps> = memo(function DraggableTaskCard({
  task: _task,
  index,
  moveTask,
}: TaskCardProps) {
  const { id, projectId } = _task;
  const [editMode, setEditMode] = useState<boolean>();
  const { task = _task } = useTask(projectId, id);
  const { hovered, ref: hoverRef } = useHover();
  const { classes } = taskCardStyles();

  const dropRef = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index, task };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(dropRef));
  return (
    <Box
      className={`${classes.draggable} task-card`}
      data-handler-id={handlerId}
      data-task-id={id}
      style={{
        position: "relative",
        overflow: "visible",
        opacity,
      }}
      ref={dropRef}
    >
      <Card
        ref={hoverRef}
        className={classes.draggableCard}
        data-complete={task.isComplete()}
      >
        <Group position="apart" align="flex-start">
          <Box>
            <Text className={classes.text} data-edit-mode={editMode} lineClamp={1}>
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
});

export default DraggableTaskCard;
