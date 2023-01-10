import { Section, Task } from "types/models";

export function backToFrontSection(section: Section) {
  return {
    ...section,
    projectId: section.project_id,
    tasks: section.tasks?.map((task: Task) => backToFrontTask(task)),
  };
}

export function backToFrontTask(task: Task) {
  return {
    ...task,
    projectId: task.project_id,
    sectionId: task.section_id,
  };
}
