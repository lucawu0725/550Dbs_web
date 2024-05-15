import React from "react";
import { useNavigate } from 'react-router-dom';

import { Menu, MenuItem, ListItemText, ListItemIcon, useTheme } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function DropdownMenu ({ anchorEl, open = false, onClose }){
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#222',
        //   backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.light,
        },
      }}
    >
      <MenuItem onClick={() => handleNavigate('/map')}>
          <ListItemIcon>
            <MapOutlinedIcon fontSize="small" style={{color: theme.palette.primary.main}}/>
          </ListItemIcon>
          <ListItemText>Map</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/police')}>
          <ListItemIcon>
            <StairsOutlinedIcon fontSize="small" style={{color: theme.palette.primary.main}}/>
          </ListItemIcon>
          <ListItemText>Police</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/search')}>
          <ListItemIcon>
            <SchoolOutlinedIcon fontSize="small" style={{color: theme.palette.primary.main}}/>
          </ListItemIcon>
          <ListItemText>Search</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/maintenance')}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon fontSize="small" style={{color: theme.palette.primary.main}}/>
          </ListItemIcon>
          <ListItemText>Something</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/maintenance')}>
          <ListItemIcon>
            <ShoppingBagOutlinedIcon fontSize="small" style={{color: theme.palette.primary.main}}/>
          </ListItemIcon>
          <ListItemText>Something</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/maintenance')}>
          <ListItemIcon>
            <CallOutlinedIcon fontSize="small" style={{color: theme.palette.primary.main}}/>
          </ListItemIcon>
          <ListItemText>Something</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/')}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" style={{color: theme.palette.primary.main}}/>
          </ListItemIcon>
          <ListItemText>OUT</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default DropdownMenu;
