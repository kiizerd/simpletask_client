import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./pages/ErrorPage";
import AuthForm from "./forms/AuthForm";
import NewProjectPage from "./pages/NewProject";
import ProjectIndexPage from "./pages/ProjectIndex";
import EditProjectPage from "./pages/EditProject";
import ShowProjectPage from "./pages/ShowProject";

interface LoaderParams {
  params: { projectId?: number; };
}

const getIdLoader = ({ params }: LoaderParams): number =>
  Number(params.projectId);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
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
