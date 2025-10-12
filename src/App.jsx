import React, { useState } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';

// Layout Components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';

// Page Components
import Dashboard from './pages/Dashboard';
import HotelManagement from './pages/HotelManagement';
import RoomManagement from './pages/RoomManagement';     
import BookingManagement from './pages/BookingManagement';
import CustomerManagement from './pages/CustomerManagement';
import UserManagement from './pages/UserManagement';       
import ReportsAnalytics from './pages/ReportsAnalytics';
import Settings from './pages/Settings';
import PricingOffers from './pages/PricingOffers';
import PaymentsFinance from './pages/PaymentsFinance';
import CreateBooking from './pages/CreateBooking'; 

const drawerWidth = 240;

/**
 * Fallback component for pages not found or not detailed.
 */
const PlaceholderPage = ({ title }) => (
    <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>{title}</Typography>
        <Typography variant="body1">Content for {title} management coming soon. (Responsive Layout)</Typography>
    </Box>
);


export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/dashboard'); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handlePageChange = (path) => {
    // IMPORTANT: Adding console log here to verify the function is called
    console.log("Navigating to:", path); 
    setCurrentPage(path);
    setMobileOpen(false); 
  }

  // --- FIX: pageMap DEFINED INSIDE APP() ---
  // This allows us to pass the handlePageChange function to Dashboard.
  const pageMap = {
      '/dashboard': <Dashboard onNavigate={handlePageChange} />, // NOW PASSES PROP
      '/hotels': <HotelManagement />,
      '/rooms': <RoomManagement />,     
      '/bookings': <BookingManagement />,
      '/customers': <CustomerManagement />,
      '/users': <UserManagement />,     
      '/pricing': <PricingOffers />,
      '/finance': <PaymentsFinance />,
      '/reports': <ReportsAnalytics />,
      '/settings': <Settings />,
      '/create-booking': <CreateBooking />,
      '/': <Dashboard onNavigate={handlePageChange} />, // NOW PASSES PROP
  };
  // --- END FIX ---


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Header (Top Navigation) */}
      <Header handleDrawerToggle={handleDrawerToggle} />
      
      {/* Sidebar (Left Navigation) */}
      <Sidebar 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle} 
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      
      {/* Main Content Area */}
      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          p: 3, 
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8, 
        }}
      >
        {/* Render the component based on the current page path */}
        {pageMap[currentPage] || <PlaceholderPage title="Page Not Found" />}
      </Box>
    </Box>
  );
}