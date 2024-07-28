import { Navigate, Outlet } from "react-router-dom";
import AuthSlice from "../ReduxToolkit/Reducers/AuthSlice";

import { useAuth } from "../Component/Providers/AuthContext";
const PrivateRoute = () => {
  const {auth} = useAuth();
  const login = localStorage.getItem("token") ?? null;
  console.log("login",login);
  return login !== null && auth!==null ? (
    <Outlet />
  ) : (
    <Navigate to={`${process.env.PUBLIC_URL}/users/register`} />
  );
};

export default PrivateRoute;
