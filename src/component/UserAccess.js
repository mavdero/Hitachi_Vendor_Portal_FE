import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import VendorPortalHeader from "../common/MasterVendorHeader";
import VendorPortSidemenu from "../common/MasterVendorSidemenu";
import Button from "@mui/material/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import "../css/userCreation.css";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useParams } from "react-router-dom";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function createData(Name) {
  return {
    Name,
  };
}
function UserAccess() {
  const params = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [getAllUser, setgetAllUser] = useState(null);
  const [getAllvendorcode, setgetAllvendorcode] = useState(null);
  const [subUserId, setsubUserId] = useState(null);
  const [values, setValues] = useState({
    Name: "",
    city_vendorCode_Pincode: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [Edit, setEdit] = useState({});
  const [editmodalShow, setEditModalShow] = useState(false);
  const [vcode, setVcode] = useState();
  const [vcityPincode, setvcityPincode] = useState();

  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });
  const handleChange = (name, value, id) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [name]: value,
      },
    }));
  };

  function editMasterVendor(id, Name) {
    setEdit((prevEdit) => ({
      ...prevEdit,
      [id]: true,
    }));
  }

  let vendorCode = vcode;

  function UpdateMasterVendor(id, Name, city_vendorCode_Pincode) {
    console.log("city:",city_vendorCode_Pincode);
    const user = {
      SubUserId: id || undefined,
      city_vendorCode_Pincode: city_vendorCode_Pincode || undefined,
      vendorCode: vendorCode || undefined,
    };
    console.log("user------------->>>>", user)
    apiService.UpdateMasterVendorSubUserById(user).then((response) => {
      Swal.fire({
        title: "Data saved",
        icon: "success",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,

      }).then((result) => {
        if (result.isConfirmed) {
          apiService.getAllVendorSubUser().then((res) => {
            console.log("res.data.result-------------city--------",res.data.result)
            setEdit(true);
            setvcityPincode(res.data.result)
            console.log("vendorCode::",res.data.result);
          });
        }
      
      });
   
      // apiService.getAllMasterVendorSubUser().then((res) => {
      //   setEdit(true);
      //   setgetAllUser(res.data.result);
      // });
      // apiService.getAllVendorSubUser().then((res) => {
      //   setvcityPincode(res.data.result)
      // });
    });
  }
  useEffect(() => {
    setgetAllvendorcode([]);
    const user = {
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId,
    };
    apiService.getMasterVendorById(user).then((res) => {
      setgetAllUser(res.data.result);
    });
    apiService.getErpVendor_APIByP_A_N_No(JSON.parse(window.sessionStorage.getItem("jwt")).result.Ticket_ID).then((vendorCode) => {
      if (
        vendorCode.data.message ===
          "No record found for the given Ticket_ID" ||
        vendorCode.data.message === undefined ||
        vendorCode.data.message === null ||
        vendorCode.data.message === ""
      ) {
        setgetAllvendorcode([]);
      } else if (vendorCode.data.message == "success") {
        setgetAllvendorcode(vendorCode.data.response);
      }
        
    });
   
    apiService.getAllVendorSubUser().then((res) => {
      setvcityPincode(res.data.result)
    });
  }, []);
  {console.log("test--------->>>",getAllvendorcode)}
  const handleVendorCodeChange = (event, value, data) => {
    console.log("dropdpwn--------->>>",value)
    setVcode(value);
  };

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
                  <h2 className="masterTitle">USER ACCESS</h2>
                </div>
              </div>
              <Box sx={{ mt: 2, height: 350, width: "100%" }}>
                <TableContainer component={Paper} sx={{ overflow: "auto" }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="userHead" align="center">
                          Name
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          City_vendorCode_Pincode
                        </TableCell>
                        <TableCell className="userHead">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    {getAllUser
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row) => (
                        <TableBody>
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.Name}</TableCell>

                            <TableCell align="center">
                              {!Edit[row.id] ? (                                
                                <>
                                {vcityPincode?.filter((vcity) => {
                                  return vcity.SubUserId === row.SubUserId
                                }).map((vpincode, key) => (
                                  <p key={key}>{vpincode.city + "_" + vpincode.vendorCode + "_" + vpincode.Pincode}</p>
                                ))}
                                </>
                              ) : (
                               
                                <Autocomplete
                                  multiple
                                  id="checkboxes-tags-demo"
                                  options={getAllvendorcode ? getAllvendorcode : ""}
                                  disableCloseOnSelect
                                  getOptionLabel={(option) =>
                                    option.City +
                                    "_" +
                                    option.No +
                                    "_" +
                                    option.Post_Code
                                  }
                                  renderOption={(
                                    props,
                                    option,
                                    { selected }
                                  ) => (
                                    <li {...props}>
                                      <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                      />
                                      {option.City +
                                        "_" +
                                        option.No +
                                        "_" +
                                        option.Post_Code}
                                    </li>
                                  )}
                                  style={{ width: 400, marginLeft: 100 }}
                                  onChange={(event, value) =>
                                    handleVendorCodeChange(event, value)
                                  }
                                  renderInput={(params) => (
                                    <TextField {...params} label="City_VendorCode_Pincode" />
                                  )}
                                />
                              )}
                            </TableCell>

                            <TableCell align="left">
                              {!Edit[row.id] ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    editMasterVendor(row.id, row.Name)
                                  }
                                  className="btn m-2 uploadFile"
                                >
                                  Edit
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    UpdateMasterVendor(
                                      row.SubUserId,
                                      row.Name,
                                      values[row.id]?.city_vendorCode_Pincode
                                    )
                                  }
                                  className="btn m-2 uploadFile"
                                >
                                  Assign
                                </button>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                  </Table>
                </TableContainer>
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

export default UserAccess;
