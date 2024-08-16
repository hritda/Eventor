import { Col } from "reactstrap";
import { Btn, UL } from "../../../AbstractElements";
import ZoomInOut from "./ZoomInOut/ZoomInOut";
import DarkMode from "./DarkMode/DarkMode";
import UserProfile from "./UserProfile/UserProfile";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../ReduxToolkit/Reducers/UiSlice";
import { Link } from "react-router-dom";

const RightHeaderIcon = () => {
  const dispatch = useDispatch();

  return (
    <Col
      xxl="7"
      xl="8"
      className="nav-right col-auto box-col-6 pull-right right-header p-0 ms-auto"
    >
      <UL className="nav-menus flex-row">
        {/* <ResponsiveSearchInput /> */}
        <Link to='/users/createEvent'>
        <Btn
          outline
          className="mx-3"
          color="primary"
          // onClick={() => dispatch(openModal("CreateEvent"))}
        >
          
          Create Event
        </Btn>
        </Link>
        <ZoomInOut />
        {/* <Language />
        <Notifications />
        <HeaderBookmark /> */}
        {/* <DarkMode /> */}
        {/* <HeaderMessage />
        <HeaderCart /> */}
        <UserProfile />
      </UL>
    </Col>
  );
};

export default RightHeaderIcon;
