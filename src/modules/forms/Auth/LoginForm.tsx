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
import { Link, useNavigate } from "react-router-dom";
import authFormStyles from "./AuthFormStyles";
import { useContext } from "react";
import UserContext from "@contexts/UserContext";

export interface UserFormValues {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const { classes } = authFormStyles();
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
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

  const submit = (values: UserFormValues): void => {
    login(values.email, values.password)
      .then((response) => {
        if ("id" in response) {
          navigate("/projects");
        } else if (response.status === 404) {
          form.setErrors({ email: "Email not registered." });
        } else if (response.status === 401) {
          form.setErrors({ password: "Incorrect password." });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <form onSubmit={form.onSubmit(submit)}>
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
            Don&apos;t have an account?{" "}
            <Anchor component={Link} to="/signup" weight={700}>
              Register
            </Anchor>
          </Text>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
