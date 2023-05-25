import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import authFormStyles from "./AuthFormStyles";
import useAuth from "@hooks/useAuth";

const LoginForm = () => {
  const { classes } = authFormStyles();
  const { login } = useAuth();
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

  return (
    <div className={classes.wrapper}>
      <form
        onSubmit={form.onSubmit((values) => {
          login(values.email, values.password);
        })}
      >
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Welcome back to SimpleTask!
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
            {...form.getInputProps("password")}
          />
          <Checkbox
            label="Keep me logged in"
            mt="xl"
            size="md"
            {...form.getInputProps("stayLoggedIn", { type: "checkbox" })}
          />
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
          <Text align="center" mt="md">
            Don't have an account?
            <Anchor component={Link} to="/signup" weight={700}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </form>
    </div>
  );
};

export default LoginForm;
