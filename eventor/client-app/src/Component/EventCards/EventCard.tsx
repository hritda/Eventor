import React from "react";
import useUI from "../../ReduxToolkit/Hooks/useUi";
import { useDispatch, UseDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { IEvent } from "../../DefinedTypes/types";
import Btn from "../../CommonElements/Button";
import useEventController from "../Controllers/useEventController";
import { startRefetch } from "../../ReduxToolkit/Reducers/UiSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { H2, P, H3, H6, H4, H5 } from "../../AbstractElements";
import ProductButtons from "../Pages/SamplePage/ProductPage/ProductDetails/ProductButtons";
import parse from "date-fns/parse";
import format from "date-fns/format";
import { parseISO } from "date-fns";

interface Props {
  event: IEvent;
}
const EventCard: React.FC<Props> = ({ event }: Props) => {
  const { deleteEvent } = useEventController();
  const dispatch = useDispatch();
  let startDate = "",
    endDate = "";
  let startTime = "",
    endTime = "";
  const convertTimeTo12HourFormat = (time24: string): string => {
    const parsedTime = parse(time24, "HH:mm:ss", new Date());
    return format(parsedTime, "hh:mm a");
  };
  if (event?.startDate != undefined && event.endDate != undefined) {
    startDate = format(parseISO(event.startDate), "dd-MMM-yyyy");
    endDate = format(parseISO(event.endDate), "dd-MMM-yyyy");
  }
  if (event?.startTime != undefined && event.endTime != undefined) {
    startTime = convertTimeTo12HourFormat(event.startTime);
    endTime = convertTimeTo12HourFormat(event.endTime);
  }

  const deleteUserEvent = async (eventUid: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((isConfirm) => {
      if (isConfirm.value == true) {
        deleteEvent(eventUid);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      return false;
    });
  };
  return (
    <Col xs="12" sm="12" md="4">
      {/* <Card
        style={{
          width: "18rem",
        }}
      >
        <img alt="Card" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">{event.eventName}</CardTitle>
          <CardText>{event.description}</CardText>
          <CardText>{event.eventType}</CardText>
        </CardBody>
        
        <ListGroup flush>
          <ListGroupItem className="mx-3">
            Starts From {event.startDate}, {event.startTime}
          </ListGroupItem>
          <ListGroupItem className="mx-3">
            Ends on {event.endDate}, {event.endTime}
          </ListGroupItem>
        </ListGroup>
        <CardBody>{event.venue}</CardBody>
        <CardBody className="d-flex justify-content-between">
        <Link to={`${process.env.PUBLIC_URL}/events/${event.uid}`}><Button  color="primary" >View</Button></Link>
          <Button onClick={()=>deleteUserEvent(event.uid)} color="danger">Delete</Button>
        </CardBody>
      </Card>*/}
      <Card
        style={{
          width: "100%",
        }}
      >
        <CardBody>
          <div className=" d-flex flex-column">
            {/* <Row className="product-page-details"> */}
            <img
              alt="Card"
              src="https://picsum.photos/300/200"
              style={{ width: "100%" }}
            />
            <br/>
            <h3 className="my-2">{event?.eventName}</h3>
          </div>
          {/* <br/> */}
          <div className="product-price fs-6">{event?.eventType}</div>
          <div className="my-3 fs-6">
            <CiLocationOn color="red" size={25} />{" "}
            <span className="ml-2">{event?.venue}</span>
          </div>
          {/* <ProductColor /> */}
          <hr />
          {/* <P>
            <H5>Description</H3>
            <br />
            {event?.description}
          </P>
          <hr /> */}
          {/* <hr />
          <ProductTables /> */}
          <FaCalendarAlt color="#5c61f2" size={20} />
          <span className="mx-3">
            {startDate} - {endDate}
          </span>
          <br />
          <br/>
          <FaRegClock color="#5c61f2" size={20} />{" "}
          <span className="mx-3">
            {startTime} - {endTime}
          </span>
        </CardBody>
        <CardBody className="d-flex justify-content-between">
          <Link to={`${process.env.PUBLIC_URL}/events/${event.uid}`}>
            <Button color="primary">View</Button>
          </Link>
          <Button onClick={() => deleteUserEvent(event.uid)} color="danger">
            Delete
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default EventCard;
