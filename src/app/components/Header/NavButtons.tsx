import { Link } from "react-router-dom";
import headerStyles from "./HeaderStyles";

const navLinks = [
  { link: "/", label: "Home" },
  { link: "/projects", label: "Projects" },
  { link: "/timer", label: "Timer" },
];

interface NavButtonsProps {
  activeLink: string;
  onClick: (newActive: string) => void
}

const NavButtons = ({ activeLink, onClick }: NavButtonsProps): JSX.Element => {
  const { classes, cx } = headerStyles();
  const items = navLinks.map((item) => (
    <Link
      onClick={() => { onClick(item.link); } }
      key={item.label}
      to={item.link}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === item.link,
      })}
    >
      {item.label}
    </Link>
  ));

  return <>{items}</>;
};

export default NavButtons;
