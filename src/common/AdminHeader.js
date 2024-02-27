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
import Logo1 from '../img/logo1.png';
import Swal from "sweetalert2";
import auth from "../auth/auth-helper";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = ['Home', 'Admin', 'Master'];
const settings = ['Change password', 'Logout'];
function AdminHeader(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
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
    if (e==='Logout'){
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
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              // href="/"
              sx={{
                mr: 2,
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
                    <Typography textAlign="center" sx={{ color: '#B1000E' }}>
                      {page}
                    </Typography>
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
                my: 2,
              }}
            >
              <img className="img1" src={Logo1} alt="" />
            </Typography>
            {props.team === 'vendor' ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', my: 2 } }}
              >
                <Button
                  style={{ textTransform: 'capitalize' }}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 3,
                    mr: 2,
                    color: '#B1000E',
                    fontWeight: '700',
                    display: 'block',
                  }}
                >
                  Vendor Creation Team
                </Button>
              </Box>
            ) : (
              ''
            )}
            {props.team === 'japanTeam' ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', my: 2 } }}
              >
                <Button
                  style={{ textTransform: 'capitalize' }}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 3,
                    mr: 2,
                    color: '#B1000E',
                    fontWeight: '700',
                    display: 'block',
                  }}
                >
                  Japan Team
                </Button>
              </Box>
            ) : (
              ''
            )}
            {props.team === 'mrtTeam' ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', my: 2 } }}
              >
                <Button
                  style={{ textTransform: 'capitalize' }}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 3,
                    mr: 2,
                    color: '#B1000E',
                    fontWeight: '700',
                    display: 'block',
                  }}
                >
                  MRT Team
                </Button>
              </Box>
            ) : (
              ''
            )}
            {props.team === 'PurchaseTeam' ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', my: 2 } }}
              >
                <Button
                  style={{ textTransform: 'capitalize' }}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 3,
                    mr: 2,
                    color: '#B1000E',
                    fontWeight: '700',
                    display: 'block',
                  }}
                >
                  Purchase Team
                </Button>
              </Box>
            ) : (
              ''
            )}
               {props.team === 'FinanceTeam' ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', my: 2 } }}
              >
                <Button
                  style={{ textTransform: 'capitalize' }}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 3,
                    mr: 2,
                    color: '#B1000E',
                    fontWeight: '700',
                    display: 'block',
                  }}
                >
                  Finance Team
                </Button>
              </Box>
            ) : (
              ''
            )}

            {props.team === 'InvoiceTeam' ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', my: 2 } }}
              >
                <Button
                  style={{ textTransform: 'capitalize' }}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 3,
                    mr: 2,
                    color: '#B1000E',
                    fontWeight: '700',
                    display: 'block',
                  }}
                >
                  Invoice Team
                </Button>
              </Box>
            ) : (
              ''
            )}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
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
                  <MenuItem key={setting} onClick={(e) => { handleCloseUserMenu(setting)}}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default AdminHeader;
