import { createBrowserRouter } from "react-router";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import Dashboard from "../Layouts/Dashboard";
import Setting from "../Pages/Dashboards/Setting/Setting";
import ResetPass from "../Pages/Authentication/ResetPass";
import Home from "../Pages/Dashboards/Home/Home";
import Notifications from "../Pages/Dashboards/Notification/Notification";
import ProfileInformation from "../Pages/Dashboards/Setting/ProfileInfo";
import User from "../Pages/Dashboards/User/User";
import Ticket from "../Pages/Dashboards/Ticket/Ticket";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/ticket",
        element: <Ticket />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/setting/profile",
        element: <ProfileInformation />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/otp",
    element: <OtpVerification />,
  },
  {
    path: "/reset_password",
    element: <ResetPass />,
  },
]);

export default router;
