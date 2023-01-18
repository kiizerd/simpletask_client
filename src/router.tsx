import { createBrowserRouter } from "react-router-dom";
import AuthForm from "@forms/AuthForm";
import App from "app/AppShell";
import ProjectIndexPage from "./project_index";
import ShowProjectPage from "./show_project";
import NewProjectPage from "./pages/NewProject";
import EditProjectPage from "./pages/EditProject";
import ErrorPage from "./pages/ErrorPage";

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
        element: <AuthForm />,
        children: [{ path: "/signup" }, { path: "/login" }],
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
    ],
  },
]);

export default router;
