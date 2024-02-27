import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useLocation } from 'react-router-dom';
export const AgreementSidemenu = (props) => {
    const [open, setOpen] = useState(false);
    const sidemenuOpen = () => {
        setOpen(!open);
    };
    const { pathname } = useLocation();

    return (
        <>
            <Box
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: '100%',
                    ...(open && { width: '60px' }),
                    maxWidth: 180,
                    minHeight: '100vh',
                    bgcolor: '#B1000E',
                    color: 'white',
                }}
            >
                <nav aria-label="main mailbox folders">
                    <List>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={sidemenuOpen}
                            sx={{ ml: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </List>
                    <List>
                        <ListItem disablePadding sx={{ color: 'white' }}>
                            <ListItemButton
                                sx={{
                                    '&:hover': { backgroundColor: 'gray' },
                                    borderRadius: '20px',
                                }}
                            >
                                <ListItemIcon>
                                    <DescriptionOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Agreement"
                                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                                />
                            </ListItemButton>
                        </ListItem>

                        <ListItem
                            disablePadding
                            component={Link}
                            to="/assent"
                            sx={{
                                color: 'white',
                                backgroundColor: pathname === '/assent' ? 'gray' : '',
                                borderRadius: '20px',
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    '&:hover': { backgroundColor: 'gray' },
                                    borderRadius: '20px',
                                }}
                            >
                                <ListItemIcon>
                                    <SaveAsOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Assent"
                                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </>
    );
};

export default AgreementSidemenu;
