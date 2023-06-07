import Base, { type BaseData } from "./Base";
import Task, { type TaskData } from "./Task";

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

  convertTasks(taskList: Task[] | TaskData[]): Task[] {
    return taskList.map((task) => new Task(task.id, task));
  }

  get progress(): number {
    return this.taskProgress();
  }

  taskProgress(taskList: Task[] = this.tasks): number {
    if (taskList.length === 0) return -1;

    const total = taskList.length;
    const complete = taskList.filter((task) => task.isComplete()).length;
    const progress = Math.floor((complete * 100) / total);
    return progress;
  }

  get route(): string {
    return `projects/${this.projectId}/sections/${this.id}`;
  }

  get projectRoute(): string {
    return `projects/${this.projectId}`;
  }
}
