import { TextInput, Button, PasswordInput, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Paper, createStyles, Checkbox, Title, Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const AuthForm = () => {
  const { classes } = useStyles();
  const { pathname } = useLocation();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      stayLoggedIn: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onLoginPage = () => pathname === "/login";

  return (
    <div className={classes.wrapper}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            {onLoginPage()
              ? "Welcome back to SimpleTask!"
              : "Create an account"}
          </Title>

          <TextInput
            label="Email"
            withAsterisk
            placeholder="your@email.com"
            size="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            description={
              onLoginPage()
                ? null
                : "Must include at least one letter, number and special character"
            }
            {...form.getInputProps("password")}
          />
          <Checkbox
            label="Keep me logged in"
            mt="xl"
            size="md"
            {...form.getInputProps("stayLoggedIn", { type: "checkbox" })}
          />
          <Button fullWidth mt="xl" size="md" type="submit">
            {onLoginPage() ? "Login" : "Sign up"}
          </Button>
          <Text align="center" mt="md">
            {onLoginPage() ? "Don't " : "Already "}
            {"have an account? "}
            {onLoginPage() ? (
              <Anchor component={Link} to="/signup" weight={700}>
                Register
              </Anchor>
            ) : (
              <Anchor component={Link} to="/login" weight={700}>
                Log in
              </Anchor>
            )}
          </Text>
        </Paper>
      </form>
    </div>
  );
};

export default AuthForm;
