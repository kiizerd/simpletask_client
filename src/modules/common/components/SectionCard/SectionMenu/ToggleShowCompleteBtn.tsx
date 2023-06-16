import { useContext } from "react";
import { Menu } from "@mantine/core";
import { IconSquare, IconSquareCheck } from "@tabler/icons";
import {
  SectionContext,
  SectionDispatchContext,
} from "@contexts/SectionContext";

const ToggleShowCompleteBtn = (): JSX.Element => {
  const { showComplete } = useContext(SectionContext);
  const dispatch = useContext(SectionDispatchContext);
  const toggleShowComplete = (): void => {
    dispatch({ type: "SET_SHOW_COMPLETE", payload: !showComplete });
  };
  const icon = showComplete ? (
    <IconSquareCheck size={16} />
  ) : (
    <IconSquare size={16} />
  );

  return (
    <Menu.Item onClick={toggleShowComplete} icon={icon}>
      Show complete
    </Menu.Item>
  );
};

export default ToggleShowCompleteBtn;
