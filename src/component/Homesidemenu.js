import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PaidIcon from '@mui/icons-material/Paid';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ReceiptIcon from '@mui/icons-material/Receipt';
export const Homesidemenu = (props) => {
    const [open, setOpen] = useState(false);
    const sidemenuOpen = () => {
        setOpen(!open);
    };
    const { pathname } = useLocation();

    return (
        <Box
            sx={{
                width: '100%',
                ...(open && { width: 'auto' }),
                maxWidth: 250,
                minHeight: '100vh',
                bgcolor: '#B1000E',
                color: 'white',
            }}
        >
            <Box sx={{ p:3}}>
                <IconButton sx={{ width: '18%', justifyContent: 'flex-start' }} >
                    {/* <Box> */}
                    <Avatar alt="Hitachi" src="/static/images/avatar/2.jpg" />
                    <Typography sx={{fontWeight:'1500px',color:'white'}}>&nbsp;Hitachi</Typography>
                    {/* </Box> */}
                </IconButton>
            </Box>
            <nav aria-label="main mailbox folders">
           
                <List sx={{  }}>
                    <ListItem
                        disablePadding
                       
                        sx={{
                            backgroundColor: pathname === '/japanTeam' ? 'gray' : '',
                            borderRadius: '20px',
                            color: 'white',
                        }}
                    >
                        <ListItemButton
                            sx={{
                                '&:hover': { backgroundColor: 'gray' },
                                borderRadius: '20px',
                            }}
                        >
                            <ListItemIcon>
                                <HomeIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Home"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                       
                        sx={{
                            backgroundColor:
                                pathname === '/japanapprovedVendors' ? 'gray' : '',
                            borderRadius: '20px',
                            color: 'white',
                        }}
                    >
                        <ListItemButton
                            sx={{
                                '&:hover': { backgroundColor: 'gray' },
                                borderRadius: '20px',
                            }}
                        >
                            <ListItemIcon>
                                <ShoppingBagIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Purchase Orders"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                       
                        sx={{
                            backgroundColor:
                                pathname === '/japanrejectedVendors' ? 'gray' : '',
                            borderRadius: '20px',
                            color: 'white',
                        }}
                    >
                        <ListItemButton
                            sx={{
                                '&:hover': { backgroundColor: 'gray' },
                                borderRadius: '20px',
                            }}
                        >
                            <ListItemIcon>
                                <ReceiptIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Invoices"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            />
                        </ListItemButton>
                    </ListItem>



                    <ListItem
                        disablePadding
                      
                        sx={{
                            backgroundColor:
                                pathname === '/japanrejectedVendors' ? 'gray' : '',
                            borderRadius: '20px',
                            color: 'white',
                        }}
                    >
                        <ListItemButton
                            sx={{
                                '&:hover': { backgroundColor: 'gray' },
                                borderRadius: '20px',
                            }}
                        >
                            <ListItemIcon>
                                <PaidIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Payments Received"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        disablePadding
                       
                        sx={{
                            backgroundColor:
                                pathname === '/japanrejectedVendors' ? 'gray' : '',
                            borderRadius: '20px',
                            color: 'white',
                        }}
                    >
                        <ListItemButton
                            sx={{
                                '&:hover': { backgroundColor: 'gray' },
                                borderRadius: '20px',
                            }}
                        >
                            <ListItemIcon>
                                <FileCopyIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Statements"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
        
    );
};

export default Homesidemenu;
