import { useState } from "react";
import { Card } from "@mantine/core";
import SectionContext from "@contexts/SectionContext";
import useSection from "@hooks/useSection";
import Header from "./SectionHeader";
import DroppableTaskList from "../TaskList/DroppableTaskList";
import TaskList from "../TaskList/TaskList";
import type Section from "types/Section";

export interface SectionCardProps {
  section: Section;
}

const SectionCard = ({ section: _section }: SectionCardProps): JSX.Element => {
  const { id, projectId } = _section;
  const { section = _section } = useSection(projectId, id);
  const [dragLocked, setDragLocked] = useState<boolean>(false);
  const toggleDragLocked = (): void => {
    setDragLocked(!dragLocked);
  };

  return (
    <Card p="xs" className="section-card">
      <SectionContext.Provider value={section}>
        <Header dragLocked={dragLocked} toggleDragLocked={toggleDragLocked} />
        {dragLocked ? <TaskList /> : <DroppableTaskList />}
      </SectionContext.Provider>
    </Card>
  );
};

export default SectionCard;
