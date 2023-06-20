import { createBrowserRouter } from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import { AppProvider } from "contexts/app.context";
import SigninPage from "smart/SigninPage/smart/SigninPage";
import TimesheetPage from "smart/TimesheetPage/smart/TimesheetPage";
import TimesheetAllocationPage from "smart/AllocationPage/smart/TimesheetAllocationPage";
import SignoutPage from "smart/SignoutPage/smart/SignoutPage";
import SupervisorPage from "smart/SupervisorPage/smarts/SupervisorPage";
import SelectEmployeePage from "smart/SupervisorPage/smarts/SelectEmployeePage";
import LoginPage from "smart/login/smart/LoginPage";
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
        element: <LoginPage />,
      },
      {
        path: "/clockin-page",
        element: <SigninPage />,
      },
      { path: "/signout", element: <SignoutPage /> },
      {
        path: "/timesheet-page",
        element: <TimesheetPage />,
      },
      {
        path: "/timesheet-allocation",
        element: <TimesheetAllocationPage />,
      },
      {
        path: "/supervisor/assign-timesheet/:employeeId",
        element: <SupervisorPage />,
      },
      {
        path: "/supervisor/select-employee",
        element: <SelectEmployeePage />,
      },
    ],
  },
]);
