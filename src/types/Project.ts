import Base, { BaseData } from "./Base";
import Task, { TaskData } from "./Task";
import Section, { SectionData } from "./Section";

export interface ProjectData extends BaseData {
  title: string;
  description: string;

  sections: Section[] | SectionData[];
  tasks: Task[] | TaskData[];
}

export default class Project extends Base {
  title: string;
  description: string;

  sections: Section[];
  tasks: Task[];

  constructor(id: number, projectData: Partial<Project | ProjectData>) {
    super(id, projectData);

    const {
      title = "new project",
      description = "",
      sections = [],
      tasks = [],
    } = projectData;

    this.title = title;
    this.description = description;
    this.sections = this.convertSections(sections);
    this.tasks = this.convertTasks(tasks);
  }

  convertSections(sectionList: Section[] | SectionData[]) {
    return sectionList.map((section) => new Section(section.id, section));
  }

  convertTasks(taskList: Task[] | TaskData[]) {
    return taskList.map((task) => new Task(task.id, task));
  }

  get route() {
    return `projects/${this.id}`;
  }
}
