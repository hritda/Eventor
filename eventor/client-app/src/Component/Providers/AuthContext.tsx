import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import {
  IAuth,
  IloginPayload,
  IRegisterPayload,
  IUser,
} from "../../DefinedTypes/types";

import { useDispatch } from "react-redux";
import { useNavigate, useLocation  } from "react-router-dom";
import { API_ROUTES, BASE_URL } from "../../Routes/apiRoutes";
import Swal from "sweetalert2";



interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null | undefined;
  login: (values: IloginPayload, onError?:(message?:string)=>void,onSuccess?:(message?:string)=>void) => Promise<any>;
  register: (values: IRegisterPayload) => Promise<void>;
  logout: () => void;
  auth: IAuth | null | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );
  const [auth, setAuth] = useState<IAuth | null>();
  const [tokenState, setTokenState] = useState<string | null>();
  const dispatch = useDispatch();

  const setAuthData = (authData: IAuth) => {
    setAuth(authData);
    setIsAuthenticated(true);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        fetch(`${BASE_URL}${API_ROUTES.GET_USER}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setAuth(data.data.userData);
          setTokenState(token);
          console.log("AUTH user data:", data.data.userData);
        });
        return ;
      } catch (error) {
        console.log(error);
        return ;
      }
     
    }
  },[tokenState, isAuthenticated]);

  const login = async (loginPayload: IloginPayload,
    onError?: (message: string) => void,
  onSuccess?: (message?: string) => void 
  ) => {
  
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    };
    try {
      fetch(`${BASE_URL}${API_ROUTES.LOGIN}`, requestOptions)
        .then((response) => response.json())
        .then((respData) => {
          console.log("login response data:",respData.data);
          if (respData.status == 200) {
            localStorage.setItem("token",respData.data.token);
            setAuth(respData.data.currUser);
            setIsAuthenticated(true);
            setTokenState(respData.data.token);
            console.log("AUTH user DATA login:", respData.data.currUser);
        
            if(onSuccess){
              return onSuccess(respData.message);
            }
            
          } else {
            Swal.fire({
                title: "OOPS!",
                text: `${respData.message}`,
                icon: "warning",
                confirmButtonText: "OK",
              });
             if(onError){
              return onError(respData.message);
             }
          }
          return respData.message ;
        });
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const register = async (registerData: IRegisterPayload) => {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    };
    try {
     await fetch(`${BASE_URL}${API_ROUTES.REGISTER}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setAuthData(data.currUser);
          setTokenState(data.token);
          console.log("REGISTER DATA:", data);
        });
    } catch (error) {
      console.error("register error", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token: tokenState,
        login,
        register,
        logout,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
