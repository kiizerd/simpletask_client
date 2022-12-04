import { useEffect, useState } from "react";
import { getProjectSection } from "../api/sections";
import { Section, Task } from "../types/models";

export default function useSection(projectId: number, sectionId: number) {
  const [section, setSection] = useState<Section>();

  useEffect(() => {
    const setup = async () => {
      setSection(await getProjectSection(projectId, sectionId));
    };

    setup();
  }, [sectionId]);

  const addTask = async (newTask: Task) => {
    if (!section || !section.tasks) return;

    setSection({ ...section, tasks: [...section.tasks, newTask] });
  };

  const updateTask = async (taskId: number, newTask: Task) => {
    if (!section || !section.tasks) return;

    const newTasks = section.tasks.map((task) => {
      return task.id == taskId ? newTask : task;
    });

    setSection({ ...section, tasks: newTasks });
  };

  const removeTask = async (taskId: number) => {
    if (!section || !section.tasks) return;

    const newTasks = section.tasks.filter((task) => task.id !== taskId);

    setSection({ ...section, tasks: newTasks });
  };

  return { section, addTask, updateTask, removeTask };
}
