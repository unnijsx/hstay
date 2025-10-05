import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

// --- Dummy Data ---
const roomRates = [
    { id: 1, type: 'Standard', hourlyRate: 15, dailyRate: 120, minHours: 3, hotel: 'City View Grand' },
    { id: 2, type: 'Deluxe', hourlyRate: 25, dailyRate: 180, minHours: 4, hotel: 'Airport Inn Hub' },
    { id: 3, type: 'Executive', hourlyRate: 35, dailyRate: 250, minHours: 6, hotel: 'Downtown Suites' },
];

const promotions = [
    { id: 1, name: 'Weekend Saver', type: 'Discount %', value: '15%', hotels: 'All', status: 'Active' },
    { id: 2, name: 'Long Stay Deal (10+ Hrs)', type: 'Fixed Amt', value: '$20 OFF', hotels: 'City View Grand', status: 'Inactive' },
];

// --- Sub-Components ---

function RoomRatesTable({ isMobile }) {
    return (
        <TableContainer component={Paper}>
            <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                    <TableRow>
                        <TableCell>Room Type</TableCell>
                        <TableCell>Hotel</TableCell>
                        <TableCell align="right">Hourly Rate ($)</TableCell>
                        <TableCell align="right">Min Hours</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roomRates.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.type}</TableCell>
                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{row.hotel}</TableCell>
                            <TableCell align="right">${row.hourlyRate.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.minHours}</TableCell>
                            <TableCell align="center">
                                <Button size="small" startIcon={<EditIcon />}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function PromotionsTable({ isMobile }) {
    return (
        <TableContainer component={Paper}>
            <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                    <TableRow>
                        <TableCell>Promotion Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Hotels</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {promotions.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.value}</TableCell>
                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{row.hotels}</TableCell>
                            <TableCell align="center">
                                <Chip label={row.status} color={row.status === 'Active' ? 'success' : 'warning'} size="small" />
                            </TableCell>
                            <TableCell align="center">
                                <Button size="small" startIcon={<EditIcon />}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// --- Main Page Component ---

export default function PricingOffers() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const isMobile = window.innerWidth < 600; // Simplified responsiveness check for component size

    return (
        <Box>
            <Typography variant="h4" mb={3}>Pricing & Offers Management</Typography>

            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
                        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
                            <Tab label="Hourly Rates & Availability" />
                            <Tab label="Promotions & Coupons" />
                            <Tab label="Taxes & Fees" />
                        </Tabs>
                    </Box>

                    {/* Tab 1: Rates */}
                    {value === 0 && (
                        <Box p={3}>
                            <Box display="flex" justifyContent="flex-end" mb={2}>
                                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                                    Define New Rate
                                </Button>
                            </Box>
                            <RoomRatesTable isMobile={isMobile} />
                            
                            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                                * Rates can be set dynamically by Season, Day of Week, or Time Slot.
                            </Typography>
                        </Box>
                    )}

                    {/* Tab 2: Promotions */}
                    {value === 1 && (
                        <Box p={3}>
                            <Box display="flex" justifyContent="flex-end" mb={2}>
                                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                                    Create New Promotion
                                </Button>
                            </Box>
                            <PromotionsTable isMobile={isMobile} />
                            
                            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                                * Apply discounts globally or to specific hotels/room types.
                            </Typography>
                        </Box>
                    )}

                    {/* Tab 3: Taxes & Fees */}
                    {value === 2 && (
                        <Box p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="GST/VAT Tax (%)" defaultValue="18" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Service Charge (%)" defaultValue="5" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary">
                                        Save Tax Configuration
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}