import { useEffect, useState } from "react";
import { getProject } from "../api/projects";
import { getProjectSections } from "../api/sections";
import { Project, Section } from "../types/models";

export default function useProject(projectId: number) {
  const [project, setProject] = useState<Project>();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const setup = async () => {
      setProject(await getProject(projectId));
      setSections(await getProjectSections(projectId));
    };

    setup();
  }, []);

  const addSection = async (newSection: Section) => {
    setSections([...sections, newSection]);
  };

  const updateSection = async (sectionId: number, newName: string) => {
    const newSections = sections.map((section) => {
      if (section.id == sectionId) {
        return { ...section, name: newName };
      } else return section;
    });

    setSections(newSections);
  };

  const removeSection = async (sectionId: number) => {
    const updatedSectionList = sections.filter(
      (section) => section.id != sectionId
    );

    setSections(updatedSectionList);
  };

  return { project, sections, addSection, removeSection, updateSection };
}
