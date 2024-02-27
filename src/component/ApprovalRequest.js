import React, { useState, useEffect } from "react";
import AdminHeader from "../common/AdminHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box, Checkbox, Container } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import SideBar from "./SideBar";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button as ReactButton,
  Container as ReactContainer,
  Form as ReactForm,
  Modal,
} from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@material-ui/core/colors";
import Swal from "sweetalert2";
import apiService from "../services/api.service";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ApprovalRequest() {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIDs, setSelectedIDs] = useState(new Set());
  const [selectedRowId, setSelectedRowId] = useState(null);
  // const [dropdownShow, setDropDownShow] = useState(false);
  const [reqData, setreqData] = useState([]);
  console.log("reqData----------------->>>>", reqData);
  // const [optionSelected, setoptionSelected] = useState(null);
  const [documentFileDoc, setdocumentFileDoc] = useState();
  const [documentFileDocErr, setdocumentFileDocErr] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [quaterly, setQuaterly] = useState(false);
  // const [halfyearly, setHalfyearly] = useState(false);
  // const [yearly, setYearly] = useState(false);
  // const [middleparams, setmiddleparams] = useState();

  const [reqinfo, setreqinfo] = useState([]);
  const [vendorList, setvendorList] = useState([]);
  const [para, setpara] = useState();
  const [saveVendorCode, setsaveVendorCode] = useState(false);

  const handleSetVendorCode = (params, value) => {
    setpara(params);
    params.vendorCode = value;
    console.log("vendorCodeVl::", params.vendorCode);
  };
  const handlesaveVendorCodeDetails = () => {
    setsaveVendorCode(true);
    setModalOpen(false);
  };
  const handleVendorCode = (event, value) => {
    handleSetVendorCode(para, value);
    console.log("vendorcode", value);
    console.log("para", para);
  };

  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });

  const onFileChange = (file) => {
    if (file.size > 5000000) {
      setdocumentFileDoc(null);
      //     setdocumentFileDocErr("File is required")

      file = null;
      document.getElementsByName("fileapprovereq")[0].value = null;
      Swal.fire({
        title: "file size should be less than 5mb",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } else {
      Swal.fire("File Selected!", "", "success");
      setdocumentFileDoc(file);
      setdocumentFileDocErr("");
    }
  };
  // const onFileChange = (file) => {
  //     if (file) {
  //         setdocumentFileDoc(file);
  //         setdocumentFileDocErr("")
  //     } else {
  //         setdocumentFileDocErr("File is required")
  //     }
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    if (documentFileDoc) {
      const data = new FormData();
      data.append(
        "userId",
        JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
      );
      data.append("documentFileDoc", documentFileDoc);
      // 'vendorcode': optionSelected,
      // 'quarterly': quaterly,
      // 'halfyearly': halfyearly,
      // 'yearly': yearly,
      apiService.savePeriodicReq(data).then((response) => {
        if (response) {
          setModalShow(false);
          Swal.fire({
            title: "Data saved",
            icon: "success",
            confirmButtonText: "OK",
          });
          getReqData();
          setdocumentFileDoc(null);
        } else {
          Swal.fire({
            title: "Error While Fetching",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    } else {
      setdocumentFileDocErr("File is required");
    }
  };

  const handleQuaterlyChange = (e) => {
    e.quaterly = !e.quaterly;
  };
  const handleHalfyearlyChange = (e) => {
    e.halfyearly = !e.halfyearly;
  };
  const handleYearlyChange = (e) => {
    e.yearly = !e.yearly;
  };

  // const editHandler = (e) => {

  // }
  const deleteHandler = (e) => {
    Swal.fire({
      title: "Are you sure want to delete?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        apiService.deletePeriodicReq(e.id).then((response) => {
          if (response) {
            Swal.fire("Deleted!", "", "success");
            getReqData();
          }
        });
      } else {
        Swal.fire("Record not deleted", "", "info");
      }
    });
  };

  const handleFileView = (event) => {
    if (event) {
      let text = event;
      let paths = text.split("/");
      let name = paths[1];
      fetch(
        `${process.env.REACT_APP_API_URL}/downloadPdfUploads/${name}`
      ).then((response) => {
        response.blob().then((blob) => {
          let url = URL.createObjectURL(blob, "application/pdf");
          window.open(url, "_blank");
        });
      });
    } else {
      Swal.fire({
        title: "Error While Fetching",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleVendorCodeChange = (event, value, data) => {
    // e.preventDefault()
    data.vendorCode = value;
  };


  const top100Films = [
    { title: "Trichy_V01", year: "Trichy_V01" },
    { title: "Chennai", year: "Chennai_V02" },
    { title: "Patna", year: "Patna_V02" },
    { title: "Mumbai_V01", year: "Mumbai_V04" },
    { title: "Delhi_V01", year: "Delhi_V05" },
    { title: "Lucknow_V01", year: "Lucknow_V06" },
    { title: "Jammu_V01", year: "Jammu_V07" },
    { title: "Cochin_V01", year: "Cochin_V08" },
    { title: "Kolkata_V01", year: "Kolkata_V09" },
    { title: "Bangalore_V01", year: "Bangalore_V010" },
  ];

  const columns = [
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 80,
      renderCell: (params) => (
        <>
          {/* <EditIcon
                        onClick={() => editHandler(params.row)}
                        style={{
                            color: deepPurple[500],
                            fontSize: 15,
                            margin: 20,
                            cursor: "pointer",
                        }}
                    /> */}

          <DeleteIcon
            onClick={() => deleteHandler(params.row)}
            style={{
              color: red[500],
              fontSize: 15,
              margin: 10,
              cursor: "pointer",
            }}
          />
        </>
      ),
    },
    {
      field: "documentFileDoc",
      headerName: "Documents",
      width: 250,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            <span onClick={() => handleFileView(params.row.documentFileDoc)}>
              {params.row.documentFileDoc}{" "}
            </span>
          </>
        );
      },
    },
    {
      field: "quaterly",
      headerName: "Quaterly",
      renderCell: (params) => (
        <Checkbox
          id={params.row.quaterly}
          name={params.row.quaterly}
          checked={params.row.quaterly == 1}
          onClick={() => handleQuaterlyChange(params.row)}
        />
      ),
      width: 150,
    },
    {
      field: "halfyearly",
      headerName: "Half-yearly",
      renderCell: (params) => (
        <Checkbox
          id={params.row.halfyearly}
          name={params.row.halfyearly}
          checked={params.row.halfyearly == 1}
          onClick={() => handleHalfyearlyChange(params.row)}
        />
      ),
      width: 150,
    },
    {
      field: "yearly",
      headerName: "Yearly",
      renderCell: (params) => (
        <Checkbox
          id={params.row.yearly}
          name={params.row.yearly}
          checked={params.row.yearly == 1}
          onClick={() => handleYearlyChange(params.row)}
        />
      ),

      width: 160,
    },
    {
      field: "vendorCode",
      headerName: "Vendor Code",
      renderCell: (params) => {
        const rowId = params.row?.id;
        const buttonName =
          params.row.vendorCode && params.row.vendorCode.length > 0
            ? "Vendor Code Selected"
            : "Select Vendor Code";
        const vendorCodeValues =
          params.row.vendorCode?.filter((obj) => obj.No).map((obj) => obj.No) ||
          [];

        return (
          <>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <>
                {params.row.vendorCode && params.row.vendorCode.length > 0 ? (
                  <Tooltip title={vendorCodeValues.join(", ")} placement="top">
                    <button
                      onClick={() => {
                        handleSetVendorCode(params.row, params.row.vendorCode);
                        setModalOpen(true);
                      }}
                      type="button"
                      className="btn bankbtn btn-primary btn-md m-2"
                    >
                      {buttonName}
                    </button>
                  </Tooltip>
                ) : (
                  <button
                    onClick={() => {
                      handleSetVendorCode(params.row, []);
                      setModalOpen(true);
                    }}
                    type="button"
                    className="btn bankbtn btn-primary btn-md m-2"
                  >
                    {buttonName}
                  </button>
                )}
              </>
            )}
          </>
        );
      },
      width: 500,
    },
  ];

  const getReqData = () => {
    setreqData([]);
    apiService.getPeriodicReq().then((response) => {
      const modifiedData = response.data.result.map((item) => ({
        ...item,
        quaterly: null,
        halfyearly: null,
        yearly: null,
      }));
      setreqData((prevData) => [...prevData, ...modifiedData]);
    });
  };
  useEffect(() => {
    setvendorList([]);
    setLoading(true);
    apiService
      .getErpResourcePortalVendorlist()
      .then((response) => {
        const uniqueVendorList = response.data.value.filter(
          (vendor, index, self) => {
            return (
              vendor.No && index === self.findIndex((v) => v.No === vendor.No)
            );
          }
        );
        setvendorList(uniqueVendorList);
      })
      .finally(() => {
        setLoading(false);
      });
    apiService.getPeriodicReq().then((response) => {
      const modifiedResult = response.data.result.map((item) => {
        return {
          ...item,
          quaterly: null,
          halfyearly: null,
          yearly: null,
        };
      });
      setreqData(modifiedResult);
    });
  }, []);

  const rows = reqData ? reqData : "";

  const handleRequest = (event) => {

    if (reqinfo.length > 0) {


      let userId = reqinfo[0].userId;
      if (reqinfo[0].vendorCode) {
        apiService.updatePeriodicReq(userId, reqinfo).then((response) => {
          if (response) {
            setModalShow(false);
            Swal.fire({
              title: "Request Sent",
              icon: "success",
              confirmButtonText: "OK",
            });
            getReqData();
          } else {
            Swal.fire({
              title: "Error While Fetching",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
      } else {
        Swal.fire({
          title: "Please Enter VendorCode",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  // console.log("vendorList---------------------->>>>>",vendorList);
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: "#f3f4f7" }}>
        <CssBaseline />
        <AdminHeader team="mrtTeam" />
        <Box sx={{ display: "flex" }}>
          <SideBar MRT="MRTteam" />
          <Box sx={{ mt: 2, width: "100%" }}>
            <Container>
              <Accordion className="accordion1" sx={{ mt: 1 }}>
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography
                    sx={{
                      mt: 1,
                      width: "30%",
                      flexShrink: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Periodic requests
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      width: "20%",
                      flexShrink: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Agreement
                  </Typography>
                  <Typography sx={{ mt: 1, width: "30%" }}></Typography>
                  <Button
                    style={{ textTransform: "capitalize" }}
                    variant="contained"
                    component="label"
                    sx={{
                      mr: 2,
                      color: "white",
                      "&:hover": { backgroundColor: "#4f4f4f" },
                      backgroundColor: "#4f4f4f",
                      fontWeight: "700",
                      display: "block",
                    }}
                    onClick={() => setModalShow(true)}
                  >
                    <AddBoxIcon />
                    &nbsp;Add documents
                  </Button>

                  <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Add Documents
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                      <ReactContainer>
                        <ReactForm>
                          <ReactForm.Group controlId="formBasicEmail">
                            <ReactForm.Label>File</ReactForm.Label>
                            <FileUploader
                              className="bank_fileupload"
                              handleChange={onFileChange}
                              required
                              type="file"
                              name="fileapprovereq"
                            />
                            <span>
                              {documentFileDoc ? (
                                <>File name: ${documentFileDoc.name}</>
                              ) : (
                                "No File Chosen"
                              )}
                            </span>
                            <br></br>{" "}
                            <span className="formError">
                              {documentFileDocErr}
                            </span>
                          </ReactForm.Group>
                          <br></br>

                          <ReactForm.Group controlId="formBasicChecbox"></ReactForm.Group>
                          <ReactButton
                            variant="primary"
                            style={{ marginTop: "10px", float: "right" }}
                            type="submit"
                            onClick={submitHandler}
                          >
                            Save
                          </ReactButton>
                          <ReactButton
                            variant="primary"
                            style={{
                              marginTop: "10px",
                              float: "right",
                              marginRight: "20px",
                            }}
                            onClick={() => {
                              setModalShow(false);
                              setdocumentFileDoc(null);
                            }}
                          >
                            Close
                          </ReactButton>
                        </ReactForm>
                      </ReactContainer>
                    </Modal.Body>
                  </Modal>

                  {/* <Modal show={dropdownShow} onHide={() => setDropDownShow(false)} aria-labelledby="contained-modal-title-vcenter">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Add Documents
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="show-grid">
                                            <ReactContainer>
                                                <ReactForm >

                                                    <ReactForm.Group controlId="formBasicEmail">
                                                        <ReactForm.Label>Vendor Code:</ReactForm.Label>

                                                        <ReactSelect
                                                            options={colourOptions}
                                                            isMulti
                                                            closeMenuOnSelect={false}
                                                            hideSelectedOptions={false}
                                                            components={{
                                                                Option
                                                            }}
                                                            onChange={handleSelectChange}
                                                            allowSelectAll={true}
                                                            value={optionSelected}
                                                        />

                                                    </ReactForm.Group>
                                                    <ReactForm.Group controlId="formBasicChecbox"></ReactForm.Group>
                                                    <ReactButton
                                                        variant="primary"
                                                        style={{ marginTop: "10px", float: "right" }}
                                                        type="submit"
                                                        onClick={(event) => submitVendorcodeHandler(event)}
                                                    >
                                                        Save
                                                    </ReactButton>
                                                    <ReactButton
                                                        variant="primary"
                                                        style={{
                                                            marginTop: "10px",
                                                            float: "right",
                                                            marginRight: "20px",
                                                        }}
                                                        onClick={() => setModalShow(false)}
                                                    >
                                                        Close
                                                    </ReactButton>
                                                </ReactForm>
                                            </ReactContainer>
                                        </Modal.Body>
                                    </Modal> */}
                </AccordionSummary>
              </Accordion>
              <Box sx={{ mt: 4, height: 350, width: "100%" }}>
                <div style={{ height: 420, width: "100%", overflow: "auto" }}>
                  <DataGrid
                    sx={{ backgroundColor: "white" }}
                    rows={rows}
                    onSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      const selectedRowData = rows.filter((row) =>
                        selectedIDs.has(row.id)
                      );
                      if (selectedRowData) {
                        // console.log("selected row----------->>>>>",selectedRowData)
                        setreqinfo(selectedRowData);
                      }
                    }}
                    rowHeight={"auto"}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick={true}
                    checkboxSelection={true}
                    experimentalFeatures={{ newEditingApi: true }}
                    // autoHeight={false}
                  />
                </div>
              </Box>
              <div>
                <Dialog
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  disableBackdropClick={true}
                >
                  <DialogTitle>Vendor Code</DialogTitle>
                  <DialogContent>
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={vendorList}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.No}
                      // value={selectedOptions}
                      // onChange={(event, newValue) => setSelectedOptions(newValue)}
                      onChange={(event, value) =>
                        handleVendorCode(event, value)
                      }
                      renderOption={(props, option, { selected }) => (
                        <li key={option.No} {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.No}
                        </li>
                      )}
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Checkboxes"
                          placeholder="Select Vendor Code"
                        />
                      )}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setModalOpen(false);
                        setsaveVendorCode(true);
                      }}
                    >
                      Select
                    </Button>

                    <Button
                      onClick={() => {
                        setModalOpen(false);
                        setsaveVendorCode(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div
                className="float-end Request"
                style={{ marginTop: "10% !important" }}
              >
                <button
                  type="button"
                  onClick={(e) => handleRequest(e)}
                  className="btn bankbtn btn-primary btn-md m-2"
                >
                  Request
                </button>
              </div>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ApprovalRequest;
