import { useEffect, useState } from "react";
import {
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import headerStyles, { HEADER_HEIGHT } from "./HeaderStyles";
import ThemeToggle from "./ThemeToggle";

const headerLinks = [
  { link: "/", label: "Home" },
  { link: "/projects", label: "Projects" },
  { link: "/timer", label: "Timer" },
  { link: "/login", label: "Login" },
  { link: "/signup", label: "Sign up" },
];

const HeaderResponsive = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState("");
  const { classes, cx } = headerStyles();
  const { pathname } = useLocation();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const items = headerLinks.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group className={classes.links}>
          {[...items.slice(0, 3), <ThemeToggle key="ThemeToggle" />]}
        </Group>

        <Group className={classes.links}>{items.slice(-2)}</Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default HeaderResponsive;
