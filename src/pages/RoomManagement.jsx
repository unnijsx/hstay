import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Chip, Tooltip, IconButton, useTheme, useMediaQuery, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// --- Dummy Data ---
const roomData = [
    { 
        id: 1, 
        roomType: 'Standard', 
        hotel: 'City View Grand', 
        quantity: 15, 
        hourlyRate: 15, 
        minHours: 3,
        status: 'Available' 
    },
    { 
        id: 2, 
        roomType: 'Deluxe', 
        hotel: 'City View Grand', 
        quantity: 10, 
        hourlyRate: 25, 
        minHours: 4,
        status: 'Low Stock' 
    },
    { 
        id: 3, 
        roomType: 'Standard', 
        hotel: 'Airport Inn Hub', 
        quantity: 5, 
        hourlyRate: 14, 
        minHours: 2,
        status: 'Available' 
    },
    { 
        id: 4, 
        roomType: 'Executive', 
        hotel: 'Downtown Suites', 
        quantity: 8, 
        hourlyRate: 35, 
        minHours: 6,
        status: 'Available' 
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Available': return { color: 'success', label: 'Available' };
        case 'Low Stock': return { color: 'warning', label: 'Low Stock' };
        default: return { color: 'default', label: status };
    }
};

const getColumns = (isMobile) => [
    { field: 'id', headerName: 'ID', width: 50, minWidth: 50 },
    { field: 'roomType', headerName: 'Room Type', flex: 1.5, minWidth: 120 },
    { field: 'hotel', headerName: 'Hotel', flex: 1.5, minWidth: 120, hide: isMobile },
    { field: 'quantity', headerName: 'Qty', type: 'number', width: 60, align: 'center', headerAlign: 'center' },
    { 
        field: 'hourlyRate', 
        headerName: 'Rate/Hr', 
        type: 'number', 
        width: 80,
        // FIX: Implement null/undefined check for hourlyRate
        valueFormatter: (params) => {
            if (params.value === null || params.value === undefined) {
                return '$0.00';
            }
            return `$${params.value.toFixed(2)}`;
        }
    },
    { field: 'minHours', headerName: 'Min Hrs', type: 'number', width: 80, hide: isMobile },
    { 
        field: 'status', 
        headerName: 'Status', 
        width: 100,
        minWidth: 100,
        renderCell: (params) => {
            const { color, label } = getStatusColor(params.value);
            return <Chip label={label} color={color} size="small" />;
        },
    },
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 140,
        minWidth: 140,
        renderCell: () => (
            <Box>
                <Tooltip title="View Details">
                    <IconButton size="small" color="primary">
                        <VisibilityIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Manage Availability">
                    <IconButton size="small" color="info">
                        <CalendarMonthIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    },
];


export default function RoomManagement() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const columns = getColumns(isMobile);
    const [selectedHotel, setSelectedHotel] = useState('all');

    return (
        <Box>
            <Box 
                display="flex" 
                flexDirection={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems={{ xs: 'flex-start', sm: 'center' }} 
                mb={3} 
                gap={2} 
            >
                <Typography variant="h4">Room & Inventory Management</Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add New Room Type
                </Button>
            </Box>

            {/* Filters (Responsive Row) */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Filter by Hotel</InputLabel>
                        <Select
                            value={selectedHotel}
                            label="Filter by Hotel"
                            onChange={(e) => setSelectedHotel(e.target.value)}
                        >
                            <MenuItem value="all">All Hotels</MenuItem>
                            <MenuItem value="1">City View Grand</MenuItem>
                            <MenuItem value="2">Airport Inn Hub</MenuItem>
                            <MenuItem value="3">Downtown Suites</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField fullWidth label="Search Room Type" />
                </Grid>
            </Grid>

            {/* Data Grid */}
            <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                <DataGrid
                    rows={roomData}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    density={isMobile ? 'compact' : 'standard'}
                />
            </Box>
        </Box>
    );
}