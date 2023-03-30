import { createBrowserRouter } from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import { AppProvider } from "contexts/app.context";
import SigninPage from "smart/SigninPage";
import TimesheetPage from "smart/TimesheetPage";
import TimesheetAllocation from "smart/TimesheetAllocation";
import "index.css";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <AppLayout />
      </AppProvider>
    ),
    children: [
      {
        path: "/",
        element: <SigninPage />,
      },
      {
        path: "/timesheet-page",
        element: <TimesheetPage />,
      },
      {
        path: "/timesheet-allocation",
        element: <TimesheetAllocation />,
      },
    ],
  },
]);
