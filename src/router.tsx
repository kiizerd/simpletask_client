import { createBrowserRouter } from "react-router-dom";
import App from "app/AppShell";
import ProjectIndexPage from "./project_index";
import ShowProjectPage from "./show_project";
import NewProjectPage from "./pages/NewProject";
import EditProjectPage from "./pages/EditProject";
import ErrorPage from "./pages/ErrorPage";
import Timer from "./timer";
import { LoginForm, SignupForm } from "@forms/Auth";

interface LoaderParams {
  params: { projectId?: number };
}

const getIdLoader = ({ params }: LoaderParams): number =>
  Number(params.projectId);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { element: <ProjectIndexPage />, index: true },
      {
        children: [
          { path: "/signup", element: <SignupForm /> },
          { path: "/login", element: <LoginForm /> },
        ],
      },
      { path: "/projects", element: <ProjectIndexPage /> },
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
      { path: "/timer", element: <Timer /> },
    ],
  },
]);

export default router;
