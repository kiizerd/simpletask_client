import { Card } from "@mantine/core";
import SectionCardHeader from "./SectionHeader";
import Section from "../../types/Section";
import SectionContext from "../../contexts/SectionContext";
import TaskList from "../TaskList/TaskList";
import useSection from "../../hooks/useSection";

export interface SectionCardProps {
  section: Section;
}

const SectionCard = (props: SectionCardProps) => {
  const { id, projectId } = props.section;
  const { section = props.section } = useSection(projectId, id);

  return (
    <Card p="xs">
      <SectionContext.Provider value={section}>
        <SectionCardHeader />
        <TaskList />
      </SectionContext.Provider>
    </Card>
  );
};

export default SectionCard;
