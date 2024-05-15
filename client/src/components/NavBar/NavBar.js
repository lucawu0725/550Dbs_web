import React, { useState } from "react";
import { AppBar, Container,IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import { NavLink } from 'react-router-dom';
import DropdownMenu from "../DropdownMenu/DropdownMenu"


// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
function NavText({ href, text, isMain }) {
  return (
    <Typography
      variant={isMain ? 'h5' : 'h7'}
      noWrap
      style={{
        marginRight: '30px',
        fontFamily: 'Russo One, sans-serif',
        fontWeight: 700,
        letterSpacing: '.1rem',
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}

// Here, we define the NavBar. Note that we heavily leverage MUI components
// to make the component look nice. Feel free to try changing the formatting
// props to how it changes the look of the component.
export default function NavBar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  // const navigate = useNavigate(); //NavLink

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static' style={{ width: '100%', padding: '0 1rem' }} sx={{ backgroundColor: theme.palette.primary.main }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          
          {/* Burger Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>


          <NavText href='/' text='CrimeTrack' isMain />
          <NavText href='/map' text='MAP' />
          <NavText href='/police' text='POLICE' />
          <NavText href='/search' text='SEARCH' />

        {/* Spacer to push icons to the right */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        {/* Help Icon */}
        <IconButton
          color="inherit"
          aria-label="help"
        >
          <HelpIcon />
        </IconButton>

        </Toolbar>

        <DropdownMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        />

      </Container>
    </AppBar>
  );
}
