import UserContext from "@contexts/UserContext";
import { Avatar, Flex, Text, Tooltip } from "@mantine/core";
import { useContext } from "react";
import { Md5 } from "ts-md5";

interface UserProfileProps {
  compact?: boolean;
}

const UserProfile = ({ compact = true }: UserProfileProps): JSX.Element => {
  const { currentUser: user } = useContext(UserContext);
  const avatarSrc = `https://www.gravatar.com/avatar/${Md5.hashStr(
    user?.email ?? "foo"
  )}`;

  if (!user) return <></>;

  if (compact)
    return (
      <Tooltip label={user?.email} withArrow radius="lg" color="violet">
        <Avatar src={avatarSrc} color="violet" size="sm" radius="xl" />
      </Tooltip>
    );

  return (
    <Flex align="center" gap="md">
      <Avatar src={avatarSrc} radius="lg" color="violet" />
      <Text size="sm">{user?.email}</Text>
    </Flex>
  );
};

export default UserProfile;
