import React from "react";
import {
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

interface Props {
  event: IEvent;
}
const EventCard:React.FC<Props> = ({ event }: Props) => {
  return (
    <Col xs="12" sm="6" md="4">
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
        <ListGroupItem>
          Starts From {event.startDate}, {event.startTime}
        </ListGroupItem>
        <ListGroupItem>
          Ends on {event.endDate}, {event.endTime}
        </ListGroupItem>
      </ListGroup>

      <CardBody>{event.venue}</CardBody>
    </Card>
    </Col>

  );
};

export default EventCard;
