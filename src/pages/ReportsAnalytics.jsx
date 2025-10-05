import React from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, MenuItem, useTheme } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const reportOptions = [
    { value: 'occupancy', label: 'Occupancy Trends' },
    { value: 'revenue', label: 'Revenue Summary' },
    { value: 'cancellation', label: 'Cancellation Statistics' },
    { value: 'popular_rooms', label: 'Popular Room Types' },
];

export default function ReportsAnalytics() {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h4" mb={3}>Reports & Analytics</Typography>

            {/* 1. Filter Panel (Responsive Grid) */}
            <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" mb={2} color="primary">
                        <FilterAltIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Generate Report
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Report Type (Full width on mobile, half on desktop) */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Report Type"
                                defaultValue="occupancy"
                            >
                                {reportOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        
                        {/* Date Range Start (Half width always) */}
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="From Date" type="date" InputLabelProps={{ shrink: true }} defaultValue="2024-06-01" />
                        </Grid>

                        {/* Date Range End (Half width always) */}
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="To Date" type="date" InputLabelProps={{ shrink: true }} defaultValue="2024-07-20" />
                        </Grid>

                        {/* City Filter (Full width on mobile, quarter on desktop) */}
                        <Grid item xs={12} md={6} lg={3}>
                            <TextField fullWidth label="City Filter" defaultValue="All" />
                        </Grid>

                        {/* Generate Button (Full width on mobile) */}
                        <Grid item xs={12} md={6} lg={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <Button variant="contained" color="secondary" fullWidth={!theme.breakpoints.up('md')}>
                                Generate
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* 2. Report Output Area */}
            <Card sx={{ height: 400, borderRadius: 2, boxShadow: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent>
                    <Typography variant="h5" color="textSecondary">
                        Report Visualization will appear here (Chart/Table)
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}