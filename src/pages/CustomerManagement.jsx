import React from 'react';
import { Box, Typography, Button, Grid, Tooltip, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HistoryIcon from '@mui/icons-material/History';
import MailIcon from '@mui/icons-material/Mail';
import { customerData } from '../data/dummyData';

const getColumns = (isMobile) => [
    { field: 'id', headerName: 'ID', width: 50, minWidth: 50 },
    { field: 'name', headerName: 'Name', flex: 1.5, minWidth: 120 },
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 180, hide: isMobile },
    { field: 'phone', headerName: 'Phone', flex: 1.5, minWidth: 120, hide: isMobile },
    { 
        field: 'totalBookings', 
        headerName: 'Total Bookings', 
        type: 'number', 
        width: 100,
        align: 'center',
        headerAlign: 'center'
    },
    { 
        field: 'lastBooking', 
        headerName: 'Last Booking', 
        width: 120,
        minWidth: 120,
        hide: isMobile 
    },
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 100,
        minWidth: 100,
        renderCell: () => (
            <Box>
                <Tooltip title="View History">
                    <IconButton size="small" color="primary">
                        <HistoryIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Contact Customer">
                    <IconButton size="small" color="info">
                        <MailIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    },
];

export default function CustomerManagement() {
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
                <Typography variant="h4">Customer Management</Typography>
                <Button variant="contained" color="primary" startIcon={<PersonAddIcon />}>
                    Add New Customer
                </Button>
            </Box>

            <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                <DataGrid
                    rows={customerData}
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