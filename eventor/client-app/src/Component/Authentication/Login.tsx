import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
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
import { useState } from "react";
import { toast } from "react-toastify";
import SocialApp from "./SocialApp";
import Swal from "sweetalert2";
import { RootState } from "../../ReduxToolkit/Store";
import { login } from "../../ReduxToolkit/Reducers/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state:RootState) => state.auth.currUser);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("test123@gmail.com");
  const [password, setPassword] = useState("Test@123");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const navigate = useNavigate();

  const SimpleLoginHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }
    let payload = {
      Email: email,
      Password: password,
      UserType: "1",
    };

    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(`http://localhost:5110/api/auths/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode != 200) {
          Swal.fire({
            title: "Error!",
            text: `${data.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          const payload = data.currUser ;
          dispatch(login(payload));
          localStorage.setItem("token",data.token);
          
          Swal.fire({
            title: "Yay!",
            text: "You are logged in!",
            icon: "success",
            showConfirmButton: false,
            timer: 1300,
          });
          navigate("/users/dashboard");
        }
      })
      .catch((error) => {});
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
                      <Btn color="primary" block className="w-100">
                        {SignIn}
                      </Btn>
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
