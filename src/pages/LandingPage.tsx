import { Paper, Text, Title, Flex, Stack } from "@mantine/core";
import {
  IconCheckbox,
  IconRocket,
  IconTarget,
  type TablerIcon,
} from "@tabler/icons";
import type { ReactNode } from "react";

interface FeatureProps {
  Icon: TablerIcon;
  title: string;
  children: ReactNode;
}

const Feature = ({ Icon, title, children }: FeatureProps): JSX.Element => (
  <Paper p="md" shadow="xs">
    <Flex direction="column" align="center">
      <Icon size={48} />
      <Title order={3}>{title}</Title>
      <Text>{children}</Text>
    </Flex>
  </Paper>
);

const Header = (): JSX.Element => (
  <Paper p="md" shadow="xs">
    <Title order={1}>Welcome to Our App!</Title>
    <Text>
      This is a brief introduction to your application, providing users with
      some basic information about what they can expect.
    </Text>
  </Paper>
);

const Footer = (): JSX.Element => (
  <Paper p="md" shadow="xs">
    <Text align="center">© 2023 - Your Company</Text>
  </Paper>
);

const LandingPage = (): JSX.Element => (
    <Stack spacing="xl" style={{ padding: "20px" }}>
      <Header />
      <Stack spacing="md">
        <Title order={2}>Key Features</Title>
        <Flex justify="space-between">
          <Feature Icon={IconRocket} title="Feature 1">
            This feature allows you to do this and that. It makes your work
            easier and more efficient.
          </Feature>
          <Feature Icon={IconCheckbox} title="Feature 2">
            This feature provides this and that. It ensures the best results in
            your tasks.
          </Feature>
          <Feature Icon={IconTarget} title="Feature 3">
            This feature offers this and that. It helps you achieve your goals
            in the most effective way.
          </Feature>
        </Flex>
      </Stack>
      <Footer />
    </Stack>
);

export default LandingPage;
