import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box, useTheme, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleIcon from '@mui/icons-material/People';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Hotel Management', icon: <HotelIcon />, path: '/hotels' },
    { text: 'Room Management', icon: <HotelIcon />, path: '/rooms' },
    { text: 'Booking Management', icon: <EventNoteIcon />, path: '/bookings' },
    { text: 'Customer Management', icon: <PeopleIcon />, path: '/customers' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/users' },
    { text: 'Pricing & Offers', icon: <PriceChangeIcon />, path: '/pricing' },
    { text: 'Payments & Finance', icon: <MonetizationOnIcon />, path: '/finance' },
    { text: 'Reports & Analytics', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

/**
 * Reusable content template for both temporary (mobile) and permanent (desktop) drawers.
 */
const DrawerContent = (theme, onPageChange, currentPage) => (
    <>
        <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
            {/* Logo and App Name */}
            <Box display="flex" alignItems="center" sx={{ bgcolor: theme.palette.primary.main, p: 1, borderRadius: 1 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                    <span style={{ color: theme.palette.secondary.main }}>Hourly</span>Stay
                </Typography>
            </Box>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        <List>
            {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton 
                        selected={item.path === currentPage}
                        onClick={() => onPageChange(item.path)}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderLeft: `4px solid ${theme.palette.secondary.main}`,
                                '& .MuiListItemIcon-root': {
                                    color: theme.palette.secondary.main,
                                },
                                '& .MuiListItemText-primary': {
                                    fontWeight: 600,
                                }
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: item.path === currentPage ? theme.palette.secondary.main : 'white' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </>
);


/**
 * Main Sidebar component handling responsive switching between temporary and permanent drawer.
 */
export default function Sidebar({ mobileOpen, handleDrawerToggle, onPageChange, currentPage }) {
    const theme = useTheme();

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="Admin Navigation"
        >
            {/* Mobile Drawer (Temporary) - Hidden on sm+ screens */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, 
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: theme.palette.deepBackground.main,
                        color: '#ffffff',
                    },
                }}
            >
                {DrawerContent(theme, onPageChange, currentPage)}
            </Drawer>

            {/* Desktop Drawer (Permanent) - Hidden on xs screens */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: theme.palette.deepBackground.main,
                        color: '#ffffff',
                    },
                }}
                open
            >
                {DrawerContent(theme, onPageChange, currentPage)}
            </Drawer>
        </Box>
    );
}