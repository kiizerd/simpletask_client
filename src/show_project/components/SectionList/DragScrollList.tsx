import type React from "react";
import { useRef, useState, type MouseEvent } from "react";
import { Flex, type FlexProps } from "@mantine/core";

interface ScrollDragProps {
  className: string;
  children: React.ReactNode;
  ignoredElements?: string[] | string;
}

const DragScroll: React.FC<ScrollDragProps & FlexProps> = ({
  className,
  ignoredElements: ignored,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: MouseEvent): void => {
    if (isTargetIgnored(e) || !ref.current) return;

    setIsDown(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseUp = (): void => {
    setIsDown(false);

    if (!ref.current) return;

    ref.current.style.userSelect = "auto";
  };

  const onMouseMove = (e: MouseEvent): void => {
    if (!isDown || !ref.current) return;

    // Prevent text selection
    ref.current.style.userSelect = "none";
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const isTargetIgnored = (event: MouseEvent): boolean => {
    if (!ignored) return false;

    let isIgnored = false;
    const target: HTMLElement = event.target as HTMLElement;
    const selector = Array.isArray(ignored) ? ignored.join(" ") : ignored;
    const matchingElements: HTMLElement[] = Array.from(
      document.querySelectorAll(selector)
    );
    matchingElements.forEach((element) => {
      if (element.contains(target)) {
        isIgnored = true;
      }
    });

    return isIgnored;
  };

  return (
    // Id like to pass Flex props from SectionList component
    <Flex
      gap={{ base: "xs", md: "lg" }}
      px={{ base: "md", xs: "xs", md: "xl" }}
      pb="lg"
      direction={{ base: "column", xs: "row" }}
      className={className}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {children}
    </Flex>
  );
};

export default DragScroll;
