import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import { H3 } from "../../../AbstractElements";
import ProductBody from "./ProductBody/ProductBody";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import useUI from "../../../ReduxToolkit/Hooks/useUi";
import { useLocation } from "react-router-dom";


const CreateEvent = () => {

  const {eventFormMode} = useUI();

  return (
    <>
     <div className="page-body">
     <Breadcrumbs mainTitle="Add Event" parent="event" />
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                { eventFormMode === "Create" ? <H3>Add Event</H3>:<H3>Update Event</H3>}
              </CardHeader>
              <CardBody>
                <ProductBody />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default CreateEvent;
