import { FormEvent, useState } from "react";
import { Btn, H4, H6, P } from "../../../src/AbstractElements";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "../Authentication/authStyle.css";
import Swal from "sweetalert2";
import {
  AgreeWith,
  CreateAccount,
  CreateYourAccount,
  EmailAddress,
  EmailsPlaceHolder,
  FacebookHeading,
  FirstName,
  Href,
  LastName,
  LinkedInHeading,
  Password,
  PrivacyPolicy,
  SignIn,
  SignUpWith,
  TwitterHeading,
  YourName,
} from "../../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Linkedin, Twitter } from "react-feather";


const SignUpAccount = () => {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    UserTypeCodes: ["0001"],
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value," ",name);
    if (name === "confirmPassword") {
      console.log("updating hte confirm password value");
      setConfirmPassword(value);
    } else {
      setUser({
        ...user,
        [name]: value,
      });
      // console.log(user);
    }
  };
  const [showPassWord, setShowPassWord] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("entered submit");
   // setErrors([]);
    let required = [
      { name: "FirstName" },
      { name: "LastName" },
      { name: "Email" },
      { name: "Password" },
      { name: "confirmPassword" },
    ];

    let newErrors:string[] = [];

    required.forEach(function (obj) {
      console.log(obj.name);
      if (
        (obj.name === "confirmPassword" && confirmPassword !== user.Password) ) {
        newErrors.push(obj.name);
      }
      if (obj.name === "Password" && user.Password.length < 8) {
        newErrors.push(obj.name);
      }
      if (obj.name === "FirstName" && user.FirstName.length < 3) {
        newErrors.push(obj.name);
      }
      if (obj.name === "LastName" && user.LastName.length < 3) {
        newErrors.push(obj.name);
      }
    });

    setErrors(newErrors);
    console.log(errors);
    if (newErrors.length > 0) {
      return ;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestBody = user;
    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: headers,
    };

    fetch(`http://localhost:5110/api/auths/register`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.message);
        console.log(data.statusCode);
        if (data.statusCode !== 200) {
          Swal.fire({
            title: "OOPS!",
            text: `${data.message}`,
            icon: "warning",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Yay!",
            text: `${data.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1300
          });
          setTimeout(() => {
            navigate("/users/dashboard");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login-card login-dark">
      <div>
        <div>Eventor</div>
        <div className="login-main">
          <Form className="theme-form" onSubmit={handleSubmit}>
            <H4>{CreateYourAccount}</H4>
            <P>{"Enter your personal details to create account"}</P>
            <FormGroup>
              <Label className="col-form-label pt-0">{YourName}</Label>
              <Row className="g-2">
                <Col xs="6">
                  <Input
                    type="text"
                    required
                    value = {user.FirstName}
                    placeholder={FirstName}
                    name="FirstName"
                    onChange={handleChange}
                  />
                  {errors.includes("FirstName") ? (
                    <div className="red-text">
                      "Minimum length of 3 is required"
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs="6">
                  <Input
                    type="text"
                    required
                    value = {user.LastName}
                    placeholder={LastName}
                    name="LastName"
                    onChange={handleChange}
                  />
                  {errors.includes("LastName") ? (
                    <div className="red-text">
                      "Minimum length of 3 is required"
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label className="col-form-label">{EmailAddress}</Label>
              <Input
                type="email"
                required
                value = {user.Email}
                placeholder={EmailsPlaceHolder}
                name="Email"
                onChange={handleChange}
              />
              {errors.includes("Email") ? (
                <div className="red-text">"Enter a valid email"</div>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              <Label className="col-form-label">{Password}</Label>
              <div className="form-input position-relative">
                <Input
                  type={showPassWord ? "text" : "password"}
                  placeholder="*********"
                  required
                  value = {user.Password}
                  name="Password"
                  onChange={handleChange}
                />
                {errors.includes("Password") ? (
                  <div className="red-text">
                    "Minimum length of 8 is required"
                  </div>
                ) : (
                  ""
                )}
                <div className="show-hide">
                  <span
                    onClick={() => setShowPassWord(!showPassWord)}
                    className={!showPassWord ? "show" : ""}
                  />
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="col-form-label">Confirm Password</Label>
              <div className="form-input position-relative">
                <Input
                  type={showPassWord ? "text" : "password"}
                  placeholder="*********"
                  required
                  value = {confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                />
                {errors.includes("confirmPassword") ? (
                  <div className="red-text">
                    "confirm password should match the Password"
                  </div>
                ) : (
                  ""
                )}
                <div className="show-hide">
                  <span
                    onClick={() => setShowPassWord(!showPassWord)}
                    className={!showPassWord ? "show" : ""}
                  />
                </div>
              </div>
            </FormGroup>
            <FormGroup className="mb-0">
              {/* <div className="checkbox p-0">
                <Input id="checkbox1" type="checkbox" />
                <Label className="text-muted" for="checkbox1">
                  {AgreeWith}
                  <Link className="ms-2" to={Href}>
                    {PrivacyPolicy}
                  </Link>
                </Label>
              </div> */}
              <Btn block color="primary" className="w-100">
                {CreateAccount}
              </Btn>
            </FormGroup>
            {/* <H6 className="text-muted mt-4 or">{SignUpWith}</H6>
            <div className="social mt-4">
              <div className="btn-showcase">
                <Link
                  className="btn btn-light"
                  to="https://www.linkedin.com/login"
                  target="_blank"
                >
                  <Linkedin className="txt-linkedin" />
                  {LinkedInHeading}
                </Link>
                <Link
                  className="btn btn-light"
                  to="https://twitter.com/login?lang=en"
                  target="_blank"
                >
                  <Twitter className="txt-twitter" />
                  {TwitterHeading}
                </Link>
                <Link
                  className="btn btn-light"
                  to="https://www.facebook.com/"
                  target="_blank"
                >
                  <Facebook className="txt-fb" />
                  {FacebookHeading}
                </Link>
              </div>
            </div> */}
            <P className="mt-4 mb-0 text-center">
              {"Already have an account?"}
              <Link
                className="ms-2"
                to={`${process.env.PUBLIC_URL}/users/login`}
              >
                {SignIn}
              </Link>
            </P>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpAccount;
