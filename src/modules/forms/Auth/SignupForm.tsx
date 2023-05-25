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
import { signUp } from "@api/auth";
import authFormStyles from "./AuthFormStyles";

const SignupForm = () => {
  const { classes } = authFormStyles();
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
          signUp(values.email, values.password);
          // form.reset();
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
            Already have an account?
            <Anchor component={Link} to="/login" weight={700}>
              Log in
            </Anchor>
          </Text>
        </Paper>
      </form>
    </div>
  );
};

export default SignupForm;
