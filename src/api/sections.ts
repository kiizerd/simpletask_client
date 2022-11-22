import { Section } from "../types/models";
import { projectsRoute } from "./projects";

const sectionsRoute = (projectId: number): string =>
  projectsRoute + `/${projectId}/sections`;

const getProjectSection = async (
  projectId: number,
  sectionId: number
): Promise<Section> => {
  const response = await fetch(sectionsRoute(projectId) + `/${sectionId}`);
  const data = await response.json();
  const section: Section = {
    id: data.id,
    name: data.name,
  };

  return section;
};

const getProjectSections = async (projectId: number): Promise<Section[]> => {
  const response = await fetch(sectionsRoute(projectId));
  const data = await response.json();
  const sections = data.map((dataItem: Section) => ({
    id: dataItem.id,
    name: dataItem.name,
  }));

  return sections;
};

const createProjectSection = async (
  projectId: number,
  sectionData: Partial<Section>
): Promise<Section> => {
  const { name } = sectionData;
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section: { name } }),
  };
  const response = await fetch(sectionsRoute(projectId), request);
  const data = await response.json();
  const section: Section = {
    id: data.id,
    name: data.name,
  };

  return section;
};

const updateProjectSection = async (
  projectId: number,
  sectionData: Section
): Promise<Section> => {
  const { id, name } = sectionData;
  const sectionRoute = sectionsRoute(projectId) + `/${id}`;
  const request = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section: { name } }),
  };
  const response = await fetch(sectionRoute, request);
  const data = await response.json();
  const section: Section = {
    id: data.id,
    name: data.name,
  };

  return section;
};

const deleteProjectSection = async (
  projectId: number,
  sectionId: number
): Promise<number> => {
  const request = { method: "DELETE" };
  const sectionRoute = sectionsRoute(projectId) + `/${sectionId}`;
  const response = await fetch(sectionRoute, request);
  // const data = await response.json();

  return response.status;
};

export {
  sectionsRoute,
  getProjectSection,
  getProjectSections,
  createProjectSection,
  updateProjectSection,
  deleteProjectSection,
};
