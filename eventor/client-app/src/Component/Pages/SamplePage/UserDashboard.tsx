import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { H3, P } from "../../../AbstractElements";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Pages, SampleCards, SamplePage } from "../../../utils/Constant";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { samplePageData } from "../../../Data/OtherPage/OtherPage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EventCard from "../../EventCards/EventCard";
import { IEvent } from "../../../DefinedTypes/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../ReduxToolkit/Store";
import { useAuth } from "../../Providers/AuthContext";
import useUI from "../../../ReduxToolkit/Hooks/useUi";
import { stopCoverage } from "v8";
import { stopRefetch } from "../../../ReduxToolkit/Reducers/UiSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state: RootState) => state.auth.currUser);
  const { auth } = useAuth();
  const { refetch } = useUI();
  console.log("dashboard auth :", auth);
  const [events, setEvents] = useState<IEvent[]>([]);
 
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getEventList();
  },[]);

  useEffect(() => {
    if(refetch.includes("EventList")){
      getEventList();
    }
    
  }, [refetch]);

  const getEventList = () => {
    let token = localStorage.getItem("token");
    let requestOptions = {
      method: "GET",
      RequestMode: "no-cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    fetch(`http://localhost:5110/api/events`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          Swal.fire({
            title: "OOPS!",
            text: "some error occurred fetching events",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          const evenList = data.data.userEventList;
          setEvents(evenList);
          dispatch(stopRefetch("EventList"));
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "OOPS!",
          text: "Some error occurred in fetching events",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  return (
    <div className='page-body'>
    <Container className="d-flex flex-column">
      <h2 className="my-5 mx-auto">Your events</h2>
      <Container fluid>
        <Row>
          {events.map((e) => (
            <EventCard event={e} key={e.uid} />
          ))}
        </Row>
      </Container>
    </Container>
    </div>
  
  );
};

export default UserDashboard;
