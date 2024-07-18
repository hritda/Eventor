import { ChangeEvent } from "react";
import SignUpAccount from "../Component/Authentication/SignUpAccount";
import Login from "../Component/Authentication/Login";

export const authRoutes = [
  //Error
  // {
  //   path: `${process.env.PUBLIC_URL}/errors/error400`,
  //   Component: <Error400 />,
  // },
  {
    path: `${process.env.PUBLIC_URL}/users/register`,
    Component: <SignUpAccount />
  },
  {
    path:`${process.env.PUBLIC_URL}/users/login`,
    Component:<Login />
  }
];
