import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from "@mantine/core";
import { Link, useRouteError } from "react-router-dom";
import MantineApp from "../Mantine";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

interface RouteErrorI {
  status: number;
  statusText: string;
  message: string;
}

const ErrorPage = () => {
  const { classes } = useStyles();
  const routeError = useRouteError();
  const error = routeError as RouteErrorI;
  console.error(error);

  return (
    <MantineApp>
      <Container className={classes.root} id="error-page">
        <div className={classes.label}>{error.status}</div>
        <Title className={classes.title}>{error.statusText}</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          {error.message}
        </Text>
        <Group position="center">
          <Link to="/">
            <Button variant="subtle" size="md">
              Take me back to home page
            </Button>
          </Link>
        </Group>
      </Container>
    </MantineApp>
  );
};

export default ErrorPage;
