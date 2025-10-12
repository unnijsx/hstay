import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button, MenuItem, Divider, FormControl, InputLabel, Select, useTheme, useMediaQuery } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';

// --- Dummy Data ---
const dummyHotels = [
    { id: 1, name: 'City View Grand', rooms: ['Standard', 'Deluxe'] },
    { id: 2, name: 'Airport Inn Hub', rooms: ['Standard', 'Executive'] },
];

const dummyRoomTypes = {
    'Standard': { rate: 15, maxHours: 12 },
    'Deluxe': { rate: 25, maxHours: 10 },
    'Executive': { rate: 35, maxHours: 8 },
};

export default function CreateBooking() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // State to hold form data
    const [bookingData, setBookingData] = useState({
        hotelId: '',
        roomType: '',
        checkInDate: new Date().toISOString().substring(0, 10),
        checkInTime: '14:00',
        hours: 3,
        customerName: '',
        customerEmail: '',
        paymentMethod: 'online',
    });

    const [estimatedPrice, setEstimatedPrice] = useState(0);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));
        
        // Simple price calculation for demo
        if (name === 'roomType' || name === 'hours') {
            const type = name === 'roomType' ? value : bookingData.roomType;
            const hrs = name === 'hours' ? parseInt(value) : bookingData.hours;
            
            if (type && dummyRoomTypes[type]) {
                setEstimatedPrice(dummyRoomTypes[type].rate * hrs);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking Submitted:", bookingData, "Price:", estimatedPrice);
        alert(`Booking for ${bookingData.customerName} confirmed for ${bookingData.hours} hours at $${estimatedPrice}.`);
        // In a real app, this would dispatch to an API endpoint
    };
    
    const availableRooms = bookingData.hotelId 
        ? dummyHotels.find(h => h.id === bookingData.hotelId).rooms 
        : [];

    return (
        <Box>
            <Typography variant="h4" mb={3}>Manual Booking Creation</Typography>

            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            
                            {/* SECTION 1: Hotel & Room Selection */}
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary" mb={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <EventAvailableIcon sx={{ mr: 1 }} /> Hotel & Room Details
                                </Typography>
                                <Divider />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Select Hotel</InputLabel>
                                    <Select
                                        name="hotelId"
                                        value={bookingData.hotelId}
                                        label="Select Hotel"
                                        onChange={handleFieldChange}
                                    >
                                        {dummyHotels.map(h => (
                                            <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required disabled={!bookingData.hotelId}>
                                    <InputLabel>Select Room Type</InputLabel>
                                    <Select
                                        name="roomType"
                                        value={bookingData.roomType}
                                        label="Select Room Type"
                                        onChange={handleFieldChange}
                                    >
                                        {availableRooms.map(room => (
                                            <MenuItem key={room} value={room}>{room} (Max {dummyRoomTypes[room]?.maxHours || '-'} Hrs)</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* SECTION 2: Timing */}
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary" mb={1} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ScheduleIcon sx={{ mr: 1 }} /> Check-in & Duration
                                </Typography>
                                <Divider />
                            </Grid>
                            
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth 
                                    label="Check-in Date" 
                                    type="date" 
                                    name="checkInDate"
                                    value={bookingData.checkInDate}
                                    onChange={handleFieldChange}
                                    InputLabelProps={{ shrink: true }} 
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth 
                                    label="Check-in Time" 
                                    type="time" 
                                    name="checkInTime"
                                    value={bookingData.checkInTime}
                                    onChange={handleFieldChange}
                                    InputLabelProps={{ shrink: true }} 
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth 
                                    select 
                                    label="Duration (Hours)"
                                    name="hours"
                                    value={bookingData.hours}
                                    onChange={handleFieldChange}
                                    required
                                >
                                    {[2, 3, 4, 6, 8, 10, 12].map(h => (
                                        <MenuItem key={h} value={h}>{h} Hours</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>


                            {/* SECTION 3: Customer Details */}
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary" mb={1} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PersonIcon sx={{ mr: 1 }} /> Customer Information
                                </Typography>
                                <Divider />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    fullWidth 
                                    label="Customer Full Name" 
                                    name="customerName"
                                    value={bookingData.customerName}
                                    onChange={handleFieldChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    fullWidth 
                                    label="Customer Email" 
                                    type="email" 
                                    name="customerEmail"
                                    value={bookingData.customerEmail}
                                    onChange={handleFieldChange}
                                    required
                                />
                            </Grid>

                            {/* SECTION 4: Summary & Payment */}
                            <Grid item xs={12}>
                                <Divider sx={{ my: 3 }} />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" color="text.primary">
                                    Estimated Total: <span style={{ color: theme.palette.success.main, fontWeight: 700 }}>${estimatedPrice.toFixed(2)}</span>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    * Price calculated based on selected duration and room type.
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large"
                                    type="submit"
                                    startIcon={<EventAvailableIcon />}
                                    fullWidth={isMobile}
                                >
                                    Confirm & Create Booking
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}