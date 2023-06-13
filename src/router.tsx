import { createBrowserRouter } from "react-router-dom";
import App from "app/AppShell";
import RootPage from "pages/Root";
import NewProjectPage from "./pages/NewProject";
import EditProjectPage from "./pages/EditProject";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "pages/LandingPage";
import ProjectIndexPage from "./project_index";
import ShowProjectPage from "./show_project";
import Timer from "./timer";
import { LoginForm, SignupForm } from "@forms/Auth";

interface LoaderParams {
  params: { projectId?: number };
}

const getIdLoader = ({ params }: LoaderParams): number =>
  Number(params.projectId);

// Return user data as a string
const getUserLoader = (): string | null => {
  const user = window.localStorage.getItem("current-user");
  return user;
};

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: getUserLoader,
    children: [
      { index: true, element: <RootPage /> },
      {
        path: "/projects",
        children: [
          { element: <ProjectIndexPage />, index: true },
          { path: "/projects/new", element: <NewProjectPage /> },
          {
            path: "/projects/:projectId",
            element: <ShowProjectPage />,
            loader: getIdLoader,
          },
          {
            path: "/projects/:projectId/edit",
            element: <EditProjectPage />,
            loader: getIdLoader,
          },
        ],
      },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignupForm /> },
      { path: "/timer", element: <Timer /> },
      { path: "/welcome", element: <LandingPage /> },
    ],
  },
]);

export default router;
