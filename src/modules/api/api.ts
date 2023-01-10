import * as Project from "./projects";
import * as Task from "./tasks";
import * as Section from "./sections";

export const getAllProjects = Project.getAllProjects;
export const getProject = Project.getProject;
export const createProject = Project.createProject;
export const updateProject = Project.updateProject;
export const deleteProject = Project.deleteProject;

export const getProjectTasks = Task.getProjectTasks;
export const getProjectTask = Task.getProjectTask;
export const createProjectTask = Task.createProjectTask;
export const updateProjectTask = Task.updateProjectTask;
export const deleteProjectTask = Task.deleteProjectTask;

export const getProjectSections = Section.getProjectSections;
export const getProjectSection = Section.getProjectSection;
export const createProjectSection = Section.createProjectSection;
export const updateProjectSection = Section.updateProjectSection;
export const deleteProjectSection = Section.deleteProjectSection;
