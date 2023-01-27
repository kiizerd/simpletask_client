import { Box, Flex, Loader } from "@mantine/core";
import { useScrollContainer } from "react-indiana-drag-scroll";
import SectionForm from "@forms/Section";
import SectionCard from "@common/components/SectionCard";
import SectionIndexContext from "@contexts/SectionIndexContext";
import useSectionIndex from "@hooks/useSectionIndex";
import sectionListStyles from "./SectionListStyles";

interface SectionListProps {
  projectId: number;
}

const SectionList = ({ projectId }: SectionListProps) => {
  const { classes } = sectionListStyles();
  const { sections, error, isLoading, mutate } = useSectionIndex(projectId);
  const scrollContainer = useScrollContainer();

  if (error) throw error;
  if (isLoading) return <Loader />;

  const sectionCards = sections?.map((section) => (
    <Box key={section.id}>
      <SectionCard section={section} />
    </Box>
  ));

  return (
    <SectionIndexContext.Provider value={{ sections, mutate }}>
      <Flex
        ref={scrollContainer.ref}
        className={classes.list}
        gap={{ base: "xs", md: "lg" }}
        px={{ base: "md", xs: "xs", md: "xl" }}
        pb="lg"
        direction={{ base: "column", xs: "row" }}
      >
        {sectionCards}
        <SectionForm projectId={projectId} />
      </Flex>
    </SectionIndexContext.Provider>
  );
};

export default SectionList;
