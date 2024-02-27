import React, { useState } from "react";
import "../css/signUp.css";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import simg from "../img/signup.png";
import Logo from "../img/logo1.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import handleApiError from '../utils/Errorhandler';
const mailValReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const mobileValReg = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);
export default function Signup(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    companyName: "",
    contactPerson: "",
    emailId: "",
    phoneNumber: "",
  });

  const formValChange = (name) => (event) => {
    let newValue = event.target.value;
    if (name === "companyName" && newValue.length > 100) {
      newValue = newValue.slice(0, 100);
    }
    setValues({ ...values, [name]: event.target.value });
    setErrors(event);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  const validateForm = () => {
    const { companyName, contactPerson, emailId, phoneNumber } = values;

    const newErrors = {};

    if (!companyName || companyName === "") {
      newErrors.companyName = "Please enter companyName";
    }else if (companyName.length > 100) {
      newErrors.companyName = "Company name must be 100 characters or less";
    }

    if (!contactPerson || contactPerson === "") {
      newErrors.contactPerson = "Please enter contactPerson";
    }else if (contactPerson.length > 30) {
      newErrors.contactPerson = "contactPerson must be 30 characters or less";
    }

    if (!phoneNumber || phoneNumber === "") {
      newErrors.phoneNumber = "Please enter phoneNumber";
    }else if (phoneNumber.length > 50) {
      newErrors.phoneNumber = "phoneNumber must be 50 characters or less";
    }
    // else if (!mobileValReg.test(phoneNumber))
    //   newErrors.phoneNumber = "Please enter a valid phoneNumber";
  
    if (!emailId || emailId === "") {
      newErrors.emailId = "Please enter emailId";
    }
    else if (emailId && emailId.length > 50) {
      newErrors.emailId = "emailId must be 50 characters or less";
    }
     else if (!mailValReg.test(emailId))
      newErrors.emailId = "Please enter a valid email";
    return newErrors;
  };
  const handleSubmit = (e) => {
    const user = {
      companyName: values.companyName || undefined,
      contactPerson: values.contactPerson || undefined,
      phoneNumber: values.phoneNumber || undefined,
      emailId: values.emailId || undefined,
    };
    const formErrors = validateForm();
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      apiService.saveUser(user).then((response) => {
        console.log("response-------------->", response);
          if (response && response.data.message === "User Email already exist") {
            Swal.fire({
              title: response.data.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else if (response && response.data.message === "User Phone Number already exist") {
            Swal.fire({
              title: response.data.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
          else if (response && response.data.message === "Registered Successfully") {
            Swal.fire({
              title: "Please check your email to proceed",
              icon: "success",
              confirmButtonText: "OK",
            }).then((ok) => {
              navigate("/login");
            });
          } 
        

      }).catch((error) => {
        console.log("error2:::",error);
        if (error.code === 'ERR_NETWORK') {
          console.log("networkerrorsignup:::",error);
          handleApiError(error);
        }
        else
        {
          console.log("error:::",error);
          handleApiError(error);
        }
      });
    }
  };

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
              <h2 className="textReg">New Registration</h2>
            </Col>
          </Row>
          <MDBRow className="mb-4">
            <MDBCol>
              <div>
                <label htmlFor="companyName">Company Name*</label>
              </div>
              <div>
                <input
                  type="text"
                  className="mb-4 signupInput"
                  name="companyName"
                  id="companyName"
                  onChange={formValChange("companyName")}
                  value={values.companyName}
                />
                {errors.companyName ? (
                  <p className="text text-danger small">{errors.companyName}</p>
                ) : (
                  ""
                )}
              </div>
            </MDBCol>
            <MDBCol>
              <label>Contact Person*</label>
              <input
                type="text"
                className="mb-4 signupInput"
                name="contactPerson"
                id="contactPerson"
                onChange={formValChange("contactPerson")}
                value={values.contactPerson}
              />
              {errors.contactPerson ? (
                <p className="text text-danger small">{errors.contactPerson}</p>
              ) : (
                ""
              )}
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-4">
            <MDBCol>
              <div>
                <label htmlFor="phoneNumber">Contact Number*</label>
              </div>
              <div>
                <input
                  type="number"
                  className="mb-4 signupInput"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={formValChange("phoneNumber")}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber ? (
                  <p className="text text-danger small">{errors.phoneNumber}</p>
                ) : (
                  ""
                )}
              </div>
            </MDBCol>
            <MDBCol>
              <label htmlFor="emailId">Email Id*</label>
              <input
                type="text"
                className="mb-4 signupInput"
                name="emailId"
                id="emailId"
                onChange={formValChange("emailId")}
                value={values.emailId}
              />
              {errors.emailId ? (
                <p className="text text-danger small">{errors.emailId}</p>
              ) : (
                ""
              )}
            </MDBCol>
          </MDBRow>
          <button className="signupButton" onClick={handleSubmit}>
            Request for provisional login
          </button>
        </Col>
      </Row>
    </Container>
  );
}
