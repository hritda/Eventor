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
import Swal from "sweetalert2";
import useEventController from "../../../../Controllers/useEventController";
import { useAuth } from "../../../../Providers/AuthContext";
import useUI from "../../../../../ReduxToolkit/Hooks/useUi";
import { useDispatch } from "react-redux";
import { addEventFormMode } from "../../../../../ReduxToolkit/Reducers/UiSlice";
import { Link } from "react-router-dom";
interface Props {
  event: IEvent;
}
const ProductDetails = ({ event }: Props) => {
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
  const { deleteEvent } = useEventController();
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
    <Col xxl="5" className="box-col-6 order-xxl-0 order-1">
      <Card>
        <CardBody>
          <div className="product-page-details d-flex ">
            {/* <Row className="product-page-details"> */}
            <h3 className="me-auto">{event?.eventName}</h3>
            <Link to= {`/users/editEvent/${event.uid}`} state={{eventData : event}}>
            <MdEdit
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(addEventFormMode("Edit"))}
              className="mx-4"
              color="#5c61f2"
              size={25}
            />
            </Link>
            <MdDelete
              style={{ cursor: "pointer" }}
              onClick={() => deleteUserEvent(event.uid)}
              className="mx-4"
              color="red"
              size={25}
            />
            {/* </Row> */}
          </div>
          <div className="product-price fs-6">{event?.eventType}</div>
          <div className="my-3 fs-6 d-flex align-items-center gap-3">
            <CiLocationOn color="red" size={25} /> <span>{event?.venue}</span>
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
          <div className=" fs-6 d-flex align-items-center gap-3">
            <FaCalendarAlt color="#5c61f2" size={20} />
            <span>
              {startDate} - {endDate}
            </span>
          </div>
          <br />
          <div className=" fs-6 d-flex align-items-center gap-3">
            <FaRegClock color="#5c61f2" size={20} />{" "}
            <span>
              {startTime} - {endTime}
            </span>
          </div>
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
