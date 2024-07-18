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

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state:RootState) => state.auth.currUser);
  const [events, setEvents] = useState<IEvent[]>([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    let requestOptions = {
      method: "GET",
      RequestMode:"no-cors",
      headers : {
        "Authorization": `Bearer ${token}`,
      },
    };

    fetch(`http://localhost:5110/api/events/users/${currUser?.uid}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode !== 200) {
            Swal.fire({
                title: "OOPS!",
                text: "some error occurred fetching events",
                icon: "error",
                confirmButtonText: "OK",
              });
        } else {
          const evenList = data.userEventList;
          setEvents(evenList);
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
  }, []);

  return (
    <Container className="d-flex flex-column">
      <h2 className="my-5 mx-auto">Your events</h2>
      <Container fluid>
        <Row>
      {
        events.map((e)=>(
             <EventCard event={e} key = {e.uid} />
         ))
      }
      </Row>
      </Container>
    </Container>
  );
};

export default UserDashboard;
