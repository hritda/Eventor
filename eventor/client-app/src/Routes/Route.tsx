import { LogIn } from "react-feather";
import SignUpAccount from "../Component/Authentication/SignUpAccount";
import DashBoard from "../Pages/Pages/SamplePage/index";
import UserDashboard from "../Component/Pages/SamplePage/UserDashboard";
import Login from "../Component/Authentication/Login";

export const routes = [
  // { path: `${process.env.PUBLIC_URL}/`, Component: <SignUpAccount /> },
  { path: `${process.env.PUBLIC_URL}/users/dashboard`, Component: <DashBoard /> },
  // { path: `${process.env.PUBLIC_URL}/users/login`, Component: <Login /> },

]
