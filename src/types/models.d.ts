interface Project {
  id: number;
  title: string;
  description: string;
  // Associations
  sections?: Section[];
  tasks?: Task[];
}

interface Section {
  id: number;
  name: string;
  projectId: number;
  project_id?: number;
  // Associations
  tasks?: Task[];
}

interface Task {
  id: number;
  name: string;
  details: string;
  projectId: number;
  sectionId: number;
  // Sent from backend
  project_id?: number;
  section_id?: number;
}

export { Project, Section, Task };
