import { Box, Loader } from "@mantine/core";
import SectionForm from "@forms/Section";
import SectionCard from "@common/components/SectionCard";
import SectionIndexContext from "@contexts/SectionIndexContext";
import useSectionIndex from "@hooks/useSectionIndex";
import sectionListStyles from "./SectionListStyles";
import DragScroll from "./DragScrollList";

interface SectionListProps {
  projectId: number;
}

const SectionList = ({ projectId }: SectionListProps): JSX.Element => {
  const { classes } = sectionListStyles();
  const { sections, error, isLoading, mutate } = useSectionIndex(projectId);

  if (error) throw error;
  if (isLoading) return <Loader />;

  const sectionCards = sections?.map((section) => (
    <Box key={section.id}>
      <SectionCard section={section} />
    </Box>
  ));

  return (
    <SectionIndexContext.Provider value={{ sections, mutate }}>
      <DragScroll ignoredElements={[".section-card"]} className={classes.list}>
          {sectionCards}
          <SectionForm projectId={projectId} />
      </DragScroll>
    </SectionIndexContext.Provider>
  );
};

export default SectionList;
