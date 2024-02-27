import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TablePagination from "@mui/material/TablePagination";
import { createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import VendorPortalHeader from "../common/MasterVendorHeader";
import VendorPortSidemenu from "../common/MasterVendorSidemenu";
import "../css/userCreation.css";
import apiService from "../services/api.service";

function UserCreation() {
  const numberValidation = /^-?(0|[1-9]\d*)?$/;
  const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const [password, setPassword] = useState(null);
  const [getAllUser, setgetAllUser] = useState(null);
  const [subUserId, setsubUserId] = useState(null);

  const [Name, setName] = useState();
  const [designation, setdesignation] = useState();
  const [Department, setDepartment] = useState();
  const [emailId, setemailId] = useState();
  const [mobileNo, setmobileNo] = useState();
  const [loginId, setloginId] = useState();
  const [password, setpassword] = useState();
  const [roles, setroles] = useState();
  const [userId, setuserId] = useState();
  const [usernameErr, setuserNameErr] = useState();
  const [designationErr, setdesignationErr] = useState();
  const [departmentErr, setdepartmentErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [phoneErr, setPhoneNoErr] = useState();
  const [roleErr, setroleErr] = useState();

  const [modalShow, setModalShow] = useState(false);
  const [editmodalShow, setEditModalShow] = useState(false);
  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });

  const validateuserName = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setuserNameErr("Username is required");
    } else {
      setuserNameErr("");
      setName(e.target.value);
    }
  };

  const validateDesignation = (e) => {
    setdesignation(e.target.value);
    if (e.target.value.length === 0) {
      setdesignationErr("Designation is required");
    } else {
      setdesignationErr("");
      setdesignation(e.target.value);
    }
  };

  const validateDepartment = (e) => {
    setDepartment(e.target.value);
    if (e.target.value.length === 0) {
      setdepartmentErr("Department is required");
    } else {
      setdepartmentErr("");
      setDepartment(e.target.value);
    }
  };

  const validateEmailId = (e) => {
    setemailId(e.target.value);
    if (e.target.value.length === 0) {
      setEmailErr("Email is required");
    } else if (!emailValidation.test(e.target.value)) {
      setEmailErr("Email is invalid");
    } else {
      setEmailErr("");
      setemailId(e.target.value);
    }
  };

  const validateMobileNo = (e) => {
    setmobileNo(e.target.value);
    if (e.target.value.length === 0) {
      setPhoneNoErr("Phone number is required");
    } else if (
      !numberValidation.test(e.target.value) ||
      e.target.value.length !== 10
    ) {
      setPhoneNoErr("Phone number is invalid");
    } else {
      setPhoneNoErr("");
      setmobileNo(e.target.value);
    }
  };

  const validateRole = (e) => {
    setroles(e.target.value);
    if (e.target.value.length === 0) {
      setroleErr("Roles is required");
    } else {
      setroleErr("");
      setroles(e.target.value);
    }
  };

  const validateLoginId = (e) => {
    setloginId(e.target.value);
  };

  const validatePassword = (e) => {
    setpassword(e.target.value);
  };

  function editMasterVendor(id) {
    const user = {
      SubUserId: id || undefined,
    };
    setEditModalShow(true);
    setsubUserId(user);
    apiService.getMasterVendorSubUserById(user).then((response) => {
      setName(response.data.result.Name);
      setdesignation(response.data.result.designation);
      setDepartment(response.data.result.Department);
      setemailId(response.data.result.emailId);
      setmobileNo(response.data.result.mobileNo);
      setloginId(response.data.result.loginId);
      setpassword(response.data.result.password);
      setroles(response.data.result.roles);
    });
  }
  const UpdateMasterVendor = (e) => {
    e.preventDefault();

    const userUpdate = {
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
      Name: Name,
      designation: designation,
      Department: Department,
      emailId: emailId,
      mobileNo: mobileNo,
      roles: roles,
    };

    const user = {
      SubUserId: subUserId.SubUserId,
      Name: Name,
      designation: designation,
      Department: Department,
      emailId: emailId,
      mobileNo: mobileNo,
      loginId: loginId,
      password: password,
      roles: roles,
    };


    apiService.UpdateMasterSubUserById(user).then((res) => {
      if (res) {
        apiService.getMasterVendorById(userUpdate).then((res) => {
          const modifiedUsers = res.data.result?.map((user) => {
            return {
              ...user,
              password: "*****",
            };
          });
          setgetAllUser(modifiedUsers);
          setModalShow(false);
        });
        Swal.fire({
          title: "Data Updated",
          icon: "success",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
        if(result.isConfirmed) {
          setEditModalShow(false)

        }
        });
      } else {
        Swal.fire({
          title: "Error While Fetching",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    })
      
    
  };
  const saveMasterVendor = (e) => {
 
    console.log("Name--->", Name);
    if (Name?.length === 0) {
      setuserNameErr("Username is required");
    }
    if (designation?.length === 0) {
      setdesignationErr("Designation is required");
    }
    if (Department?.length === 0) {
      setdepartmentErr("Department is required");
    }
    if (emailId?.length === 0) {
      setEmailErr("Email is required");
    }
    if (mobileNo?.length === 0) {
      setPhoneNoErr("Phone number is invalid");
    }
    if (roles?.length === 0) {
      setroleErr("Roles is required");
    }
    if (Name && designation && Department && emailId && mobileNo && roles) {
      e.preventDefault();
      const user = {
        userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
        Name: Name,
        designation: designation,
        Department: Department,
        emailId: emailId,
        mobileNo: mobileNo,
        roles: roles,
      };
      apiService.saveMasterVendor(user).then((response) => {
        apiService.getMasterVendorById(user).then((res) => {
          const modifiedUsers = res.data.result?.map((user) => {
            return {
              ...user,
              password: "*****",
            };
          });
          setgetAllUser(modifiedUsers);
          setModalShow(false);
        });
        
      });
    } else {
      Swal.fire({
        title: "Please fill the mandatory fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const CustomToastWithLink = (users) => <div>Rejected users {users}</div>;
  const onMove = (id) => {
    navigate(`/basic/${id}`);
  };
  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem("jwt")).result?.usertype === 'masterData') {
      sessionStorage.removeItem("UserFromMasterData");
      let item = JSON.parse(window.sessionStorage.getItem("jwt"));
      item.result.userId = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId2
      item.result.userId2 = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
      delete item.result.userId2;
      delete item.result.usertype;
      console.log("masterData------------>>>", item.result)
      sessionStorage.setItem("jwt", JSON.stringify(item));
      navigate("/userCreation");
    }
    if (JSON.parse(window.sessionStorage.getItem("jwt")).result.usertype === 'NewRegistration') {
      let item = JSON.parse(window.sessionStorage.getItem("jwt"));
      item.result.userId = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId2
      item.result.userId2 = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
      delete item.result.userId2;
      delete item.result.usertype;
      delete item.result.Ticket_ID2;
      console.log("new user response------------>>>", item.result)
      sessionStorage.setItem("jwt", JSON.stringify(item));
    }
    
    const user = {
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    };
    apiService.getMasterVendorById(user).then((res) => {
      const modifiedUsers = res.data.result?.map((user) => {
        return {
          ...user,
          password: "*****",
        };
      });
      setgetAllUser(modifiedUsers);
    });
    let rejUsers = [];
    const fetchData = async () => {
      await apiService
        .signupFindSubUserList(
          JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        )
        .then((res) => {
          rejUsers = res.data.result;
        });

      if (rejUsers.length > 0) {
        await apiService.AllRejectVendorList().then((res) => {
          let arr = res.data.result.filter(function (e) {
            return rejUsers.find((item) => item.userId === e.userId);
          });
          if (arr) {
            arr.forEach((item) => {
              toast.warn("Rejected " + item.userId, {
                onClick: () => {
                  onMove(item.userId);
                },
                autoClose: false,
                position: "top-right",
              });
            });
          }
        });
      }
    };
    fetchData();
  }, []);

  const deleteRecord = (id) => {
    Swal.fire({
      title: "Are You sure You want to delete?",
      icon: "warning",
      confirmButtonText: "Ok",
      cancelButtonText:'Cancel',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((ClearData) => {
      if(ClearData.isConfirmed){
        apiService.deleteMasterVendorSubUserById(id).then((res) => {
          const user = {
            userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
          }; 
          apiService.getMasterVendorById(user).then((res) => {
            const modifiedUsers = res.data.result?.map((user) => {
              return {
                ...user,
                password: "*****",
              };
            });
            setgetAllUser(modifiedUsers);
          });
        });
      }
      
    });
  };
  // const toastInfo = () => toast.info('Clue Mediator - The way to write your code');
  // const toastSuccess = () => toast.success('Clue Mediator - The way to write your code');
  // const toastWarn = () => toast.warn('Clue Mediator - The way to write your code');
  // const toastError = () => toast.error('Clue Mediator - The way to write your code');
  // const toastDark = () => toast.dark('Clue Mediator - The way to write your code');
  
  const handleAddClick = (e) =>{
    setName("")
    setdesignation("")
    setDepartment("")
    setemailId("")
    setmobileNo("")
    setroles("")
    setModalShow(true)
  }
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: "#f3f4f7" }}>
        <CssBaseline />
        <VendorPortalHeader />
        <Box sx={{ display: "flex" }}>
          <VendorPortSidemenu />
          <Box sx={{ mt: 2, width: "100%" }}>
            <Container>
              <div className="row p-3">
                <div className="col-lg-10">
                  <h2 className="masterTitle">MULTIPLE SUB USER CREATION</h2>
                </div>
                <div className="col-sm-2">
                  <Button
                    className="add_vendor"
                    variant="primary"
                    onClick={(e) => handleAddClick(e)}
                  >
                    <AddIcon sx={{ color: "black" }} /> Add
                  </Button>
                  <Modal
                    dialogClassName="custom-modal"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Add User Detail
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                      <Container>
                        <Row>
                          <Col xs={12} md={6}>
                            <input
                              type="text"
                              className="swal2-input"
                              name="Name"
                              value={Name}
                              onChange={(e) => validateuserName(e)}
                              placeholder="Username"
                            />
                            <span className="formError">{usernameErr}</span>
                          </Col>
                          <Col xs={12} md={6}>
                            <input
                              type="text"
                              id="designation"
                              className="swal2-input"
                              name="designation"
                              value={designation}
                              onChange={(e) => validateDesignation(e)}
                              placeholder="Designation"
                            />
                            <span className="formError">{designationErr}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={6}>
                            <input
                              type="text"
                              id="department"
                              className="swal2-input"
                              name="Department"
                              value={Department}
                              onChange={(e) => validateDepartment(e)}
                              placeholder="department"
                            />
                            <span className="formError">{departmentErr}</span>
                          </Col>
                          <Col xs={12} md={6}>
                            <input
                              type="text"
                              id="emailId"
                              className="swal2-input"
                              name="emailId"
                              value={emailId}
                              onChange={(e) => validateEmailId(e)}
                              placeholder="Email Id"
                            />
                            <span className="formError">{emailErr}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={6}>
                            <input
                              type="text"
                              id="MobNo"
                              className="swal2-input"
                              name="mobileNo"
                              value={mobileNo}
                              onChange={(e) => validateMobileNo(e)}
                              placeholder="mobile No"
                            />
                            <span className="formError">{phoneErr}</span>
                          </Col>
                          <Col xs={12} md={6}>
                            <select
                              id="roles"
                              className="swal2-input"
                              name="roles"
                              value={roles}
                              onChange={(e) => validateRole(e)}
                            >
                              <option value="">Select a role</option>
                              <option value="financial">Financial</option>
                              <option value="vendor">Other</option>
                            </select>
                            <span className="formError">{roleErr}</span>
                          </Col>
                        </Row>
                      </Container>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="popupSave col-md-12"
                        onClick={saveMasterVendor}
                      >
                        save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="App"></div>
              </div>
              <Box sx={{ mt: 2, height: 350, width: "100%" }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="userHead">Action</TableCell>
                        <TableCell className="userHead" align="center">
                          Name
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          Designation
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          Department
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          Email Id
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          Mob No
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          Login Id
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          Password
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          Role
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {getAllUser
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row) => (
                        <TableBody>
                          <TableRow key={row.SubUserId}>
                            <TableCell component="th" scope="row">
                              <EditIcon
                                onClick={() => editMasterVendor(row.SubUserId)}
                                sx={{ color: "black" }}
                              />
                              <DeleteIcon
                                onClick={() => deleteRecord(row.id)}
                                sx={{ color: "black" }}
                              />
                              <Modal
                                dialogClassName="custom-modal"
                                show={editmodalShow}
                                onHide={() => setEditModalShow(false)}
                                aria-labelledby="contained-modal-title-vcenter"
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                    Edit User Detail
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="show-grid">
                                  <Container>
                                    <Row>
                                      <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          className="swal2-input"
                                          name="Name"
                                          value={Name}
                                          onChange={(e) => validateuserName(e)}
                                          placeholder="Username"
                                        />
                                      </Col>
                                      <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          id="designation"
                                          className="swal2-input"
                                          name="designation"
                                          value={designation}
                                          onChange={(e) =>
                                            validateDesignation(e)
                                          }
                                          placeholder="Designation"
                                        />
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          id="department"
                                          className="swal2-input"
                                          name="Department"
                                          value={Department}
                                          onChange={(e) =>
                                            validateDepartment(e)
                                          }
                                          placeholder="department"
                                        />
                                      </Col>
                                      <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          id="emailId"
                                          className="swal2-input"
                                          name="emailId"
                                          value={emailId}
                                          onChange={(e) => validateEmailId(e)}
                                          placeholder="Email Id"
                                        />
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          id="MobNo"
                                          className="swal2-input"
                                          name="mobileNo"
                                          value={mobileNo}
                                          onChange={(e) => validateMobileNo(e)}
                                          placeholder="mobile No"
                                        />
                                      </Col>
                                      <Col xs={12} md={6}>
                                        <select
                                          id="roles"
                                          className="swal2-input"
                                          name="roles"
                                          value={roles}
                                          onChange={(e) => validateRole(e)}
                                        >
                                          <option value="">
                                            Select a role
                                          </option>
                                          <option value="financial">
                                            Financial
                                          </option>
                                          <option value="vendor">Other</option>
                                        </select>
                                      </Col>
                                      {/* <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          id="LoginId"
                                          className="swal2-input"
                                          name="loginId"
                                          value={loginId}
                                          onChange={(e) => validateLoginId(e)}
                                          placeholder="LoginId"
                                        />
                                      </Col> */}
                                    </Row>
                                    <Row>
                                      {/* <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          id="Password"
                                          className="swal2-input"
                                          name="password"
                                          value={password}
                                          onChange={(e) => validatePassword(e)}
                                          placeholder="Password"
                                        />
                                      </Col> */}
                                      {/* <Col xs={12} md={6}>
                                        <select
                                          id="roles"
                                          className="swal2-input"
                                          name="roles"
                                          value={roles}
                                          onChange={(e) => validateRole(e)}
                                        >
                                          <option value="">
                                            Select a role
                                          </option>
                                          <option value="financial">
                                            Financial
                                          </option>
                                          <option value="vendor">Other</option>
                                        </select>
                                      </Col> */}
                                    </Row>
                                  </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    className="popupSave col-md-12"
                                    onClick={UpdateMasterVendor}
                                  >
                                    Update
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </TableCell>
                            <TableCell align="center">{row.Name}</TableCell>
                            <TableCell align="center">
                              {row.designation}
                            </TableCell>
                            <TableCell align="center">
                              {row.Department}
                            </TableCell>
                            <TableCell align="center">{row.emailId}</TableCell>
                            <TableCell align="center">{row.mobileNo}</TableCell>
                            <TableCell align="center">{row.loginId}</TableCell>
                            <TableCell align="center">{row.password}</TableCell>
                            <TableCell align="center">{row.roles}</TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                  </Table>
                </TableContainer>
                <ToastContainer />

                {getAllUser != null ? (
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={getAllUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                ) : null}
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default UserCreation;
