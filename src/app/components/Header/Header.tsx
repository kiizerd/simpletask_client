import { useEffect, useState } from "react";
import {
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import headerStyles, { HEADER_HEIGHT } from "./HeaderStyles";
import ThemeToggle from "./ThemeToggle";
import NavButtons from "./NavButtons";
import AuthButtons from "./AuthButtons";
import UserProfile from "./UserProfile";

const HeaderResponsive = (): JSX.Element => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState("");
  const { classes } = headerStyles();
  const { pathname } = useLocation();

  const navOnClick = (newActive: string): void => {
    setActive(newActive);
  };

  const burgerOnClick = (newActive: string): void => {
    setActive(newActive);
    close();
  };

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group className={classes.links}>
          <NavButtons activeLink={active} onClick={navOnClick} />
          <ThemeToggle />
        </Group>
        <Group className={classes.links}>
          <UserProfile />
          <AuthButtons onClick={navOnClick} activeLink={active} />
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <NavButtons activeLink={active} onClick={burgerOnClick} />
              <Divider />
              <UserProfile compact={false} />
              <AuthButtons activeLink={active} onClick={burgerOnClick} />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default HeaderResponsive;
