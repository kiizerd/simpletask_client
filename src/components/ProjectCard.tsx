import {
  Text,
  Button,
  Group,
  ActionIcon,
  Menu,
  createStyles,
  Paper,
  Title,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProject } from "../api/api";
import { Project } from "../types/models";

const useStyles = createStyles((theme) => ({
  card: {
    height: "21rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 95,

    "& > div": {
      width: "100%",
    },
  },

  titleRow: {
    alignItems: "start",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    fontSize: 22,
    maxWidth: "75%",
  },

  description: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 600,
    textTransform: "uppercase",
  },

  link: {
    display: "block",
    lineHeight: 1,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {},

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
    },
  },
}));

interface ProjectCardProps {
  image: string;
  project?: Project;
  updateIndex(): void;
}

const ProjectCard = ({ image, project, updateIndex }: ProjectCardProps) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const { classes } = useStyles();

  if (!project) return <></>;
  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      sx={{
        backgroundImage: `linear-gradient(160deg, #333130 0%, rgba(44, 40, 40, 0.3) 55%), url(${image})`,
      }}
      className={classes.card}
    >
      <div>
        <Group position="apart" className={classes.titleRow}>
          <Title order={3} className={classes.title}>
            {project.title}
          </Title>
          <Menu
            position={"left-start"}
            opened={menuOpened}
            onChange={setMenuOpened}
          >
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                className={classes.link}
                // Assign from search parameter to allow returning
                // to index page on edit completion or cancellation
                to={`projects/${project.id}/edit?from=root`}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                className={classes.link}
                onClick={async () => {
                  const apiResponse = await deleteProject(project.id);
                  console.log(apiResponse);
                  updateIndex();
                }}
              >
                Delete
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                component={Link}
                className={classes.link}
                to={`projects/${project.id}/share`}
              >
                Share
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Text className={classes.description} size="xs">
          {project.description}
        </Text>
      </div>
      <Button component={Link} to={`/projects/${project.id}`}>
        View
      </Button>
    </Paper>
  );
};

export default ProjectCard;
