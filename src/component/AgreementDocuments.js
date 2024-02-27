import React from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export default function AgreementDocuments() {
    const data = [{
        document: "Agreement 1",
        company: 'ABC Company',
        status: 'Active'
    },
    {
        document: "Agreement 2",
        company: 'ABC Company',
        status: 'Inprogress'
    },
    {
        document: "Agreement 3",
        company: 'ABC Company',
        status: 'rejected'
    }]
    const theme = createTheme({
        Link: {
            textTransform: "none",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box style={{ backgroundColor: '#f3f4f7' }}  >
               
                    <div className='container-fluid'>
                        <form>
                            <div className="container">
                                <Typography sx={{ fontWeight: 'bold', fontSize: '25px', p: 2 }}>Agreements</Typography>
                                <div className="container bg-white p-5" sx={{ Color: 'red', p: 2 }}>

                                    <div className="container">
                                        <Accordion className="accordion1" sx={{ boxShadow: "5" }}>
                                            <AccordionSummary
                                                aria-controls="panel3a-content"
                                                id="panel3a-header"
                                            >
                                                <Typography
                                                    sx={{ width: '35%', flexShrink: 0, fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}
                                                >
                                                    Document Name
                                                </Typography>
                                                <Typography sx={{ width: '36%', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
                                                    {/* Company/Vendorcode */}
                                                </Typography>
                                                <Typography sx={{ width: '35%', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
                                                    status
                                                </Typography>
                                                {/* <Typography sx={{ fontWeight: 'bold' }}>Age</Typography> */}
                                            </AccordionSummary>
                                        </Accordion >
                                        {data?.map((item, key) =>
                                            <Accordion className="accordion1" key={key} sx={{ boxShadow: "5" }}>
                                                <AccordionSummary
                                                    aria-controls="panel3a-content"
                                                    id="panel3a-header"
                                                >
                                                    <Typography
                                                        sx={{ width: '35%', flexShrink: 0, fontWeight: 'bold', textAlign: 'center' }}
                                                    >
                                                        {item.document}
                                                    </Typography>
                                                    <Typography sx={{ width: '36%', fontWeight: 'bold', textAlign: 'center' }}>
                                                        {/* {item.company} */}
                                                    </Typography>
                                                    <Typography sx={{ width: '35%', fontWeight: 'bold', textAlign: 'center' }}>
                                                        {item.status === 'Active' ? <CheckCircleOutlineIcon style={{ color: "green" }} /> : ""}
                                                        {item.status === 'Inprogress' ? <CheckCircleOutlineIcon style={{ color: "blue" }} /> : ""}
                                                        {item.status === 'rejected' ? <ErrorOutlineIcon style={{ color: "red" }} /> : ""}
                                                        
                                                        {/* <PanoramaFishEyeTwoToneIcon style={{ color: "red" }} /> */}
                                                        {/* {item.status === 'InActive' ? <CheckCircleOutlineIcon style={{ color: "red" }} /> : ""} */}
                                                    </Typography>
                                                </AccordionSummary>
                                            </Accordion>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-end mt-3" sx={{ ml: 10 }}>
                                    <div className="float-end" sx={{ textTransform: 'capitalize' }}>
                                            <button
                                                type="button"
                                                className="btn basicbtn btn-md m-3"
                                            //   onClick={(e) => handleApprovalOnMail(item.id, item.Document_Type)}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
        </ThemeProvider>
    )
}
