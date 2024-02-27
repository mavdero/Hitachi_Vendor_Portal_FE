import React ,{ useState } from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from "@mui/material/Typography";
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AgreementSidemenu from '../common/AgreementSidemenu';
import AgreementHeader from '../common/AgreementHeader';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function Assent() {
    const [expanded, setExpanded] = useState(false);
    const data = [{
        id:'1',
        document: "Agreement 1",
        company: 'ABC Company',
        status: 'Active'
    },
    {
        id: '2',
        document: "Agreement 2",
        company: 'ABC Company',
        status: 'Inprogress'
    },
    {
        id: '3',
        document: "Agreement 3",
        company: 'ABC Company',
        status: 'InActive'
    }]
    const theme = createTheme({
        Link: {
            textTransform: "none",
        },
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfdata, setpdfdata] = useState("");
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const handlefileUpload=async(e)=> {
        e.preventDefault();

        await fetch(`${process.env.REACT_APP_API_URL}/downloadPdfUploads/Resume@Kewin.pdf`).then(
            (response) => {
                response.blob().then((blob) => {
                    console.log("e.target", blob)
                    let url = URL.createObjectURL(blob, "application/pdf");
                    setpdfdata(url)

                });
            }
        );
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Box style={{ backgroundColor: '#f3f4f7' }}  >
                <CssBaseline />
                <AgreementHeader team="vendor" />
                <Box sx={{ display: 'flex' }}>
                    <AgreementSidemenu />
                    <div className='container-fluid'>
                        <form>
                            <div className="container">
                                <Typography sx={{ fontWeight: 'bold', fontSize: '25px', p: 2 }}>Assent</Typography>
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
                                                    Company/Vendorcode
                                                </Typography>
                                                <Typography sx={{ width: '35%', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
                                                    status
                                                </Typography>
                                                {/* <Typography sx={{ fontWeight: 'bold' }}>Age</Typography> */}
                                            </AccordionSummary>
                                        </Accordion >
                                        {data?.map((item, key) =>
                                            <Accordion expanded={expanded === 'panel' + item.id} onChange={handleChange('panel' + item.id)} className="accordion1" key={key} sx={{ boxShadow: "5" }}>
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
                                                        {item.company}
                                                    </Typography>
                                                    <Typography sx={{ width: '35%', fontWeight: 'bold', textAlign: 'center' }}>
                                                        {item.status === 'Active' ? <PanoramaFishEyeTwoToneIcon style={{ color: "green" }} /> : ""}
                                                        {item.status === 'Inprogress' ? <PanoramaFishEyeTwoToneIcon style={{ color: "yellow" }} /> : ""}
                                                        {/* <PanoramaFishEyeTwoToneIcon style={{ color: "red" }} /> */}
                                                        {item.status === 'InActive' ? <PanoramaFishEyeTwoToneIcon style={{ color: "red" }} /> : ""}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div style={{height:"400px",overflowY:"scroll"}}>
                                                        <input type="file"  onChange={(e)=>handlefileUpload(e)} />
                                                        <Document file={pdfdata} onLoadSuccess={onDocumentLoadSuccess} >
                                                            <Page pageNumber={pageNumber} />
                                                           
                                                        </Document>
                                                        
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-end mt-3" sx={{ ml: 10 }}>
                                        <div className="float-end">
                                            <button
                                                type="button"
                                                className="btn basicbtn btn-md m-3"
                                            //   onClick={(e) => handleApprovalOnMail(item.id, item.Document_Type)}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
