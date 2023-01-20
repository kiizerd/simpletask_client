import { Loader } from "@mantine/core";
import SectionCard from "@common/components/SectionCard";
import useSection from "@hooks/useSection";

interface PinnedSectionCardProps {
  ids: number[];
}

const PinnedSectionCard = ({ ids }: PinnedSectionCardProps) => {
  const { section, isLoading } = useSection(ids[0], ids[1]);

  if (!section || isLoading) return <Loader />;

  return <SectionCard section={section} />;
};

export default PinnedSectionCard;
