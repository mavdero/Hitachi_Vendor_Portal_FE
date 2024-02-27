import React from "react";
import "../css/Basic.css";
import uploa from "../img/camera-plus.png";
import Navbar1 from "../common/navbar.js";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import withRouter from "../component/withRouter";
import handleApiError from '../utils/Errorhandler';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import InputGroup from "react-bootstrap/InputGroup";
export class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      Address: "",
      Address_2: "",
      City: "",
      state: "",
      Country_Region_Code: "",
      Post_Code: "",
      companyName: "",
      image: "",
      stateCode: "",
      phoneNumberSignUp:JSON.parse(window.sessionStorage.getItem("jwt")).result?.phoneNumber,
      contactPerson:JSON.parse(window.sessionStorage.getItem("jwt")).result?.contactPerson,
      financeSpoccontactName: "",
      financeSpocdesignation: "",
      financeSpocphoneNo: "",
      financeSpocemail: "",
      operationSpoccontactName: "",
      operationSpocdesignation: "",
      operationSpocphoneNo: "",
      operationSpocemail: "",
      collectionSpoccontactName: "",
      collectionSpocdesignation: "",
      collectionSpocphoneNo: "",
      collectionSpocemail: "",
      managementSpoccontactName: "",
      managementSpocdesignation: "",
      managementSpocphoneNo: "",
      managementSpocemail: "",
      contactName: "",
      designation: "",
      phoneNo: "",
      email: "",
      mastervendor_email: "",
      open: true,
      commu: false,
      edit: true,
      editStatutory: "",
      commuDetail: false,
      dataEntered: false,
      phoneNumber: "please enter your valid phone number",
      newMasterReg: false,
      basicInfoVendor: false,
      communicationDetailsInfo: false,
      userType: "",
      AddressError: null,
      Address_2Error: null,
      cityError: null,
      pinCodeError: null,
      fieldErrors: {
        financeSpoccontactNameError: null,
        financeSpocdesignationError: null,
        financeSpocphoneNoError: null,
        financeSpocemailError: null,
        operationSpoccontactNameError: null,
        operationSpocdesignationError: null,
        operationSpocphoneNoError: null,
        operationSpocemailError: null,
        collectionSpoccontactNameError: null,
        collectionSpocdesignationError: null,
        collectionSpocphoneNoError: null,
        collectionSpocemailError: null,
        managementSpoccontactNameError: null,
        managementSpocdesignationError: null,
        managementSpocphoneNoError: null,
        managementSpocemailError: null,
        contactNameError: null,
        designationError: null,
        phoneNoError: null,
        emailError: null,
        mastervendor_emailError: null,
      },
      
    };

    this.togglebutton = this.togglebutton.bind(this);
    this.togglebuttonCommu = this.togglebuttonCommu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }
  validateField = (name, value) => {
    switch (name) {
      case "financeSpoccontactName":
        return value.length > 30
          ? "financeSpoccontactName must be 30 characters or less."
          : null;
      case "financeSpocdesignation":
        return value.length > 30
          ? "financeSpocdesignation must be 30 characters or less."
          : null;
      case "financeSpocphoneNo":
        return value.length > 50
          ? "financeSpocphone number must be 50 characters or less."
          : null;
      case "financeSpocemail":
        return value.length > 50
          ? "financeSpocemail must be 50 characters or less."
          : null;
      case "operationSpoccontactName":
        return value.length > 30
          ? "operationSpoccontactName must be 30 characters or less."
          : null;
      case "operationSpocdesignation":
        return value.length > 30
          ? "operationSpocdesignation must be 30 characters or less."
          : null;
      case "operationSpocphoneNo":
        return value.length > 50
          ? "operationSpocphone number must be 50 characters or less."
          : null;
      case "operationSpocemail":
        return value.length > 50
          ? "operationSpocemail must be 50 characters or less."
          : null;
      case "collectionSpoccontactName":
        return value.length > 30
          ? "collectionSpoccontactName must be 30 characters or less."
          : null;
      case "collectionSpocdesignation":
        return value.length > 30
          ? "collectionSpocdesignation must be 30 characters or less."
          : null;
      case "collectionSpocphoneNo":
        return value.length > 50
          ? "collectionSpocphone number must be 50 characters or less."
          : null;
      case "collectionSpocemail":
        return value.length > 50
          ? "collectionSpocemail must be 50 characters or less."
          : null;
      case "managementSpoccontactName":
        return value.length > 30
          ? "managementSpoccontactName must be 30 characters or less."
          : null;
      case "managementSpocdesignation":
        return value.length > 30
          ? "managementSpocdesignation must be 30 characters or less."
          : null;
      case "managementSpocphoneNo":
        return value.length > 50
          ? "managementSpocphone number must be 50 characters or less."
          : null;
      case "managementSpocemail":
        return value.length > 50
          ? "managementSpocemail must be 50 characters or less."
          : null;
      case "contactName":
        return value.length > 30
          ? "contactName must be 30 characters or less."
          : null;
      case "designation":
        return value.length > 30
          ? "designation must be 30 characters or less."
          : null;
      case "phoneNo":
        return value.length > 50
          ? "phone number must be 50 characters or less."
          : null;
      case "email":
        return value.length > 50
          ? "email must be 50 characters or less."
          : null;
      case "mastervendor_email":
        return value.length > 50
          ? "mastervendor_email must be 50 characters or less."
          : null;
      default:
        return null;
    }
  };
  mouseEnter(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let newValue = value;
    if (name === "Post_Code" && value.length > 20) {
      newValue = value.slice(0, 20);
      this.setState({
        [name]: newValue,
        isFormChanged: true,
        pinCodeError: "PinCode/Zipcode must be 20 or less.",
      });
    } else {
      this.setState({
        [name]: newValue,
        isFormChanged: true,
        pinCodeError: null,
      });
    }
    this.setState({
      [name]: value,
    });
    this.setState({ Post_Code: e.target.value });
  }
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.mouseOut(event);
    }
console.log("event:",event)
  }
  onBlur = (event) => {
   console.log("mouseout");
   this.mouseOut(event);
  };
  mouseOut(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let newValue = value;
    if (name === "Post_Code" && value.length > 20) {
      newValue = value.slice(0, 20);
      this.setState({
        [name]: newValue,
        isFormChanged: true,
        pinCodeError: "PinCode/Zipcode must be 20 or less.",
      });
    } else {
      this.setState({
        [name]: newValue,
        isFormChanged: true,
        pinCodeError: null,
      });
    }
    this.setState({
      [name]: value,
    });
    this.setState({ Post_Code: e.target.value });
    if (
      this.state.Country_Region_Code &&
      this.state.Post_Code &&
      this.state.Post_Code.includes("/") === false
    ) {
      apiService
        .getStateAndcityByzipcode(
          this.state.Country_Region_Code,
          this.state.Post_Code
        )
        .then((response) => {
          console.log("res--------->", response);
          if (response && response.data.status === "success") {
            if (response.data.postalcodes.length === 0) {
const errorMessage = "City and state are not available for the entered pincode. Please enter them manually.";
Swal.fire({
  icon: "error",
  title: "Enter City and State",
  text: errorMessage,
  confirmButtonText: "OK",
  showCloseButton: false,
  allowOutsideClick: false,
  allowEscapeKey: false,
})
// if (this.state.Post_Code !== value) {
//   this.setState({ getCityAndState: "" });
//   this.setState({ state: "" });
//   this.setState({ City: "" });
// }
             
              console.log("nocityandstate",response.data.postalcodes)
              this.setState({ getCityAndState: "" });
              this.setState({ state: "" });
              this.setState({ City: "" });
            } else {
              this.setState(
                {
                  getCityAndState: response.data.postalcodes[0],
                },
                () => {
                  this.setState(
                    {
                      state: response.data.postalcodes[0].adminName1,
                    },
                    () => {
                      apiService
                        .getErpStateCode(this.state.state)
                        .then((response) => {
                          console.log("ERP API response:", response);
                          if (
                            response.data.message === "Success" &&
                            response.data.result.length > 0
                          ) {
                            const firstCodeValue = response.data.result[0].Code;
                            console.log("First value of Code:", firstCodeValue);
                            this.setState({
                              stateCode: response.data.result[0].Code,
                            });
                          } else {
                            console.log("No data found or an error occurred.");
                          }
                        })
                        .catch((error) => {
                          console.log("ERP API error:", error);
                        });
                    }
                  );

                  if (response.data.postalcodes[0].adminName3) {
                    for (let i = 0; i < response.data.postalcodes.length; i++) {
                      if (response.data.postalcodes[i].adminName3 !== "NA") {
                        this.setState({
                          City: response.data.postalcodes[i].adminName3,
                        });
                      }
                    }
                  } else {
                    this.setState({
                      City: response.data.postalcodes[0].placeName,
                    });
                  }
                }
              );
            }
          } else {
            // Swal.fire({
            //   icon: 'error',
            //   title: 'Error in Fetching Pincode',
            //   confirmButtonText: "OK",
            //   showCloseButton: false,
            //   allowOutsideClick: false,
            //   allowEscapeKey: false,
            // });
          }
        }).catch((error) => {
          handleApiError(error);
        });
    } else {
    }
  }
  togglebutton() {
    console.log("basic::");
    this.setState({
      open: true,
      commu: false,
    });
  }

  togglebuttonCommunication = () => {
    this.setState({
      open: false,
      commu: true,
    });
  };

  togglebuttonCommu() {
    if (this.state.isFormChanged) {
      Swal.fire({
        title: "Do you want to save?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCloseButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          const { AddressError, Address_2Error, cityError, pinCodeError } =
            this.state;
          if (AddressError || Address_2Error || cityError || pinCodeError) {
            console.log("Form has errors. Please correct the input fields.");
            return;
          }
          const basicInfo = {
            userId: JSON.parse(window.sessionStorage.getItem("jwt")).result
              ?.userId,
            Address: this.state.Address,
            Address_2: this.state.Address_2,
            City: this.state.City,
            state: this.state.state,
            Country_Region_Code: this.state.Country_Region_Code,
            Post_Code: this.state.Post_Code,
            companyName: this.state.companyName,
            image: this.state.image,
            stateCode: this.state.stateCode,
            contactPerson:this.state.contactPerson,
            phoneNumber:this.state.phoneNumberSignUp,
            userStatus:
              JSON.parse(window.sessionStorage.getItem("jwt")).result
                ?.usertype === "NewRegistration"
                ? "NewRegistration"
                : JSON.parse(window.sessionStorage.getItem("master"))
                ? "MasterData"
                : "",
          };
          if (this.state.basicInfoVendor) {
            console.log("update::", this.state.basicInfoVendor);
            apiService
              .updateVendordetail(
                JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
                basicInfo
              )
              .then((response) => {
                if (response) {
                  Swal.fire({
                    title: "Data Updated",
                    icon: "success",
                    confirmButtonText: "OK",
                    showCloseButton: true,
                    allowOutsideClick: false,
                  }).then((response) => {
                    this.fetchData();
                    this.setState({
                      open: false,
                      commu: true,
                    });
                    this.setState({
                      isFormChanged: false,
                    });
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Server Unavailable",
                    text: "The server is currently unavailable. Please try again later.",
                    confirmButtonText: "OK",
                    showCloseButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                }
              }).catch((error) => {
                handleApiError(error);
              });
          } else {
            if (this.props.params.newReg) {
              const basicInfo = {
                userId: JSON.parse(window.sessionStorage.getItem("jwt")).result
                  ?.userId,
                Address: this.state.Address,
                Address_2: this.state.Address_2,
                City: this.state.City,
                state: this.state.state,
                Country_Region_Code: "IN",
                Post_Code: this.state.Post_Code,
                companyName: this.state.companyName,
                image: this.state.image,
                stateCode: this.state.stateCode,
                contactPerson:this.state.contactPerson,
                phoneNumber:this.state.phoneNumberSignUp,
                userStatus:
                  JSON.parse(window.sessionStorage.getItem("jwt")).result
                    ?.usertype === "NewRegistration"
                    ? "NewRegistration"
                    : JSON.parse(window.sessionStorage.getItem("master"))
                    ? "MasterData"
                    : "",
              };
              apiService.saveNewRegVendordetail(basicInfo).then((response) => {
                this.setState({ newUser: response.data.result.userId });
                let data = { newregUser: response.data.result.userId };
                sessionStorage.setItem("newregUser", JSON.stringify(data));
                if (response) {
                  Swal.fire({
                    title: "Data saved",
                    icon: "success",
                    confirmButtonText: "OK",
                    showCloseButton: true,
                    allowOutsideClick: false,
                  }).then((response) => {
                    this.fetchData();
                    this.setState({
                      open: false,
                      commu: true,
                    });
                    this.setState({
                      isFormChanged: false,
                    });
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Server Unavailable",
                    text: "The server is currently unavailable. Please try again later.",
                    confirmButtonText: "OK",
                    showCloseButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  })
                }
              }).catch((error) => {
                handleApiError(error);
              });
            } else {
              console.log("save::", this.state.basicInfoVendor);
              apiService.saveVendordetail(basicInfo).then((response) => {
                if (response) {
                  Swal.fire({
                    title: "Data saved",
                    icon: "success",
                    confirmButtonText: "OK",
                    showCloseButton: true,
                    allowOutsideClick: false,
                  }).then((response) => {
                    this.fetchData();
                    this.setState({
                      open: false,
                      commu: true,
                    });
                    this.setState({
                      basicInfoVendor: true,
                    });
                    this.setState({
                      isFormChanged: false,
                    });
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Server Unavailable",
                    text: "The server is currently unavailable. Please try again later.",
                    confirmButtonText: "OK",
                    showCloseButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  })
                }
              }).catch((error) => {
                handleApiError(error);
              });
            }
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.fetchData();
          this.setState({
            open: false,
            commu: true,
          });
          this.setState({
            isFormChanged: false,
          });
        }
      });
    } else {
      this.fetchData();
      this.setState({
        open: false,
        commu: true,
      });
      this.setState({
        isFormChanged: false,
      });
    }
  }
  next = (e) => {
    if (this.state.isFormChangedCommunication) {
      Swal.fire({
        title: "Do you want to save?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCloseButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.hasFieldErrors()) {
            // Show an error message or take appropriate action
            console.log(
              "Please fix the field errors before submitting the form."
            );
            return;
          }
          const communicationDetails = {
            userId: JSON.parse(window.sessionStorage.getItem("jwt")).result
              ?.userId,
            financeSpoccontactName: this.state.financeSpoccontactName,
            financeSpocdesignation: this.state.financeSpocdesignation,
            financeSpocphoneNo: this.state.financeSpocphoneNo,
            financeSpocemail: this.state.financeSpocemail,
            operationSpoccontactName: this.state.operationSpoccontactName,
            operationSpocdesignation: this.state.operationSpocdesignation,
            operationSpocphoneNo: this.state.operationSpocphoneNo,
            operationSpocemail: this.state.operationSpocemail,
            collectionSpoccontactName: this.state.collectionSpoccontactName,
            collectionSpocdesignation: this.state.collectionSpocdesignation,
            collectionSpocphoneNo: this.state.collectionSpocphoneNo,
            collectionSpocemail: this.state.collectionSpocemail,
            managementSpoccontactName: this.state.managementSpoccontactName,
            managementSpocdesignation: this.state.managementSpocdesignation,
            managementSpocphoneNo: this.state.managementSpocphoneNo,
            managementSpocemail: this.state.managementSpocemail,
            contactName: this.state.contactName,
            designation: this.state.designation,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
            mastervendor_email: this.state.mastervendor_email,
          };

          if (this.state.communicationDetailsInfo) {
            if (this.state.commuDetail) {
              apiService
                .updateCommunicationdetail(
                  JSON.parse(window.sessionStorage.getItem("jwt")).result
                    ?.userId,
                  communicationDetails
                )
                .then((response) => {
                  this.fetchData();
                  if (response) {
                    Swal.fire({
                      title: "Data Updated",
                      icon: "success",
                      confirmButtonText: "OK",
                      showCloseButton: true,
                      allowOutsideClick: false,
                    }).then((response) => {
                      this.setState({
                        isFormChangedCommunication: false,
                      });
                      if (
                        this.state.editStatutory.length <= 0 ||
                        "" ||
                        undefined
                      ) {
                        this.props.navigate("/statutory");
                      } else {
                        this.props.navigate(
                          `/statutory/${this.state.editStatutory[0].userId}`
                        );
                      }
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Server Unavailable",
                      text: "The server is currently unavailable. Please try again later.",
                      confirmButtonText: "OK",
                      showCloseButton: false,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                    })
                  }
                }).catch((error) => {
                  handleApiError(error);
                });
            } else {
              apiService
                .SaveVendorCommunication(communicationDetails)
                .then((response) => {
                  if (response.data.msg === "success") {
                    this.fetchData();
                    Swal.fire({
                      title: "Data saved",
                      icon: "success",
                      confirmButtonText: "OK",
                      showCloseButton: true,
                      allowOutsideClick: false,
                    }).then((response) => {
                      this.setState({
                        communicationDetailsInfo: true,
                      });
                      this.setState({
                        isFormChangedCommunication: false,
                      });
                      if (
                        this.state.editStatutory.length <= 0 ||
                        "" ||
                        undefined
                      ) {
                        this.props.navigate("/statutory");
                      } else {
                        this.props.navigate(
                          `/statutory/${this.state.editStatutory[0].userId}`
                        );
                      }
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Server Unavailable",
                      text: "The server is currently unavailable. Please try again later.",
                      confirmButtonText: "OK",
                      showCloseButton: false,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                    })
                  }
                }).catch((error) => {
                  handleApiError(error);
                });
            }
          } else {
            let newuser = JSON.parse(
              window.sessionStorage.getItem("newregUser")
            )?.newregUser;
            if (newuser) {
              communicationDetails.userId = newuser;
              apiService
                .SaveVendorCommunication(communicationDetails)
                .then((response) => {
                  if (response.data.msg === "success") {
                    this.fetchData();
                    Swal.fire({
                      title: "Data saved",
                      icon: "success",
                      confirmButtonText: "OK",
                      showCloseButton: true,
                      allowOutsideClick: false,
                    }).then((response) => {
                      this.setState({
                        communicationDetailsInfo: true,
                      });
                      this.setState({
                        isFormChangedCommunication: false,
                      });
                      if (
                        this.state.editStatutory.length <= 0 ||
                        "" ||
                        undefined
                      ) {
                        this.props.navigate("/statutory");
                      } else {
                        this.props.navigate(
                          `/statutory/${this.state.editStatutory[0].userId}`
                        );
                      }
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Server Unavailable",
                      text: "The server is currently unavailable. Please try again later.",
                      confirmButtonText: "OK",
                      showCloseButton: false,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                    })
                  }
                }).catch((error) => {
                  handleApiError(error);
                });
            } else {
              apiService
                .SaveVendorCommunication(communicationDetails)
                .then((response) => {
                  if (response.data.msg === "success") {
                    this.fetchData();
                    Swal.fire({
                      title: "Data saved",
                      icon: "success",
                      confirmButtonText: "OK",
                      showCloseButton: true,
                      allowOutsideClick: false,
                    }).then((response) => {
                      this.setState({
                        communicationDetailsInfo: true,
                      });
                      this.setState({
                        isFormChangedCommunication: false,
                      });
                      if (
                        this.state.editStatutory.length <= 0 ||
                        "" ||
                        undefined
                      ) {
                        this.props.navigate("/statutory");
                      } else {
                        this.props.navigate(
                          `/statutory/${this.state.editStatutory[0].userId}`
                        );
                      }
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Server Unavailable",
                      text: "The server is currently unavailable. Please try again later.",
                      confirmButtonText: "OK",
                      showCloseButton: false,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                    })
                  }
                }).catch((error) => {
                  handleApiError(error);
                });
            }
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.setState({
            isFormChangedCommunication: false,
          });
          if (this.state.editStatutory.length <= 0 || "" || undefined) {
            this.props.navigate("/statutory");
          } else {
            this.props.navigate(
              `/statutory/${this.state.editStatutory[0].userId}`
            );
          }
        }
      });
    } else {
      this.setState({
        isFormChangedCommunication: false,
      });
      if (this.state.editStatutory.length <= 0 || "" || undefined) {
        this.props.navigate("/statutory");
        this.fetchData();
      } else {
        this.props.navigate(`/statutory/${this.state.editStatutory[0].userId}`);
        this.fetchData();
      }
    }

    e.preventDefault();
  };

  cancelBasicInfo = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "Yes",
      showCloseButton: true,
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({
          isFormChanged: true,
        });
        if (
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype ===
          "NewRegistration"
        ) {
          this.setState({
            Address: "",
            Address_2: "",
            City: "",
            state: "",
            Country_Region_Code: "IN",
            Post_Code: "",
            image: "",
          });
        } else {
          this.setState({
            Address: "",
            Address_2: "",
            City: "",
            state: "",
            Country_Region_Code: "",
            Post_Code: "",
            image: "",
          });
        }
      }
    });
  };
  cancelCommunicationInfo = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are You Sure,You want to reset?",
      icon: "success",
      confirmButtonText: "OK",
      showCloseButton: true,
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((ClearData) => {
      if (ClearData.isConfirmed) {
        this.setState({
          isFormChangedCommunication: true,
        });
        this.setState({
          financeSpoccontactName: "",
          financeSpocdesignation: "",
          financeSpocphoneNo: "",
          financeSpocemail: "",
          operationSpoccontactName: "",
          operationSpocdesignation: "",
          operationSpocphoneNo: "",
          operationSpocemail: "",
          collectionSpoccontactName: "",
          collectionSpocdesignation: "",
          collectionSpocphoneNo: "",
          collectionSpocemail: "",
          managementSpoccontactName: "",
          managementSpocdesignation: "",
          managementSpocphoneNo: "",
          managementSpocemail: "",
          contactName: "",
          designation: "",
          phoneNo: "",
          email: "",
          mastervendor_email: "",
        });
      }
    });
  };
  handleChange(e) {
    this.setState({ Country_Region_Code: e.target.value });
    this.setState({ getCityAndState: "" });
    this.setState({ state: "" });
    this.setState({ City: "" });
    this.setState({ Post_Code: "" });
    this.setState({ isFormChanged: true });
  }
  formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let newValue = value;
    let addressError = this.state.AddressError;
    let address2Error = this.state.Address_2Error;
    let cityError = this.state.cityError;

    if (name === "Address") {
      if (value.length > 50) {
        newValue = value.slice(0, 50);
        addressError = "Address Line-1 must be 50 characters or less.";
      } else {
        addressError = null; // No error, so set to null
      }
    }

    if (name === "Address_2") {
      if (value.length > 50) {
        newValue = value.slice(0, 50);
        address2Error = "Address Line-2 must be 50 characters or less.";
      } else {
        address2Error = null; // No error, so set to null
      }
    }

    if (name === "City") {
      if (value.length > 30) {
        newValue = value.slice(0, 30);
        cityError = "City must be 30 characters or less.";
      } else {
        cityError = null; // No error, so set to null
      }
    }

    this.setState({
      [name]: newValue,
      isFormChanged: true,
      AddressError: addressError,
      Address_2Error: address2Error,
      cityError: cityError,
    });
  };

 formValChangeCommunication = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let newValue = value;
    const error = this.validateField(name, value);

    this.setState((prevState) => ({
      [name]: newValue,
      isFormChangedCommunication: true,
      fieldErrors: {
        ...prevState.fieldErrors,
        [`${name}Error`]: error,
      },
    }));
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    // e.preventDefault();
    const { AddressError, Address_2Error, cityError, pinCodeError } =
      this.state;
    if (AddressError || Address_2Error || cityError || pinCodeError) {
      console.log("Form has errors. Please correct the input fields.");
      return;
    }
    const basicInfo = {
      // id: this.state.id,
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
      Address: this.state.Address,
      Address_2: this.state.Address_2,
      City: this.state.City,
      state: this.state.state,
      Country_Region_Code: this.state.Country_Region_Code,
      Post_Code: this.state.Post_Code,
      companyName: this.state.companyName,
      image: this.state.image,
      stateCode: this.state.stateCode,
      contactPerson:this.state.contactPerson,
      phoneNumber:this.state.phoneNumberSignUp,
      userStatus:
        JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype ===
        "NewRegistration"
          ? "NewRegistration"
          : JSON.parse(window.sessionStorage.getItem("master"))
          ? "MasterData"
          : "",
    };
    if (this.state.basicInfoVendor) {
      console.log("update::", this.state.basicInfoVendor);
      apiService
        .updateVendordetail(
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
          basicInfo
        )
        .then((response) => {
          if (response) {
            this.fetchData();
            Swal.fire({
              title: "Data Updated",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.setState({
                  isFormChanged: false,
                });
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Server Unavailable",
              text: "The server is currently unavailable. Please try again later.",
              confirmButtonText: "OK",
              showCloseButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
            })
          }
        }).catch((error) => {
          handleApiError(error);
        });
    } else {
      if (this.props.params.newReg) {
        apiService.saveNewRegVendordetail(basicInfo).then((response) => {
          this.setState({ newUser: response.data.result.userId });
          let data = { newregUser: response.data.result.userId };
          sessionStorage.setItem("newregUser", JSON.stringify(data));
          if (response) {
            this.fetchData();
            Swal.fire({
              title: "Data saved",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.setState({
                  isFormChanged: false,
                });
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Server Unavailable",
              text: "The server is currently unavailable. Please try again later.",
              confirmButtonText: "OK",
              showCloseButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
            })
          }
        }).catch((error) => {
          handleApiError(error);
        });
      } else {
        console.log("save::", this.state.basicInfoVendor);
        apiService.saveVendordetail(basicInfo).then((response) => {
          if (response) {
            this.fetchData();
            Swal.fire({
              title: "Data saved",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.setState({
                  basicInfoVendor: true,
                });
                this.setState({
                  isFormChanged: false,
                });
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Server Unavailable",
              text: "The server is currently unavailable. Please try again later.",
              confirmButtonText: "OK",
              showCloseButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
            })
          }
        }).catch((error) => {
          handleApiError(error);
        });
      }
    }
  };
  updatehandleSubmit = (e) => {
    e.preventDefault();
    const { AddressError, Address_2Error, cityError, pinCodeError } =
      this.state;
    if (AddressError || Address_2Error || cityError || pinCodeError) {
      console.log("Form has errors. Please correct the input fields.");
      return;
    }
    const basicInfo = {
      // id: this.state.id,
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
      Address: this.state.Address,
      Address_2: this.state.Address_2,
      City: this.state.City,
      state: this.state.state,
      Country_Region_Code: this.state.Country_Region_Code,
      Post_Code: this.state.Post_Code,
      companyName: this.state.companyName,
      image: this.state.image,
      stateCode: this.state.stateCode,
      contactPerson:this.state.contactPerson,
      phoneNumber:this.state.phoneNumberSignUp,
      userStatus:
        JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype ===
        "NewRegistration"
          ? "NewRegistration"
          : JSON.parse(window.sessionStorage.getItem("master"))
          ? "MasterData"
          : "",
    };
    if (this.state.basicInfoVendor) {
      console.log("update::", this.state.basicInfoVendor);
      apiService
        .updateVendordetail(
          JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
          basicInfo
        )
        .then((response) => {
          if (response) {
            this.fetchData();
            Swal.fire({
              title: "Data Updated",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.setState({
                  isFormChanged: false,
                });
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Server Unavailable",
              text: "The server is currently unavailable. Please try again later.",
              confirmButtonText: "OK",
              showCloseButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
            })
          }
        }).catch((error) => {
          handleApiError(error);
        });
    }
  };
  hasFieldErrors = () => {
    const fieldErrorKeys = Object.keys(this.state.fieldErrors);
    for (const key of fieldErrorKeys) {
      if (this.state.fieldErrors[key] !== null) {
        return true; // Found a field error
      }
    }
    return false; // No field errors found
  };

  handleSubmitComDetail = (e) => {
    // e.preventDefault();
    if (this.hasFieldErrors()) {
      // Show an error message or take appropriate action
      console.log("Please fix the field errors before submitting the form.");
      return;
    }
    const communicationDetails = {
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
      financeSpoccontactName: this.state.financeSpoccontactName,
      financeSpocdesignation: this.state.financeSpocdesignation,
      financeSpocphoneNo: this.state.financeSpocphoneNo,
      financeSpocemail: this.state.financeSpocemail,
      operationSpoccontactName: this.state.operationSpoccontactName,
      operationSpocdesignation: this.state.operationSpocdesignation,
      operationSpocphoneNo: this.state.operationSpocphoneNo,
      operationSpocemail: this.state.operationSpocemail,
      collectionSpoccontactName: this.state.collectionSpoccontactName,
      collectionSpocdesignation: this.state.collectionSpocdesignation,
      collectionSpocphoneNo: this.state.collectionSpocphoneNo,
      collectionSpocemail: this.state.collectionSpocemail,
      managementSpoccontactName: this.state.managementSpoccontactName,
      managementSpocdesignation: this.state.managementSpocdesignation,
      managementSpocphoneNo: this.state.managementSpocphoneNo,
      managementSpocemail: this.state.managementSpocemail,
      contactName: this.state.contactName,
      designation: this.state.designation,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      mastervendor_email: this.state.mastervendor_email,
    };
    if (this.state.communicationDetailsInfo) {
      if (this.state.commuDetail) {
        apiService
          .updateCommunicationdetail(
            JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
            communicationDetails
          )
          .then((response) => {
            this.fetchData();
            if (response) {
              Swal.fire({
                title: "Data Updated",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.setState({
                    isFormChangedCommunication: false,
                  });
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Server Unavailable",
                text: "The server is currently unavailable. Please try again later.",
                confirmButtonText: "OK",
                showCloseButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
              })
            }
          }).catch((error) => {
            handleApiError(error);
          });
      } else {
        apiService
          .SaveVendorCommunication(communicationDetails)
          .then((response) => {
            if (response.data.msg === "success") {
              this.fetchData();
              Swal.fire({
                title: "Data saved",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.setState({
                    communicationDetailsInfo: true,
                  });
                  this.setState({
                    isFormChangedCommunication: false,
                  });
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Server Unavailable",
                text: "The server is currently unavailable. Please try again later.",
                confirmButtonText: "OK",
                showCloseButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
              })
            }
          }).catch((error) => {
            handleApiError(error);
          });
      }
    } else {
      let newuser = JSON.parse(
        window.sessionStorage.getItem("newregUser")
      )?.newregUser;
      if (newuser) {
        communicationDetails.userId = newuser;
        apiService
          .SaveVendorCommunication(communicationDetails)
          .then((response) => {
            if (response.data.msg === "success") {
              this.fetchData();
              Swal.fire({
                title: "Data saved",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.setState({
                    communicationDetailsInfo: true,
                  });
                  this.setState({
                    isFormChangedCommunication: false,
                  });
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Server Unavailable",
                text: "The server is currently unavailable. Please try again later.",
                confirmButtonText: "OK",
                showCloseButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
              })
            }
          }).catch((error) => {
            handleApiError(error);
          });
      } else {
        apiService
          .SaveVendorCommunication(communicationDetails)
          .then((response) => {
            if (response.data.msg === "success") {
              this.fetchData();
              Swal.fire({
                title: "Data saved",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.setState({
                    communicationDetailsInfo: true,
                  });
                  this.setState({
                    isFormChangedCommunication: false,
                  });
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Server Unavailable",
                text: "The server is currently unavailable. Please try again later.",
                confirmButtonText: "OK",
                showCloseButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
              })
            }
          }).catch((error) => {
            handleApiError(error);
          });
      }
    }
  };
  updatehandleSubmitComDetail = (e) => {
    e.preventDefault();
    if (this.hasFieldErrors()) {
      // Show an error message or take appropriate action
      console.log("Please fix the field errors before submitting the form.");
      return;
    }
    const communicationDetails = {
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
      financeSpoccontactName: this.state.financeSpoccontactName,
      financeSpocdesignation: this.state.financeSpocdesignation,
      financeSpocphoneNo: this.state.financeSpocphoneNo,
      financeSpocemail: this.state.financeSpocemail,
      operationSpoccontactName: this.state.operationSpoccontactName,
      operationSpocdesignation: this.state.operationSpocdesignation,
      operationSpocphoneNo: this.state.operationSpocphoneNo,
      operationSpocemail: this.state.operationSpocemail,
      collectionSpoccontactName: this.state.collectionSpoccontactName,
      collectionSpocdesignation: this.state.collectionSpocdesignation,
      collectionSpocphoneNo: this.state.collectionSpocphoneNo,
      collectionSpocemail: this.state.collectionSpocemail,
      managementSpoccontactName: this.state.managementSpoccontactName,
      managementSpocdesignation: this.state.managementSpocdesignation,
      managementSpocphoneNo: this.state.managementSpocphoneNo,
      managementSpocemail: this.state.managementSpocemail,
      contactName: this.state.contactName,
      designation: this.state.designation,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      mastervendor_email: this.state.mastervendor_email,
    };
    if (this.state.communicationDetailsInfo) {
      if (this.state.commuDetail) {
        apiService
          .updateCommunicationdetail(
            JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId,
            communicationDetails
          )
          .then((response) => {
            if (response) {
              this.fetchData();
              Swal.fire({
                title: "Data Updated",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.setState({
                    isFormChangedCommunication: false,
                  });
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Server Unavailable",
                text: "The server is currently unavailable. Please try again later.",
                confirmButtonText: "OK",
                showCloseButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
              })
            }
          }).catch((error) => {
            handleApiError(error);
          });
      } else {
        apiService
          .SaveVendorCommunication(communicationDetails)
          .then((response) => {
            this.fetchData();
            if (response.data.msg === "success") {
              Swal.fire({
                title: "Data saved",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.setState({
                    communicationDetailsInfo: true,
                  });
                  this.setState({
                    isFormChangedCommunication: false,
                  });
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Server Unavailable",
                text: "The server is currently unavailable. Please try again later.",
                confirmButtonText: "OK",
                showCloseButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
              })
            }
          }).catch((error) => {
            handleApiError(error);
          });
      }
    }
  };
  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  handleFileRead = async (event) => {
    const file = event.target.files[0];
    // const base64 = await this.convertBase64(file);
    event.target.value = "";
    if (file.size > 50000) {
      Swal.fire({
        title: "file size should be less than 50 KB",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      const reader = new FileReader();
      reader.onload = this.onreaderLoad.bind(this);
      reader.readAsBinaryString(file);
    }
  };
  onreaderLoad = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      image: btoa(binaryString),
    });
  };

  updateVendordetail(userId, data) {
    apiService.updateVendordetail(userId, data).then((response) => {}).catch((error) => {
      handleApiError(error);
    });
  }
  fetchData() {
    const storedData = sessionStorage.getItem("master");
    const data = storedData ? JSON.parse(storedData) : {};
    console.log("basicmaster::", data.master);
    if (data.master === true) {
      console.log("indianmaster::");
      this.setState({
        newMasterReg: true,
      });
    }
    let userid = JSON.parse(window.sessionStorage.getItem("jwt")).result
      ?.userId;
    apiService.signupFindByUserId(userid).then((res) => {
      this.setState({ approval: res.data.result?.role });
      this.setState({ companyName: res.data.result?.companyName });
      this.setState({ vendorId: res.data.result?.vendorId });
    }).catch((error) => {
      handleApiError(error);
    });

    let newuser = JSON.parse(
      window.sessionStorage.getItem("newregUser")
    )?.newregUser;
    if (this.props.params.newReg === "newReg") {
      this.setState({
        companyName: JSON.parse(window.sessionStorage.getItem("jwt")).result
          ?.companyName,
      });
      this.setState({
        approval: JSON.parse(window.sessionStorage.getItem("jwt")).result?.role,
      });
    }
    // let userid = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId;
    // apiService.getAllCollection(userid).then((res) => {
    //   this.setState({ companyName: res.data.basicInfo[0].companyName });
    //   if (this.props.params.userId) {
    //     this.setState({ id: res.data.basicInfo[0].id });
    //   }
    // });
    // apiService.signupFindByUserId(userid).then((res) => {
    //   this.setState({ approval: res.data.result?.role });
    //   this.setState({ companyName: res.data.result?.companyName });
    //   this.setState({ vendorId: res.data.result?.vendorId });
    // });
    let finalstatus = "";
    apiService
      .signupFindByUserId(
        JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId
      )
      .then((res) => {
        finalstatus = res.data.result?.finalStatus;
        console.log("finalstatus", finalstatus);
      }).catch((error) => {
        handleApiError(error);
      });
    apiService
      .getAllCollection(
        JSON.parse(window.sessionStorage.getItem("jwt")).result?.userId
      )
      .then((res) => {
        console.log("basicresparamscol::", res.data.basicInfo?.length > 0);
        if (res.data.basicInfo?.length > 0) {
          this.setState({
            basicInfoVendor: true,
          });
        }

        if (res.data.CommunicationDetails?.length > 0) {
          this.setState({
            communicationDetailsInfo: true,
          });
        }
        console.log("basicInfotrue::", this.state.basicInfoVendor);
        if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          finalstatus !== "Approved" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          this.setState({ setStyle: "notEditable" });
        } else if (
          res.data.basicInfo[0]?.submitStatus === "Submitted" &&
          finalstatus === "Approved" &&
          JSON.parse(window.sessionStorage.getItem("jwt")).result.role !==
            "Admin"
        ) {
          this.setState({ setStyle: "notEditable" });
        } else {
          this.setState({ setStyle: "editable" });
        }

        this.setState({
          editStatutory: res.data.Statutory,
        });
        Object.entries(res.data.basicInfo).map(([key, value]) => {
          this.setState({
            previousCompanyName: value.companyName,
            previousAddress: value.Address,
            previousAddress_2:
              value.Address_2 === "null" ? "" : value.Address_2,
            previousCity: value.City,
            previousState: value.state,
            previousCountry_Region_Code: value.Country_Region_Code,
            previousPost_Code: value.Post_Code,
            previousImage: value.image,
          });
          this.setState({
            companyName: value.companyName,
            Address: value.Address,
            Address_2: value.Address_2 === "null" ? "" : value.Address_2,
            City: value.City,
            state: value.state,
            Country_Region_Code: value.Country_Region_Code,
            Post_Code: value.Post_Code,
            image: value.image,
          });
          return null;
        });
        Object.entries(res.data.CommunicationDetails).map(([key, value]) => {
          this.setState({
            commuDetail:
              res.data.CommunicationDetails.length > 0 ? true : false,
          });
          this.setState({
            previousfinanceSpoccontactName: value.financeSpoccontactName,
            previousfinanceSpocdesignation: value.financeSpocdesignation,
            previousfinanceSpocphoneNo: value.financeSpocphoneNo,
            previousfinanceSpocemail: value.financeSpocemail,
            previousoperationSpoccontactName:
              value.operationSpoccontactName === "null"
                ? ""
                : value.operationSpoccontactName,
            previousoperationSpocdesignation:
              value.operationSpocdesignation === "null"
                ? ""
                : value.operationSpocdesignation,
            previousoperationSpocphoneNo:
              value.operationSpocphoneNo === "null"
                ? ""
                : value.operationSpocphoneNo,
            previousoperationSpocemail:
              value.operationSpocemail === "null"
                ? ""
                : value.operationSpocemail,
            previouscollectionSpoccontactName:
              value.collectionSpoccontactName === "null"
                ? ""
                : value.collectionSpoccontactName,
            previouscollectionSpocdesignation:
              value.collectionSpocdesignation === "null"
                ? ""
                : value.collectionSpocdesignation,
            previouscollectionSpocphoneNo:
              value.collectionSpocphoneNo === "null"
                ? ""
                : value.collectionSpocphoneNo,
            previouscollectionSpocemail:
              value.collectionSpocemail === "null"
                ? ""
                : value.collectionSpocemail,
            previousmanagementSpoccontactName:
              value.managementSpoccontactName === "null"
                ? ""
                : value.managementSpoccontactName,
            previousmanagementSpocdesignation:
              value.managementSpocdesignation === "null"
                ? ""
                : value.managementSpocdesignation,
            previousmanagementSpocphoneNo:
              value.managementSpocphoneNo === "null"
                ? ""
                : value.managementSpocphoneNo,
            previousmanagementSpocemail:
              value.managementSpocemail === "null"
                ? ""
                : value.managementSpocemail,
            previouscontactName:
              value.contactName === "null" ? "" : value.contactName,
            previousdesignation:
              value.designation === "null" ? "" : value.designation,
            previousphoneNo: value.phoneNo === "null" ? "" : value.phoneNo,
            previousemail: value.email === "null" ? "" : value.email,
            previousmastervendor_email: value.mastervendor_email,
          });
          this.setState({
            financeSpoccontactName: value.financeSpoccontactName,
            financeSpocdesignation: value.financeSpocdesignation,
            financeSpocphoneNo: value.financeSpocphoneNo,
            financeSpocemail: value.financeSpocemail,
            operationSpoccontactName:
              value.operationSpoccontactName === "null"
                ? ""
                : value.operationSpoccontactName,
            operationSpocdesignation:
              value.operationSpocdesignation === "null"
                ? ""
                : value.operationSpocdesignation,
            operationSpocphoneNo:
              value.operationSpocphoneNo === "null"
                ? ""
                : value.operationSpocphoneNo,
            operationSpocemail:
              value.operationSpocemail === "null"
                ? ""
                : value.operationSpocemail,
            collectionSpoccontactName:
              value.collectionSpoccontactName === "null"
                ? ""
                : value.collectionSpoccontactName,
            collectionSpocdesignation:
              value.collectionSpocdesignation === "null"
                ? ""
                : value.collectionSpocdesignation,
            collectionSpocphoneNo:
              value.collectionSpocphoneNo === "null"
                ? ""
                : value.collectionSpocphoneNo,
            collectionSpocemail:
              value.collectionSpocemail === "null"
                ? ""
                : value.collectionSpocemail,
            managementSpoccontactName:
              value.managementSpoccontactName === "null"
                ? ""
                : value.managementSpoccontactName,
            managementSpocdesignation:
              value.managementSpocdesignation === "null"
                ? ""
                : value.managementSpocdesignation,
            managementSpocphoneNo:
              value.managementSpocphoneNo === "null"
                ? ""
                : value.managementSpocphoneNo,
            managementSpocemail:
              value.managementSpocemail === "null"
                ? ""
                : value.managementSpocemail,
            contactName: value.contactName === "null" ? "" : value.contactName,
            designation: value.designation === "null" ? "" : value.designation,
            phoneNo: value.phoneNo === "null" ? "" : value.phoneNo,
            email: value.email === "null" ? "" : value.email,
            mastervendor_email: value.mastervendor_email,
          });
          return null;
        });
      }).catch((error) => {
        handleApiError(error);
      });
    if (newuser) {
      this.edit = true;
      apiService.getAllCollection(newuser).then((res) => {
        console.log("newUsergetallcollect");
        this.setState({
          editStatutory: res.data.Statutory,
        });
        if (res.data.basicInfo?.length > 0) {
          this.setState({
            basicInfoVendor: true,
          });
        }
        if (res.data.CommunicationDetails?.length > 0) {
          this.setState({
            communicationDetailsInfo: true,
          });
        }
        Object.entries(res.data.basicInfo).map(([key, value]) => {
          this.setState({
            companyName: value.companyName,
            Address: value.Address,
            Address_2: value.Address_2,
            City: value.City,
            state: value.state,
            Country_Region_Code: value.Country_Region_Code,
            Post_Code: value.Post_Code,
            image: value.image,
          });
          return null;
        });
        Object.entries(res.data.CommunicationDetails).map(([key, value]) => {
          this.setState({
            financeSpoccontactName: value.financeSpoccontactName,
            financeSpocdesignation: value.financeSpocdesignation,
            financeSpocphoneNo: value.financeSpocphoneNo,
            financeSpocemail: value.financeSpocemail,
            operationSpoccontactName: value.operationSpoccontactName,
            operationSpocdesignation: value.operationSpocdesignation,
            operationSpocphoneNo: value.operationSpocphoneNo,
            operationSpocemail: value.operationSpocemail,
            collectionSpoccontactName: value.collectionSpoccontactName,
            collectionSpocdesignation: value.collectionSpocdesignation,
            collectionSpocphoneNo: value.collectionSpocphoneNo,
            collectionSpocemail: value.collectionSpocemail,
            managementSpoccontactName: value.managementSpoccontactName,
            managementSpocdesignation: value.managementSpocdesignation,
            managementSpocphoneNo: value.managementSpocphoneNo,
            managementSpocemail: value.managementSpocemail,
            contactName: value.contactName,
            designation: value.designation,
            phoneNo: value.phoneNo,
            email: value.email,
            mastervendor_email: value.mastervendor_email,
          });
          return null;
        });
      }).catch((error) => {
        handleApiError(error);
      });
    }

    console.log("basicInfoVendor::", this.state.basicInfoVendor);
    apiService.getCountry().then((response) => {
      this.setState({ countryData: response.data.data });
    }).catch((error) => {
      handleApiError(error);
    });
    if (this.state.Country_Region_Code && this.state.Post_Code) {
      apiService
        .getStateAndcityByzipcode(
          this.state.Country_Region_Code,
          this.state.Post_Code
        )
        .then((response) => {
          this.setState({ getCityAndState: response.data.postalcodes });
        }).catch((error) => {
          handleApiError(error);
        });
    }
  }
  componentDidMount() {
    console.log("process.env.REACT_APP_API_URL",process.env.REACT_APP_API_URL)
    if (
      JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype ===
      "NewRegistration"
    ) {
      this.setState({ Country_Region_Code: "IN" });
      this.setState({ userType: "NewRegistration" });
    } else {
      this.setState({ Country_Region_Code: "" });
      this.setState({ userType: "" });
    }
    console.log("this.state.image", this.state.image);
    this.fetchData();
  }
  render() {
    const {
      Address,
      Address_2,
      Post_Code,
      contactName,
      companyName,
      AddressError,
      Address_2Error,
      cityError,
      pinCodeError,
      open,
      commu,
    } = this.state;
    let countriesList =
      this.state.countryData?.length > 0 &&
      this.state.countryData?.map((item, i) => {
        return (
          <option className="mb-4" key={i} value={item.code}>
            {item.name}
          </option>
        );
      }, this);
    const {
      financeSpocdesignation,
      financeSpoccontactName,
      financeSpocphoneNo,
      financeSpocemail,
      operationSpoccontactName,
      operationSpocdesignation,
      operationSpocphoneNo,
      operationSpocemail,
      collectionSpoccontactName,
      collectionSpocdesignation,
      collectionSpocphoneNo,
      collectionSpocemail,
      managementSpoccontactName,
      managementSpocdesignation,
      managementSpocphoneNo,
      managementSpocemail,
      designation,
      phoneNo,
      email,
      mastervendor_email,
      financeSpocdesignationError,
      financeSpoccontactNameError,
      financeSpocphoneNoError,
      financeSpocemailError,
      operationSpoccontactNameError,
      operationSpocdesignationError,
      operationSpocphoneNoError,
      operationSpocemailError,
      collectionSpoccontactNameError,
      collectionSpocdesignationError,
      collectionSpocphoneNoError,
      collectionSpocemailError,
      managementSpoccontactNameError,
      managementSpocdesignationError,
      managementSpocphoneNoError,
      managementSpocemailError,
      designationError,
      phoneNoError,
      emailError,
      mastervendor_emailError,
    } = this.state;
    return (
      <>
        <div className="vendor-det">
          <Navbar1 />
          <div className="container-fluid ribbonMain">
            <div
              className="ribbon basic-information-label left"
              onClick={this.togglebutton}
            >
              {" "}
              <span className={open ? "dotActive" : "dotInActive"}></span>
              <label className="labelName">Basic information</label>
            </div>
            <div
              className="ribbon basic-information-label right"
              onClick={this.togglebuttonCommu}
            >
              <span className={commu ? "dotActive" : "dotInActive"}></span>
              <label className="labelName">Communication details</label>
            </div>
          </div>
          <div className="container">
            <div className="mx-auto mt-5">
              {open && (
                <div className="container-fluid">
                  <MDBTypography tag="h5" className="mb-0 info">
                  Basic Information
                  </MDBTypography>
                  <br />
                  <MDBRow>
                    <MDBCol md="12" className="mb-12 g">
                      <MDBCard className="mb-12">
                        <div className="container-fluid">
                          <MDBRow>
                            <MDBCol md="8" className="mb-4">
                              <MDBCard className="mb-4 basic">
                                <MDBCardBody>
                                  <form className={this.state.setStyle}>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="companyName">
                                            Company Name*
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            className="mb-4 VendorInputCompanyName"
                                            name="companyName"
                                            id="companyName"
                                            onChange={this.formValChange}
                                            value={companyName}
                                            readOnly={true}
                                          />
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          {" "}
                                          <label htmlFor="Address">
                                          Address Line-1*
                                          </label>
                                        </div>
                                        <div>
                                          <textarea
                                            type="text"
                                            className="addressLine"
                                            name="Address"
                                            id="Address"
                                            onChange={this.formValChange}
                                            value={Address}
                                            disabled={
                                              this.state.setStyle ===
                                              "notEditable"
                                                ? true
                                                : false
                                            }
                                          ></textarea>
                                          {AddressError && (
                                            <p className="text text-danger small">
                                              {AddressError}
                                            </p>
                                          )}
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                    <div>
                                      <label htmlFor="Address_2">
                                      Address Line-2
                                      </label>
                                    </div>
                                    <div>
                                      <textarea
                                        type="text"
                                        className="addressLine"
                                        name="Address_2"
                                        id="Address_2"
                                        onChange={this.formValChange}
                                        value={Address_2}
                                        disabled={
                                          this.state.setStyle === "notEditable"
                                            ? true
                                            : false
                                        }
                                      ></textarea>
                                      {Address_2Error && (
                                        <p className="text text-danger small">
                                          {Address_2Error}
                                        </p>
                                      )}
                                    </div>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="Country_Region_Code">
                                            Country*
                                          </label>
                                        </div>
                                        <div>
                                          {this.state.newMasterReg ? (
                                            <input
                                              className="mb-4 VendorInput"
                                              name="Country_Region_Code"
                                              id="Country_Region_Code"
                                              value="India"
                                              readOnly
                                            />
                                          ) : (
                                            <select
                                              className="mb-4 VendorInput"
                                              name="Country_Region_Code"
                                              id="Country_Region_Code"
                                              value={
                                                this.state.Country_Region_Code
                                              }
                                              onChange={this.handleChange}
                                              disabled={
                                                this.state.setStyle ===
                                                  "notEditable" ||
                                                this.state.userType ===
                                                  "NewRegistration"
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {countriesList}
                                            </select>
                                          )}
                                        </div>
                                      </MDBCol>
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="Post_Code">
                                            Pincode/Zipcode*
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            className="mb-4 VendorInput"
                                            name="Post_Code"
                                            id="Post_Code"
                                            value={Post_Code}
                                            onMouseLeave={this.mouseOut}
                                            onKeyPress={this.handleKeyPress}
                                            onClick={this.handleKeyPress}
                                            onChange={this.mouseEnter}
                                            onBlur={this.onBlur}
                                          />
                                          <Tooltip
                                            class="tooltipstyle"
                                            title={
                                              "Please fill the exact code relevant to your country and click outside, State & City will auto populate"
                                            }
                                            placement="right"
                                          >
                                            <div
                                              style={{
                                                position: "absolute",
                                                right: "5%",
                                                top: "63%",
                                              }}
                                            >
                                              <InfoIcon />
                                            </div>
                                          </Tooltip>
                                          {pinCodeError && (
                                            <p className="text text-danger small">
                                              {pinCodeError}
                                            </p>
                                          )}
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mb-4">
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="state">State*</label>
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            className="mb-4 VendorInput"
                                            name="state"
                                            id="state"
                                            onChange={this.formValChange}
                                            value={this.state.state}
                                          />
                                        </div>
                                      </MDBCol>
                                      <MDBCol>
                                        <div>
                                          <label htmlFor="City">City*</label>
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            className="mb-4 VendorInput"
                                            name="City"
                                            id="City"
                                            onChange={this.formValChange}
                                            value={this.state.City}
                                          />
                                          {cityError && (
                                            <p className="text text-danger small">
                                              {cityError}
                                            </p>
                                          )}
                                        </div>
                                      </MDBCol>
                                    </MDBRow>
                                  </form>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBCol>
                            <MDBCol md="4" className="mb-4">
                              <MDBCard className="mb-4 imageUpload">
                                <MDBCol>
                                  {this.state.image !== "" &&
                                  this.state.image !== undefined &&
                                  this.state.image !== null ? (
                                    <div>
                                      <img
                                        className="camera-img"
                                        src={
                                          "data:image/png;base64," +
                                          `${this.state.image}`
                                        }
                                        alt=""
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      {" "}
                                      <img
                                        className="camera-img"
                                        alt=""
                                        src={uploa}
                                      />
                                    </div>
                                  )}
                                  {/* <img className="camera-img" alt="" src={uploa} /> */}
                                </MDBCol>
                                <input
                                  type="file"
                                  label="Image"
                                  name="image"
                                  accept=".jpeg, .png, .jpg"
                                  onChange={(e) => this.handleFileRead(e)}
                                  id="image"
                                  value={this.base64}
                                  className="mb-4 VendorInput"
                                  disabled={
                                    this.state.setStyle === "notEditable"
                                      ? true
                                      : false
                                  }
                                />
                                <MDBCardHeader className="py-3">
                                  <MDBTypography tag="h5" className="mb-0">
                                    Company's Upload logo
                                  </MDBTypography>
                                </MDBCardHeader>
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>
                          <div className="d-flex justify-content-center">
                            <MDBRow className="mb-4">
                              <div className={this.state.setStyle}>
                                <button
                                  type="button"
                                  onClick={this.cancelBasicInfo}
                                  className="btn basicbtn btn-md m-3"
                                >
                                  Cancel
                                </button>
                                {this.props.params.userId &&
                                JSON.parse(window.sessionStorage.getItem("jwt"))
                                  .result?.role === "Admin" ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={this.updatehandleSubmit}
                                      className="btn basicbtn btn-md m-3"
                                    >
                                      {" "}
                                      Update
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          this.handleSubmit();
                                        }}
                                        className="btn basicbtn btn-md m-3"
                                      >
                                        Save
                                      </button>
                                    </>
                                  </>
                                )}

                                <button
                                  type="button"
                                  onClick={this.togglebuttonCommu}
                                  className="btn basicbtn btn-md m-3"
                                >
                                  Next
                                </button>
                              </div>
                            </MDBRow>
                          </div>
                        </div>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
              {commu && (
                <div className="container-fluid">
                  <MDBTypography tag="h5" className="mb-0 info">
                    Communication Details*
                  </MDBTypography>
                  <br />
                  <MDBRow>
                    <MDBCol md="12" className="mb-12">
                      <MDBCard className="mb-12">
                        <div className="container-fluid">
                          <form>
                            <form className={this.state.setStyle}>
                              <label className="fieldHeader">
                                Finance Spoc
                                <span className="mandatoryField">*</span>
                              </label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="financeSpoccontactName"
                                    id="financeSpoccontactName"
                                    onChange={this.formValChangeCommunication}
                                    value={financeSpoccontactName}
                                  />
                                  {this.state.fieldErrors
                                    .financeSpoccontactNameError && (
                                    <p className="text text-danger small">
                                      {
                                        this.state.fieldErrors
                                          .financeSpoccontactNameError
                                      }
                                    </p>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="financeSpocdesignation"
                                    id="financeSpocdesignation"
                                    onChange={this.formValChangeCommunication}
                                    value={financeSpocdesignation}
                                  />
                                  {this.state.fieldErrors
                                    .financeSpocdesignationError && (
                                    <p className="text text-danger small">
                                      {
                                        this.state.fieldErrors
                                          .financeSpocdesignationError
                                      }
                                    </p>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <div>
                                    <input
                                      type="number"
                                      className="mb-4 VendorInput"
                                      name="financeSpocphoneNo"
                                      id="financeSpocphoneNo"
                                      onChange={this.formValChangeCommunication}
                                      value={financeSpocphoneNo}
                                    />
                                    <Tooltip
                                      title={this.state.phoneNumber}
                                      placement="right"
                                    >
                                      <span
                                        style={{
                                          position: "absolute",
                                          marginTop: "7px",
                                          marginLeft: "-30px",
                                        }}
                                      >
                                        <InfoIcon />
                                      </span>
                                    </Tooltip>
                                    {this.state.fieldErrors
                                      .financeSpocphoneNoError && (
                                      <span style={{ color: "red" }}>
                                        {
                                          this.state.fieldErrors
                                            .financeSpocphoneNoError
                                        }
                                      </span>
                                    )}
                                  </div>
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="financeSpocemail"
                                    id="financeSpocemail"
                                    onChange={this.formValChangeCommunication}
                                    value={financeSpocemail}
                                  />
                                  {this.state.fieldErrors
                                    .financeSpocemailError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .financeSpocemailError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                              </MDBRow>
                              <label className="fieldHeader">
                                Operation Spoc
                              </label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="operationSpoccontactName"
                                    id="operationSpoccontactName"
                                    onChange={this.formValChangeCommunication}
                                    value={operationSpoccontactName}
                                  />
                                  {this.state.fieldErrors
                                    .operationSpoccontactNameError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .operationSpoccontactNameError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="operationSpocdesignation"
                                    id="operationSpocdesignation"
                                    onChange={this.formValChangeCommunication}
                                    value={operationSpocdesignation}
                                  />
                                  {this.state.fieldErrors
                                    .operationSpocdesignationError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .operationSpocdesignationError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="number"
                                    className="mb-4 VendorInput"
                                    name="operationSpocphoneNo"
                                    id="operationSpocphoneNo"
                                    onChange={this.formValChangeCommunication}
                                    value={operationSpocphoneNo}
                                  />

                                  <Tooltip
                                    title={this.state.phoneNumber}
                                    placement="right"
                                  >
                                    <span
                                      style={{
                                        position: "absolute",
                                        marginTop: "7px",
                                        marginLeft: "-30px",
                                      }}
                                    >
                                      <InfoIcon />
                                    </span>
                                  </Tooltip>
                                  {this.state.fieldErrors
                                    .operationSpocphoneNoError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .operationSpocphoneNoError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="operationSpocemail"
                                    id="operationSpocemail"
                                    onChange={this.formValChangeCommunication}
                                    value={operationSpocemail}
                                  />
                                  {this.state.fieldErrors
                                    .operationSpocemailError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .operationSpocemailError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                              </MDBRow>
                              <label className="fieldHeader">
                                Collection Spoc
                              </label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="collectionSpoccontactName"
                                    id="collectionSpoccontactName"
                                    onChange={this.formValChangeCommunication}
                                    value={collectionSpoccontactName}
                                  />
                                  {this.state.fieldErrors
                                    .collectionSpoccontactNameError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .collectionSpoccontactNameError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="collectionSpocdesignation"
                                    id="collectionSpocdesignation"
                                    onChange={this.formValChangeCommunication}
                                    value={collectionSpocdesignation}
                                  />
                                  {this.state.fieldErrors
                                    .collectionSpocdesignationError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .collectionSpocdesignationError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="number"
                                    className="mb-4 VendorInput"
                                    name="collectionSpocphoneNo"
                                    id="collectionSpocphoneNo"
                                    onChange={this.formValChangeCommunication}
                                    value={collectionSpocphoneNo}
                                  />

                                  <Tooltip
                                    title={this.state.phoneNumber}
                                    placement="right"
                                  >
                                    <span
                                      style={{
                                        position: "absolute",
                                        marginTop: "7px",
                                        marginLeft: "-30px",
                                      }}
                                    >
                                      <InfoIcon />
                                    </span>
                                  </Tooltip>
                                  {this.state.fieldErrors
                                    .collectionSpocphoneNoError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .collectionSpocphoneNoError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="collectionSpocemail"
                                    id="collectionSpocemail"
                                    onChange={this.formValChangeCommunication}
                                    value={collectionSpocemail}
                                  />
                                  {this.state.fieldErrors
                                    .collectionSpocemailError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .collectionSpocemailError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                              </MDBRow>
                              <label className="fieldHeader">
                                Management Spoc
                                <span className="mandatoryField">*</span>
                              </label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="managementSpoccontactName"
                                    id="managementSpoccontactName"
                                    onChange={this.formValChangeCommunication}
                                    value={managementSpoccontactName}
                                  />
                                  {this.state.fieldErrors
                                    .managementSpoccontactNameError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .managementSpoccontactNameError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="managementSpocdesignation"
                                    id="managementSpocdesignation"
                                    onChange={this.formValChangeCommunication}
                                    value={managementSpocdesignation}
                                  />
                                  {this.state.fieldErrors
                                    .managementSpocdesignationError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .managementSpocdesignationError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="number"
                                    className="mb-4 VendorInput"
                                    name="managementSpocphoneNo"
                                    id="managementSpocphoneNo"
                                    onChange={this.formValChangeCommunication}
                                    value={managementSpocphoneNo}
                                  />

                                  <Tooltip
                                    title={this.state.phoneNumber}
                                    placement="right"
                                  >
                                    <span
                                      style={{
                                        position: "absolute",
                                        marginTop: "7px",
                                        marginLeft: "-30px",
                                      }}
                                    >
                                      <InfoIcon />
                                    </span>
                                  </Tooltip>
                                  {this.state.fieldErrors
                                    .managementSpocphoneNoError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .managementSpocphoneNoError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="managementSpocemail"
                                    id="managementSpocemail"
                                    onChange={this.formValChangeCommunication}
                                    value={managementSpocemail}
                                  />
                                  {this.state.fieldErrors
                                    .managementSpocemailError && (
                                    <span style={{ color: "red" }}>
                                      {
                                        this.state.fieldErrors
                                          .managementSpocemailError
                                      }
                                    </span>
                                  )}
                                </MDBCol>
                              </MDBRow>
                              <label className="fieldHeader">Others</label>
                              <MDBRow className="mb-4">
                                <MDBCol>
                                  <label>Contact name</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="contactName"
                                    id="contactName"
                                    onChange={this.formValChangeCommunication}
                                    value={contactName}
                                  />
                                  {this.state.fieldErrors.contactNameError && (
                                    <span style={{ color: "red" }}>
                                      {this.state.fieldErrors.contactNameError}
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Designation</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="designation"
                                    id="designation"
                                    onChange={this.formValChangeCommunication}
                                    value={designation}
                                  />
                                  {this.state.fieldErrors.designationError && (
                                    <span style={{ color: "red" }}>
                                      {this.state.fieldErrors.designationError}
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Phone No</label>
                                  <input
                                    type="number"
                                    className="mb-4 VendorInput"
                                    name="phoneNo"
                                    id="phoneNo"
                                    onChange={this.formValChangeCommunication}
                                    value={phoneNo}
                                  />

                                  <Tooltip
                                    title={this.state.phoneNumber}
                                    placement="right"
                                  >
                                    <span
                                      style={{
                                        position: "absolute",
                                        marginTop: "7px",
                                        marginLeft: "-30px",
                                      }}
                                    >
                                      <InfoIcon />
                                    </span>
                                  </Tooltip>
                                  {this.state.fieldErrors.phoneNoError && (
                                    <span style={{ color: "red" }}>
                                      {this.state.fieldErrors.phoneNoError}
                                    </span>
                                  )}
                                </MDBCol>
                                <MDBCol>
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    className="mb-4 VendorInput"
                                    name="email"
                                    id="email"
                                    onChange={this.formValChangeCommunication}
                                    value={email}
                                  />
                                  {this.state.fieldErrors.emailError && (
                                    <span style={{ color: "red" }}>
                                      {this.state.fieldErrors.emailError}
                                    </span>
                                  )}
                                </MDBCol>
                              </MDBRow>
                              {this.state.approval === "Admin" ||
                              this.state.userType === "NewRegistration" ? (
                                ""
                              ) : (
                                <MDBRow>
                                  <MDBCol>
                                    <label className="fieldHeader">
                                      Master vendor email id
                                      <span className="mandatoryField">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="mb-4 VendorInput"
                                      name="mastervendor_email"
                                      id="mastervendor_email"
                                      onChange={this.formValChangeCommunication}
                                      value={mastervendor_email}
                                    />
                                    {this.state.fieldErrors
                                      .mastervendor_emailError && (
                                      <span style={{ color: "red" }}>
                                        {
                                          this.state.fieldErrors
                                            .mastervendor_emailError
                                        }
                                      </span>
                                    )}
                                  </MDBCol>
                                  <MDBCol></MDBCol>
                                  <MDBCol></MDBCol>
                                </MDBRow>
                              )}
                              <div className="d-flex justify-content-center">
                                <MDBRow className="mb-4">
                                  <div className={this.state.setStyle}>
                                    <button
                                      type="button"
                                      onClick={this.cancelCommunicationInfo}
                                      className="btn basicbtn btn-md m-3"
                                    >
                                      Cancel
                                    </button>
                                    {this.props.params.userId &&
                                    JSON.parse(
                                      window.sessionStorage.getItem("jwt")
                                    ).result?.role === "Admin" &&
                                    JSON.parse(
                                      window.sessionStorage.getItem("jwt")
                                    ).result?.usertype !== "NewRegistration" ? (
                                      <>
                                        <button
                                          type="button"
                                          onClick={
                                            this.updatehandleSubmitComDetail
                                          }
                                          className="btn basicbtn btn-md m-3"
                                        >
                                          Update
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              this.handleSubmitComDetail();
                                            }}
                                            className="btn basicbtn btn-md m-3"
                                          >
                                            Save
                                          </button>
                                        </>
                                      </>
                                    )}
                                    <button
                                      type="button"
                                      onClick={this.next}
                                      className="btn basicbtn btn-md m-3"
                                    >
                                      Next
                                    </button>
                                  </div>
                                </MDBRow>
                              </div>
                            </form>
                          </form>
                        </div>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Basic);
