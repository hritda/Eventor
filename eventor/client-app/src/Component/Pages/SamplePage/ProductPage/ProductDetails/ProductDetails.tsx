import { Card, CardBody, Col, Row } from "reactstrap";
import { H2, H3, P } from "../../../../../AbstractElements";
import ProductColor from "./ProductColor";
import ProductTables from "./ProductTables";
import ProductShare from "./ProductShare";
import ProductRate from "./ProductRate";
import { FaRegClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { format, parse, parseISO } from "date-fns";
import ProductButtons from "./ProductButtons";
import { MdDelete } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IEvent } from "../../../../../DefinedTypes/types";
import { MdEdit } from "react-icons/md";
interface Props {
  event: IEvent | undefined;
}
const ProductDetails = ({ event }: Props) => {
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
  return (
    <Col xxl="5" className="box-col-6 order-xxl-0 order-1">
      <Card>
        <CardBody>
          <div className="product-page-details d-flex ">
            {/* <Row className="product-page-details"> */}
            <H2 className="me-auto">{event?.eventName}</H2>

            <MdEdit className="mx-4" color="#5c61f2" size={25} />
            <MdDelete className="mx-4" color="red" size={25} />
            {/* </Row> */}
          </div>
          <div className="product-price">{event?.eventType}</div>
          <div className="my-3 fs-6">
            <CiLocationOn color="red" size={25} />{" "}
            <span className="ml-2">{event?.venue}</span>
          </div>
          {/* <ProductColor /> */}
          <hr />
          <P>
            <H3>Description</H3>
            <br />
            {event?.description}
          </P>
          <hr />
          {/* <hr />
          <ProductTables /> */}
          <FaCalendarAlt color="#5c61f2" size={20} />
          <span className="mx-3">
         
            {startDate} - {endDate}
          </span>
          <br />
          <br />
          <FaRegClock color="#5c61f2" size={20} />{" "}
          <span className="mx-3">
            {startTime} - {endTime}
          </span>
          <hr />
          {/* <ProductRate />
          <hr /> */}
          <ProductButtons />
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductDetails;
