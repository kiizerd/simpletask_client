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

const newProject = async (title: string, desc: string): Promise<Project> => {
  const request = {
    method: "POST",
    body: `project[title]=${title}&project[desc]=${desc}`,
  };
  const response = await fetch(projectsRoute, request);
  const data = await response.json();
  const project = { title: data.title, description: data.description };

  return project;
};

export { getProject, getAllProjects, newProject };
