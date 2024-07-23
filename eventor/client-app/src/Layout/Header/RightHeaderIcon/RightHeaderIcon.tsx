import { Col } from "reactstrap";
import { Btn, UL } from "../../../AbstractElements";
import ZoomInOut from "./ZoomInOut/ZoomInOut";
import DarkMode from "./DarkMode/DarkMode";
import UserProfile from "./UserProfile/UserProfile";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../ReduxToolkit/Reducers/UiSlice";

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
        <Btn
          outline
          className="mx-3"
          color="primary"
          onClick={() => dispatch(openModal("CreateEvent"))}
        >
          Create Event
        </Btn>
        <ZoomInOut />
        {/* <Language />
        <Notifications />
        <HeaderBookmark /> */}
        <DarkMode />
        {/* <HeaderMessage />
        <HeaderCart /> */}
        <UserProfile />
      </UL>
    </Col>
  );
};

export default RightHeaderIcon;
