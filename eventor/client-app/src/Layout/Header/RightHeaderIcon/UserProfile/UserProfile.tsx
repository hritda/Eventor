import { Image, LI, P } from "../../../../AbstractElements";
import { RootState } from "../../../../ReduxToolkit/Store";
import { dynamicImage } from "../../../../Service";
import ProfileBox from "./ProfileBox";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../../../../srcassets/user.png";

const UserProfile = () => {
  const currUser = useSelector((state:RootState) => state.auth.currUser);
  return (
    <LI className="profile-nav onhover-dropdown p-0">
      <div className="d-flex profile-media align-items-center">
        <Image className="b-r-10 img-40" src={userImage} alt="user" />
        <div className="flex-grow-1">
          <span>{currUser?.firstName}  {currUser?.lastName}</span>
          <P className="mb-0 ">{"UI Designer"}</P>
        </div>
      </div>
      <ProfileBox />
    </LI>
  );
};

export default UserProfile;
