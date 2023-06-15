import { Card } from "@mantine/core";
import {
  SectionContext,
  SectionDispatchContext,
} from "@contexts/SectionContext";
import useSectionCard from "@hooks/useSectionCard";
import Header from "./SectionHeader";
import DroppableTaskList from "../TaskList/DroppableTaskList";
import TaskList from "../TaskList/TaskList";
import type Section from "types/Section";

export interface SectionCardProps {
  section: Section;
}

const SectionCard = ({ section: _section }: SectionCardProps): JSX.Element => {
  const { state, dispatch } = useSectionCard(_section);
  const { dragLocked } = state;

  return (
    <Card p="xs" className="section-card">
      <SectionContext.Provider value={state}>
        <SectionDispatchContext.Provider value={dispatch}>
          <Header />
          {dragLocked ? <TaskList /> : <DroppableTaskList />}
        </SectionDispatchContext.Provider>
      </SectionContext.Provider>
    </Card>
  );
};

export default SectionCard;
