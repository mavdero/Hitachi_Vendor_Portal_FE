import React, { useState, useEffect } from "react";
import "../css/signUp.css";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import simg from "../img/signup.png";
import Logo from "../img/logo1.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation } from 'react-router-dom';
export default function Password(props) {
  const location = useLocation();
  const { emailId, mailConfirmationCode,userName } = useParams();
  const [passwordType, setPasswordType] = useState("password");
  const [ConfirmPasswordType, setConfirmPasswordType] = useState("password");
  const navigate = useNavigate();
  const passwordValidation = RegExp(
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
  );
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    userName: userName,
    accountError: "",
    emailId: emailId,
    mailConfirmationCode: mailConfirmationCode,
  });
  const formValChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setErrors(event);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  const isNewUsernameAndPassword = location.pathname.includes('/New');
  const validateForm = () => {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const { userName, password, confirmPassword } = values;
    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const specialCharPassword = specialCharRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);
    const digitsReg = digitsRegExp.test(password);
    const newErrors = {};

    if (!userName || userName === "") {
      if (location.pathname.includes('/New')) {
        newErrors.userName = "Please enter user name";
      }
    }

    if (!password || password === "") {
      newErrors.password = "Please enter password";
    } else if (!uppercasePassword) {
      newErrors.password = "Password must contain a UpperCase";
    } else if (!lowercasePassword) {
      newErrors.password = "Password must contain a lowercase";
    } else if (!specialCharPassword) {
      newErrors.password = "Password must contain a specialChar";
    } else if (!minLengthPassword) {
      newErrors.password = "Passord must contain atleast 8 characters";
    } else if (!digitsReg) {
      newErrors.password = "Password must contain a Number";
    } else if (!confirmPassword || confirmPassword === "") {
      newErrors.confirmPassword = "Please enter confirmPassword";
    } else if (password !== confirmPassword)
      newErrors.confirmPassword =
        "Password and confirm password should be same";
    return newErrors;
  };
  const togglePassword = () => {
    console.log("passord");
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const toggleConfirmPassword = () => {
    console.log("confirmpassord");
    if (ConfirmPasswordType === "password") {
      setConfirmPasswordType("text");
      return;
    }
    setConfirmPasswordType("password");
  };
  const handleSubmit = (e) => {
    const user = {
      userName: values.userName || undefined,
      password: values.password || undefined,
      confirmPassword: values.confirmPassword || undefined,
      emailId: values.emailId || undefined,
      mailConfirmationCode: values.mailConfirmationCode || undefined,
    };
    const formErrors = validateForm();
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (isNewUsernameAndPassword) {
        apiService.resetUsernameAndPassword(user).then((data) => {
          if (data) {
            Swal.fire({
              title: data.data.data,
              icon: data.data.status,
              confirmButtonText: "OK",
            }).then((result) => {
              if (data.data.status === "success") {
                navigate("/login");
              }
            });
          }
        }); 
      }
      else
      {
      apiService.resetPassword(user).then((data) => {
        if (data) {
          Swal.fire({
            title: data.data.data,
            icon: data.data.status,
            confirmButtonText: "OK",
          }).then((result) => {
            if (data.data.status === "success") {
              navigate("/login");
            }
          });
        }
      });
    }
    }
  };
  useEffect(() => {});
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <img className="signup-img" alt="" src={simg} />
        </Col>
        <Col sm={8}>
          <Row>
            <Col sm={12}>
              <img className="hitachi-logo" alt="" src={Logo} />
              {isNewUsernameAndPassword ? (
            <>
              <h2 className="textReg">UserName and Password Generation</h2>
             
            </>
          ) : (
            <>
              <h2 className="textReg">Reset Password</h2>
            </>
          )}
             
            </Col>
          </Row>
          {isNewUsernameAndPassword ? (
  <MDBCol>
    <div>
      <label htmlFor="userName">New Username*</label>
    </div>
    <div>
      <input
        type="text"
        className="mb-4 loginInput"
        value={values.userName || ""}
        onChange={formValChange("userName")}
      />
      {errors.userName ? (
        <p className="text text-danger small">{errors.userName}</p>
      ) : (
        ""
      )}
    </div>
  </MDBCol>
) : null}

<MDBCol>
  <div style={{ position: 'relative' }}>
    <label htmlFor="password">New Password*</label>
    <input
      type={passwordType}
      className="mb-4 signupInput"
      name="password"
      id="password"
      onChange={formValChange("password")}
      value={values.password}
    />
    <VisibilityIcon
      style={{
        position: "absolute",
        right: "8%",
        top: "50%",
        transform: "translateY(-50%)", 
      }}
      onClick={togglePassword}
    />
    {errors.password ? (
      <p className="text text-danger small">{errors.password}</p>
    ) : (
      ""
    )}
  </div>
</MDBCol>

          <MDBRow className="mb-4">
           
          <MDBCol>
  <div style={{ position: 'relative' }}>
    <label>Confirm Password*</label>
    <input
      type={ConfirmPasswordType}
      className="mb-4 signupInput"
      name="confirmPassword"
      id="confirmPassword"
      onChange={formValChange("confirmPassword")}
      value={values.confirmPassword}
    />
    <VisibilityIcon
      style={{
        position: "absolute",
        right: "8%", 
        top: "50%", 
        transform: "translateY(-50%)",
      }}
      onClick={toggleConfirmPassword}
    />
    {errors.confirmPassword ? (
      <p className="text text-danger small">{errors.confirmPassword}</p>
    ) : (
      ""
    )}
  </div>
</MDBCol>

          </MDBRow>
          {isNewUsernameAndPassword ? (
            <>
         <button className="signupButton" onClick={handleSubmit}>
           Generate UserName and Password
          </button>  
            </>
          ) : (
            <>
               <button className="signupButton" onClick={handleSubmit}>
            Create password
          </button>
            </>
          )}
         
        </Col>
      </Row>
    </Container>
  );
}
