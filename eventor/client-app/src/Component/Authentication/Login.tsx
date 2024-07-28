import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H2, H3, H4, Image, P } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateAccount,
  DoNotAccount,
  EmailAddress,
  ForgotPassword,
  Href,
  Password,
  RememberPassword,
  SignIn,
  SignInAccount,
  SignInWith,
} from "../../utils/Constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SocialApp from "./SocialApp";
import Swal from "sweetalert2";
import { RootState } from "../../ReduxToolkit/Store";
import { login } from "../../ReduxToolkit/Reducers/AuthSlice";
import { useAuth } from "../Providers/AuthContext";
import { IloginPayload } from "../../DefinedTypes/types";

const Login = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state: RootState) => state.auth.currUser);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("test123@gmail.com");
  const [password, setPassword] = useState("Test@123");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login, auth, isAuthenticated, token } = useAuth();

  // useEffect(() => {
  //   console.log("useeffect login authenticated:",isAuthenticated);
  //   if (isAuthenticated) {
  //     navigate("/users/dashboard");
  //   }
  // }, [isAuthenticated]);

  const SimpleLoginHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }
    let payload: IloginPayload = {
      Email: email,
      Password: password,
      UserType: "1",
    };

    const data = await login(payload,(error)=>{
      console.log("return error message:",error);
    },
  (success)=>{
    console.log("return success message",success);
    navigate("/users/mainDashboard");
    Swal.fire({
      title: "Yay!",
      text: "Logged in successfully",
      icon: "success",
      timer: 1300
    });
  }
  );
  // await new Promise(resolve => setTimeout(resolve, 0));
  //   console.log(data);
  //   console.log(isAuthenticated);
 
  //     if (isAuthenticated) {
     
  //       navigate("/users/dashboard");
          
        Swal.fire({
          title: "Yay!",
          text: "Logged in successfully",
          icon: "success",
          timer: 1300
        });
  //     }
   
    

    // if (email === "test123@gmail.com" && password === "Test@123") {
    //   localStorage.setItem("login", JSON.stringify(true));
    //   navigate(`${process.env.PUBLIC_URL}/pages/sample_page`);
    // } else {
    //   toast.error("Please Enter valid email or password...!");
    // }
  };
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card login-dark">
            <div>
              <div>
                <Link className="logo text-center" to={Href}>
                  {/* <Image
                    className="img-fluid for-light"
                    src={dynamicImage("logo/logo-1.png")}
                    alt="looginpage"
                  /> */}
                  <H2 className="for-light">Beevents</H2>
                  <H2 className="for-dark">Beevents</H2>
                </Link>
              </div>
              <div className="login-main">
                <Form
                  className="theme-form"
                  onSubmit={(e) => SimpleLoginHandle(e)}
                >
                  <H3>{SignInAccount}</H3>
                  <P>{"Enter your email & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      type="email"
                      required
                      placeholder="Test@gmail.com"
                      value={email}
                      name="email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <div className="form-input position-relative">
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="*********"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        name="password"
                      />
                      {passwordError ? (
                        <div className="red-text">
                          "Minimum length of 8 is required"
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="show-hide" onClick={() => setShow(!show)}>
                        <span className="show"> </span>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-0 form-sub-title">
                    {/* <div className="checkbox p-0">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" htmlFor="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div> */}
                    <Link
                      to={`${process.env.PUBLIC_URL}/authentication/forget_password`}
                    >
                      {ForgotPassword}
                    </Link>
                    <div className="text-end mt-3">
                      <Button color="primary" type = "submit"  className="w-100">
                        {SignIn}
                      </Button>
                    </div>
                  </FormGroup>
                  <H4 className="text-muted mt-4 or">{SignInWith}</H4>
                  <SocialApp />
                  <P className="mt-4 mb-0 text-center">
                    {DoNotAccount}
                    <Link
                      className="ms-2"
                      to={`${process.env.PUBLIC_URL}/users/register`}
                    >
                      {CreateAccount}
                    </Link>
                  </P>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
