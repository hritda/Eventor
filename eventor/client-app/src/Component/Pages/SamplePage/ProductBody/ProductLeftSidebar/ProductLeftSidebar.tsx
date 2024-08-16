import { Col, Nav, NavItem, NavLink } from "reactstrap";
import { H6, P, SVG } from "../../../../../AbstractElements";
import { useAppDispatch, useAppSelector } from "../../../../../ReduxToolkit/Hooks";
import { Href } from "../../../../../utils/Constant";
import { addProductNav } from "../../../../../Data/AddProduct";
import { setNavId } from "../../../../../ReduxToolkit/AddProductSlice";

const ProductLeftSidebar = () => {
  const {navId} = useAppSelector((state) => state.addProduct)
  const dispatch = useAppDispatch()
  return (
    <Col xxl="3" xl="4" className="box-col-4e sidebar-left-wrapper">
      <Nav pills className="sidebar-left-icons" tabs>
        {addProductNav.map((data, i) => (
          <NavItem key={i}>
            <NavLink active={navId === data.id ? true : false} onClick={()=>dispatch(setNavId(data.id))} href={Href}>
              <div className="nav-rounded">
                <div className="product-icons">
                  <SVG className="stroke-icon" iconId={data.icon} />
                </div>
              </div>
              <div className="product-tab-content">
                <H6>{data.title}</H6>
                <P>{data.detail}</P>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Col>
  );
};

export default ProductLeftSidebar;
