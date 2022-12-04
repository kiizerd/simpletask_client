import { useEffect, useState } from "react";
import { getProject } from "../api/projects";
import { Project, Section } from "../types/models";

export default function useProject(projectId: number) {
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const setup = async () => {
      setProject(await getProject(projectId));
    };

    setup();
  }, []);

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

  return { project, addSection, removeSection, updateSection };
}
