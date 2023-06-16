import update from "immutability-helper";
import { useContext, useCallback, useState, useEffect } from "react";
import { Box, Divider } from "@mantine/core";
import { useDrop } from "react-dnd";
import TaskForm from "@forms/Task";
import { SectionContext } from "@contexts/SectionContext";
import TaskIndexContext from "@contexts/TaskIndexContext";
import useTaskIndex from "@hooks/useTaskIndex";
import { DraggableTaskCard, type DragItem } from "../TaskCard";
import type Task from "types/Task";
import { ItemTypes } from "types/dragndrop";
import { moveSectionTask } from "@api/tasks";

const DroppableTaskList = (): JSX.Element => {
  const {
    showComplete,
    sectionData: { section },
  } = useContext(SectionContext);
  const { tasks, mutate } = useTaskIndex(section.projectId, section.id);
  const [draggableTasks, setDraggableTasks] = useState(tasks);

  useEffect(() => {
    // Only update if tasks is nonempty and of different size than draggable tasks
    if (tasks && tasks.length > 0 && tasks.length !== draggableTasks.length)
      setDraggableTasks(tasks);
  }, [tasks]);

  const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
    const updateListCallback = (prevTasks: Task[]): Task[] =>
      update(prevTasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevTasks[dragIndex]],
        ],
      });
    setDraggableTasks(updateListCallback);
    void mutate(
      (currentData: Task[] | undefined) =>
        updateListCallback(currentData ?? []),
      { revalidate: false, populateCache: true, optimisticData: draggableTasks }
    );
  }, []);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: DragItem) => {
      const { index, task } = item;
      void moveSectionTask(index, task);
    },
  }));

  return (
    <TaskIndexContext.Provider value={{ tasks, mutate }}>
      <Box className="task-list">
        <div ref={drop}>
          {draggableTasks.map((task: Task, index: number) =>
            !showComplete && task.isComplete() ? null : (
              <DraggableTaskCard
                key={task.id}
                task={task}
                index={index}
                moveTask={moveTask}
              />
            )
          )}
        </div>
      </Box>
      <Divider />
      <TaskForm ids={[section.projectId, section.id]} />
    </TaskIndexContext.Provider>
  );
};

export default DroppableTaskList;
