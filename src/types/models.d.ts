interface Project {
  id: number;
  title: string;
  description: string;
}

interface Section {
  id: number;
  name: string;
  projectId: number;
  project_id?: number;
}

interface Task {
  id: number;
  name: string;
  details: string;
  projectId: number;
  sectionId: number;
}

export { Project, Section, Task };
