import { Loader } from "@mantine/core";
import SectionCard from "@common/components/SectionCard";
import useSection from "@hooks/useSection";

interface PinnedSectionCardProps {
  projectId: number;
  sectionId: number;
}

const PinnedSectionCard = ({
  projectId,
  sectionId,
}: PinnedSectionCardProps): JSX.Element => {
  const { section, isLoading } = useSection(projectId, sectionId);

  if (!section || isLoading) return <Loader />;

  return <SectionCard section={section} />;
};

export default PinnedSectionCard;
