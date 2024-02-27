import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React,{useState,useEffect } from "react";
import apiService from "../services/api.service";
import Button from "@mui/material/Button";
import "../css/ApprovalFields.css";



export default function OpenPurchaseOrder(props) {
  const [poData, setpoData] = useState();
  const getPOdownload =(e)=>{
    apiService.getPOfileDownload().then((response) => {
      console.log("res=============>>>>>>",response)
    })
  }
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
    {
      // NO
      field: "mfgcode",
      headerName: "Manufacturing code",
      type: "number",
      width: 110,
      editable: true,
    },
    {
       // NO
      field: "quoteno",
      headerName: "Quote No",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Purchaser_Code",
      headerName: "Purchase spoc",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "podownload",
      headerName: "PO Download",
      type: "number",
      width: 110,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "#4F4F4F" },
              textTransform: "capitalize",
              backgroundColor: "#4F4F4F",
            }}
            onClick={getPOdownload}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Download
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    console.log("response------PO order------000000----->>>>>>>>>")
    apiService.getErpPurchaseOrder_API().then((res) => {
      setpoData(res.data.value)
      console.log("response------PO order----111111111111------->>>>>>>>>",res.data.value)
    })
  },[poData])

  return (
    <Box>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          sx={{
            boxShadow: 10,
            borderRadius: 0,
            fontSize: "14px",
          }}
          rows={poData?poData:[]}
          getRowId={(rows) => rows?.No}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          headerName
          //   checkboxSelection="none"
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>

     
    </Box>
  );
}
