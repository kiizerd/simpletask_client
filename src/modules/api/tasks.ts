import { projectsRoute } from "./projects";
import { sectionsRoute } from "./sections";
import Task, { type TaskData } from "types/Task";

interface TaskErrorData {
  code: string;
  messages?: { name?: string[]; project?: string[]; section?: string[] };
  details?: { name?: string; project?: string; section?: string };
}

const tasksRoute = (projectId: number): string =>
  projectsRoute + `/${projectId}/tasks`;

const getProjectTask = async (
  projectId: number,
  taskId: number
): Promise<Task> => {
  try {
    const response = await fetch(tasksRoute(projectId) + `/${taskId}`, {
      credentials: "include",
    });
    const data = (await response.json()) as TaskData;
    const task = new Task(data.id, data);

    return task;
  } catch (error) {
    console.error(error);

    return new Task(0, {});
  }
};

const getSectionTasks = async (
  projectId: number,
  sectionId: number
): Promise<Task[]> => {
  const sectionTasksRoute = `${sectionsRoute(projectId)}/${sectionId}/tasks`;
  try {
    const response = await fetch(sectionTasksRoute, { credentials: "include" });
    const data = (await response.json()) as TaskData[];
    const tasks = data.map((dataItem) => new Task(dataItem.id, dataItem));

    return tasks;
  } catch (error) {
    console.error(error);

    return [];
  }
};

const getProjectTasks = async (projectId: number): Promise<Task[]> => {
  try {
    const response = await fetch(tasksRoute(projectId), {
      credentials: "include",
    });
    const data = (await response.json()) as TaskData[];
    const tasks = data.map((dataItem) => new Task(dataItem.id, dataItem));

    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createProjectTask = async (
  projectId: number,
  taskData: Partial<Task>
): Promise<Task | TaskErrorData> => {
  const { name, details, sectionId } = taskData;
  const request = new Request(tasksRoute(projectId), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ task: { name, details, sectionId } }),
  });
  let taskErrorData: TaskErrorData = { code: "" };
  try {
    const response = await fetch(request);
    if (!response.ok) {
      taskErrorData = (await response.json()) as TaskErrorData;
      throw new Error(
        `Failed to create project task: ${response.status} ${response.statusText}`
      );
    }
    const data = (await response.json()) as TaskData;
    const task = new Task(data.id, data);

    return task;
  } catch (error) {
    console.error(error);
    return taskErrorData;
  }
};

const updateProjectTask = async (
  projectId: number,
  taskData: Task
): Promise<Task | TaskErrorData> => {
  const { id, name, details, status } = taskData;
  const taskRoute = tasksRoute(projectId) + `/${id}`;
  const request = new Request(taskRoute, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ task: { name, details, status } }),
  });
  let taskErrorData: TaskErrorData = { code: "" };
  try {
    const response = await fetch(request);

    if (!response.ok) {
      taskErrorData = (await response.json()) as TaskErrorData;
      throw new Error(
        `Failed to update project task: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as TaskData;
    const task = new Task(data.id, data);

    return task;
  } catch (error) {
    console.error(error);
    return taskErrorData;
  }
};

const deleteProjectTask = async (
  projectId: number,
  taskId: number
): Promise<Response | Error> => {
  const taskRoute = tasksRoute(projectId) + `/${taskId}`;
  const request = new Request(taskRoute, {
    method: "DELETE",
    credentials: "include",
  });
  try {
    const response = await fetch(taskRoute, request);
    if (!response.ok) throw new Error("Couldn't delete task.");
    return response;
  } catch (error) {
    return error as Error;
  }
};

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
