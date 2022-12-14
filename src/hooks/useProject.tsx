import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { getProject } from "../api/projects";
import { Project, Section } from "../types/models";

export interface ProjectHookData {
  project?: Project;
  error?: Error;
  isLoading: boolean;
  addSection(newSection: Section): void;
  updateSection(sectionId: number, newName: string): Promise<void>;
  removeSection(sectionId: number): Promise<void>;
}

export default function useProject(projectId: number): ProjectHookData {
  const fetcher: Fetcher<Project, string> = (id) => getProject(Number(id));
  const { data, error, isLoading } = useSWR(`${projectId}`, fetcher);
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (data) setProject(data);
  }, [data]);

  const addSection = async (newSection: Section) => {
    if (!project || !project.sections) return;

    setProject({ ...project, sections: [...project.sections, newSection] });
  };

  const updateSection = async (sectionId: number, newName: string) => {
    if (!project || !project.sections) return;

    const newSections = project.sections.map((section) => {
      return section.id == sectionId ? { ...section, name: newName } : section;
    });

    setProject({ ...project, sections: newSections });
  };

  const removeSection = async (sectionId: number) => {
    if (!project || !project.sections) return;

    const updatedSectionList = project.sections.filter(
      (section) => section.id != sectionId
    );

    setProject({ ...project, sections: updatedSectionList });
  };

  return {
    project,
    error,
    isLoading,
    addSection,
    removeSection,
    updateSection,
  };
}
