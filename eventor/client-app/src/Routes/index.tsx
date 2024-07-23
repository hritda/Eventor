import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LayoutRoutes from "./LayoutRoutes";
import { authRoutes } from "./AuthRoutes";
import Login from "../Component/Authentication/Login";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../ReduxToolkit/Store";
import { fetchUserData } from "../ReduxToolkit/Reducers/AuthSlice";
import { AuthProvider } from "../Component/Providers/AuthContext";

const RouterData = () => {
 
  const login = localStorage.getItem("token") ?? null;

  return (
    <BrowserRouter basename={"/"}>
      <AuthProvider>
      <Routes>
        {login == null ? (
          <Route
            path={`${process.env.PUBLIC_URL}` || "/"}
            element={<Navigate to={`${process.env.PUBLIC_URL}/users/login`} />}
          />
        ) : (
         <>
          <Route
            path={`${process.env.PUBLIC_URL}` || "/"}
            element={
              <Navigate to={`${process.env.PUBLIC_URL}/users/dashboard`} />
            }
          />
          </>
        )}
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Route>
        {authRoutes.map(({ path, Component }, i) => (
          <Route path={path} element={Component} key={i} />
        ))}
        <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default RouterData;
