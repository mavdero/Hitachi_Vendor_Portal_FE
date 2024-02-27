import React, { useState, useEffect } from "react";
import AdminHeader from "../common/AdminHeader";
import apiService from "../services/api.service";
import CssBaseline from "@mui/material/CssBaseline";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import ApprovalFields from "./ApprovalFields";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import SideBar from "./SideBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import TextField1 from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/material";
import moment from "moment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from '@mui/material/Grid';

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

function JapanTeam() {
    const [expanded, setExpanded] = useState(false);
    const [vendors, setvendors] = useState([]);
    const [submitDate, setsubmitDate] = useState();
    const [dueDay, setdueDay] = useState();
    const [filter, setFilter] = useState([]);


    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const theme = createTheme({
        Link: {
            textTransform: "none",
        },
    });
    const [reloadAdminPage, setReloadAdminPage] = useState(false);

    const handleAdminPageReload = () => {
     console.log("pageRefreshed::")
      setReloadAdminPage(true);
    };
    useEffect(() => {
        getApprovalStatus();
        if (reloadAdminPage) {
            getApprovalStatus();
            setReloadAdminPage(false);
          }
        }, [reloadAdminPage]);

    const getApprovalStatus = async () => {
        apiService.getApprovedStatus().then((res) => {
            setFilter(res.data.result)
            if (res.data.result) {
                res.data.result.forEach((item) => {


                    var subDate = new Date(item.createdAt);
                    var currentDate = new Date();
                    var timeDifference = currentDate - subDate;
                    var differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    var adjustedDifference = differenceInDays;
            item.updatedAt =adjustedDifference;
                    const s = moment(item.createdAt).format('MMM DD');
                    item.createdAt = s
                });
                setvendors([]);
                var newArray = res.data.result.filter(function (item) {
                    return (
                        item.level2Status !== "approved" && item.level2Status !== "rejected"
                    );
                });
                setvendors((array) => [...array, ...newArray]);
            }
        });
    };

    const filterHandler = (e) => {
        setOpen(false);
        let newFilteredSuggestions;

        if (submitDate) {
            newFilteredSuggestions = filter?.filter(
                (suggestion) =>
                    suggestion.createdAt === submitDate
            );

            setvendors(newFilteredSuggestions);
        } 

        else if (dueDay) {
            let newFilteredSuggestions2;

            console.log("due day---------------->>>>>>",dueDay)
            console.log("filter-------filter-------->>>>>>",filter)
            newFilteredSuggestions2 = filter?.filter(
                (suggestion) =>
                    suggestion.updatedAt == dueDay
            );

            // setvendors(newFilteredSuggestions2);
            setvendors([]);
        var newArray = newFilteredSuggestions2.filter(function (item) {
                return (
                    item.level2Status !== "approved" && item.level2Status !== "rejected"
                );
            });
            setvendors((array) => [...array, ...newArray]);
          } else {
            // getApprovalList();
          }

    };

    const dateHandler = (e) => {
        setsubmitDate(moment(e.$d).format("MMM DD"));
    };
    const dueDayHandler = (e) => {
        console.log("setdueDay", e.target.value)
        setdueDay(e.target.value);
      };


    const searchHandler = (e) => {
        let input;
        let newFilteredSuggestions;

        if (e.target.value.length > 3) {
            input = e.currentTarget.value;
            newFilteredSuggestions = vendors?.filter(
                (suggestion) =>
                    suggestion.companyName.toLowerCase().indexOf(input.toLowerCase()) > -1
            );
            setvendors(newFilteredSuggestions);
        } else {
            getApprovalStatus();
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Box style={{ backgroundColor: '#f3f4f7' }}  >
                <CssBaseline />
                <AdminHeader team="japanTeam" />
                <Box sx={{ display: 'flex' }}>
                    <SideBar japan="JapanTeam" />
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <Container>
                            <Accordion className='accordion1' sx={{ mt: 1 }}>
                                <AccordionSummary
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography variant="h5" sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Approvals</Typography>
                                    <Typography sx={{ width: '36%', }}></Typography>
                                    <TextField
                                        // label="With normal TextField"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
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
                                    {/* <Typography sx={{ width: '12%', fontWeight: "bold" }}>Submit date</Typography> */}
                                    {/* <Typography justifyContent="flex-end" sx={{ fontWeight: "bold" }}>Search</Typography> */}
                                </AccordionSummary>
                            </Accordion>
                            <Accordion className='accordion1' >
                                <AccordionSummary
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Company name</Typography>
                                    <Typography sx={{ width: '36%', }}></Typography>
                                    <Typography sx={{ width: '12%', fontWeight: "bold" }}>Submit date</Typography>
                                    <Typography sx={{ fontWeight: "bold" }}>Age</Typography>
                                </AccordionSummary>
                            </Accordion>
                            {vendors?.map((item, key) => <>
                                <Accordion expanded={expanded === 'panel' + item.id} key={key} onChange={handleChange('panel' + item.id)} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panelbh-content"
                                        id={"panel1bh-header"}
                                    >
                                        <IconButton sx={{ p: 0, width: '18%', justifyContent: 'flex-start' }} >
                                            {item.image && item.image !== 'null' ? <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64, ${item.image}`} /> : <Typography variant="h6" sx={{ border: 'none', width: '40px', backgroundColor: '#0001', borderRadius: '50%', textTransform: 'uppercase' }}> {item.companyName?.charAt(0)}</Typography>}
                                            <Typography >&nbsp;{item.companyName}</Typography>
                                        </IconButton>
                                        <Typography textAlign="center" sx={{ width: '55%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>{item.userStatus === "MasterData" ? "Review updated vendor details" : "Review Vendor Details"}</Typography>
                                        <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.createdAt}</Typography>
                                        <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.updatedAt} {item.updatedAt > 1 ? "Days" : "Day"}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ApprovalFields userid={item.userId} onApprovaljapanDone={handleAdminPageReload} japan="JapanTeam" />
                                    </AccordionDetails>
                                </Accordion>
                            </>)}
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
            <Typography variant="h6" gutterBottom sx={{ fontSize: "16px",fontWeight: 600 }}>
              Filter Results For Approval
            </Typography>

            <HighlightOffIcon
              sx={{ float: "right", marginTop: "-31px", fontSize: "20px" }}
              onClick={() => {
                setOpen(false);;
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
    )
}

export default JapanTeam
