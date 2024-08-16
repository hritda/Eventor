import { LogIn } from "react-feather";
import SignUpAccount from "../Component/Authentication/SignUpAccount";
import DashBoard from "../Pages/Pages/SamplePage/index";
import UserDashboard from "../Component/Pages/SamplePage/UserDashboard";
import Login from "../Component/Authentication/Login";
import { Component } from "react";
import MainDashboard from "../Component/Pages/SamplePage/MainDashboard";
import UserEvent from "../Component/Pages/SamplePage/UserEvent";
import CreateEvent from "../Component/Pages/SamplePage/CreateEvent";

export const routes = [
  // { path: `${process.env.PUBLIC_URL}/`, Component: <SignUpAccount /> },
  {
    path: `${process.env.PUBLIC_URL}/users/dashboard`,
    Component: <UserDashboard />,
  },
  {
    path: `${process.env.PUBLIC_URL}/users/mainDashboard`,
    Component: <MainDashboard />,
  },
  {
    path:`${process.env.PUBLIC_URL}/events/:uid`,
    Component: <UserEvent />
  },
  {
    path:`${process.env.PUBLIC_URL}/users/createEvent`,
    Component: <CreateEvent />
  },
  {
    path:`${process.env.PUBLIC_URL}/users/editEvent/:uid`,
    Component: <CreateEvent />
  }
  // { path: `${process.env.PUBLIC_URL}/users/login`, Component: <Login /> },
];
