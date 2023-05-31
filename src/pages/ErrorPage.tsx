import { Link, useRouteError } from "react-router-dom";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  Stack,
  AppShell,
} from "@mantine/core";
import { MantineApp } from "app";
import Header from "app/components/Header";

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
    marginBottom: theme.spacing.xl,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
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
    marginBottom: theme.spacing.xl,
  },
}));

interface RouteErrorI {
  status: number;
  statusText: string;
  message: string;
}

const ErrorPage = (): JSX.Element => {
  const { classes } = useStyles();
  const routeError = useRouteError();
  const error = routeError as RouteErrorI;
  console.error(error);

  return (
    <MantineApp>
      <AppShell header={<Header />}>
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
            <Stack align="center">
              <Button
                variant="subtle"
                size="md"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </Button>
              <Link to="/login">
                <Button variant="subtle" size="mid">
                  Sign in
                </Button>
              </Link>

              <Link to="/">
                <Button variant="subtle" size="md">
                  Take me back to home page
                </Button>
              </Link>
            </Stack>
          </Group>
        </Container>
      </AppShell>
    </MantineApp>
  );
};

export default ErrorPage;
