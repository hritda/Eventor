import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductPageContainer from "./ProductPage/ProductPageContainer";
import Swal from "sweetalert2";
import { IEvent } from "../../../DefinedTypes/types";
const UserEvent = () => {
  const { uid } = useParams();
  const [event, setEvent] = useState<IEvent>();
  useEffect(() => {
    getEventByUid(uid);
  }, []);

  const getEventByUid = (uid: string | undefined) => {
    let token = localStorage.getItem("token");
    let requestOptions = {
      method: "GET",
      RequestMode: "no-cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`http://localhost:5110/api/events/${uid}`, requestOptions)
    .then((response)=>response.json())
    .then((data)=>{
      if(data.status == 200){
        console.log(data.data.eventById);
        setEvent(data.data.eventById);
        return ;
      } else {
         Swal.fire({
            title: "OOPS!",
            text: `${data.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
          return ;
      }
    })
  }
  return (
    <div className="page-body">
    
      <ProductPageContainer event = {event} />
    </div>
  );
};

export default UserEvent;
