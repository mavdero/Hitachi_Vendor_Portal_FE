import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Container, ThemeProvider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import apiService from "../services/api.service";
import PurchaseOrder from "./PurchaseOrder";
import SideBar from "./SideBar";
import { v4 as uuidv4 } from "uuid";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { MDBRow } from "mdb-react-ui-kit";
import { format, differenceInDays } from "date-fns";
import Button from "@mui/material/Button";
export default function PoReject() {
  const [expanded, setExpanded] = useState(false);
  const [Document_Type, setDocument_Type] = useState("");
  const [accordionData, setAccordionData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(accordionData?.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const handleChange = (panel) => (event, isExpanded) => {
    // console.log("panel::", panel);
    setExpanded(isExpanded ? panel : false);
    const number = panel.substring(5);
    const filteredAccordionData = accordionData.filter(
      (item) => item.No === number
    );

    // console.log("accy677::", number, filteredAccordionData);
    setRows(filteredAccordionData);
  };

  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });
  const [rows, setRows] = useState([]);

  const ewayBillUpload = (event, file, row) => {
    row.eWayBill = event.target.files[0];
  };

  const transportDocumentUpload = (event, file, row) => {
    row.transportDocument = event.target.files[0];
  };

  const miscDocsUpload = (event, file, row) => {
    row.miscDocs = event.target.files[0];
  };

  const boeUpload = (event, file, row) => {
    row.boe = event.target.files[0];
  };

  const awbUpload = (event, file, row) => {
    row.awb = event.target.files[0];
  };

  const serviceAgreementUpload = (event, file, row) => {
    row.serviceAgreement = event.target.files[0];
  };

  const licUpload = (event, file, row) => {
    row.lic = event.target.files[0];
  };

  const licDeliveryProofUpload = (event, file, row) => {
    row.licDeliveryProof = event.target.files[0];
  };

  const warrantyCertificateUpload = (event, file, row) => {
    row.warrantyCertificate = event.target.files[0];
  };

  const irWccUpload = (event, file, row) => {
    row.irWcc = event.target.files[0];
  };

  const signOffFromCustomerUpload = (event, file, row) => {
    row.signOffFromCustomer = event.target.files[0];
  };

  const cocUpload = (event, file, row) => {
    row.coc = event.target.files[0];
  };

  const esiPayementChallanUpload = (event, file, row) => {
    row.esiPayementChallan = event.target.files[0];
  };

  const pfPayementChallanUpload = (event, file, row) => {
    row.pfPayementChallan = event.target.files[0];
  };

  const employeeSummaryUpload = (event, file, row) => {
    row.employeeSummary = event.target.files[0];
  };

  const arWorkingUpload = (event, file, row) => {
    row.arWorking = event.target.files[0];
  };

  const deliveryProofUpload = (event, file, row) => {
    row.deliveryProof = event.target.files[0];
  };

  const calculationUpload = (event, file, row) => {
    row.calculation = event.target.files[0];
  };

  const customExRateUpload = (event, file, row) => {
    row.customExRate = event.target.files[0];
  };

  const rendereWayBill = (params) => {
    return params.row.No === "230010" ||
      params.row.No === "249812" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              ewayBillUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendertransportDocument = (params) => {
    return params.row.No === "230010" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              transportDocumentUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendermiscDocs = (params) => {
    return params.row.No === "230010" ||
      params.row.No === "249812" ||
      params.row.No === "220020" ||
      params.row.No === "220031" ||
      params.row.No === "220030" ||
      params.row.No === "220024" ||
      params.row.No === "220021" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              miscDocsUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderboe = (params) => {
    return params.row.No === "249812" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              boeUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderawb = (params) => {
    return params.row.No === "249812" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              awbUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderserviceAgreement = (params) => {
    return params.row.No === "220020" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              serviceAgreementUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderlic = (params) => {
    return params.row.No === "220020" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              licUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderlicDeliveryProof = (params) => {
    return params.row.No === "220020" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              licDeliveryProofUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderwarrantyCertificate = (params) => {
    return params.row.No === "220020" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              warrantyCertificateUpload(
                event,
                event.target.files[0],
                params.row
              );
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderirWcc = (params) => {
    return params.row.No === "220020" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              irWccUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendersignOffFromCustomer = (params) => {
    return params.row.No === "220020" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              signOffFromCustomerUpload(
                event,
                event.target.files[0],
                params.row
              );
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendercoc = (params) => {
    return params.row.No === "220020" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              cocUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderesiPayementChallan = (params) => {
    return params.row.No === "220021" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              esiPayementChallanUpload(
                event,
                event.target.files[0],
                params.row
              );
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderpfPayementChallan = (params) => {
    return params.row.No === "220021" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              pfPayementChallanUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderemployeeSummary = (params) => {
    return params.row.No === "220021" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              employeeSummaryUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderarWorking = (params) => {
    return params.row.No === "220023" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              arWorkingUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const renderdeliveryProof = (params) => {
    return params.row.No === "220030" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              deliveryProofUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendercalculation = (params) => {
    return params.row.No === "220030" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              calculationUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const rendercustomExRate = (params) => {
    return params.row.No === "220030" ? (
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
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              customExRateUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    ) : (
      <></>
    );
  };

  const handleInvoiceChange = (event, row) => {
    row.vendorInvoiceNo = event.target.value;
  };

  const columns = [
    { field: "No", headerName: "PO Number", width: 90 },
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
  // const columns = [
  //   { field: "No", headerName: "PO Number", width: 90 },
  //   {
  //     field: "Order_Date",
  //     headerName: "PO Date",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "Payment_Terms_Code",
  //     headerName: "Payment Terms",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "Buy_from_Vendor_Name",
  //     headerName: "Vendor Address",
  //     type: "string",
  //     width: 110,
  //     editable: true,

  //   },
  //   {
  //     field: "Customer_Name",
  //     headerName: "Customer Name",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "Buy_from_Vendor_No",
  //     headerName: "Bill to",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "Ship_to_Name",
  //     headerName: "Ship to",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "Amount_to_Vendor",
  //     headerName: "Total Po Amt",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "Billed_Amount",
  //     headerName: "Billed amt",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "Unbilled_Amount",
  //     headerName: "Unbilled amt",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   // {
  //   //   field: "",
  //   //   headerName: "Manufacturing code",
  //   //   type: "number",
  //   //   width: 110,
  //   //   editable: true,
  //   // },
  //   // {
  //   //   field: "",
  //   //   headerName: "Quote No",
  //   //   type: "number",
  //   //   width: 110,
  //   //   editable: true,
  //   // },
  //   // {
  //   //   field: "",
  //   //   headerName: "Purchase spoc",
  //   //   type: "number",
  //   //   width: 110,
  //   //   editable: true,
  //   // },

  // ];
  useEffect(() => {
    apiService.getInvoiceinfo().then((res) => {
      const filteredData = res.data.result.filter(
        (item) =>
          item.level1ApprovalStatus !== "Approved" &&
          item.level1ApprovalStatus !== "Rejected"
      );
      setAccordionData(filteredData);
    });
  }, []);
  const handlePageChange = (event, value) => {
    setPage(value);
    setExpanded(1);
  };

  const handleApprove = (e, No) => {
    console.log("e----------->", e);
    console.log("item----------->", No);
    apiService.updateApprovalInvoice(No)
  };

  const handleReject = (e, No) => {
    console.log("e----------->", e);
    console.log("item----------->", No);

    Swal.fire({
        heightAuto: true,
        title: "Review vendor details",
        html: `<div class="rejectstyle">
              <textarea rows="10" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
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
          if (!comment ) {
            Swal.showValidationMessage(`Please enter comments`);
          } else {
            const data = new FormData();
            data.append("level1ApprovalStatus", comment);
            data.append("level1rejectInvoicedoc", rejectdoc);
  
            apiService.updateApprovalInvoice(data, No)
          }
        },
      });

  }

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: "#f3f4f7" }}>
        <CssBaseline />
        <AdminHeader team="InvoiceTeam" />
        <Box sx={{ display: "flex" }}>
          <SideBar invoiceTeam="invoiceApproval" />
          <Box sx={{ mt: 2, width: "100%" }}>
            <Container>
              <Accordion className="accordion1" sx={{ mt: 1 }}>
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography
                    variant="h5"
                    sx={{ width: "40%", flexShrink: 0, fontWeight: "bold" }}
                  >
                    Approvals
                  </Typography>
                  <Typography sx={{ width: "36%" }}></Typography>
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
                  />
                </AccordionSummary>
              </Accordion>
              <Accordion className="accordion1">
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography
                    sx={{ width: "40%", flexShrink: 0, fontWeight: "bold" }}
                  >
                    Vendor name
                  </Typography>
                  <Typography sx={{ width: "36%", fontWeight: "bold" }}>
                    Task
                  </Typography>
                  <Typography sx={{ width: "12%", fontWeight: "bold" }}>
                    Submit date
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>Age</Typography>
                </AccordionSummary>
              </Accordion>

              <>
                {accordionData?.slice(startIndex, endIndex).map((item, key) => (
                  <>
                    <Accordion
                      expanded={expanded === "panel" + item.No}
                      key={key}
                      onChange={handleChange("panel" + item.No)}
                    >
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
                          {item.image && item.image !== "null" ? (
                            <Avatar
                              alt="Remy Sharp"
                              src={`data:image/jpeg;base64, ${item.image}`}
                            />
                          ) : (
                            <Typography
                              variant="h4"
                              sx={{ textTransform: "uppercase" }}
                            >
                              {" "}
                              {item.Buy_from_Vendor_Name?.charAt(0)}
                            </Typography>
                          )}
                          <Typography>&nbsp;{item.No}</Typography>
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
                          Review Invoice
                          {/* {item.Document_Type === "Order" ? "Review PO" : "Review Invoice"} */}
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
                          {/* {format(new Date(item.Order_Date), 'dd MMM')} */}
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
                          {differenceInDays(
                            new Date(),
                            new Date(item.Order_Date)
                          )}{" "}
                          {differenceInDays(
                            new Date(),
                            new Date(item.Order_Date)
                          ) > 1
                            ? "Days"
                            : "Day"}
                        </Typography>
                      </AccordionSummary>
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
                              ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent":
                                {
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
                              experimentalFeatures={{ newEditingApi: true }}
                            />
                          </Box>
                          <div
                            className="d-flex justify-content-end"
                            sx={{ ml: 10 }}
                          >
                            <MDBRow className="mb-4">
                              <div className="float-end">
                                <button
                                  type="button"
                                  // onClick={(e) => handleReject(item.No, item.Document_Type)}
                                  className="btn basicbtn btn-md m-3"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleReject(e, item.No)}
                                  className="btn basicbtn btn-md m-3"
                                >
                                  Reject
                                </button>

                                <button
                                  type="button"
                                  className="btn basicbtn btn-md m-3"
                                  onClick={(e) => handleApprove(e, item.No)}
                                >
                                  Approve
                                </button>
                              </div>
                            </MDBRow>
                          </div>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </>
                ))}

                {/* <Accordion
                  expanded={expanded === 'panel'}
                  onChange={handleChange('panel')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelbh-content"
                    id={'panel1bh-header'}
                  >
                    <IconButton
                      sx={{
                        p: 0,
                        width: '18%',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Typography>&nbsp;{'xyz'}</Typography>
                    </IconButton>
                    {Document_Type === 'order' ? (
    <Typography
      textAlign="center"
      sx={{
        width: '55%',
        flexShrink: 0,
        my: 'auto',
        fontWeight: 'bold',
      }}
    >
      Review Po
    </Typography>
  ) : (
    <Typography
      textAlign="center"
      sx={{
        width: '55%',
        flexShrink: 0,
        my: 'auto',
        fontWeight: 'bold',
      }}
    >
      Review Invoice
    </Typography>
  )}
                    <Typography
                      textAlign="right"
                      sx={{
                        width: '10%',
                        flexShrink: 0,
                        my: 'auto',
                        fontWeight: 'bold',
                        ml: 2,
                      }}
                    >
                      Dec 30
                    </Typography>
                    <Typography
                      textAlign="right"
                      sx={{
                        width: '10%',
                        flexShrink: 0,
                        my: 'auto',
                        fontWeight: 'bold',
                        ml: 2,
                      }}
                    >
                      2 days
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PurchaseOrder />
                  </AccordionDetails>
                </Accordion> */}
                <Pagination
                  style={{ float: "right", marginTop: "1rem" }}
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
    </ThemeProvider>
  );
}
