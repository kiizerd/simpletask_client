import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import UserContext from "@contexts/UserContext";
import authFormStyles from "./AuthFormStyles";
import { type UserFormValues } from "./LoginForm";

const SignupForm = (): JSX.Element => {
  const { classes } = authFormStyles();
  const { register } = useContext(UserContext);
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
    register(values.email, values.password)
      .then((response) => {
        if ("id" in response) {
          navigate("/projects");
        } else {
          if (response?.messages?.email) {
            form.setErrors({ email: response.messages.email });
          }
          if (response?.messages?.password) {
            form.setErrors({ password: response.messages.password });
          }
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
            Create an account
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
            description="Must include at least one letter, number and special character"
            {...form.getInputProps("password")}
          />
          <Checkbox
            label="Keep me logged in"
            mt="xl"
            size="md"
            {...form.getInputProps("stayLoggedIn", { type: "checkbox" })}
          />
          <Button fullWidth mt="xl" size="md" type="submit">
            Sign up
          </Button>
          <Text align="center" mt="md">
            Already have an account?{" "}
            <Anchor component={Link} to="/login" weight={700}>
              Log in
            </Anchor>
          </Text>
        </form>
      </Paper>
    </div>
  );
};

export default SignupForm;
