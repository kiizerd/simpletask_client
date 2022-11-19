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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProject as getRemoteProject } from "../api/api";
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
  id: number;
  image: string;
}

const ProjectCard = ({ id, image }: ProjectCardProps) => {
  const [project, setProject] = useState<Project>();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const { classes } = useStyles();

  useEffect(() => {
    const getProject = async () => {
      const apiResponse = await getRemoteProject(id);
      setProject(apiResponse);
    };

    getProject();
  }, []);

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
              <Menu.Item>
                <Link className={classes.link} to={`projects/${id}/edit`}>
                  Edit
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link className={classes.link} to={`projects/${id}/delete`}>
                  Delete
                </Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <Link className={classes.link} to={`projects/${id}/share`}>
                  Share
                </Link>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Text className={classes.description} size="xs">
          {project.description}
        </Text>
      </div>
      <Button
        component={Link}
        to={`/projects/${id}`}
        variant="white"
        color="dark"
      >
        View
      </Button>
    </Paper>
  );
};

export default ProjectCard;
