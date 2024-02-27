import styled from "@emotion/styled";
import { createTheme } from "@material-ui/core/styles";
import { Button, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import VendorPortalHeader from "../common/VendorPortalHeader";
import VendorPortSidemenu from "../common/VendorPortSidemenu";
import "../css/ApprovalFields.css";
import apiService from "../services/api.service";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";

const theme = createTheme({
  Link: {
    textTransform: "none",
  },
});

const EstimateDeliveryDate = () => {

  const [poData, setPoData] = useState();
  const [edd, setEdd] = useState();

  console.log("poData--->", poData);
  console.log("edd--->", edd);

  const columns = [
    {
      name: "No",
      label: "PO Number",
    },
    {
      name: "Payment_Terms_Code",
      label: "Payment Terms",
    },
    {
      name: "Order_Date",
      label: "PO Date",
    },
    {
      name: "Buy_from_Vendor_Name",
      label: "Vendor Address",
    },
    {
      name: "Customer_Name",
      label: "Customer Name",
    },
    {
      name: "Buy_from_Vendor_No",
      label: "Bill To",
    },
    {
      name: "Ship_to_Name",
      label: "Ship To",
    },
    {
      name: "Amount_to_Vendor",
      label: "Total PoAmt",
    },
    {
      name: "Billed_Amount",
      label: "Billed Amt",
    },
    {
      name: "Unbilled_Amount",
      label: "Unbilled Amt",
    },
    {
      name: "PO_Status",
      label: "Manufacturing code",
    },
    {
      name: "quoteno",
      label: "Quote No",
    },
    {
      name: "Purchaser_Code",
      label: "Purchase spoc",
    },
    {
      name: "Workflow_Status",
      label: "Others",
    },
    {
      name: "Expected_Receipt_Date",
      label: "EDD",
      options: {
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <TextField
              id="outlined-basic"
              type="date"
              required defaultValue={value}
              InputProps={{
                readOnly: false,
              }}
              variant="outlined"
              sx={{
                border: "1px solid black",
                borderRadius: "4px",
              }}
            />
          )
        }
      } // correct position of `options` closing parenthesis
    },
  ];


  useEffect(() => {
    apiService.getErpPurchaseOrder_API().then((res) => {
      setPoData(res.data.value)
    })
    apiService.getErpPurchaseOrderLineEDD_API().then((res) => {
      setEdd(res.data.value)
    })

  }, []);

  const data = poData ? poData : [];

  const rows = edd ? edd : [];

  let purchList = [];
  let purchLine = [];

  const onRowSelectionChange = async (ev, ex, ez) => {
    purchList = [];
    purchLine = [];
    for (let i = 0; i < ex.length; i++) {
      for (let j = 0; j < poData.length; j++) {
        if (j === ex[i].index) {
          purchList.push(poData[ex[i].index]);
          for (let k = 0; k < rows.length; k++) {
            if (poData[j].No === rows[k].Document_No) {
              purchLine.push(rows[k]);
            }
          }
        }
      }
    }

  };

  const handleEddDate = (e, item) => {
    console.log("item---------->", e);
    item.Expected_Receipt_Date = e;
  }

  const handleStartDate = (e, item) => {
    console.log("item---------->", e);
    item.Start_Date = e;
  }

  const handleEndDate = (e, item) => {
    console.log("item---------->", e);
    item.End_Date = e;
  }

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPage: 10,
    rowsPerPageOptions: [1, 3, 5, 6, 10],
    jumpToPage: true,
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items Per Page",
        displayRows: "OF",
      },
    },
    filter: false,
    download: false,
    print: false,
    selectableRowsHeader: true,
    expandableRowsHeader: false,
    selectableRows: "multiple",

    onRowSelectionChange,

    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <React.Fragment>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table style={{ minWidth: "1000" }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#0001" }}>
                    <TableRow>
                      <TableCell align="center">Document_Type</TableCell>
                      <TableCell align="center">Document_No</TableCell>
                      <TableCell align="center">Line_No</TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">VendorName</TableCell>
                      <TableCell align="center">EDD</TableCell>
                      <TableCell align="center">Start Period</TableCell>
                      <TableCell align="center">End Period</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .filter((row) => {
                        return row.Document_No === rowData[0];
                      })
                      .map((item) => (
                        <TableRow key={item.Line_No}>
                          <TableCell align="center">
                            {item.Document_Type}
                          </TableCell>
                          <TableCell align="center">
                            {item.Document_No}
                          </TableCell>
                          <TableCell align="center">{item.Line_No}</TableCell>
                          <TableCell align="center">{item.Type}</TableCell>
                          <TableCell align="center">
                            {item.Description}
                          </TableCell>
                          <TableCell align="center">
                            {item.Document_No ? poData?.find((po) => po.No === item.Document_No)?.Buy_from_Vendor_Name : ""}
                          </TableCell>
                          <TableCell>
                            {item.Type === "Item" ? (
                              <Box>
                                <TextField
                                  id="outlined-basic"
                                  type="date"
                                  variant="outlined"
                                  onChange={(e) => handleEddDate(e.target.value, item)}
                                  sx={{
                                    border: "1px solid black",
                                    borderRadius: "4px",
                                  }}
                                />
                              </Box>
                            ) : (
                              <></>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.Type === "G/L Account" ? (
                              <Box>
                                <TextField
                                  id="outlined-basic"
                                  type="date"
                                  variant="outlined"
                                  onChange={(e) => handleStartDate(e.target.value, item)}
                                  sx={{
                                    border: "1px solid black",
                                    borderRadius: "4px",
                                  }}
                                />
                              </Box>
                            ) : (
                              <></>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.Type === "G/L Account" ? (
                              <Box>
                                <TextField
                                  id="outlined-basic"
                                  type="date"
                                  variant="outlined"
                                  onChange={(e) => handleEndDate(e.target.value, item)}
                                  sx={{
                                    border: "1px solid black",
                                    borderRadius: "4px",
                                  }}
                                />
                              </Box>
                            ) : (
                              <></>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    },
  };

  const DataTableContainer = styled("div")(() => ({
    width: "1010px",
    margin: "10px",
  }));

  const submitPOdetails = () => {
    console.log("1111111111", purchList, purchLine);
    // apiService.postErpPurchaseOrderList(purchList);
    // apiService.postErpPurchaseOrderLine(purchLine);
    for (let i = 0; i < purchLine.length; i++) {
      apiService.postEddDetails(purchLine[i]).then((res) => {
        if (res.data.status === "success") {
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
  };
  const [vendorCodeDoc, setvendorCodeDoc] = useState();
  const handleVcode = (msg) => {
    setvendorCodeDoc(msg);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: "#f3f4f7" }}>
        <CssBaseline />
        <VendorPortalHeader handleVcode={handleVcode} />
        <Box sx={{ display: "flex" }}>
          <VendorPortSidemenu />
          <DataTableContainer>
            <MUIDataTable
              title={"EDD list"}
              data={data}
              columns={columns}
              options={options}
            />

            <Button
              variant="contained"
              sx={{ float: "right", top: "5px" }}
              onClick={submitPOdetails}
            >
              Submit
            </Button>
          </DataTableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EstimateDeliveryDate;
