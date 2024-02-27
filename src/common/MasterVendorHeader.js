
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Logo1 from "../img/logo1.png";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import Swal from "sweetalert2";
import auth from "../auth/auth-helper";
import { useNavigate } from "react-router-dom";
const pages = ['Home', 'Admin', 'Master'];
const settings = ['Logout'];
function MasterVendorHeader() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [handleVcode,sethandleVcode]= useState();
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
 
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);
        if (e.target.innerText==='Logout'){
            Swal.fire({
              title: "are You sure?",
              text: "You Want to Logout!",
              icon: "warning",
              dangerMode: true,
              confirmButtonText: "Yes",
              showCloseButton: true,
              cancelButtonText: "No",
              showCancelButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                auth.clearJWT(() => navigate("/login"));
              }
            });
          }
       
    };
    const darkTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#FFFFFF',
            },
        },
    });

    return (
        <ThemeProvider theme={darkTheme} >
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2, my: 2,
                                display: { xs: 'none', sm: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img className="img1" src={Logo1} alt="" />
                        </Typography>
                        <Button style={{ textTransform: 'capitalize' }}
                            sx={{ mx: 4, mt: 1, color: '#B1000E', display: { xs: 'none', sm: 'flex' }, }}
                        >
                            <h5> <b>Master Vendor</b></h5>
                        </Button>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" sx={{ color: '#B1000E' }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', sm: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                my: 2
                            }}
                        >
                            <img className="img1" src={Logo1} alt="" />
                        </Typography>

                        <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', my: 2 } }}>
                            <Tooltip title="Mail">
                                <IconButton onClick={handleOpenUserMenu} >
                                    <MailIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Notifications">
                                <IconButton >
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={(e) => {handleCloseUserMenu(e)}}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default MasterVendorHeader

