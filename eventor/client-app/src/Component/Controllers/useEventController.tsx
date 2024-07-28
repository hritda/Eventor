import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthContext";
import { API_ROUTES, BASE_URL } from "../../Routes/apiRoutes";
import useUI from "../../ReduxToolkit/Hooks/useUi";

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { startRefetch } from "../../ReduxToolkit/Reducers/UiSlice";

export default function useEventController() {
  let dispatch = useDispatch();
  let { auth, token, isAuthenticated } = useAuth();


  const deleteEvent = async (id: string) => {
    let requestOptions = {
      method: "DELETE",
      RequestMode: "no-cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${BASE_URL}${API_ROUTES.DELETE_EVENT}${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
         
          dispatch(startRefetch("EventList"));
        } else {
          console.log("event deletion failed", data);
          Swal.fire({
            title: "OOPS!",
            text: `${data.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    deleteEvent,
  };
}
