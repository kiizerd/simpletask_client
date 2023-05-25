import { Link } from "react-router-dom";
import { User } from "types/models";
import headerStyles from "./HeaderStyles";
import useAuth from "@hooks/useAuth";

const authLinks = [
  { link: "/login", label: "Log in" },
  { link: "/signup", label: "Sign up" },
];

interface AuthButtonsProps {
  user: User | null;
  activeLink: string;
}

const AuthButtons = ({ user, activeLink }: AuthButtonsProps) => {
  const { logout } = useAuth();
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
