import { Card } from "@mantine/core";
import SectionContext from "@contexts/SectionContext";
import useSection from "@hooks/useSection";
import Header from "./SectionHeader";
import TaskList from "../TaskList";
import Section from "types/Section";

export interface SectionCardProps {
  section: Section;
}

const SectionCard = (props: SectionCardProps) => {
  const { id, projectId } = props.section;
  const { section = props.section } = useSection(projectId, id);

  return (
    <Card p="xs" className='section-card'>
      <SectionContext.Provider value={section}>
        <Header />
        <TaskList />
      </SectionContext.Provider>
    </Card>
  );
};

export default SectionCard;
