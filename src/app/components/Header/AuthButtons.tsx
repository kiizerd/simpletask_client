/* eslint-disable @typescript-eslint/no-misused-promises */
import { useContext } from "react";
import { Link, useNavigate, useRevalidator } from "react-router-dom";
import { UnstyledButton } from "@mantine/core";
import UserContext from "@contexts/UserContext";
import headerStyles from "./HeaderStyles";

const authLinks = [
  { link: "/login", label: "Log in" },
  { link: "/signup", label: "Sign up" },
];

interface AuthButtonsProps {
  activeLink: string;
  onClick: (value: string) => void;
}

const AuthButtons = ({
  activeLink,
  onClick,
}: AuthButtonsProps): JSX.Element => {
  const revalidator = useRevalidator()
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const { classes, cx } = headerStyles();
  const AuthItems = authLinks.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      onClick={() => {
        onClick(link.link);
      }}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link.link,
      })}
    >
      {link.label}
    </Link>
  ));

  const SignOut = (
    <UnstyledButton
      key={"Sign out"}
      onClick={() => {
        logout()
          .then((response) => {
            if (typeof response === "string") {
              revalidator.revalidate()
              navigate("/");
              onClick("/");
            } else throw response?.error ?? new Error("Couldn't sign out");
          })
          .catch((error) => {
            console.error(error);
          });
      }}
      className={classes.link}
    >
      Sign out
    </UnstyledButton>
  );

  if (user) return <>{SignOut}</>;

  return <>{AuthItems}</>;
};

export default AuthButtons;
