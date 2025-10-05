import React from 'react';
import { Box, Typography, Button, Grid, Chip, Tooltip, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { hotelData } from '../data/dummyData';

const getStatusColor = (status) => {
    switch (status) {
        case 'Active': return { color: 'success', label: 'Active' };
        case 'Pending': return { color: 'warning', label: 'Pending Setup' };
        default: return { color: 'default', label: status };
    }
};

const getColumns = (isMobile) => [
    { field: 'id', headerName: 'ID', width: 50, minWidth: 50 },
    { field: 'name', headerName: 'Hotel Name', flex: 2, minWidth: 150 },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 100, hide: isMobile },
    { field: 'rooms', headerName: 'Rooms', type: 'number', width: 80, hide: isMobile },
    { 
        field: 'occupancy', 
        headerName: 'Occupancy', 
        type: 'number', 
        width: 110, 
        minWidth: 100,
        valueFormatter: (params) => `${(params.value * 100).toFixed(0)}%`,
        hide: isMobile 
    },
    { 
        field: 'status', 
        headerName: 'Status', 
        width: 120,
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
        width: 100,
        minWidth: 100,
        renderCell: () => (
            <Box>
                <Tooltip title="View Details">
                    <IconButton size="small" color="primary">
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton size="small" color="secondary">
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    },
];


export default function HotelManagement() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const columns = getColumns(isMobile);

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
                <Typography variant="h4">Hotel Management</Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add New Hotel
                </Button>
            </Box>

            <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                <DataGrid
                    rows={hotelData}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    // Conditional density for mobile visibility
                    density={isMobile ? 'compact' : 'standard'}
                />
            </Box>
        </Box>
    );
}