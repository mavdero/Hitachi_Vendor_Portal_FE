import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VendorPortalHeader from "../common/VendorPortalHeader";
import VendorPortSidemenu from "../common/VendorPortSidemenu";
import Button from "@mui/material/Button";
import { CustomFooterTotalComponent } from "./CustomFooterTotalComponent";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import * as saveAs from "file-saver";
import "../css/ApprovalFields.css";

function AccountStatements() {
  const [total, setTotal] = useState("");
  const [totall, setTotall] = useState("");
  const [acList, setacList] = useState("");
  const [acState, setacState] = useState("CurrentAccount");


  const [ledgerDetail, setledgerDetail] = useState("");


  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });

  useEffect(() => {
    apiService.vendorApprovalList().then((response) => {
      setacList(response.data.result);
    });
    apiService.getVendorLedgerEntriesById(vendorCodeDoc).then((response) => {
      setledgerDetail(response.data.value);
    });

  }, []);

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          style={{ marginLeft: 16 }}
          onClick={(event) => {
            handleRejectChange(event, params.row);
          }}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          sx={{
            "&:hover": { backgroundColor: "#4f4f4f" },
            textTransform: "capitalize",
            backgroundColor: "#4f4f4f",
          }}
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(event) => {
            handleApproveChange(event, params.row);
          }}
        >
          Approve
        </Button>
      </strong>
    );
  };
  const handleRejectChange = (event, value) => {

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
        if (!comment || !rejectdoc) {
          Swal.showValidationMessage(`Please enter comments and file`);
        } else {
          
          const data = new FormData();
          data.append("comment", comment);
          data.append("rejectdoc", rejectdoc);
          const No = value.Entry_No;
          apiService.rejectAccStatementDetail(data,No).then((res) => {
    
          });

        }
      },
    });
  };

  const handleApproveChange = (event, value) => {
    apiService.approveAccStatementDetail(value).then((res) => {
    
    });
  };

  const columns = [
    {
      field: "Vendor_Name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "Document_Date",
      headerName: "Document Date",
      width: 150,
      editable: true,
    },
    {
      field: "External_Document_No",
      headerName: "External Document No.",
      width: 160,
      editable: true,
    },
    {
      field: "Purchase_Order_No",
      headerName: "Purchase Order No.",
      width: 150,
      editable: true,
    },
    {
      field: "TDS_Amt",
      headerName: "TDS Amount",
      width: 150,
      editable: true,
    },
    {
      field: "Remaining_Amount",
      headerName: "Remaining Amount",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "",
      renderCell: renderDetailsButton,
      width: 300,
    },
  ];

  const rows = [];
  const row = [];


  const column = [
    {
      field: "Vendor_Name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "Document_Date",
      headerName: "Document Date",
      width: 150,
      editable: true,
    },
    {
      field: "External_Document_No",
      headerName: "External Document No.",
      width: 160,
      editable: true,
    },
    {
      field: "Purchase_Order_No",
      headerName: "Purchase Order No.",
      width: 150,
      editable: true,
    },
    {
      field: "TDS_Amt",
      headerName: "TDS Amount",
      width: 150,
      editable: true,
    },
    {
      field: "Remaining_Amount",
      headerName: "Amount",
      width: 150,
      editable: true,
    },
  ];
  const handleExcelDownload = (event) => {
    event.preventDefault();
    const filetype =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;Charset=UTF-8";
    apiService.downloadCurrentAccountStatement().then((response) => {
      console.log("response------------------------------>>>>>",response.data)
      const data = new Blob([response.data], { type: filetype });
      saveAs(data, "CurrentAccountStatement.xlsx");
    });
  };

  const handleExcelDownoad = (event) => {
    event.preventDefault();
    const filetype =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;Charset=UTF-8";
    apiService.downloadAccStatementConfirmation().then((response) => {
      const data = new Blob([response.data], { type: filetype });
      saveAs(data, "AccountStatment.xlsx");
    });
  };

  const openCurrentAccount = (event) => {
    setacState("CurrentAccount");
  };
  const openStatementConfirmation = (event) => {
    setacState("StatementConfirmation");
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
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                boxShadow: "1px 2px 1px #B1000E",
                margin: " 2em 2em",
                padding: "1rem",
              }}
            >
              <Typography
                sx={{
                  ml: 2,
                  width: "40%",
                  flexShrink: 0,
                  fontWeight: "normal",
                  ...(acState === "CurrentAccount" && {
                    fontWeight: "bold",
                  }),

                  color: "#B1000E",
                  cursor: "pointer",
                }}
                onClick={openCurrentAccount}
              >
                CURRENT ACCOUNT STATEMENT
              </Typography>
              <Typography
                sx={{
                  width: "60%",
                  flexShrink: 0,
                  color: "#B1000E",
                  fontWeight: "normal",
                  cursor: "pointer",
                  ...(acState === "StatementConfirmation" && {
                    fontWeight: "bold",
                  }),
                }}
                onClick={openStatementConfirmation}
              >
                ACCOUNT STATEMENT CONFIRMATION
              </Typography>
            </Box>
            <Container>
              {acState === "StatementConfirmation" ? (
                <Box sx={{ mt: 2, height: 300, width: "100%" }}>
                  <Typography variant="p" sx={{ mt: 2 }}>
                    Kindly find the details of the outstanding balance as of
                    (report run rate), Kindly review the same and let us know if
                    you have found any difference in the outstanding balance,
                    kindly approve/reject based on the showing detail or you can
                    mention the comments here for the disputed items we will
                    connect to you for the detail to close the same.
                  </Typography>
                  <DataGrid
                    sx={{ backgroundColor: "white", mt: 2 }}
                    rows={ledgerDetail ? ledgerDetail : ""}
                    getRowId={(rows) => rows.Entry_No}
                    columns={columns}
                    components={{
                      Footer: CustomFooterTotalComponent,
                    }}
                    componentsProps={{
                      footer: { total },
                    }}
                    onStateChange={(state) => {
                      const visibleRows = state.filter.visibleRowsLookup;
                      let visibleItems = [];
                      for (const [id, value] of Object.entries(visibleRows)) {
                        if (value === true) {
                          visibleItems.push(id);
                        }
                      }
                      let total = 0;
                      for (let i = 0; i < rows.length; i++) {
                        let val = parseFloat(
                          rows[i].remainAmt.replace(/\,/g, "")
                        );
                        total += val;
                        setTotal(
                          total.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          })
                        );
                      }
                    }}
                  />
                  <div className="float-end">
                    <button
                      type="button"
                      onClick={(e) => handleExcelDownoad(e)}
                      className="btn bankbtn btn-primary btn-md m-2"
                    >
                      Download
                    </button>
                  </div>
                </Box>
              ) : (
                <>
                  <Box sx={{ mt: 2, height: 350, width: "100%" }}>
                    <DataGrid
                      sx={{ backgroundColor: "white", mt: 2 }}
                      rows={ledgerDetail ? ledgerDetail : ""}
                      getRowId={(rows) => rows.Entry_No}
                      columns={column}
                      components={{
                        Footer: CustomFooterTotalComponent,
                      }}
                      componentsProps={{
                        footer: { totall },
                      }}
                      onStateChange={(state) => {
                        const visibleRows = state.filter.visibleRowsLookup;
                        let visibleItems = [];
                        for (const [id, value] of Object.entries(visibleRows)) {
                          if (value === true) {
                            visibleItems.push(id);
                          }
                        }
                        let totall = 0;
                        for (let i = 0; i < row.length; i++) {
                          let val = parseFloat(row[i].Amt.replace(/\,/g, ""));

                          totall += val;

                          setTotall(
                            totall.toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })
                          );
                        }
                      }}
                    />
                    <div className="float-end">
                      <button
                        type="button"
                        onClick={(e) => handleExcelDownload(e)}
                        className="btn bankbtn btn-primary btn-md m-2"
                      >
                        Download
                      </button>
                    </div>
                  </Box>
                </>
              )}
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AccountStatements;
