import React from "react";
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

 interface Props {
  event: IEvent;
}
const EventCard: React.FC<Props> = ({ event }: Props) => {
  const {deleteEvent} = useEventController();

  const deleteUserEvent = async(eventUid:string) => {
       await deleteEvent(eventUid);
  }
  return (
    <Col xs="12" sm="12" md="4">
      <Card
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
        <CardBody className="d-flex justify-content-end">
          <Button onClick={()=>deleteUserEvent(event.uid)} color="danger">Delete</Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default EventCard;
