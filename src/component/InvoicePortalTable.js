import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../css/ApprovalFields.css";
import apiService from "../services/api.service";
import { TextField } from "@material-ui/core";

export default function InvoicePortalTable(props) {
  const [invoiceInfo, setinvoiceInfo] = useState("");

  const [poinvoiceInfo, setPoinvoiceInfo] = useState();

  useEffect(() => {
    apiService.getInvoiceinfo().then((response) => {
      console.log("response---------->", response.data.result);
      setPoinvoiceInfo(response.data.result);
    });
  }, []);

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
    return (
      params.row.No === "220023" ?
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
      : <></>
    );
  };

  const renderdeliveryProof = (params) => {
    return (
      params.row.No === "220030" ?
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
      : <></>
    );
  };

  const rendercalculation = (params) => {
    return (
      params.row.No === "220030" ?
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
      : <></>
    );
  };

  const rendercustomExRate = (params) => {
    return (
      params.row.No === "220030" ?
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
      : <></>
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
      renderCell: (params) => {
        return (
          <>
            <TextField
              onChange={(event) => handleInvoiceChange(event, params.row)}
            >
              {params.row.vendorInvoiceNo}{" "}
            </TextField>
          </>
        );
      },
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

  const handleRequest = (e) => {
    e.preventDefault();
    if (invoiceInfo.length > 0) {
      console.log("invoiceInfo------------>", invoiceInfo);

      for (let i = 0; i < invoiceInfo.length; i++) {
        const data = new FormData();
        data.append("No", invoiceInfo[i].No);
        data.append("docDate", invoiceInfo[i].docDate);
        data.append("vendorInvoiceNo", invoiceInfo[i].vendorInvoiceNo);
        data.append("srNo", invoiceInfo[i].srNo);
        data.append("glCode", invoiceInfo[i].glCode);
        data.append("startDate", invoiceInfo[i].startDate);
        data.append("endDate", invoiceInfo[i].endDate);
        data.append("qty", invoiceInfo[i].qty);
        data.append("rate", invoiceInfo[i].rate);
        data.append("baseAmount", invoiceInfo[i].baseAmount);
        data.append("taxAmount", invoiceInfo[i].taxAmount);
        data.append("grossAmount", invoiceInfo[i].grossAmount);
        data.append("eWayBill", invoiceInfo[i].eWayBill);
        data.append("transportDocument", invoiceInfo[i].transportDocument);
        data.append("miscDocs", invoiceInfo[i].miscDocs);
        data.append("boe", invoiceInfo[i].boe);
        data.append("awb", invoiceInfo[i].awb);
        data.append("serviceAgreement", invoiceInfo[i].serviceAgreement);
        data.append("lic", invoiceInfo[i].lic);
        data.append("licDeliveryProof", invoiceInfo[i].licDeliveryProof);
        data.append("warrantyCertificate", invoiceInfo[i].warrantyCertificate);
        data.append("irWcc", invoiceInfo[i].irWcc);
        data.append("signOffFromCustomer", invoiceInfo[i].signOffFromCustomer);
        data.append("coc", invoiceInfo[i].coc);
        data.append("esiPayementChallan", invoiceInfo[i].esiPayementChallan);
        data.append("pfPayementChallan", invoiceInfo[i].pfPayementChallan);
        data.append("employeeSummary", invoiceInfo[i].employeeSummary);
        data.append("arWorking", invoiceInfo[i].arWorking);
        data.append("deliveryProof", invoiceInfo[i].deliveryProof);
        data.append("calculation", invoiceInfo[i].calculation);
        data.append("customExRate", invoiceInfo[i].customExRate);

        apiService.saveInvoiceInfo(data).then((response) => {
          if (response) {
            Swal.fire({
              title: "Data Saved",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
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
        });
      }
    }
  };

  return (
    <Box>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          sx={{
            boxShadow: 10,
            borderRadius: 0,
            fontSize: "14px",
          }}
          rows={poinvoiceInfo ? poinvoiceInfo : ""}
          getRowId={(rows) => rows.No}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = poinvoiceInfo.filter((row) =>
              selectedIDs.has(row.No)
            );
            if (selectedRowData) {
              setinvoiceInfo(selectedRowData);
            }
          }}
        />
      </div>
      <div className="float-end">
        <button
          type="button"
          onClick={(e) => handleRequest(e)}
          className="btn bankbtn btn-primary btn-md m-2"
        >
          Submit
        </button>
      </div>
    </Box>
  );
}
