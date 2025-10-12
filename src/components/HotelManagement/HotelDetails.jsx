import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Divider, Chip, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 

export default function HotelDetails({ hotel, onBack, onEdit, onApprove }) { // ADD onApprove prop
    if (!hotel) return <Typography>Hotel data not loaded.</Typography>;
    
    const isPending = hotel.status === 'Pending Approval';
    const amenitiesList = ['Wifi', 'Parking', 'AC', '24/7 Check-in', 'Luggage Storage'];

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button startIcon={<ArrowBackIcon />} onClick={onBack} variant="outlined">
                    Back to List
                </Button>
                <Typography variant="h4">{hotel.name} Details</Typography>
                
                <Box display="flex" gap={1}>
                    {isPending && (
                        <Button 
                            startIcon={<CheckCircleOutlineIcon />} 
                            onClick={() => onApprove(hotel)} // Call the parent handler
                            variant="contained" 
                            color="success"
                        >
                            Approve Hotel
                        </Button>
                    )}
                    <Button 
                        startIcon={<EditIcon />} 
                        onClick={onEdit} 
                        variant="contained" 
                        color="secondary"
                    >
                        Edit Hotel
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Left Column: General Info & Metrics */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" mb={1}>Overview</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body1" gutterBottom>
                                <strong>City:</strong> {hotel.city}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Address:</strong> 123 Main Street, {hotel.city}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Status:</strong> 
                                <Chip 
                                    label={hotel.status} 
                                    color={isPending ? 'error' : 'success'} 
                                    size="small" 
                                    sx={{ ml: 1 }}
                                />
                            </Typography>
                            {/* Hide rating if pending */}
                            {!isPending && (
                                <Typography variant="body1" gutterBottom>
                                    <strong>Rating:</strong> {hotel.rating} / 5.0
                                </Typography>
                            )}
                            <Typography variant="body1" gutterBottom>
                                <strong>Total Rooms:</strong> {hotel.rooms}
                            </Typography>
                            <Typography variant="body1" mt={2}>
                                <strong>Description:</strong> Luxury hotel specializing in flexible hourly bookings near major transportation hubs.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column: Amenities & Actions (Content remains largely the same) */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" mb={1}>Amenities</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {amenitiesList.map((amenity, index) => (
                                    <Chip key={index} label={amenity} variant="outlined" color="info" />
                                ))}
                            </Box>
                            
                            {!isPending && (
                                <>
                                    <Typography variant="h6" color="primary" mt={3} mb={1}>Booking Performance</Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography variant="body1">
                                        <strong>Current Occupancy:</strong> {(hotel.occupancy * 100).toFixed(0)}%
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Last 30-day Revenue:</strong> $15,000
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                         <Typography variant="subtitle1">Map Location & Reviews Placeholder</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}