import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthContext";
import { API_ROUTES, BASE_URL } from "../../Routes/apiRoutes";
import Swal from "sweetalert2";



export default function useEventController(){
    let {auth,token,isAuthenticated} = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    const refetch = async()=>{
      
    }
    const deleteEvent = async(id:string) => {
      let requestOptions = {
        method: "DELETE",
        RequestMode:"no-cors",
        headers : {
      
          "Authorization": `Bearer ${token}`,
        },
      };

          fetch(`${BASE_URL}${API_ROUTES.DELETE_EVENT}${id}`,requestOptions)
          .then((response)=>response.json())
          .then((data)=>{
              if(data.statusCode == 200){
                console.log("event deleted:",data);
                Swal.fire({
                  title: "Yay!",
                  text: `${data.message}`,
                  icon: "success",
                  timer: 1300
                });
              } else {
                console.log("event deletion failed", data);
                Swal.fire({
                  title: "OOPS!",
                  text: `${data.message}`,
                  icon: "error",
                  confirmButtonText: "OK"
                });
              }
            }).catch((error) => {
              console.log(error);
            })
            
    };

    
return {
  deleteEvent,
  };
}
