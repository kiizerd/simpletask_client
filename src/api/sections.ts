import { projectsRoute } from "./projects";
import Section, { SectionData } from "../types/Section";

const sectionsRoute = (projectId: number): string =>
  projectsRoute + `/${projectId}/sections`;

const getProjectSection = async (
  projectId: number,
  sectionId: number
): Promise<Section> => {
  const response = await fetch(sectionsRoute(projectId) + `/${sectionId}`);
  const data = (await response.json()) as SectionData;
  const section = new Section(data.id, data);

  return section;
};

const getProjectSections = async (projectId: number): Promise<Section[]> => {
  const response = await fetch(sectionsRoute(projectId));
  const data = (await response.json()) as SectionData[];
  const sections = data.map((dataItem) => new Section(dataItem.id, dataItem));

  return sections;
};

const createProjectSection = async (
  projectId: number,
  sectionData: Partial<Section>
): Promise<Section> => {
  const { name } = sectionData;
  const request = new Request(sectionsRoute(projectId), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section: { name } }),
  });
  const response = await fetch(request);
  const data = (await response.json()) as SectionData;
  const section = new Section(data.id, data);

  return section;
};

const updateProjectSection = async (
  projectId: number,
  sectionData: Section
): Promise<Section> => {
  const { id, name } = sectionData;
  const sectionRoute = sectionsRoute(projectId) + `/${id}`;
  const request = new Request(sectionRoute, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section: { name } }),
  });
  const response = await fetch(request);
  const data = (await response.json()) as SectionData;
  const section = new Section(data.id, data);

  return section;
};

const deleteProjectSection = async (
  projectId: number,
  sectionId: number
): Promise<Section[]> => {
  const sectionRoute = sectionsRoute(projectId) + `/${sectionId}`;
  const request = new Request(sectionRoute, { method: "DELETE" });
  const response = await fetch(request);
  const data = (await response.json()) as SectionData[];
  const sections = data.map((dataItem) => new Section(dataItem.id, dataItem));

  return sections;
};

export {
  sectionsRoute,
  getProjectSection,
  getProjectSections,
  createProjectSection,
  updateProjectSection,
  deleteProjectSection,
};
