import React from 'react';
import { Box, Typography, Button, Grid, Chip, Tooltip, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { bookingData } from '../data/dummyData';

const getStatusColor = (status) => {
    switch (status) {
        case 'Confirmed': return { color: 'success', label: 'Confirmed' };
        case 'Pending': return { color: 'warning', label: 'Pending' };
        case 'Canceled': return { color: 'error', label: 'Canceled' };
        case 'Completed': return { color: 'info', label: 'Completed' };
        default: return { color: 'default', label: status };
    }
};

const getColumns = (isMobile) => [
    { field: 'id', headerName: 'ID', width: 70, minWidth: 70 },
    { field: 'customer', headerName: 'Customer', flex: 1.5, minWidth: 120 },
    { field: 'hotel', headerName: 'Hotel', flex: 1.5, minWidth: 120, hide: isMobile },
    { 
        field: 'checkIn', 
        headerName: 'Check-in', 
        flex: 1.5, 
        minWidth: 140, 
        hide: isMobile 
    },
    { 
        field: 'hours', 
        headerName: 'Hrs', 
        type: 'number', 
        width: 60, 
        minWidth: 60,
        align: 'center',
        headerAlign: 'center'
    },
    { 
        field: 'amount', 
        headerName: 'Amount', 
        type: 'number', 
        flex: 1, 
        minWidth: 90,
        valueFormatter: (params) => `$${params.value ? params.value.toFixed(2) : '0.00'}`
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
        headerName: 'Quick Actions',
        sortable: false,
        width: 120,
        minWidth: 120,
        renderCell: (params) => (
            <Box>
                {params.row.status === 'Pending' && (
                    <Tooltip title="Confirm Booking">
                        <IconButton size="small" color="success">
                            <CheckCircleIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                )}
                <Tooltip title="Cancel Booking">
                    <IconButton size="small" color="error">
                        <CancelIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    },
];


export default function BookingManagement() {
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
                <Typography variant="h4">Booking Management</Typography>
                <Button variant="outlined" color="primary" startIcon={<FilterListIcon />}>
                    Filter Bookings
                </Button>
            </Box>

            <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                <DataGrid
                    rows={bookingData}
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