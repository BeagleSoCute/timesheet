import { createBrowserRouter, redirect } from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import Login from "smart/Login";
import Register from "smart/Register";
import Dashboard from "smart/Dashboard";
import Profile from "smart/Profile";
import Logout from "smart/Logout";
import { AppProvider } from "contexts/app.context";
import { transformAllUsersDataToTable } from "helpers/user.helper";
import { getAllUsers } from "services/user.service";
import { checkIsAuth } from "helpers/auth.helper";

import PrivateRoute from "smart/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<AppProvider> <AppLayout /> </AppProvider>,
    //   errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/logout", element: <Logout /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute>  },
    ],
  },
]);
