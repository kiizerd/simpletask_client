import { useMantineColorScheme, ActionIcon, Group } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

const ThemeToggle = (): JSX.Element => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center">
      <ActionIcon
        onClick={() => { toggleColorScheme(); }}
        size="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === "dark" ? (
          <IconSun size={18} />
        ) : (
          <IconMoonStars size={18} />
        )}
      </ActionIcon>
    </Group>
  );
};

export default ThemeToggle;
