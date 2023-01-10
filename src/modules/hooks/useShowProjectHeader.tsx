import { useEffect, useState } from "react";
import { useHover } from "@mantine/hooks";
import { Project } from "types/models";

export default function useShowProjectHeader(project: Project) {
  const { hovered, ref: hoveredRef } = useHover();

  const [lineClamp, setLineClamp] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Only show 2 vertical lines of text unless expand button has been clicked
  useEffect(() => setLineClamp(isExpanded ? 0 : 2), [isExpanded]);

  const showExpandBtn = hovered && project.description.length >= 100;

  return {
    hoveredRef,
    lineClamp,
    showExpandBtn,
    isExpanded,
    setIsExpanded,
  };
}
