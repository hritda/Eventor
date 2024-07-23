import { Link } from "react-router-dom";
import { FeatherIcons, LI, UL } from "../../../../AbstractElements";
import { profilesMessage } from "../../../../Data/LayoutData/HeaderData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../ReduxToolkit/Store";
import { logout } from "../../../../ReduxToolkit/Reducers/AuthSlice";
import Swal from "sweetalert2";
import { useAuth } from "../../../../Component/Providers/AuthContext";

const ProfileBox = () => {
  const {logout} = useAuth();
  const handleClick = (name:string)=>{
    if(name === "Log Out"){
      logout();
      Swal.fire(
        {
          title: 'Logged out',
          text: 'You have logged out of your account!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1300,
        })
    }
  }
  return (
    <UL className="profile-dropdown onhover-show-div simple-list">
      {profilesMessage.map((data,index) => (
        <LI key={index}>
          <Link to={data.link} onClick={()=>handleClick(data.name)}>
            <FeatherIcons iconName={data.icon} />
            <span>{data.name}</span>
          </Link>
        </LI>
      ))}
    </UL>
  );
};

export default ProfileBox;
