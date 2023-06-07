import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";

interface EditButtonProps {
  projectId: number;
}

const EditProjectBtn = ({ projectId }: EditButtonProps): JSX.Element => {
  return (
    <Button
      size="xs"
      component={Link}
      to={`/projects/${projectId}/edit`}
      rightIcon={<IconEdit size={16} />}
    >
      Edit
    </Button>
  );
};

export default EditProjectBtn;
