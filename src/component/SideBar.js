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
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export const SideBar = (props) => {
  const [open, setOpen] = useState(false);
  const sidemenuOpen = () => {
    setOpen(!open);
  };
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
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
        {props.japan === 'JapanTeam' ? (
          <>
            <List sx={{ my: 3 }}>
              <ListItem
                disablePadding
                component={Link}
                to="/japanTeam"
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
                    <GppGoodIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approvals"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/japanapprovedVendors"
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
                    <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approved"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/japanrejectedVendors"
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
                    <EventBusyIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rejected"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : props.MRT === 'MRTteam' ? (
          <>
            <List>
              <ListItem
                disablePadding
                component={Link}
                to="/MRTteam"
                sx={{
                  backgroundColor: pathname === '/MRTteam' ? 'gray' : '',
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
                    <GppGoodIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approvals"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/approvalReq"
                sx={{
                  backgroundColor: pathname === '/approvalReq' ? 'gray' : '',
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
                    <NoteAltIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Requests"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/MRTapprovedvendors"
                sx={{
                  backgroundColor:
                    pathname === '/MRTapprovedvendors' ? 'gray' : '',
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
                    <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approved"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/MRTrejectedvendors"
                sx={{
                  backgroundColor:
                    pathname === '/MRTrejectedvendors' ? 'gray' : '',
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
                    <EventBusyIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rejected"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : props.FinanceTeam ? (
          <>
            <List sx={{ my: 3 }}>
              <ListItem
                disablePadding
                component={Link}
                to="/FinanceTeam"
                sx={{
                  backgroundColor: pathname === '/FinanceTeam' ? 'gray' : '',
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
                    <HourglassBottomIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Inprogress"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/FinanceTeamApproved"
                sx={{
                  backgroundColor: pathname === '/FinanceTeamApproved' ? 'gray' : '',
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
                    <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approved"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/FinanceTeamRejected"
                sx={{
                  backgroundColor: pathname === '/FinanceTeamRejected' ? 'gray' : '',
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
                    <EventBusyIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rejected"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
            ) :props.poTeam ? (
          <>
            <List sx={{ my: 3 }}>
              <ListItem
                disablePadding
                component={Link}
                to="/poTeam"
                sx={{
                  backgroundColor: pathname === '/poTeam' ? 'gray' : '',
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
                    <HourglassBottomIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Inprogress"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/poApproved"
                sx={{
                  backgroundColor: pathname === '/poApproved' ? 'gray' : '',
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
                    <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approved"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/poRejected"
                sx={{
                  backgroundColor: pathname === '/poRejected' ? 'gray' : '',
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
                    <EventBusyIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rejected"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
            ) : props.invoiceTeam ? (
              <>
                <List sx={{ my: 3 }}>
                  <ListItem
                    disablePadding
                    component={Link}
                    to="/invoiceTeam"
                    sx={{
                      backgroundColor: pathname === '/poTeam' ? 'gray' : '',
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
                        <HourglassBottomIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Inprogress"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    component={Link}
                    to="/invoiceApproved"
                    sx={{
                      backgroundColor: pathname === '/poApproved' ? 'gray' : '',
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
                        <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Approved"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    component={Link}
                      to="/invoiceRejected"
                    sx={{
                      backgroundColor: pathname === '/poRejected' ? 'gray' : '',
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
                        <EventBusyIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Rejected"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </>
            ) : (
          <>
            <List>
              <ListItem
                sx={{
                  backgroundColor: pathname === '/approval' ? 'gray' : '',
                  borderRadius: '20px',
                  color: 'white',
                }}
                disablePadding
                component={Link}
                to="/approval"
              >
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: 'gray' },
                    borderRadius: '20px',
                  }}
                >
                  <ListItemIcon>
                    <GppGoodIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approvals"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              {/* <ListItem disablePadding component={Link} to="/approvalReq" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <NoteAltIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Requests" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem> */}
              <ListItem
                disablePadding
                component={Link}
                to="/approvedVendors"
                sx={{
                  backgroundColor:
                    pathname === '/approvedVendors' ? 'gray' : '',
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
                    <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Approved"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                component={Link}
                to="/RejectedVendors"
                sx={{
                  backgroundColor:
                    pathname === '/RejectedVendors' ? 'gray' : '',
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
                    <EventBusyIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rejected"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </nav>
    </Box>
  );
};

export default SideBar;
