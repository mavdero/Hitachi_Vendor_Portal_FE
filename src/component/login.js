import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import auth from "../auth/auth-helper";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { signin } from "../auth/api-auth";
import { Link } from "react-router-dom";
import { loginAction } from "../reducers/login-slice";
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import Logo from "../img/logo1.png";
import hand from "../img/haand.png";
import hisys from "../img/HISYSVendorPortal.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import handleApiError from '../utils/Errorhandler';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCheckbox,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import LoginOTPValidationModal from "./LoginOTPValidationModal";
const mailValReg = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const passwordValidation = RegExp(
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
);
const useStyles = makeStyles((theme) => ({
  error: {
    verticalAlign: "middle",
  },
}));

export default function Signin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [role, setRole] = useState();
  const [Country_Region_Code, setCountry_Region_Code] = useState();
  const [userName, setUserName] = useState();
  const [verifiedUser, setverifiedUser] = useState();
  const [userId, setuserId] = useState();
  const [Validation, setValidation] = useState();
  const [submit, setSubmit] = useState(null);
  const textFieldForPasswordRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [editUser, seteditUser] = useState();
  const [getAllUserDetail, setgetAllUserDetail] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [vendorCodeStatus, setvendorCodeStatus] = useState(false);
  const [data, setData] = useState(null);
  const [values, setValues] = useState({
    userName: "",
    password: "",
    error: "",
    mailConfirmationCode: "",
    showContent: false,
    redirectToReferrer: false,
    rememberMe: false,
  });
  const [validationMessages, setValidationMessages] = useState([]);
  const [resetCode, setresetCode] = useState({
    resetCode: "",
    redirectToReferrer: false,
  });
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    let e = { ...errors };
    setErrors(e);
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
    setSubmit(true);
  };
  const validateForm = () => {
    const { userName, password } = values;

    const newErrors = {};

    if (!userName || userName === "") {
      newErrors.userName = "Please enter user name";
    }

    if (!password || password === "") {
      newErrors.password = "Please enter password";
    }

    return newErrors;
  };
  const validateForm2 = () => {
    const { userName } = values;
    const newErrors = {};
    if (!userName || userName === "")
      newErrors.userName = "Please enter user name";
    return newErrors;
  };
  const [showLoginTab, setshowLoginTab] = useState(true);
  const [showforgetPassowrd, setShowforgetPassowrd] = useState(false);
  const [showResetTab, setshowResetTab] = useState(false);
  const [showPasswordTab, setshowPasswordTab] = useState(false);
  const RememberMe = (event) => {
    if (event.target.checked) {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      localStorage.setItem("password", JSON.stringify(values.password));
    } else {
      localStorage.setItem("userName", "");
      localStorage.setItem("password", "");
    }
  };
  const login = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    const user = {
      userName: values.userName || undefined,
      password: values.password || undefined,
    };
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      signin(user).then((data) => {
          setErrors(formErrors);
          if (data && data.status === "success") {
            const desiredDomain = "hitachi-systems.com";
            const emailId = data.result?.emailId;
            const getEmailDomain = (email) => {
              return email?.split('@')[1];
            };    
            const emailDomain = getEmailDomain(emailId);
            console.log("LoggedIn");
            if (data.result.role === "vendor") {
              console.log("RoleVendor::");           
  const subUserid=data.result.subUserId;
  apiService.getSubuserId(subUserid).then((Vendorres) => {
    console.log("vendorcodecheck::",Vendorres.data.result);
    if (Vendorres.data.result.length > 0) {
      // Array has elements, now check for each vendorCode
      let allVendorCodesValid = true;
    
      for (const item of Vendorres.data.result) {
        const vendorCode = item.vendorCode;
        if (vendorCode === undefined || vendorCode === null || vendorCode.trim() === '') {
          allVendorCodesValid = false;
          break; // No need to continue checking once an invalid vendorCode is found
        }
      }
    
      if (allVendorCodesValid) {
        setvendorCodeStatus(true);
        console.log("All vendor codes are valid.");
        const details = data?.result;
        setValidation(data);
        setUserName(data?.result?.userName);
        setRole(data?.result?.role);
        setverifiedUser(data?.result?.verifiedUser);
        setCountry_Region_Code(data?.result?.Country_Region_Code);
        if (data === "invalid user") {
          setSubmit(false);
          textFieldForPasswordRef.current.blur();
          setValues({ ...values, error: data.error });
        } else {
          console.log("vendorCodeStatus1:",vendorCodeStatus);
          if (data?.result?.verifiedUser === "approved") {
            setData(data);
            const user = {
              userName: data?.result?.userName || undefined,
            };
            apiService
              .send2FactorOTP(user)
              .then(() => {
                setShowOTPModal(true);
              })
              .catch(() => {
                Swal.fire({
                  title: "Error Sending OTP, try again later.",
                  icon: "error",
                  confirmButtonText: "OK",
                  showCloseButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                });
              });
          } else if (data?.result?.verifiedUser === "Pending") {
            Swal.fire({
              title: "Please verify your email address.",
              icon: "warning",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          } else {
            setValues({ ...values, error: "Please verify your email" });
          }
        }
      } else {
        setvendorCodeStatus(false);
        Swal.fire({
          title: "Vendor Code not assigned,Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        console.log("Some vendor codes are empty, null, or undefined.");
      }
    }
    else
    {
      console.log("vendor code not created:::");
      setvendorCodeStatus(false);
      Swal.fire({
        title: "Vendor Code not assigned,Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
  
      }).catch((error) => {
        console.log("error2:::",error);
        if (error.code === 'ERR_NETWORK') {
          console.log("networkerror:::",error);
          handleApiError(error);
        }
        else
        {
          console.log("error:::",error);
          handleApiError(error);
        }
      });
            }
            else if (emailDomain === desiredDomain) {
              const details = data?.result;
                   setValidation(data);
                   setUserName(data?.result?.userName);
                   setRole(data?.result?.role);
                   setverifiedUser(data?.result?.verifiedUser);
                   setCountry_Region_Code(data?.result?.Country_Region_Code);
                   if (data === "invalid user") {
                     setSubmit(false);
                     textFieldForPasswordRef.current.blur();
                     setValues({ ...values, error: data.error });
                   } else {
                     if (data?.result?.verifiedUser === "approved") {
                       apiService
                         .getAllCollection(data?.result?.userId)
                         .then((getAllCollection) => {
                           setgetAllUserDetail(getAllCollection.data);
                           seteditUser(getAllCollection.data.basicInfo);
                           setuserId(data?.result?.userId);
                           auth.authenticate(data, () => {
                             setSubmit(true);
                             dispatch(loginAction.login());
                             setValues({ ...values, error: "", redirectToReferrer: true });
                           });
                         }).catch((error) => {
                          console.log("error2:::",error);
                          if (error.code === 'ERR_NETWORK') {
                            console.log("networkerror:::",error);
                            handleApiError(error);
                          }
                          else
                          {
                            console.log("error:::",error);
                            handleApiError(error);
                          }
                        });
                     }
                     else if (data?.result?.verifiedUser === "Pending") {
                       Swal.fire({
                         title: "Please verify your email address.",
                         icon: "warning",
                         confirmButtonText: "OK",
                         showCloseButton: true,
                         allowOutsideClick: false,
                         allowEscapeKey: false,
                       })
                     }
                     else {
                       setValues({ ...values, error: "Please verify your email" });
                     }
                   }
                     }
            else
            {
              const details = data?.result;
              setValidation(data);
              setUserName(data?.result?.userName);
              setRole(data?.result?.role);
              setverifiedUser(data?.result?.verifiedUser);
              setCountry_Region_Code(data?.result?.Country_Region_Code);
              if (data === "invalid user") {
                setSubmit(false);
                textFieldForPasswordRef.current.blur();
                setValues({ ...values, error: data.error });
              } else {
                console.log("vendorCodeStatus1:",vendorCodeStatus);
                if (data?.result?.verifiedUser === "approved") {
                  setData(data);
                  const user = {
                    userName: data?.result?.userName || undefined,
                  };
                  apiService
                    .send2FactorOTP(user)
                    .then(() => {
                      setShowOTPModal(true);
                    })
                    .catch(() => {
                      Swal.fire({
                        title: "Error Sending OTP, try again later.",
                        icon: "error",
                        confirmButtonText: "OK",
                        showCloseButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                      });
                    });
                } else if (data?.result?.verifiedUser === "Pending") {
                  Swal.fire({
                    title: "Please verify your email address.",
                    icon: "warning",
                    confirmButtonText: "OK",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                } else {
                  setValues({ ...values, error: "Please verify your email" });
                }
              }
            }
          } else {
            Swal.fire({
              title: data.data.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        
       
      
      
      }).catch((error) => {
        handleApiError(error);
      });
    }
  };

  const submitOTP = (otp) => {
    const user = {
      userName: values.userName || undefined,
      otp: otp,
    };
    apiService.OTP2FactorVerification(user).then((res) => {
      let resp = res.data;
      if (resp?.status == "success") {
        apiService
          .getAllCollection(data?.result?.userId)
          .then((getAllCollection) => {
            setgetAllUserDetail(getAllCollection.data);
            seteditUser(getAllCollection.data.basicInfo);
            setuserId(data?.result?.userId);
            auth.authenticate(data, () => {
              setSubmit(true);
              dispatch(loginAction.login());
              setValues({ ...values, error: "", redirectToReferrer: true });
            });
          }).catch((error) => {
            console.log("error2:::",error);
            if (error.code === 'ERR_NETWORK') {
              console.log("networkerror:::",error);
              handleApiError(error);
            }
            else
            {
              console.log("error:::",error);
              handleApiError(error);
            }
          });
      } else {
        Swal.fire({
          title: "Error verifying OTP, try again!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }).catch((error) => {
      console.log("error2:::",error);
      if (error.code === 'ERR_NETWORK') {
        console.log("networkerror:::",error);
        handleApiError(error);
      }
      else
      {
        console.log("error:::",error);
        handleApiError(error);
      }
    });
  };

  const onResetCode = (e) => {
    e.preventDefault();
    const formErrors = validateForm2();
    const user = {
      userName: values.userName || undefined,
    };
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      apiService.resetPasswordByCode(user).then((data) => {
        if (data) {
          Swal.fire({
            title: data.data.data,
            icon: data.data.status,
            confirmButtonText: "OK",
          });
          setshowLoginTab(true);
          setShowforgetPassowrd(false);
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }).catch((error) => {
        console.log("error2:::",error);
        if (error.code === 'ERR_NETWORK') {
          console.log("networkerror:::",error);
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
  useEffect(() => {
    const Password = localStorage.getItem("password");
    const loggedInUser = localStorage.getItem("userName");
    if (loggedInUser && Password) {
      setValues({
        userName: JSON.parse(localStorage.getItem("userName")),
        password: JSON.parse(localStorage.getItem("password")),
      });
    }
  }, []);
  const backToLogin = (e) => {
    setShowforgetPassowrd(false);
    setshowPasswordTab(false);
    setshowLoginTab(true);
    setshowResetTab(false);
  };
  const forgetPassword = (e) => {
    setShowforgetPassowrd(true);
    setshowPasswordTab(false);
    setshowLoginTab(false);
    setshowResetTab(false);
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    if (
      role === "Admin" &&
      Country_Region_Code === "IND" &&
      verifiedUser === "approved"
    ) {
      return <Navigate to={"/userCreation"} />;
    }
    if (role === "vendor") {
      console.log("vendorcode::")
      return <Navigate to={`/documents/${userName}`} />;
    }
    if (
      role === "Admin" &&
      Country_Region_Code !== "IND" &&
      verifiedUser === "approved"
    ) {
      return <Navigate to={`/documents/${userName}`} />;
    }
    if (role === "user" && verifiedUser === "approved") {
      if (editUser.length <= 0) {
        return <Navigate to={"/basic"} state={{ data: getAllUserDetail }} />;
      } else {
        return (
          <Navigate
            to={`/basic/${userId}`}
            state={{ data: getAllUserDetail }}
          />
        );
      }
    } else if (verifiedUser === "pending") {
      return <Navigate to={"/"} />;
    }
    if (role === "financial") {
      // return <Navigate to={`/documents/${userName}`} />;
    }
    if (role === "VCT") {
      return <Navigate to={"/approval"} />;
    }
    if (role === "MRT") {
      return <Navigate to={"/MRTteam"} />;
    }
    if (role === "Japan") {
      return <Navigate to={"/japanTeam"} />;
    }
    if (role === "TDSTeam") {
      return <Navigate to={"/"} />;
    }
    if (role === "AggrementTeam") {
      return <Navigate to={"/"} />;
    }
    if (role === "FinanceTeam") {
      return <Navigate to={"/FinanceTeam"} />;
    }
    if (role === "PurchaseTeam") {
      return <Navigate to={"/poTeam"} />;
    }
  }
  return (
    <div className="login">
      <LoginOTPValidationModal
        modalShow={showOTPModal}
        setModalShow={() => {
          setShowOTPModal(false);
        }}
        submitOTP={submitOTP}
      />
      <Container>
        <Row md={2}>
          <Col xs={4}>
            <Col>
              {" "}
              <img className="hisys-img" alt="" src={hisys} />{" "}
            </Col>
            <Col>
              {" "}
              <img className="person-img" alt="" src={hand} />
            </Col>
          </Col>
          <Col xs={12}>
            <img className="hitachi-logo" alt="" src={Logo} />
            <form>
              {showLoginTab ? (
                <div>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <div>
                        <label htmlFor="userName">Username*</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="mb-4 loginInput"
                          value={values.userName || ""}
                          onChange={handleChange("userName")}
                        />
                      </div>
                      {errors.userName ? (
                        <p className="text text-danger small">
                          {errors.userName}
                        </p>
                      ) : (
                        ""
                      )}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <label>Password*</label>
                      <input
                        className="mb-4 loginInput"
                        type={passwordType}
                        label="Password"
                        variant="outlined"
                        value={values.password}
                        onChange={handleChange("password")}
                      />
                      <VisibilityIcon
                        style={{
                          position: "absolute",
                          right: "10%",
                          marginTop: "1%",
                        }}
                        onClick={togglePassword}
                      />
                      {errors.password ? (
                        <p className="text text-danger small">
                          {errors.password}
                        </p>
                      ) : (
                        ""
                      )}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      {!showPasswordTab &&
                      showLoginTab &&
                      !showforgetPassowrd ? (
                        <div className="form-group form-remember">
                          <button
                            className="ForgetBtn"
                            onClick={forgetPassword}
                          >
                            {" "}
                            Forget Password?
                          </button>
                          <label className="rememberMe">
                            <input
                              name="rememberMe"
                              type="checkbox"
                              onChange={RememberMe}
                            />{" "}
                            Remember me
                          </label>
                        </div>
                      ) : null}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <button onClick={login} className="signupButton">
                      Sign In
                      </button>
                    </MDBCol>
                  </MDBRow>
                </div>
              ) : null}
              {showforgetPassowrd ? (
                <div>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <div>
                        <label htmlFor="userName">Username*</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="mb-4 loginInput"
                          value={values.userName}
                          onChange={handleChange("userName")}
                        />
                        {errors.userName ? (
                          <p className="text text-danger small">
                            {errors.userName}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <button className="resetButton" onClick={onResetCode}>
                        Click To continue
                      </button>
                    </MDBCol>
                    <MDBCol>
                      <button className="resetButton" onClick={backToLogin}>
                        Back To Login
                      </button>
                    </MDBCol>
                  </MDBRow>
                </div>
              ) : null}
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
