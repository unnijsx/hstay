import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 240;

export default function Header({ handleDrawerToggle }) {
    const theme = useTheme();

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                // Adjust width to account for the permanent sidebar on desktop (sm and up)
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                bgcolor: 'white',
                color: 'black',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
            }}
        >
            <Toolbar>
                {/* Menu Button visible only on mobile (xs) */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    HourlyStay Admin Dashboard
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex' }}>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>SA</Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}