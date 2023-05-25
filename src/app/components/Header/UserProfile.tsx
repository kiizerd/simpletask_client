import { Avatar, Flex, Text, Tooltip } from "@mantine/core";
import { Md5 } from "ts-md5";
import { User } from "types/models";

interface UserProfileProps {
  user: User | null;
  compact?: boolean;
}

const UserProfile = ({ user, compact = true }: UserProfileProps) => {
  const avatarSrc = `https://www.gravatar.com/avatar/${Md5.hashStr(
    user ? user.email : "foo"
  )}`;
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
