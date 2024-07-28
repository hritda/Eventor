import { Link } from "react-router-dom";
import Image from "../../CommonElements/Media";
import { dynamicImage } from "../../Service";
import { SVG } from "../../AbstractElements";
import { setToggleSidebar } from "../../ReduxToolkit/Reducers/LayoutSlice";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import beeLogo from  "../../beelogo.png";

const HeaderLogo = () => {
  const dispatch = useAppDispatch();
  const { toggleSidebar } = useAppSelector((state) => state.layout);
  return (
    <div className="header-logo-wrapper col-auto p-0">
      <div className="logo-wrapper">
        <Link to={`${process.env.PUBLIC_URL}/pages/sample_page`}>
          {/* <Image
            className="img-fluid for-light"
            src={dynamicImage("logo/logo-1.png")}
            alt="logo"
          />
          <Image
            className="img-fluid for-dark"
            src={dynamicImage("logo/logo.png")}
            alt="logo"
          /> */}
        <Link to={`${process.env.PUBLIC_URL}/pages/sample_page`}></Link>
          <Image
            className="img-fluid for-light"
            src={dynamicImage("logo/beelogo.png")}
            height={50}
            width={50}
            alt="logo"
          />
           <Image
            className="img-fluid for-dark"
            src={dynamicImage("logo/beelogo.png")}
            height={50}
            width={50}
            alt="logo"
          />

            <span className="for-light" style={{color:"black", fontFamily:"Arial", fontSize:"1.1rem", marginLeft:"10px"}} >
              Beevents
            </span>
            <span className="for-dark" style={{color:"white", fontFamily:"Arial", fontSize:"1.1rem", marginLeft:"7px"}} >
              Beevents
            </span>
        </Link>
        </div>
     
      <div className="toggle-sidebar">
        <SVG
          className="sidebar-toggle"
          iconId="stroke-animation"
          onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
        />
      </div>
    </div>
  );
};

export default HeaderLogo;
