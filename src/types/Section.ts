import Base, { BaseData } from "./Base";
import Task, { TaskData } from "./Task";

export interface SectionData extends BaseData {
  name: string;
  projectId: number;

  tasks: Task[] | TaskData[];
}

export default class Section extends Base {
  name: string;
  projectId: number;

  tasks: Task[];

  constructor(id: number, sectionData: Partial<Section | SectionData>) {
    super(id, sectionData);

    const { name = "new section", projectId = 0, tasks = [] } = sectionData;
    this.name = name || "new section";
    this.projectId = projectId;
    this.tasks = this.convertTasks(tasks);
  }

  convertTasks(taskList: Task[] | TaskData[]) {
    return taskList.map((task) => new Task(task.id, task));
  }
}
