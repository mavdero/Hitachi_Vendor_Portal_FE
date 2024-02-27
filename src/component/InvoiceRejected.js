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

import { React, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Invoice from "./Invoice";

import SideBar from "./SideBar";
export default function InvoiceRejected() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });
  useEffect(() => {}, []);

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
                    Rejected
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
                <Accordion
                  expanded={expanded === "panel"}
                  onChange={handleChange("panel")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelbh-content"
                    id={"panel1bh-header"}
                  >
                    <IconButton
                      sx={{
                        p: 0,
                        width: "18%",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Typography>&nbsp;{"xyz"}</Typography>
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
                      Review invoice
                    </Typography>
                    <Typography
                      textAlign="right"
                      sx={{
                        width: "10%",
                        flexShrink: 0,
                        my: "auto",
                        fontWeight: "bold",
                        ml: 2,
                      }}
                    >
                      Dec 30
                    </Typography>
                    <Typography
                      textAlign="right"
                      sx={{
                        width: "10%",
                        flexShrink: 0,
                        my: "auto",
                        fontWeight: "bold",
                        ml: 2,
                      }}
                    >
                      2 days
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Invoice invoiceTeam="invoiceApproval" />
                  </AccordionDetails>
                </Accordion>
              </>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
