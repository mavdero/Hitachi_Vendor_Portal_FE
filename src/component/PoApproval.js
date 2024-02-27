import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, ThemeProvider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import apiService from "../services/api.service";
import React ,{ useEffect, useState } from 'react';
import AdminHeader from '../common/AdminHeader';
import { v4 as uuidv4 } from "uuid";
import PurchaseOrder from './PurchaseOrder';
import Pagination from '@mui/material/Pagination';
import SideBar from './SideBar';
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { MDBRow } from "mdb-react-ui-kit";
import { format, differenceInDays } from 'date-fns';
import axios from 'axios';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";
import Grid from "@mui/material/Grid";
import TextField1 from "@mui/material/TextField";

function getModalStyle() {
  const top = 50;
  const left = 75;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "fixed",
    width: 500,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PoApproval() {
  const [expanded, setExpanded] = useState(false);
  const [Document_Type, setDocument_Type] = useState("");
  const [accordionData, setAccordionData] = useState([]);
  const [dueDay, setdueDay] = useState();
  const [submitDate, setsubmitDate] = useState();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(accordionData?.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;


  const handleChange =
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      const number = panel.substring(5);
      const filteredAccordionData = accordionData.filter((item) => item.No === number);

      console.log("accy677::", number, filteredAccordionData);
      setRows(filteredAccordionData);

    };



  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });

  const handleApprove = (event, Document_Type) => {

    Swal.fire({
      heightAuto: true,

      html: `<div style="margin-left:1rem;margin:2rem;height:10rem;width:40rem;flex:0 0 150px;">
        <div class="approvestyle">
        <form>
        <label style="margin-left:0.5rem;" >Email:</label>
        <select  class="select" style="max-width:70%;margin-left:50" id="email" required>
        <option value="" hidden>Select EmailId</option>
          <option value="karthigapalani4@gmail.com">hitachi@gmail.com</option>
          <option value="apitestmail4@gmail.com">hitachi@yahoo.com</option>
        </select><br>
        <label >User Name:</label>
        <select  class="select" style="max-width:70%;margin-top:1rem;margin-left:15"  id="username" >
        <option value="" hidden>Select User Name</option>
          <option value="PO Team1" >PO Team1</option>
          <option value="PO Team2">PO Team2</option>
        </select><br>
        <label >Location:</label>
        <select  class="select" style="max-width:70%;margin-top:1rem;margin-left:45"  id="location" >
        <option value="" hidden>Select Location</option>
          <option value="chennai" >Chennai</option>
          <option value="trichy" >trichy</option>
        </select>
        </form>
      </div>
      </div> `,
      confirmButtonText: "Approve",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        const username = Swal.getPopup().querySelector("#username").value;
        const location = Swal.getPopup().querySelector("#location").value;
        if (!email && !username && !location) {
          Swal.showValidationMessage(
            `Please choose EmailId,User Name and Location`
          );
        } else if (!location && !username) {
          Swal.showValidationMessage(`Please choose  User Name and Location.`);
        } else if (!location && !email) {
          Swal.showValidationMessage(`Please choose  EmailId and Location.`);
        } else if (!username && !email) {
          Swal.showValidationMessage(`Please choose  EmailId and User Name.`);
        } else if (!email) {
          Swal.showValidationMessage(`Please choose EmailId.`);
        } else if (!username) {
          Swal.showValidationMessage(`Please choose User Name.`);
        } else if (!location) {
          Swal.showValidationMessage(`Please choose Location.`);
        } else {
          console.log("valueofemail::", email, username, location);
          const savePO = {
            Document_Type: rows[0].Document_Type,
            No: event,
            Order_Date: rows[0].Order_Date,
            Payment_Terms_Code: rows[0].Payment_Terms_Code,
            Buy_from_Vendor_Name: rows[0].Buy_from_Vendor_Name,
            Customer_Name: rows[0].Customer_Name,
            Buy_from_Vendor_No: rows[0].Buy_from_Vendor_No,
            Ship_to_Name: rows[0].Ship_to_Name,
            Amount_to_Vendor: rows[0].Amount_to_Vendor,
            Billed_Amount: rows[0].Billed_Amount,
            Unbilled_Amount: rows[0].Unbilled_Amount,
            level1ApprovalStatus: "Approved",
            username: username,
            email: email,
            location: location,
          };

          apiService.savePO(savePO).then((res) => {
            if (res.data.msg === "success") {
              Swal.fire({
                title: res.data.result,
                icon: "success",
                confirmButtonText: "OK",
              }).then((res) => {
                Promise.all([
                  apiService.getPo(),
                  apiService.getErpPurchaseOrdersLists(),
                ]).then(([poRes, erpRes]) => {
                  const poValues = poRes.data.result.map((item) => item.No);
                  const filteredErpData = erpRes.data.result.filter(
                    (item) => !poValues.includes(item.No)
                  );
                  const rowsWithIds = filteredErpData.map((row) => ({
                    ...row,
                    id: uuidv4(),
                  }));

                  setRows(rowsWithIds);
                  console.log("Data:");
                  console.log(rowsWithIds);

                  setAccordionData(rowsWithIds);
                });
              });
            } else {
              Swal.fire({
                title: res.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          });
        }
      },
    });
  };
  const handleApprovalOnMail = (event, Document_Type) => {
   

    Swal.fire({
      heightAuto: true,

      html: `<div style="margin-left:1rem;margin:2rem;height:10rem;width:40rem;flex:0 0 150px;">
      <div class="approvestyle">
      <form>
      <label style="margin-left:0.5rem;" >Email:</label>
      <select  class="select" style="max-width:70%;margin-left:50" id="email" required>
      <option value="" hidden>Select EmailId</option>
        <option value="ajayaravind797@gmail.com">hitachi@gmail.com</option>
        <option value="ajayaravind797@gmail.com">hitachi@yahoo.com</option>
      </select><br>
      <label >User Name:</label>
      <select  class="select" style="max-width:70%;margin-top:1rem;margin-left:15"  id="username" >
      <option value="" hidden>Select User Name</option>
        <option value="PO Team1" >PO Team1</option>
        <option value="PO Team2">PO Team2</option>
      </select><br>
      <label >Location:</label>
      <select  class="select" style="max-width:70%;margin-top:1rem;margin-left:45"  id="location" >
      <option value="" hidden>Select Location</option>
        <option value="chennai" >Chennai</option>
        <option value="trichy" >trichy</option>
      </select>
      </form>
    </div>
    </div> `,
      confirmButtonText: "Approve",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        const username = Swal.getPopup().querySelector("#username").value;
        const location = Swal.getPopup().querySelector("#location").value;
        if (!email && !username && !location) {
          Swal.showValidationMessage(
            `Please choose EmailId,User Name and Location`
          );
        } else if (!location && !username) {
          Swal.showValidationMessage(`Please choose  User Name and Location.`);
        } else if (!location && !email) {
          Swal.showValidationMessage(`Please choose  EmailId and Location.`);
        } else if (!username && !email) {
          Swal.showValidationMessage(`Please choose  EmailId and User Name.`);
        } else if (!email) {
          Swal.showValidationMessage(`Please choose EmailId.`);
        } else if (!username) {
          Swal.showValidationMessage(`Please choose User Name.`);
        } else if (!location) {
          Swal.showValidationMessage(`Please choose Location.`);
        } else {
          const purchaseOrder = {
            Document_Type: rows[0].Document_Type,
            No: event,
            srNo: rows[0].srNo,
            glCode: rows[0].glCode,
            qty: rows[0].qty,
            qtyDelivered: rows[0].qtyDelivered,
            rate: rows[0].rate,
            baseAmount: rows[0].baseAmount,
            taxAmount: rows[0].taxAmount,
            username: username,
            email: email,
            location: location,
            level1ApprovalStatus: "Approved"
          };
          apiService.mailApprovePo_Invoice(purchaseOrder).then((res) => {
            if (res.data.status === "success") {
              Swal.fire({
                title: "Email sent for approval to proceed",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result) => {
                Promise.all([
                  apiService.getPo(),
                  apiService.getErpPurchaseOrdersLists(),
                ]).then(([poRes, erpRes]) => {
                  const poValues = poRes.data.result.map((item) => item.No);
                  const filteredErpData = erpRes.data.result.filter(
                    (item) => !poValues.includes(item.No)
                  );

                  const rowsWithIds = filteredErpData.map((row) => ({
                    ...row,
                    id: uuidv4(),
                  }));

                  setRows(rowsWithIds);
                  console.log("Data:");
                  console.log(rowsWithIds);

                  setAccordionData(rowsWithIds);
                });
              });
            } else {
              Swal.fire({
                title: res.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          });
        }
      },
    });
  };
  const handleReject = (event, Document_Type) => {
    Swal.fire({
      heightAuto: true,
      html: `<div class="rejectstyle">
        <textarea rows="50" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
        <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
   </div> `,
      confirmButtonText: "Reject",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        const rejectdoc = Swal.getPopup().querySelector("#rejectdoc").files[0];
        if (!comment && !rejectdoc) {
          Swal.showValidationMessage(`Please enter comments and Upload file`);
        } else if (!comment) {
          Swal.showValidationMessage(`Please give Comments`);
        } else if (!rejectdoc) {
          Swal.showValidationMessage(`Please Upload File`);
        } else {
          console.log("rejectdoc::", rejectdoc);
          const data = new FormData();
          data.append("level1rejectpodoc", rejectdoc);
          data.append("comment", comment);
          data.append("No", event);
          data.append("level1ApprovalStatus", "Rejected");
          data.append("Document_Type", rows[0].Document_Type);
          data.append("Order_Date", rows[0].Order_Date);
          data.append("Payment_Terms_Code", rows[0].Payment_Terms_Code);
          data.append("Buy_from_Vendor_Name", rows[0].Buy_from_Vendor_Name);
          data.append("Customer_Name", rows[0].Customer_Name);
          data.append("Buy_from_Vendor_No", rows[0].Buy_from_Vendor_No);
          data.append("Ship_to_Name", rows[0].Ship_to_Name);
          data.append("Amount_to_Vendor", rows[0].Amount_to_Vendor);
          data.append("Billed_Amount", rows[0].Billed_Amount);
          data.append("Unbilled_Amount", rows[0].Unbilled_Amount);

          apiService.savePO(data).then((res) => {
            console.log("rejected::", data);
            if (res.data.msg === "success") {
              Swal.fire({
                title: res.data.result,
                icon: "success",
                confirmButtonText: "OK",
              }).then((res) => {
                Promise.all([
                  apiService.getPo(),
                  apiService.getErpPurchaseOrdersLists(),
                ]).then(([poRes, erpRes]) => {
                  const poValues = poRes.data.result.map((item) => item.No);
                  const filteredErpData = erpRes.data.result.filter(
                    (item) => !poValues.includes(item.No)
                  );
                  const rowsWithIds = filteredErpData.map((row) => ({
                    ...row,
                    id: uuidv4(),
                  }));

                  setRows(rowsWithIds);
                  console.log("Data:");
                  console.log(rowsWithIds);

                  setAccordionData(rowsWithIds);
                });
              });
            } else {
              Swal.fire({
                title: res.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          });
        }
      },
    });
  };
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "No", headerName: "PO Number", width: 90 },
    {
      field: "Order_Date",
      headerName: "PO Date",
      width: 110,
      editable: true,
    },
    {
      field: "Payment_Terms_Code",
      headerName: "Payment Terms",
      width: 110,
      editable: true,
    },
    {
      field: "Buy_from_Vendor_Name",
      headerName: "Vendor Address",
      type: "string",
      width: 110,
      editable: true,

    },
    {
      field: "Customer_Name",
      headerName: "Customer Name",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Buy_from_Vendor_No",
      headerName: "Bill to",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Ship_to_Name",
      headerName: "Ship to",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Amount_to_Vendor",
      headerName: "Total Po Amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Billed_Amount",
      headerName: "Billed amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Unbilled_Amount",
      headerName: "Unbilled amt",
      type: "number",
      width: 110,
      editable: true,
    },

    // {
    //   field: "",
    //   headerName: "Manufacturing code",
    //   type: "number",
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: "",
    //   headerName: "Quote No",
    //   type: "number",
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: "",
    //   headerName: "Purchase spoc",
    //   type: "number",
    //   width: 110,
    //   editable: true,
    // },

  ];

  const viewFile = (event, file, row) => {
    if (event) {

      console.log("event", event);
      let text = event;
      let fname = text.split("/");
      fetch(`${process.env.REACT_APP_API_URL}/downloadPdfUploads/${fname[1]}`).then(
        (response) => {
          response.blob().then((blob) => {
            let url = URL.createObjectURL(blob, "application/pdf");
            window.open(url, "_blank");
          });
        }
      );
    } else {
      Swal.fire({
        title: "File not found",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const rendereWayBill = (params) => {
    return (params.row.No === "230010" && params.row.eWayBill) ||
      (params.row.No === "249812"  && params.row.eWayBill) ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.eWayBill)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendertransportDocument = (params) => {
    return params.row.No === "230010" && params.row.transportDocument ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.transportDocument)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendermiscDocs = (params) => {
    return (params.row.No === "230010" && params.row.miscDocs) ||
      (params.row.No === "249812" && params.row.miscDocs) ||
      (params.row.No === "220020" && params.row.miscDocs) ||
      (params.row.No === "220031" && params.row.miscDocs) ||
      (params.row.No === "220030" && params.row.miscDocs) ||
      (params.row.No === "220024" && params.row.miscDocs) ||
      (params.row.No === "220021" && params.row.miscDocs) ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.miscDocs)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderboe = (params) => {
    return params.row.No === "249812" && params.row.boe ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.boe)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderawb = (params) => {
    return params.row.No === "249812" && params.row.awb ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.boe)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderserviceAgreement = (params) => {
    return params.row.No === "220020" && params.row.serviceAgreement ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.serviceAgreement)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderlic = (params) => {
    return params.row.No === "220020" && params.row.lic ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.lic)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderlicDeliveryProof = (params) => {
    return params.row.No === "220020" && params.row.licDeliveryProof ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.licDeliveryProof)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderwarrantyCertificate = (params) => {
    return params.row.No === "220020" && params.row.warrantyCertificate ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.warrantyCertificate)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderirWcc = (params) => {
    return params.row.No === "220020" && params.row.irWcc ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.irWcc)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendersignOffFromCustomer = (params) => {
    return params.row.No === "220020" && params.row.signOffFromCustomer ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.signOffFromCustomer)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendercoc = (params) => {
    return params.row.No === "220020" && params.row.coc ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.coc)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderesiPayementChallan = (params) => {
    return params.row.No === "220021" && params.row.esiPayementChallan ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.esiPayementChallan)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderpfPayementChallan = (params) => {
    return params.row.No === "220021" && params.row.pfPayementChallan ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.pfPayementChallan)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderemployeeSummary = (params) => {
    return params.row.No === "220021" && params.row.employeeSummary ? (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.employeeSummary)}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderarWorking = (params) => {
    return (
      params.row.No === "220023" && params.row.arWorking ?
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.arWorking)}
            hidden
          />
        </Button>
      </strong>
      : <></>
    );
  };

  const renderdeliveryProof = (params) => {
    return (
      params.row.No === "220030" && params.row.deliveryProof ?
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.deliveryProof)}
            hidden
          />
        </Button>
      </strong>
      : <></>
    );
  };

  const rendercalculation = (params) => {
    return (
      params.row.No === "220030" && params.row.calculation ?
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.calculation)}
            hidden
          />
        </Button>
      </strong>
      : <></>
    );
  };

  const rendercustomExRate = (params) => {
    return (
      params.row.No === "220030" && params.row.customExRate ?
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          View File
          <input
            style={{ backgroundColor: "red" }}
            onClick={(e) => viewFile(params.row.customExRate)}
            hidden
          />
        </Button>
      </strong>
      : <></>
    );
  };

  const Invoicecolumns = [
    { field: "No", headerName: "PO Number", width: 90 },
    // {
    //   field: "Document_Type",
    //   headerName: "Document Type",
    //   width: 110,
    // },
    {
      field: "docDate",
      headerName: "DocDate",
      width: 110,
    },
    {
      field: "vendorInvoiceNo",
      headerName: "Vendor Invoice No ",
      width: 210,
      // editable: true,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <TextField
      //         // onChange={(event) => handleInvoiceChange(event, params.row)}
      //       >
      //         {params.row.vendorInvoiceNo}{" "}
      //       </TextField>
      //     </>
      //   );
      // },
    },
    {
      field: "srNo",
      headerName: "Sr No of Po",
      type: "string",
      width: 110,

    },
    {
      field: "glCode",
      headerName: "Item/GL Code",
      type: "number",
      width: 110,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "qty",
      headerName: "Quantity",
      type: "number",
      width: 110,
    },
    {
      field: "qtyDelivered",
      headerName: "Quantity delivered",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "rate",
      headerName: "Rate",
      type: "number",
      width: 110,
    },
    {
      field: "baseAmount",
      headerName: "Base amt",
      type: "number",
      width: 110,
    },
    {
      field: "taxAmount",
      headerName: "Tax amt",
      type: "number",
      width: 110,
    },
    {
      field: "grossAmount",
      headerName: "Gross amt",
      type: "number",
      width: 110,
    },
    {
      field: "eWayBill",
      headerName: "E-Way Bill",
      width: 120,
      renderCell: rendereWayBill,
    },
    {
      field: "transportDocument",
      headerName: "Transport Document",
      type: "number",
      width: 120,
      renderCell: rendertransportDocument,
    },
    {
      field: "miscDocs",
      headerName: "MISC Docs",
      type: "number",
      width: 110,
      renderCell: rendermiscDocs,
    },
    {
      field: "boe",
      headerName: "BOE",
      type: "number",
      width: 110,
      renderCell: renderboe,
    },
    {
      field: "awb",
      headerName: "AWB",
      type: "number",
      width: 110,
      renderCell: renderawb,
    },
    {
      field: "serviceAgreement",
      headerName: "Service Agreement",
      type: "number",
      width: 110,
      renderCell: renderserviceAgreement,
    },
    {
      field: "lic",
      headerName: "LIC",
      type: "number",
      width: 110,
      renderCell: renderlic,
    },
    {
      field: "licDeliveryProof",
      headerName: "LIC Delivery Proof",
      type: "number",
      width: 110,
      renderCell: renderlicDeliveryProof,
    },
    {
      field: "warrantyCertificate",
      headerName: "Warranty Certificate",
      type: "number",
      width: 110,
      renderCell: renderwarrantyCertificate,
    },
    {
      field: "irWcc",
      headerName: "IR/WCC",
      type: "number",
      width: 110,
      renderCell: renderirWcc,
    },
    {
      field: "signOffFromCustomer",
      headerName: "Sign off from customer",
      type: "number",
      width: 110,
      renderCell: rendersignOffFromCustomer,
    },
    {
      field: "coc",
      headerName: "COC",
      type: "number",
      width: 110,
      renderCell: rendercoc,
    },
    {
      field: "esiPayementChallan",
      headerName: "ESI Payment Challan",
      type: "number",
      width: 110,
      renderCell: renderesiPayementChallan,
    },
    {
      field: "pfPayementChallan",
      headerName: "PF Payment Challan",
      type: "number",
      width: 110,
      renderCell: renderpfPayementChallan,
    },
    {
      field: "employeeSummary",
      headerName: "Employee Summary",
      type: "number",
      width: 110,
      renderCell: renderemployeeSummary,
    },
    {
      field: "arWorking",
      headerName: "AR Working",
      type: "number",
      width: 110,
      renderCell: renderarWorking,
    },
    {
      field: "deliveryProof",
      headerName: "Deliver Proof",
      type: "number",
      width: 110,
      renderCell: renderdeliveryProof,
    },
    {
      field: "calculation",
      headerName: "Calculation",
      type: "number",
      width: 110,
      renderCell: rendercalculation,
    },
    {
      field: "customExRate",
      headerName: "Custom's EX Rate",
      type: "number",
      width: 110,
      renderCell: rendercustomExRate,
    },
  ];
  useEffect(() => {
    getPoList()
  }, []);

  const getPoList = async () => {
    Promise.all([apiService.getInvoiceinfo()]).then(
      ([invoiceRes]) => {
        // Process getPo response
        // const poValues = poRes.data.result.map((item) => item.No); // Modify 'someValue' to the actual property name you want to filter on
        // const filteredErpData = erpRes.data.result.filter(
        //   (item) => !poValues.includes(item.No) // Modify 'someValueToCompare' to the actual property name you want to compare with the 'getPo' response
        // );
        const invoiceValues = invoiceRes.data.result.filter((item) => item.level1ApprovalStatus !== "Approved" && item.level1ApprovalStatus !== "Rejected");
        let erpDATA = [{
          Document_Type: "Order",
          No: "BGL202223PO0007",
          Posting_Date: "2023-01-23T00:00:00",
          Case_Id_No: "IN603779",
          Buy_from_Vendor_No: "VLOC-2948",
          Order_Address_Code: "",
          Buy_from_Vendor_Name: "PROCURRI INDIA PRIVATE LIMITED",
          Vendor_Authorization_No: "",
          Buy_from_Post_Code: "560001",
          Buy_from_Country_Region_Code: "IND",
          Buy_from_Address: "Office No.312/3 Barton Centre, Mahatma Gandhi Road",
          Buy_from_Address_2: "Bangalore, Karnataka",
          Buy_from_Contact: "",
          Pay_to_Vendor_No: "VLOC-2948",
          Pay_to_Name: "PROCURRI INDIA PRIVATE LIMITED",
          Pay_to_Post_Code: "560001",
          Pay_to_Country_Region_Code: "IND",
          Pay_to_Contact: "",
          Ship_to_Code: "",
          Requested_Receipt_Date: "0001-01-01T00:00:00",
          Expected_Receipt_Date: "0001-01-01T00:00:00",
          Promised_Receipt_Date: "2022-11-25T00:00:00",
          Ship_to_Name: "HITACHI SYSTEMS INDIA PVT.LTD.",
          Ship_to_Post_Code: "560025",
          Ship_to_Country_Region_Code: "IND",
          Ship_to_Contact: "KM Akshay,08022456167,9686446905",
          Gen_Journal_Template_Code: "BGL-PO",
          Purchase_Order_Type: "Spares",
          Purchase_Order_Sub_Categories: "Product Support (H/w & S/w)",
          PO_Status: "Active",
          Shortcut_Dimension_1_Code: "11000",
          Shortcut_Dimension_2_Code: "DEL201508SOSLS0002",
          Turn_Over_Branch: "11000",
          Location_Code: "BGL-AMC",
          Purchaser_Code: "DELSARG",
          Bid_No: "NIL",
          Assigned_User_ID: "",
          Currency_Code: "",
          Document_Date: "2023-01-20T00:00:00",
          Status: "Released",
          Workflow_Status: "Approved",
          MSME_Vendor_Type: "Registered",
          Payment_Terms_Code: "30-D",
          Due_Date: "2023-02-19T00:00:00",
          Payment_Discount_Percent: "0",
          Payment_Method_Code: "",
          Shipment_Method_Code: "",
          Job_Queue_Status: " ",
          Unbilled_Amount: "21000",
          Billed_Amount: "0",
          Amount: "21000",
          Amount_to_Vendor: "24780",
          GST_Vendor_Type: "Registered",
          Created_by_ID: "MCIPL\\Y0017",
          Approver_Person_User_ID: "MCIPL\\M1546",
          Order_Date: "2022-11-24T00:00:00",
          CRM_ID: "",
          Salesperson_Code: "",
          Salesperson_Name: "",
          Pre_Sales_Person_Code: "",
          Pre_Salesperson_Name: "",
          Project_Manager_EMP_Code: "",
          Project_Manager_Name: "",
          Remarks: "",
          Customer_Name: "",
          Customer_Add1: "",
          Customer_Add2: "",
          Customer_GST: "",
          Contact_Person_Name: "",
          Contact_No: "",
          Customer_Email: "",
          ETag: "64;JgAAAACLAQAAAAJ7/0IARwBMADIAMAAyADIAMgAzAFAATwAwADAAMAA3AAAAAAA=10;59647679890;"
        }]
        let filteredErpData = [];
        filteredErpData.push(erpDATA[0])
        let filteredErpData2 = filteredErpData.filter(
          (item) => item.PO_Status === 'Active' // Modify 'someValueToCompare' to the actual property name you want to compare with the 'getPo' response
        );
        let arrayData = []
        for (let x in filteredErpData2) {
          arrayData.push(filteredErpData2[x])
        }
        for (let y in invoiceValues) {
          arrayData.push(invoiceValues[y])
        }

        const rowsWithIds = arrayData.map((row) => ({
          ...row,
          id: uuidv4(),
        }));

        setRows(rowsWithIds);
        console.log("Data:");
        console.log(rowsWithIds);

        setAccordionData(rowsWithIds);
      }
    );

  }
  const handlePageChange = (event, value) => {
    setPage(value);
    setExpanded(1);
  };

  const searchHandler = (e) => {
    let input;
    let newFilteredSuggestions;

    if (e.target.value) {
      input = e.currentTarget.value;
      newFilteredSuggestions = accordionData?.filter(
        (suggestion) =>
          suggestion.Buy_from_Vendor_Name ? suggestion.Buy_from_Vendor_Name.toLowerCase().indexOf(input.toLowerCase()) > -1 : suggestion.vendorName.toLowerCase().indexOf(input.toLowerCase()) > -1 
      );
      setAccordionData(newFilteredSuggestions);
    } else {
      getPoList();
    }
  };

  const filterHandler = async (e) => {
    setOpen(false);
    let newFilteredSuggestions;

    if (submitDate) {
      newFilteredSuggestions = accordionData?.filter(
        (suggestion) =>
          moment(suggestion.Order_Date).format("MMM DD") === submitDate
      );

      setAccordionData(newFilteredSuggestions);
    } else {
    }

    let newFilteredSuggestions2;
    if (dueDay) {
      newFilteredSuggestions2 = accordionData?.filter(
        (suggestion) =>
          differenceInDays(new Date(), new Date(suggestion.Order_Date)) ==
          dueDay
      );
      setAccordionData(newFilteredSuggestions2);
    } else {
      // getApprovalList();
    }
  };

  const dateHandler = (e) => {
    setsubmitDate(moment(e.$d).format("MMM DD"));
  };

  const dueDayHandler = (e) => {
    setdueDay(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: '#f3f4f7' }}>
        <CssBaseline />
        <AdminHeader team="PurchaseTeam" />
        <Box sx={{ display: 'flex' }}>
          <SideBar poTeam="PurchaseApproval" />
          <Box sx={{ mt: 2, width: '100%' }}>
            <Container>
              <Accordion className="accordion1" sx={{ mt: 1 }}>
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography
                    variant="h5"
                    sx={{ width: '40%', flexShrink: 0, fontWeight: 'bold' }}
                  >
                    Approvals
                  </Typography>
                  <Typography sx={{ width: '36%' }}></Typography>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={searchHandler}
                  />
                  <FilterAltIcon
                    sx={{ marginTop: 1 }}
                    onClick={() => {
                      filterHandler();
                      handleOpen();
                    }}
                  />
                </AccordionSummary>
              </Accordion>
              <Accordion className="accordion1">
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography
                    sx={{ width: '40%', flexShrink: 0, fontWeight: 'bold' }}
                  >
                    Vendor name
                  </Typography>
                  <Typography sx={{ width: '36%', fontWeight: 'bold' }}>
                    Task
                  </Typography>
                  <Typography sx={{ width: '12%', fontWeight: 'bold' }}>
                    Submit date
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>Age</Typography>
                </AccordionSummary>
              </Accordion>

              <>
                {accordionData?.slice(startIndex, endIndex).map((item, key) => <>

                  <Accordion expanded={expanded === 'panel' + item.No} key={key} onChange={handleChange('panel' + item.No)} >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${item.No}-content`}
                      id={`${item.No}-header`}
                    >
                      <IconButton
                        sx={{
                          p: 0,
                          width: "18%",
                          justifyContent: "flex-start",
                        }}
                      >
                        {item.image && item.image !== 'null' ? <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64, ${item.image}`} /> : <Typography variant="h4" sx={{ textTransform: 'uppercase' }}> {item.Buy_from_Vendor_Name ? item.Buy_from_Vendor_Name.charAt(0) : item.vendorName.charAt(0)}</Typography>}
                        <Typography >&nbsp;{item.Buy_from_Vendor_Name ? item.Buy_from_Vendor_Name : item.vendorName}</Typography>
                      </IconButton>
                      <Typography
                        textAlign="center"
                        sx={{
                          width: "55%",
                          flexShrink: 0,
                          my: "auto",
                          fontWeight: "bold",
                        }}
                      >
                        {item.Document_Type === "Order" ? "Review Advance Payment PO" : "Review Invoice"}
                      </Typography>
                      <Typography
                        textAlign="right"
                        sx={{
                          width: "10%",
                          flexShrink: 0,
                          my: "auto",
                          fontWeight: "bold",
                        }}
                      >
                        {format(new Date(item.Order_Date ? item.Order_Date : item.createdAt), 'dd MMM')}

                      </Typography>
                      <Typography
                        textAlign="right"
                        sx={{
                          width: "10%",
                          flexShrink: 0,
                          my: "auto",
                          fontWeight: "bold",
                        }}
                      >
                        {differenceInDays(new Date(), new Date(item.Order_Date ? item.Order_Date : item.createdAt))} {differenceInDays(new Date(), new Date(item.Order_Date ? item.Order_Date : item.createdAt)) > 1 ? "Days" : "Day"}
                      </Typography>
                    </AccordionSummary>
                    {item.Document_Type === 'Order' ?
                      <AccordionDetails>
                        <Box>
                          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Purchase Order</Typography>
                          <Box
                            sx={{
                              height: 300,
                              width: "100%",

                              "& .super-app-theme--header": {
                                backgroundColor: "#808080",
                                color: "#ffffff",
                              },
                              "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                                fontSize: 15,
                                fontWeight: "bold",
                              },
                              ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent": {
                                fontSize: 13,
                              },
                              ".css-bfht93-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                              {
                                backgroundColor: "#330033",
                                color: "#ffffff",
                              },
                              ".css-h4y409-MuiList-root": {
                                display: "grid",
                              },
                              ".css-1omg972-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                              {
                                backgroundColor: "#808080",
                              },
                            }}
                          >
                            <DataGrid
                              sx={{
                                boxShadow: 10,
                                borderRadius: 0,
                                fontSize: "14px",
                              }}
                              rows={rows}
                              columns={columns}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              //   checkboxSelection="none"
                              disableSelectionOnClick
                              experimentalFeatures={{ newEditingApi: false }}
                            />
                          </Box>
                          <div className="d-flex justify-content-end" sx={{ ml: 10 }}>
                            <MDBRow className="mb-4">
                              <div className="float-end">
                                <button
                                  type="button"
                                  onClick={(e) => handleReject(item.No, item.Document_Type)}
                                  className="btn basicbtn btn-md m-3"
                                >
                                  Reject
                                </button>

                                <button
                                  type="button"
                                  className="btn basicbtn btn-md m-3"
                                  onClick={(e) => handleApprove(item.No, item.Document_Type)}
                                >
                                  Approve
                                </button>
                              </div>
                            </MDBRow>
                          </div>
                        </Box>
                      </AccordionDetails>
                      : <></>}
                    {item.Document_Type === 'Invoice' ?
                      <AccordionDetails>
                        <Box>
                          {/* <Typography sx={{ ml: 1, fontWeight: "bold" }}>Purchase Order</Typography> */}
                          <Box
                            sx={{
                              height: 300,
                              width: "100%",

                              "& .super-app-theme--header": {
                                backgroundColor: "#808080",
                                color: "#ffffff",
                              },
                              "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                                fontSize: 15,
                                fontWeight: "bold",
                              },
                              ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent": {
                                fontSize: 13,
                              },
                              ".css-bfht93-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                              {
                                backgroundColor: "#330033",
                                color: "#ffffff",
                              },
                              ".css-h4y409-MuiList-root": {
                                display: "grid",
                              },
                              ".css-1omg972-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                              {
                                backgroundColor: "#808080",
                              },
                            }}
                          >
                            <DataGrid
                              sx={{
                                boxShadow: 10,
                                borderRadius: 0,
                                fontSize: "14px",
                              }}
                              rows={rows}
                              columns={Invoicecolumns}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              //   checkboxSelection="none"
                              disableSelectionOnClick
                              experimentalFeatures={{ newEditingApi: true }}
                            />
                          </Box>
                          <div className="d-flex justify-content-end" sx={{ ml: 10 }}>
                            <MDBRow className="mb-4">
                              <div className="float-end">
                                <button
                                  type="button"
                                  className="btn basicbtn btn-md m-3"
                                onClick={(e) => handleApprovalOnMail(item.No, item.Document_Type)}
                                >
                                  Send
                                </button>
                              </div>
                            </MDBRow>
                          </div>
                        </Box>
                      </AccordionDetails>
                      : <></>}
                  </Accordion>
                </>)}


                <Pagination style={{ float: 'right', marginTop: '1rem' }}
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </>
            </Container>
          </Box>
        </Box>
      </Box>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "16px", fontWeight: 600 }}
            >
              Filter Results For Approval
            </Typography>

            <HighlightOffIcon
              sx={{ float: "right", marginTop: "-31px", fontSize: "20px" }}
              onClick={() => {
                setOpen(false);
              }}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Submit Date" onChange={dateHandler} />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField1
                id="outlined-number"
                placeholder="Due Day"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => dueDayHandler(e)}
                sx={{ top: "9px" }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ float: "right", top: "25px" }}
            onClick={filterHandler}
          >
            Apply Filter
          </Button>
        </div>
      </Modal>
    </ThemeProvider>
  );
}
