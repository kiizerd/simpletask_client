import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

const NewProjectBtn = (): JSX.Element => {
  return (
    <Button
      component={Link}
      to="/projects/new?from=root"
      rightIcon={<IconPlus size={18} />}
    >
      New Project
    </Button>
  );
};

export default NewProjectBtn;
