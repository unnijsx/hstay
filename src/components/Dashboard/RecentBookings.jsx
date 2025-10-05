import React from 'react';
import { Card, CardHeader, CardContent, Box, Chip, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { dashboardData } from '../../data/dummyData';
import { useTheme } from '@mui/material/styles';

const getStatusColor = (status) => {
    switch (status) {
        case 'Confirmed': return { color: 'success', label: 'Confirmed' };
        case 'Pending': return { color: 'warning', label: 'Pending' };
        case 'Canceled': return { color: 'error', label: 'Canceled' };
        default: return { color: 'default', label: status };
    }
};

const getColumns = (isMobile) => {
    return [
        // Booking ID: Should be visible, but small
        { field: 'id', headerName: 'ID', width: 70, minWidth: 70 },
        
        // Customer: Takes priority on desktop
        { field: 'customer', headerName: 'Customer', width: 150, flex: isMobile ? 0 : 1.5, minWidth: 100 },
        
        // Hotel: Takes priority on desktop
        { field: 'hotel', headerName: 'Hotel', width: 150, flex: isMobile ? 0 : 1.5, minWidth: 100 },
        
        // Room Type: Hide or shrink significantly on mobile
        { 
            field: 'roomType', 
            headerName: 'Room Type', 
            width: 100, 
            minWidth: 100,
            hide: isMobile ? true : false, // Hide this column on mobile
            flex: isMobile ? 0 : 1, 
        },
        
        // Hours: Always show, but minimal width
        { field: 'hours', headerName: 'Hrs', type: 'number', width: 60, minWidth: 60, flex: 0.5 },
        
        // Amount: Important financial metric
        { 
            field: 'amount', 
            headerName: 'Amount', 
            type: 'number', 
            width: 90,
            minWidth: 90,
            flex: 1,
            valueFormatter: (params) => {
                if (params.value === null || params.value === undefined) {
                    return '$0.00';
                }
                return `$${params.value.toFixed(2)}`;
            }
        },
        
        // Status: Always show
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            minWidth: 100,
            flex: 1,
            renderCell: (params) => {
                const { color, label } = getStatusColor(params.value);
                return <Chip label={label} color={color} size="small" sx={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }} />;
            },
        },
    ];
};

export default function RecentBookings() {
    const theme = useTheme();
    // Determine if the screen size is smaller than 'sm' (typical mobile breakpoint)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    
    return (
        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
            <CardHeader title="Recent Bookings" />
            <CardContent>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={dashboardData.recentBookings}
                        columns={getColumns(isMobile)}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        disableRowSelectionOnClick
                        // Enable auto height for rows if needed, or keep fixed height
                    />
                </Box>
            </CardContent>
        </Card>
    );
}