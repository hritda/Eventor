import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const login = localStorage.getItem("token") ?? null;
  return login !== null ? (
    <Outlet />
  ) : (
    <Navigate to={`${process.env.PUBLIC_URL}/users/register`} />
  );
};

export default PrivateRoute;
