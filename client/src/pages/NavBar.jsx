import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ThinkFlash
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={open}
                    onClose={handleClose}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem>
                    <MenuItem component={Link} to="/features" onClick={handleClose}>Features</MenuItem>
                    <MenuItem component={Link} to="/contact" onClick={handleClose}>Contact</MenuItem>
                </Menu>
                <Button component={Link} to="/" color="inherit">Home</Button>
                <Button component={Link} to="/features" color="inherit">Features</Button>
                <Button component={Link} to="/contact" color="inherit">Contact</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
