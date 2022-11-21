import { Project } from "../types/models";

// const apiURL = import.meta.env.API_URL;
const apiURL = "http://localhost:3000";
const projectsRoute = apiURL + "/projects";

const getProject = async (id: number): Promise<Project> => {
  const response = await fetch(projectsRoute + `/${id}`);
  const data = await response.json();
  const project: Project = {
    id: data.id,
    title: data.title,
    description: data.description,
  };

  return project;
};

const getAllProjects = async (): Promise<Project[]> => {
  const response = await fetch(projectsRoute);
  const data = await response.json();
  const projects = data.map((dataItem: Project) => ({
    id: dataItem.id,
    title: dataItem.title,
    description: dataItem.description,
  }));

  return projects;
};

const createProject = async (
  projectData: Partial<Project>
): Promise<Project> => {
  const { description, title } = projectData;
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project: { title, description } }),
  };
  const response = await fetch(projectsRoute, request);
  const data = await response.json();
  const project: Project = {
    id: data.id,
    title: data.title,
    description: data.description,
  };

  return project;
};

const updateProject = async (oldProject: Project): Promise<Project> => {
  const { id, description, title } = oldProject;
  const projectRoute = projectsRoute + `/${id}`;
  const request = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project: { title, description } }),
  };
  const response = await fetch(projectRoute, request);
  const data = await response.json();
  const project: Project = {
    id: data.id,
    title: data.title,
    description: data.description,
  };

  return project;
};

const deleteProject = async (projectId: number): Promise<number> => {
  const request = { method: "DELETE" };
  const projectRoute = projectsRoute + `/${projectId}`;
  const response = await fetch(projectRoute, request);
  // const data = await response.json();

  return response.status;
};

export {
  getProject,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
