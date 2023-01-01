import Base, { BaseData } from "./Base";

export interface TaskData extends BaseData {
  name: string;
  details: string;
  projectId: number;
  sectionId: number;
}

export default class Task extends Base {
  name: string;
  details: string;
  projectId: number;
  sectionId: number;

  constructor(id: number, taskData: Partial<Task | TaskData>) {
    super(id, taskData);

    const {
      name = "new task",
      details = "",
      projectId = 0,
      sectionId = 0,
    } = taskData;

    this.name = name;
    this.details = details;
    this.projectId = projectId;
    this.sectionId = sectionId;
  }

  get route() {
    return `projects/${this.projectId}/tasks/${this.id}`;
  }

  get sectionRoute() {
    return `projects/${this.projectId}/sections/${this.sectionId}`;
  }

  get projectRoute() {
    return `projects/${this.projectId}`;
  }
}
