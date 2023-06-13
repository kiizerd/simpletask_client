import ProjectIndexPage from "project_index/ProjectIndex";
import LandingPage from "./LandingPage";
import { useRouteLoaderData } from "react-router-dom";

const RootPage = (): JSX.Element => {
  const user = useRouteLoaderData("root");
  if (user) return <ProjectIndexPage />;
  return <LandingPage />;
};

export default RootPage;
