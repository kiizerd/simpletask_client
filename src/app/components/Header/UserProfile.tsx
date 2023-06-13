import UserContext from "@contexts/UserContext";
import { Avatar, Box, Flex, Text, Tooltip } from "@mantine/core";
import { useContext } from "react";
import { Md5 } from "ts-md5";
import headerStyles from "./HeaderStyles";

interface UserProfileProps {
  compact?: boolean;
}

const UserProfile = ({
  compact = true,
}: UserProfileProps): JSX.Element | null => {
  const { user } = useContext(UserContext);
  const { classes } = headerStyles();
  const avatarSrc = `https://www.gravatar.com/avatar/${Md5.hashStr(
    user?.email ?? "foo"
  )}`;

  if (!user) return null;

  if (compact)
    return (
      <Tooltip label={user.email} withArrow radius="lg" color="violet">
        <Avatar src={avatarSrc} color="violet" size="sm" radius="xl" />
      </Tooltip>
    );

  return (
    <Box className={classes.link}>
      <Flex align="center" gap="md">
        <Avatar src={avatarSrc} radius="lg" color="violet" size='sm' />
        <Text size="sm">{user?.email}</Text>
      </Flex>
    </Box>
  );
};

export default UserProfile;
