import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./pages/ErrorPage";
import AuthForm from "./forms/AuthForm";
import NewProjectPage from "./pages/NewProject";
import ProjectIndexPage from "./pages/ProjectIndex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <AuthForm />,
      },
      {
        path: "/signup",
        element: <AuthForm />,
      },
      { path: "/projects", element: <ProjectIndexPage /> },
      { path: "/projects/new", element: <NewProjectPage /> },
    ],
  },
]);

export default router;
