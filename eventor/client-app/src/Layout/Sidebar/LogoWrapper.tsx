import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../ReduxToolkit/Hooks';
import { H2, Image, SVG } from '../../AbstractElements';
import { setToggleSidebar } from '../../ReduxToolkit/Reducers/LayoutSlice';
import { dynamicImage } from '../../Service';

const LogoWrapper = () => {
    const dispatch = useAppDispatch();
    const {toggleSidebar} = useAppSelector((state)=>state.layout)

    return (
      <>
        <div className="logo-wrapper">
          {/* <Link to={`${process.env.PUBLIC_URL}/pages/sample_page`}>
            <Image className="img-fluid" src={dynamicImage("logo/logo.png")} alt="logo" />
          </Link> */}
          <H2><span style={{color:"white"}}>Beevents</span></H2>
          <div className="toggle-sidebar">
            <SVG className={`sidebar-toggle`} iconId={`toggle-icon`} onClick={()=>dispatch(setToggleSidebar(!toggleSidebar))}/>
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/pages/sample_page`}>
            <Image className="img-fluid" src={dynamicImage("logo/logo-icon.png")} alt="logo" />
          </Link>
        </div>
      </>
    );
}

export default LogoWrapper