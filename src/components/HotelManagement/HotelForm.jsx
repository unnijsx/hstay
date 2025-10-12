// src/components/HotelManagement/HotelForm.jsx (Confirmed Structure for Add/Edit)

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Divider, Paper, Chip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function HotelForm({ viewState, selectedHotel, onBack }) {
    const isEdit = viewState === 'edit';
    const title = isEdit ? `Edit Hotel: ${selectedHotel?.name || 'Loading...'}` : 'Add New Hotel (Admin Override)';
    
    // Initializing state with default or existing data
    const [formData, setFormData] = useState({
        name: '', 
        address: '', 
        city: '', 
        description: '', 
        amenities: '',
        status: 'Active' // Admin adds active hotels by default
    });

    useEffect(() => {
        if (isEdit && selectedHotel) {
            // Populate form fields for editing
            setFormData({
                name: selectedHotel.name || '',
                address: '123 Main St, Central Area', // Placeholder detail
                city: selectedHotel.city || '',
                description: 'Luxury hotel specializing in flexible hourly bookings.',
                amenities: 'Wifi, Parking, AC, 24/7 Check-in',
                status: selectedHotel.status,
            });
        } else {
            // Reset for 'Add' mode
            setFormData({
                name: '', address: '', city: '', description: '', amenities: '', status: 'Active'
            });
        }
    }, [isEdit, selectedHotel]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Submitting ${isEdit ? 'Updated' : 'New'} Hotel:`, formData);
        
        // --- REAL WORLD LOGIC ---
        // 1. Send API request (PUT for edit, POST for add)
        // 2. Refresh the hotel list in the parent component

        onBack(); // Go back to list view
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button startIcon={<ArrowBackIcon />} onClick={onBack} variant="outlined">
                    Back to List
                </Button>
                <Typography variant="h4">{title}</Typography>
                <Box /> 
            </Box>

            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary">General Information</Typography>
                                <Divider sx={{ mb: 2 }} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Hotel Name" name="name" value={formData.name} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={4} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary" mt={3}>Amenities & Policies</Typography>
                                <Divider sx={{ mb: 2 }} />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField fullWidth label="Amenities (Comma separated)" name="amenities" value={formData.amenities} onChange={handleChange} />
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: 'right', mt: 3 }}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large"
                                    type="submit"
                                    startIcon={<SaveIcon />}
                                >
                                    {isEdit ? 'Save Changes' : 'Create Hotel'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}