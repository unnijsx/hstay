// src/components/RoomManagement/RoomForm.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Divider, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Dummy data for available hotels
const dummyHotels = [
    { id: 1, name: 'City View Grand' },
    { id: 2, name: 'Airport Inn Hub' },
    { id: 3, name: 'Downtown Suites' },
];

export default function RoomForm({ viewState, selectedRoom, onBack }) {
    const isEdit = viewState === 'edit';
    const title = isEdit ? `Edit Room Type: ${selectedRoom?.roomType}` : 'Add New Room Type';
    
    const [formData, setFormData] = useState({
        roomType: '',
        hotelId: '',
        quantity: 1,
        hourlyRate: 20.00,
        dailyRate: 150.00,
        minHours: 1, // Default to 1 hour
    });

    useEffect(() => {
        if (isEdit && selectedRoom) {
            // Populate form fields for editing
            setFormData({
                roomType: selectedRoom.roomType,
                hotelId: dummyHotels.find(h => h.name === selectedRoom.hotel)?.id || '',
                quantity: selectedRoom.quantity,
                hourlyRate: selectedRoom.hourlyRate,
                dailyRate: 150.00, // Placeholder
                minHours: selectedRoom.minHours,
            });
        }
    }, [isEdit, selectedRoom]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.minHours < 1) {
            alert("Minimum booking hours must be at least 1.");
            return;
        }

        console.log(`Submitting ${isEdit ? 'Updated' : 'New'} Room Type:`, formData);
        onBack(); // Go back to list view
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button startIcon={<ArrowBackIcon />} onClick={onBack} variant="outlined">
                    Back to Room List
                </Button>
                <Typography variant="h4">{title}</Typography>
                <Box /> 
            </Box>

            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary">Basic Configuration</Typography>
                                <Divider sx={{ mb: 2 }} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Assign Hotel</InputLabel>
                                    <Select
                                        name="hotelId"
                                        value={formData.hotelId}
                                        label="Assign Hotel"
                                        onChange={handleChange}
                                    >
                                        {dummyHotels.map(h => (
                                            <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Room Type Name (e.g., Deluxe)" name="roomType" value={formData.roomType} onChange={handleChange} required />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary" mt={3}>Pricing & Inventory</Typography>
                                <Divider sx={{ mb: 2 }} />
                            </Grid>
                            
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth 
                                    label="Quantity of Rooms" 
                                    name="quantity" 
                                    type="number"
                                    value={formData.quantity} 
                                    onChange={handleChange} 
                                    inputProps={{ min: 1 }}
                                    required 
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth 
                                    label="Hourly Rate ($)" 
                                    name="hourlyRate" 
                                    type="number"
                                    value={formData.hourlyRate} 
                                    onChange={handleChange} 
                                    inputProps={{ step: 0.01, min: 0 }}
                                    required 
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    fullWidth 
                                    label="Min Booking Hours" 
                                    name="minHours" 
                                    type="number"
                                    value={formData.minHours} 
                                    onChange={handleChange} 
                                    inputProps={{ min: 1 }}
                                    helperText="Must be 1 hour or more."
                                    required 
                                />
                            </Grid>


                            <Grid item xs={12} sx={{ textAlign: 'right', mt: 3 }}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large"
                                    type="submit"
                                    startIcon={<SaveIcon />}
                                >
                                    {isEdit ? 'Save Changes' : 'Create Room Type'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}