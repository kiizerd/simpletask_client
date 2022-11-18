import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./pages/ErrorPage";
import AuthForm from "./forms/AuthForm";

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
    ],
  },
]);

export default router;
