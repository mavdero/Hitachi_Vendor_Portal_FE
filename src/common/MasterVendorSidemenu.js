import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PostAddIcon from "@mui/icons-material/PostAdd";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Container } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import apiService from "../services/api.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import PreviewIcon from '@mui/icons-material/Preview';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import handleApiError from '../utils/Errorhandler';
import {
  Popover
} from '@mui/material';

export const MasterVendorSidemenu = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [VendorCodeGenerated, setVendorCodeGenerated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openReviewVendor, setopenReviewVendor] = useState(false);
  const [ReviewVendor, setReviewVendor] = useState('');
  const sidemenuOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget); 
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [selectedTicketId, setSelectedTicketId] = useState('');

  const handleTicketIdSelect = (event, value) => {
    console.log("value::",value);
    setSelectedTicketId(value?.Ticket_ID || '');
  };
  
  const handleReviewPage = () => {
    console.log("ReviewVendor::",ReviewVendor);
    if(ReviewVendor?.length>0)
    {
      console.log("ReviewVendorlength::",ReviewVendor?.length);
      setopenReviewVendor(true);
    }
    else
    {
      Swal.fire({
        title: "Please create Vendors to review",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        allowOutsideClick: false,
      });
    }
  };
  const isSubMenuOpen = Boolean(anchorEl);
  const [vendorDetails, setvendorDetails] = useState([]);
  const [vendorComDetails, setvendorComDetails] = useState([]);
  const [UserId, setUserId] = useState("");
  const [state, setState] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [getAllvendorcode,setgetAllvendorcode] = useState([]);
  console.log("getAllvendorcode1111111111--->", getAllvendorcode);
  const [VendorId, setVendorId] = useState("");
  const [City, setCity] = useState('');
const [Post_Code, setPostCode] = useState('');
const [pincodeOptions, setPincodeOptions] = useState([]);

  useEffect(() => {
   if (City) {
      console.log("getAllvendorcode",getAllvendorcode);
      const filteredOptions = getAllvendorcode
        ?.filter((item) => {
          return item.City === City;
        })
        ?.map((item) => {
          return {
            id: item.id,
            value: item.Post_Code,
          };
        });
  
      setPincodeOptions(filteredOptions);
    } else {
      console.log("getAllvendorcode",getAllvendorcode);
      const allOptions = getAllvendorcode?.map((item) => {
        return {
          id: item.id,
          value: item.Post_Code,
        };
      });
  
      setPincodeOptions(allOptions);
    }
    apiService.getErpVendor_APIByP_A_N_No(JSON.parse(window.sessionStorage.getItem("jwt")).result.Ticket_ID).then((vendorCode) => {

      console.log("vendorCode.message------>",vendorCode);
      if (vendorCode.data.message === "No record found for the given Ticket_ID"||
      vendorCode.data.message === undefined ||
      vendorCode.data.message === null ||
      vendorCode.data.message === "") {       
        setgetAllvendorcode([]);
      }
      else if (vendorCode.data.message == "success") {
        setgetAllvendorcode(vendorCode.data.response);
        console.log("responseErpVendorCode::",vendorCode.data.response);
        if (vendorCode.data.response[0].No) {
          apiService.getuserIdByVcode(vendorCode.data.response[0]?.No).then((res) => {
            console.log("masterDatauserId",res.data);
            setUserId(res.data);
          })
        }
        else
        {
          console.log("vendorNo not generated::");
        }
     
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
    apiService.getAllUserDetail().then((res) => {
      setvendorDetails(res.data.basicInfo[0]);
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
    let userid = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId;

    apiService.signupFindByUserId(userid).then((res) => {
      setAdminEmail(res.data.result.emailId);
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

    apiService.getAllUserDetail().then((res) => {
      setvendorComDetails(res.data.CommunicationDetails[0]);
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
    apiService.ReviewNewRegisteredVendorByMaster(JSON.parse(window.sessionStorage.getItem("jwt")).result.userId).then((res) => {
      console.log("vendorsCreatedBymasters",res.data.result.length);
      setReviewVendor(res.data.result);
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
  }, [City]);
  const resetForm = () => {
    setCity("");
    setPostCode("");
    setVendorId("");
    setVendorCodeGenerated(false);
  };
  const handleCity = (e) => {
    setCity(e);
    console.log('City', e);
    console.log("getAllvendorcode",getAllvendorcode)
    const postcodes = getAllvendorcode
    ?.filter((item) => {
      return item.City === e;
    })
    .map((item) => item.Post_Code);
    console.log("postcodes::",postcodes);
    setPostCode(postcodes);
    const vendorcodes = getAllvendorcode
    ?.filter((item) => {
      return item.City === e;
    })
    .map((item) => item.No);
    console.log("id::",vendorcodes);
    setVendorId(vendorcodes);
    if (vendorcodes.length > 0 && vendorcodes[0] !== '') {
      console.log("vendorno generated:::");
      setVendorCodeGenerated(false);
    }
    else
    {
      setVendorCodeGenerated(true);
    }
  };
  
  const handlePincode = (e) => {
    setPostCode(e);
    console.log("pincode::",e);
    const vendorcodes = getAllvendorcode
    ?.filter((item) => {
      return item.Post_Code === e;
    })
    .map((item) => item.No);
    console.log("id::",vendorcodes);
    setVendorId(vendorcodes);
    if (vendorcodes.length > 0 && vendorcodes[0] !== '') {
      console.log("vendorno generated:::");
      setVendorCodeGenerated(false);
    }
    else
    {
      setVendorCodeGenerated(true);
    }

  };
  
  const handleUserId = (e) => {
    setVendorId(e);
    if (e.length > 0 && e[0] !== '') {
      console.log("vendorno generated:::");
      setVendorCodeGenerated(false);
    }
    else
    {
      setVendorCodeGenerated(true);
    }
  };

  const openModelShow = () => {
    apiService.getAllUserDetail().then((res) => {
      setvendorDetails(res.data.basicInfo[0]);
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

    setModalShow(true);
  };

  const handleState = () => {
    const data = { userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId }
    apiService.saveNewRegVendordetail(data).then((response) => {

      if (response) {
        console.log("new user response------------>>>", "response")
        let item = JSON.parse(window.sessionStorage.getItem("jwt"));
        item.result.userId = response.data.result.userId
        item.result.userId2 = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
        item.result.usertype = "NewRegistration"
        item.result.Ticket_ID2 = response.data.result.Ticket_ID
        sessionStorage.setItem("jwt", JSON.stringify(item));
        navigate(`/basic`);
      }
      else {
        Swal.fire({
          title: "Error While Fetching",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          allowOutsideClick: false,
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
  const onSubmitClickReviewVendor = () => {
   const selectedVendor = ReviewVendor.find((vendor) => vendor.Ticket_ID === selectedTicketId); 
    if (selectedVendor) {
      const selectedUserId = selectedVendor.userId;
      const matchedTicketId = selectedVendor.Ticket_ID;
      console.log('Selected User ID:', selectedUserId);
      let item = JSON.parse(window.sessionStorage.getItem("jwt"));
      item.result.userId = selectedUserId
      item.result.userId2 = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
      item.result.usertype = "NewRegistration"
      item.result.Ticket_ID2= matchedTicketId
      sessionStorage.setItem("jwt", JSON.stringify(item));
      console.log("UserId",selectedUserId);
      navigate(`/basic`);
    }
    setopenReviewVendor(false);
   
  };
  const onSubmitClick = () => {
    console.log("VendorId::",VendorId);
    if (VendorId.length > 0 && VendorId[0] !== '') {
      console.log("vendorno generated:::");
      setVendorCodeGenerated(false);
      var vendorUserId = { userId: UserId };
      let data = { master: true };
      sessionStorage.setItem("master", JSON.stringify(data));
      let item = JSON.parse(window.sessionStorage.getItem("jwt"));
      item.result.userId = UserId
      item.result.userId2 = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId
      item.result.usertype = "masterData"
      sessionStorage.setItem("jwt", JSON.stringify(item));
      sessionStorage.setItem("UserFromMasterData", JSON.stringify(UserId));
      console.log("UserId",UserId);
      navigate(`/basic/${UserId}`);
  
      apiService.UpdateUserStatusByUserId(UserId).then((res) => {

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
    else
    {
      console.log("vendorno not generated:::")
      setVendorCodeGenerated(true);
    }
 

  }
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "block", sm: "none" },
          maxWidth: 60,
          minHeight: "100%",
          bgcolor: "#B1000E",
          color: "white",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={sidemenuOpen}
              sx={{ ml: 1 }}
            ></IconButton>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ color: "white" }}
              component={Link}
              to="/userCreation"
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <PersonAddAltRoundedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Creation"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ color: "white" }}
              component={Link}
              to="/UserAccess"
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <VerifiedUserIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Access"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>

            {/* <ListItem
              disablePadding
              component={Link}
              to="/"
              sx={{ color: "white" }}
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <PostAddIcon sx={{ color: "white" }} />
                </ListItemIcon>
                
                <ListItemText
                  primary="New Registration"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem> */}
  <ListItem disablePadding sx={{ color: 'white' }}>
            <ListItemButton
              onClick={handleButtonClick}
              sx={{
                '&:hover': { backgroundColor: 'gray' },
                borderRadius: '20px',
              }}
            >
              <ListItemIcon>
                <PostAddIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="New Registration" />
              <IconButton
                onClick={handleButtonClick}
              >
                <ArrowDropDownIcon sx={{ color: 'white' }} />
              </IconButton>
            </ListItemButton>
          </ListItem>
          {isSubMenuOpen && (
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: 'gray' },
                    borderRadius: '20px',
                  }}
                >
                  <ListItemIcon><PreviewIcon sx={{ color: "white" }} /></ListItemIcon>
                  <ListItemText primary="Review" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: 'gray' },
                    borderRadius: '20px',
                  }}
                >
                  <ListItemIcon>
                    <AddIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Create New" />
                </ListItemButton>
              </ListItem>
            </List>
          )}
            <ListItem disablePadding sx={{ color: "white" }}>
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <AppRegistrationSharpIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Master Data"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          width: "100%",
          ...(open && { width: "60px" }),
          maxWidth: 280,
          minHeight: "100vh",
          bgcolor: "#B1000E",
          color: "white",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={sidemenuOpen}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ color: "white" }}
              component={Link}
              to="/userCreation"
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <PersonAddAltRoundedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Creation"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ color: "white" }}
              component={Link}
              to="/UserAccess"
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <VerifiedUserIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Access"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding sx={{ color: "white" }}>
  <ListItemButton
    sx={{
      "&:hover": { backgroundColor: "gray" },
      borderRadius: "20px",
    }}
  >
    <ListItemIcon>
      <AppRegistrationSharpIcon sx={{ color: "white" }} />
    </ListItemIcon>
    <ListItemText sx={{ ...(open && { display: "none" }) }}>
      <Select
        value={newRegistrationOption}
        onChange={handleNewRegistrationOptionChange}
        displayEmpty
        sx={{
          color: "white",
          minWidth: "120px",
          ...(open && { display: "none" }),
        }}
      >
        <MenuItem value="">
          New Registration
        </MenuItem>
        <MenuItem value="review">
        <PreviewIcon sx={{ mr: 1 }} />
          Review Vendor</MenuItem>
        <MenuItem value="createNew" onClick={(e) => handleState(e.target.value)}>
          <AddIcon sx={{ mr: 1 }} />
          Create New Vendor
        </MenuItem>
      </Select>
    </ListItemText>
  </ListItemButton>
</ListItem> */}
 <ListItem disablePadding sx={{ color: 'white' }}>
            <ListItemButton
              onClick={handleButtonClick}
              sx={{
                '&:hover': { backgroundColor: 'gray' },
                borderRadius: '20px',
              }}
            >
              <ListItemIcon>
                <PostAddIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="New Registration" />
              <IconButton
                onClick={handleButtonClick}
              >
                <ArrowDropDownIcon sx={{ color: 'white' }} />
              </IconButton>
            </ListItemButton>
          </ListItem>
          {isSubMenuOpen && (
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: 'gray' },
                    borderRadius: '20px',
                  }}
                >
                  <ListItemIcon><PreviewIcon sx={{ color: "white" }} /></ListItemIcon>
                  <ListItemText   onClick={handleReviewPage} primary="Review" />
                </ListItemButton>
              </ListItem>
              <Modal
                  show={openReviewVendor}
                  onHide={() => {
                    setopenReviewVendor(false);
                  }}
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                     Review vendor by TicketId
                    </Modal.Title>
                  </Modal.Header>
                  <Container sx={{ mt: 5 }}>
                  <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={ReviewVendor}
      autoHighlight
      onChange={handleTicketIdSelect}
      getOptionLabel={(option) => option.Ticket_ID}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.Ticket_ID} 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Ticket Id"
          inputProps={{
            ...params.inputProps,
        
          }}
        />
      )}
    />
                    </Container>
                  <Box sx={{ display: "flex", ml: 50, mb: 1 }}>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={onSubmitClickReviewVendor}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: 'gray' },
                    borderRadius: '20px',
                  }}
                >
                  <ListItemIcon>
                    <AddIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText value={state}
                onClick={(e) => handleState(e.target.value)} primary="Create New" />
                </ListItemButton>
              </ListItem>
            </List>
          )}

            {/* <ListItem disablePadding sx={{ color: "white" }}>
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
                value={state}
                onClick={(e) => handleState(e.target.value)}
              >
                <ListItemIcon>
                  <PostAddIcon sx={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primary="New Registration"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding sx={{ color: "white" }}>
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <AppRegistrationSharpIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Master Data"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                  onClick={openModelShow}
                />
                <Modal
                  show={modalShow}
                  onHide={() => {
                    setModalShow(false);
                    resetForm();
                  }}
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Select City,Pincode and Vendor Code
                    </Modal.Title>
                  </Modal.Header>
                  <Container sx={{ mt: 5 }}>
                    <Row>
                      <Col>
                        {" "}
                        <Box sx={{ display: "flex" }}>
                          {" "}
                          <InputLabel sx={{ mt: 2 }}> City:</InputLabel>
                          <FormControl sx={{ width: 200, ml: 11 }}>
                            <Select
                              native
                              value={City}
                              onChange={(e) => handleCity(e.target.value)}
                              input={
                                <OutlinedInput
                                  label=""
                                  id="demo-dialog-native"
                                />
                              }
                            >
                              <option disabled value="">Select City</option>
                              {getAllvendorcode?.map((item) => {
                                    return (
                                      <option
                                        key={item.No}
                                        value={item.City}
                                      >
                                        {item.City}
                                      </option>
                                    );
                                  })}
                              {/* {vendorDetails?.map((item) => {
                                return (
                                  <option key={item.id} value={item.City}>
                                    {item.City}
                                  </option>
                                );
                              })} */}
                            </Select>
                          </FormControl>
                        </Box>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {" "}
                        <Box sx={{ mt: 5, display: "flex" }}>
                          <InputLabel sx={{ mt: 2 }}>Pin Code:</InputLabel>
                          <FormControl sx={{ width: 200, ml: 6 }}>
                            <Select
                              native
                              value={Post_Code}
                              onChange={(e) => handlePincode(e.target.value)}
                              input={
                                <OutlinedInput
                                  label=""
                                  id="demo-dialog-native"
                                />
                              }
                            >
                              <option disabled value="">Select Pincode</option>
                              {City
                                ? getAllvendorcode
                                    ?.filter((item) => {
                                      return item.City === City;
                                    })
                                    ?.map((item) => {
                                      return (
                                        <option
                                          key={item.id}
                                          value={item.Post_Code}
                                        >
                                          {item.Post_Code}
                                        </option>
                                      );
                                    })
                                : getAllvendorcode ?.map((item) => {
                                    return (
                                      <option
                                        key={item.id}
                                        value={item.Post_Code}
                                      >
                                        {item.Post_Code}
                                      </option>
                                    );
                                  })}
                            </Select>
                          </FormControl>
                        </Box>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Box sx={{ mt: 5, display: "flex" }}>
                          <InputLabel sx={{ mt: 2 }}>Vendor Code:</InputLabel>

                          <FormControl sx={{ width: 200, ml: 2.5 }}>
                            <Select
                              value={VendorId}
                              onChange={(e) => handleUserId(e.target.value)}
                              native
                              input={
                                <OutlinedInput
                                  label=""
                                  id="demo-dialog-native"
                                />
                              }
                            >
                              <option disabled value=""> Select Vendorcode</option>
                              {getAllvendorcode?.map((item) => {
                                    return (
                                      <option
                                        key={item.No}
                                        value={item.No}
                                      >
                                        {item.No}
                                      </option>
                                    );
                                  })}
                            </Select>
                            {VendorCodeGenerated ? (
    <p style={{ color: 'red' }}>Vendor Code is Empty</p>
  ) : null}
                            
                          </FormControl>
                        </Box>
                      </Col>
                    </Row>
                  </Container>
                  <Box sx={{ display: "flex", ml: 50, mb: 1 }}>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={onSubmitClick}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </>
  );
};

export default MasterVendorSidemenu;