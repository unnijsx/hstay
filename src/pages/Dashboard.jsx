import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KpiCard from '../components/Dashboard/KpiCard';
import RevenueChart from '../components/Dashboard/RevenueChart';
import HourlyTrendChart from '../components/Dashboard/HourlyTrendChart';
import RecentBookings from '../components/Dashboard/RecentBookings';
import { dashboardData } from '../data/dummyData';

// 1. ACCEPT the navigation function as a prop named 'onNavigate'
export default function Dashboard({ onNavigate }) {
    
    // REMOVED: const navigate = (); // This line was the syntax error and is not needed.

    return (
        <Box>
            
            {/* Header and Quick Actions - Responsive stacking on mobile */}
            <Box 
                display="flex" 
                flexDirection={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems={{ xs: 'flex-start', sm: 'center' }} 
                mb={3} 
                gap={2}
            >
                <Typography variant="h4" gutterBottom>
                    Super Admin Dashboard
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    // 2. Use the passed prop 'onNavigate' to switch to the booking form
                    onClick={() => onNavigate('/create-booking')} 
                >
                    Create New Booking
                </Button>
            </Box>

            {/* 1. KPI Cards */}
            <Grid container spacing={3} mb={4}>
                {dashboardData.kpis.map((kpi, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                        <KpiCard {...kpi} />
                    </Grid>
                ))}
            </Grid>

            {/* 2. Charts & Analytics */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} lg={6}>
                    <RevenueChart />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <HourlyTrendChart />
                </Grid>
            </Grid>

            {/* 3. Recent Activity Table */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <RecentBookings />
                </Grid>
            </Grid>
        </Box>
    );
}