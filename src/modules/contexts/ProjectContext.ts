import { createContext } from "react";
import Project from "types/Project";

const emptyProject = new Project(0, {})
const ProjectContext = createContext(emptyProject);
export default ProjectContext;
