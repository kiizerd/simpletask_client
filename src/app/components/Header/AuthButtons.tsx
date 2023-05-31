/* eslint-disable @typescript-eslint/no-misused-promises */
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "@contexts/UserContext";
import headerStyles from "./HeaderStyles";

const authLinks = [
  { link: "/login", label: "Log in" },
  { link: "/signup", label: "Sign up" },
];

interface AuthButtonsProps {
  activeLink: string;
}

const AuthButtons = ({ activeLink }: AuthButtonsProps): JSX.Element => {
  const { currentUser: user, logout } = useContext(UserContext);
  const { classes, cx } = headerStyles();
  const AuthItems = authLinks.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link.link,
      })}
    >
      {link.label}
    </Link>
  ));

  const SignOut = (
    <Link
      key={"Sign out"}
      to={"/"}
      onClick={logout}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === "/signout",
      })}
    >
      Sign out
    </Link>
  );

  if (user) return <>{SignOut}</>;

  return <>{AuthItems}</>;
};

export default AuthButtons;
