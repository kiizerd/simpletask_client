import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";

interface EditButtonProps {
  projectId: number;
}

const EditProjectBtn = ({ projectId }: EditButtonProps) => {
  return (
    <Button
      component={Link}
      to={`/projects/${projectId}/edit`}
      rightIcon={<IconEdit size={18} />}
    >
      Edit
    </Button>
  );
};

export default EditProjectBtn;
