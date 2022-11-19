import { Outlet, useMatch } from "react-router-dom";
import Header from "../Header";
import MantineApp from "../Mantine";
import ProjectIndexPage from "../pages/ProjectIndex";

const Root = () => {
  const headerLinks = [
    { link: "/", label: "Home" },
    { link: "/login", label: "Login" },
    { link: "/signup", label: "Sign up" },
  ];

  return (
    <MantineApp>
      <Header links={headerLinks} />
      {useMatch("") ? (
      <ProjectIndexPage />
        // <FeaturesGrid
        //   title="SimpleTask."
        //   description="Simple project manager. Cloud based projects and tasks saved in a personal account."
        // ></FeaturesGrid>
      ) : (
        <Outlet />
      )}
    </MantineApp>
  );
};

export default Root;
