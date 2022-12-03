import { Task } from "../types/models";
import { projectsRoute } from "./projects";
import { sectionsRoute } from "./sections";

const tasksRoute = (projectId: number): string =>
  projectsRoute + `/${projectId}/tasks`;

const getProjectTask = async (
  projectId: number,
  taskId: number
): Promise<Task> => {
  const response = await fetch(tasksRoute(projectId) + `/${taskId}`);
  const data = await response.json();
  const task: Task = {
    id: data.id,
    name: data.name,
    details: data.details,
    projectId: data.projectId,
    sectionId: data.sectionId,
  };

  return task;
};

const getSectionTasks = async (
  projectId: number,
  sectionId: number
): Promise<Task[]> => {
  const sectionTasksRoute = `${sectionsRoute(projectId)}/${sectionId}/tasks`;
  const response = await fetch(sectionTasksRoute);
  const data = await response.json();
  const tasks = data.map((dataItem: Task) => ({
    id: dataItem.id,
    name: dataItem.name,
    details: dataItem.details,
    projectId: dataItem.project_id,
    sectionId: dataItem.section_id,
  }));

  return tasks;
};

const getProjectTasks = async (projectId: number): Promise<Task[]> => {
  const response = await fetch(tasksRoute(projectId));
  const data = await response.json();
  const tasks = data.map((dataItem: Task) => ({
    id: dataItem.id,
    name: dataItem.name,
    details: dataItem.details,
    projectId: dataItem.projectId,
    sectionId: dataItem.sectionId,
  }));

  return tasks;
};

const createProjectTask = async (
  projectId: number,
  taskData: Partial<Task>
): Promise<Task | null> => {
  const { name, details, sectionId } = taskData;
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: { name, details, section_id: sectionId } }),
  };
  const response = await fetch(tasksRoute(projectId), request);
  if (response.status != 200) return null;

  const data = await response.json();
  const task: Task = {
    id: data.id,
    name: data.name,
    details: data.details,
    projectId: data.projectId,
    sectionId: data.sectionId,
  };

  return task;
};

const updateProjectTask = async (
  projectId: number,
  taskData: Task
): Promise<Task> => {
  const { id, name, details } = taskData;
  const taskRoute = tasksRoute(projectId) + `/${id}`;
  const request = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: { name, details } }),
  };
  const response = await fetch(taskRoute, request);
  const data = await response.json();
  const task: Task = {
    id: data.id,
    name: data.name,
    details: data.details,
    projectId: data.projectId,
    sectionId: data.sectionId,
  };

  return task;
};

const deleteProjectTask = async (
  projectId: number,
  taskId: number
): Promise<number> => {
  const request = { method: "DELETE" };
  const taskRoute = tasksRoute(projectId) + `/${taskId}`;
  const response = await fetch(taskRoute, request);
  // const data = await response.json();

  return response.status;
};

export {
  getProjectTask,
  getProjectTasks,
  getSectionTasks,
  createProjectTask,
  updateProjectTask,
  deleteProjectTask,
};
