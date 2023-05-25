import Project, { ProjectData } from "types/Project";

// const apiURL = import.meta.env.API_URL;
const apiURL = "http://localhost:5100";
const projectsRoute = apiURL + "/projects";

const getProject = async (id: number): Promise<Project> => {
  const response = await fetch(projectsRoute + `/${id}`, {
    credentials: "include",
  });
  const data = (await response.json()) as ProjectData;
  const project = new Project(data.id, data);

  return project;
};

const getAllProjects = async (): Promise<Project[]> => {
  const response = await fetch(projectsRoute, { credentials: "include" });
  const data = (await response.json()) as ProjectData[];
  const projects = data.map((project) => new Project(project.id, project));

  return projects;
};

const createProject = async (
  projectData: Partial<Project>
): Promise<Project> => {
  const { description, title } = projectData;
  const request = new Request(projectsRoute, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    credentials: 'include',
    body: JSON.stringify({ project: { title, description } }),
  });
  const response = await fetch(request);
  const data = (await response.json()) as ProjectData;
  const project = new Project(data.id, data);

  return project;
};

const updateProject = async (
  projectData: Partial<Project>
): Promise<Project> => {
  const { id, description, title } = projectData;
  const projectRoute = projectsRoute + `/${id}`;
  const request = new Request(projectRoute, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", },
    credentials: 'include',
    body: JSON.stringify({ project: { title, description } }),
  });
  const response = await fetch(request);
  const data = (await response.json()) as ProjectData;
  const project = new Project(data.id, data);

  return project;
};

const deleteProject = async (projectId: number): Promise<Project[]> => {
  const projectRoute = projectsRoute + `/${projectId}`;
  const request = new Request(projectRoute, {
    method: "DELETE",
    credentials: "include",
  });
  const response = await fetch(request);
  const data = (await response.json()) as ProjectData[];
  const projects = data.map((dataItem) => new Project(dataItem.id, dataItem));

  return projects;
};

export {
  projectsRoute,
  getProject,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
