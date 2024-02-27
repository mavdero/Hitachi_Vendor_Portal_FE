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
import SideBar from "./SideBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
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
import { createTheme } from "@mui/material/styles";

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
        width: 450,
        height: 200,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: 10,
        padding: theme.spacing(2, 4, 3),
    },
}));

function JapanRejectedVendors() {
    const [expanded, setExpanded] = useState(false);
    const [vendors, setvendors] = useState([]);
    const [submitDate, setsubmitDate] = useState();
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
    useEffect(() => {
        japanRejectStatus();
    }, [])

    const japanRejectStatus = async () => {
        const Level2rejected = [];
        apiService.getApprovalList().then((res) => {
            setFilter(res.data.result);
            if (res.data.result) {
                res.data.result.forEach((item) => {
                    if (item.level2Status === "rejected") {
                        var date1 = new Date();
                        var date01 = new Date(item.createdAt);
                        var date2 = new Date();
                        date2.setDate(date01.getDate() + 3);
                        var Difference_In_Time = date2.getTime() - date1.getTime();
                        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        item.updatedAt = Difference_In_Days;
                        const s = moment(item.level2Date).format("MMM DD");
                        item.level2Date = s;
                        Level2rejected.push(item);
                    }
                });
                setvendors([]);
                setvendors((array) => [...array, ...Level2rejected]);
            }
        });
    };

    const filterHandler = (e) => {
        setOpen(false);
        let newFilteredSuggestions;

        if (submitDate) {
            newFilteredSuggestions = filter?.filter(
                (suggestion) => suggestion.level2Date === submitDate
            );

            setvendors(newFilteredSuggestions);
        } else {
        }
    };

    const dateHandler = (e) => {
        setsubmitDate(moment(e.$d).format("MMM DD"));
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
            japanRejectStatus();
        }
    };
    return (
        <Box style={{ backgroundColor: '#f3f4f7' }} sx={{ height: '100vh', backgroundColor: 'gray' }} >
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
                                <Typography variant="h5" sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Rejected</Typography>
                                <Typography sx={{ width: '36%', }}></Typography>
                                <TextField
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
                            </AccordionSummary>
                        </Accordion>
                        <Accordion className='accordion1'>
                            <AccordionSummary
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Vendor name</Typography>
                                <Typography sx={{ width: '36%', }}></Typography>
                                <Typography sx={{ width: '12%', fontWeight: "bold" }}>Rejected date</Typography>
                                <Typography sx={{ width: '20%',padding: '0 15px',fontWeight: "bold" }}>Mrt Status</Typography>
                                
                                {/* <Typography sx={{ fontWeight: "bold" }}>Age</Typography> */}
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
                                    <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.level2Date}</Typography>
                                                                        <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.level3Status === 'approved'
    ? 'Approved'
    : item.level3Status === 'rejected'
    ? 'Rejected'
    : 'Pending'}</Typography>
                                    {/* <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.updatedAt} {item.updatedAt > 1 ? "Days" : "Day"}</Typography> */}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ApprovalFields userid={item.userId} />
                                </AccordionDetails>
                            </Accordion>
                        </>)}
                    </Container>
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

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker label="Rejected Date" onChange={dateHandler} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        sx={{ float: "right", top: "25px" }}
                        onClick={filterHandler}
                    >
                        Apply Filter
                    </Button>
                </div>
            </Modal>
        </Box>
    )
}

export default JapanRejectedVendors

