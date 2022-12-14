import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { Link } from "react-router-dom";

const NewProjectBtn = () => {
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
