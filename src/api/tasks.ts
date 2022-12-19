import { projectsRoute } from "./projects";
import { sectionsRoute } from "./sections";
import Task, { TaskData } from "../types/Task";

const tasksRoute = (projectId: number): string =>
  projectsRoute + `/${projectId}/tasks`;

const getProjectTask = async (
  projectId: number,
  taskId: number
): Promise<Task> => {
  const response = await fetch(tasksRoute(projectId) + `/${taskId}`);
  const data = (await response.json()) as TaskData;
  const task = new Task(data.id, data);

  return task;
};

const getSectionTasks = async (
  projectId: number,
  sectionId: number
): Promise<Task[]> => {
  const sectionTasksRoute = `${sectionsRoute(projectId)}/${sectionId}/tasks`;
  const response = await fetch(sectionTasksRoute);
  const data = (await response.json()) as TaskData[];
  const tasks = data.map((dataItem) => new Task(dataItem.id, dataItem));

  return tasks;
};

const getProjectTasks = async (projectId: number): Promise<Task[]> => {
  const response = await fetch(tasksRoute(projectId));
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
    body: JSON.stringify({ task: { name, details, section_id: sectionId } }),
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
  const { id, name, details } = taskData;
  const taskRoute = tasksRoute(projectId) + `/${id}`;
  const request = new Request(taskRoute, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: { name, details } }),
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
  const request = new Request(taskRoute, { method: "DELETE" });
  const response = await fetch(taskRoute, request);
  const data = (await response.json()) as TaskData[];
  const tasks = data.map((dataItem) => new Task(dataItem.id, dataItem));

  return tasks;
};

export {
  getProjectTask,
  getProjectTasks,
  getSectionTasks,
  createProjectTask,
  updateProjectTask,
  deleteProjectTask,
};
