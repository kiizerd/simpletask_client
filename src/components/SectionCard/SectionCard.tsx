import { Card } from "@mantine/core";
import SectionCardHeader from "./SectionHeader";
import Section from "../../types/Section";
import SectionContext from "../../contexts/SectionContext";
import TaskList from "../TaskList/TaskList";

export interface SectionCardProps {
  section: Section;
}

const SectionCard = ({ section }: SectionCardProps) => {
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
