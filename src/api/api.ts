import { Project } from "../types/models";

// const apiURL = import.meta.env.API_URL;
const apiURL = "http://localhost:3000";
const projectsRoute = apiURL + "/projects";

const getProject = async (id: number): Promise<Project> => {
  const response = await fetch(projectsRoute + `/${id}`);
  const project = await response.json();

  return project;
};

const getAllProjects = async (): Promise<Project[]> => {
  const response = await fetch(projectsRoute);
  const data = await response.json();

  return data;
};

const newProject = async (title: string, description: string): Promise<Project> => {
  const request = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify({ project: { title, description} }),
  };
  const response = await fetch(projectsRoute, request);
  const data = await response.json();
  const project = { ...data };

  return project;
};

export { getProject, getAllProjects, newProject };
