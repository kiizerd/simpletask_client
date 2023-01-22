import { Accordion, Loader } from "@mantine/core";
import useProjectIndex from "@hooks/useProjectIndex";
import DrawerProject from "./DrawerProject";

const DrawerProjectList = () => {
  const { projects, error, isLoading } = useProjectIndex();

  if (error) throw error;
  if (isLoading) return <Loader />;

  return (
    <Accordion sx={{ borderRight: "2px solid grey" }}>
      {projects.map((project) => (
        <DrawerProject key={project.id} projectId={project.id} />
      ))}
    </Accordion>
  );
};

export default DrawerProjectList;
