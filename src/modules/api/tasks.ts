import { projectsRoute } from "./projects";
import { sectionsRoute } from "./sections";
import Task, { TaskData } from "types/Task";

const tasksRoute = (projectId: number): string =>
  projectsRoute + `/${projectId}/tasks`;

const getProjectTask = async (
  projectId: number,
  taskId: number
): Promise<Task> => {
  const response = await fetch(tasksRoute(projectId) + `/${taskId}`, {
    credentials: "include",
  });
  const data = (await response.json()) as TaskData;
  const task = new Task(data.id, data);

  return task;
};

const getSectionTasks = async (
  projectId: number,
  sectionId: number
): Promise<Task[]> => {
  const sectionTasksRoute = `${sectionsRoute(projectId)}/${sectionId}/tasks`;
  const response = await fetch(sectionTasksRoute, { credentials: "include" });
  const data = (await response.json()) as TaskData[];
  const tasks = data.map((dataItem) => new Task(dataItem.id, dataItem));

  return tasks;
};

const getProjectTasks = async (projectId: number): Promise<Task[]> => {
  const response = await fetch(tasksRoute(projectId), {
    credentials: "include",
  });
  const data = (await response.json()) as TaskData[];
  const tasks = data.map((dataItem) => new Task(dataItem.id, dataItem));

  return tasks;
};

const createProjectTask = async (
  projectId: number,
  taskData: Partial<Task>
): Promise<Task> => {
  const { name, details, sectionId } = taskData;
  const request = new Request(tasksRoute(projectId), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ task: { name, details, sectionId } }),
  });
  const response = await fetch(request);
  const data = (await response.json()) as TaskData;
  const task = new Task(data.id, data);

  return task;
};

const updateProjectTask = async (
  projectId: number,
  taskData: Task
): Promise<Task> => {
  const { id, name, details, status } = taskData;
  const taskRoute = tasksRoute(projectId) + `/${id}`;
  const request = new Request(taskRoute, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ task: { name, details, status } }),
  });
  const response = await fetch(request);
  const data = (await response.json()) as TaskData;
  const task = new Task(data.id, data);

  return task;
};

const deleteProjectTask = async (
  projectId: number,
  taskId: number
): Promise<Task[]> => {
  const taskRoute = tasksRoute(projectId) + `/${taskId}`;
  const request = new Request(taskRoute, {
    method: "DELETE",
    credentials: "include",
  });
  const response = await fetch(taskRoute, request);
  const data = (await response.json()) as TaskData[];
  const tasks = data.map((dataItem) => new Task(dataItem.id, dataItem));

const moveSectionTask = async (index: number, task: Task): Promise<void> => {
  const { id, sectionId, projectId } = task;
  const route = `${sectionsRoute(projectId)}/${sectionId}/move_task`;
  try {
    const response = await fetch(route, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: { id, index } }),
    });
    if (!response.ok) {
      throw new Error("Couldn't move task.");
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  getProjectTask,
  getProjectTasks,
  getSectionTasks,
  createProjectTask,
  updateProjectTask,
  deleteProjectTask,
  moveSectionTask,
};
