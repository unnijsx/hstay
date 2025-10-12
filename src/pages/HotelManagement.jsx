import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Chip, Tooltip, IconButton, useTheme, useMediaQuery, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { hotelData as initialHotelData } from '../data/dummyData'; // Renamed import
import HotelForm from '../components/HotelManagement/HotelForm';
import HotelDetails from '../components/HotelManagement/HotelDetails'; 

// --- Helper functions ---
const getStatusColor = (status) => {
    switch (status) {
        case 'Active': return { color: 'success', label: 'Active' };
        case 'Pending Approval': return { color: 'error', label: 'Pending Approval' }; // Red color for Pending
        default: return { color: 'default', label: status };
    }
};

// --- Main Page Component ---
export default function HotelManagement() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // State management for Hotel data (simulating state mutation)
    const [hotels, setHotels] = useState(initialHotelData);
    const [viewState, setViewState] = useState('list');
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all'); // 'all' or 'Pending Approval'
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state

    // Filtered data based on the status filter
    const filteredHotels = filterStatus === 'all'
        ? hotels
        : hotels.filter(h => h.status === filterStatus);

    const pendingCount = hotels.filter(h => h.status === 'Pending Approval').length;

    const handleAction = (action, hotel = null) => {
        setSelectedHotel(hotel);
        setViewState(action);
    };

    const handleApproveClick = (hotel) => {
        setSelectedHotel(hotel);
        setIsDialogOpen(true);
    };

    const handleConfirmApprove = () => {
        // Find the hotel in the current state and change its status
        setHotels(prev => 
            prev.map(h => 
                h.id === selectedHotel.id ? { ...h, status: 'Active' } : h
            )
        );
        setIsDialogOpen(false);
        setSelectedHotel(null);
        // Reset filter to 'all' so the approved hotel is visible immediately
        setFilterStatus('all');
    };

    const getColumns = (isMobile) => [
        { field: 'id', headerName: 'ID', width: 50, minWidth: 50 },
        { field: 'name', headerName: 'Hotel Name', flex: 2, minWidth: 150 },
        { field: 'city', headerName: 'City', flex: 1, minWidth: 100, hide: isMobile },
        { field: 'rooms', headerName: 'Rooms', type: 'number', width: 80, hide: isMobile },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 150,
            minWidth: 130,
            renderCell: (params) => {
                const { color, label } = getStatusColor(params.value);
                return <Chip label={label} color={color} size="small" sx={{ color: 'white' }} />;
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            minWidth: 150,
            renderCell: (params) => {
                const hotel = hotels.find(h => h.id === params.row.id);
                const isPending = hotel.status === 'Pending Approval';

                return (
                    <Box>
                        {/* Quick Approve Action (Only visible for Pending) */}
                        {isPending && (
                            <Tooltip title="Quick Approve">
                                <IconButton size="small" color="success" onClick={() => handleApproveClick(hotel)}>
                                    <CheckCircleIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        )}
                        
                        <Tooltip title="View Details">
                            <IconButton size="small" color="primary" onClick={() => handleAction('details', hotel)}>
                                <InfoIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton size="small" color="secondary" onClick={() => handleAction('edit', hotel)}>
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];
    
    const columns = getColumns(isMobile);

    // --- Conditional Rendering ---
    if (viewState === 'add' || viewState === 'edit') {
        // Simplified: Assume HotelForm handles the save/update which would then update the 'hotels' state if integrated with an API
        return <HotelForm viewState={viewState} selectedHotel={selectedHotel} onBack={() => setViewState('list')} />;
    }

    if (viewState === 'details') {
        return <HotelDetails 
            hotel={selectedHotel} 
            onBack={() => setViewState('list')} 
            onEdit={() => handleAction('edit', selectedHotel)} 
            onApprove={handleApproveClick} // Pass approval handler
        />;
    }

    // Default: List View
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
                
                <Box display="flex" gap={2}>
                     {/* 1. Review/Pending Button (Matches Mockup Style) */}
                    <Button 
                        variant="contained" 
                        color="error" // Use error (red) for visual importance
                        startIcon={<AddIcon />} 
                        disabled={pendingCount === 0}
                        // Click to toggle the filter state
                        onClick={() => setFilterStatus(filterStatus === 'all' ? 'Pending Approval' : 'all')}
                        sx={{ bgcolor: theme.palette.error.main, '&:hover': { bgcolor: theme.palette.error.dark } }}
                    >
                        {filterStatus === 'Pending Approval' ? 'Show All Hotels' : `Review ${pendingCount} Hotels`}
                    </Button>
                    
                    {/* 2. Admin Override Add Button (Matches Mockup Style) */}
                    <Button variant="outlined" color="primary" onClick={() => handleAction('add')}>
                        + Add Override
                    </Button>
                </Box>
            </Box>

            <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                <DataGrid
                    // Use the filtered list here
                    rows={filteredHotels}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    density={isMobile ? 'compact' : 'standard'}
                />
            </Box>

            {/* --- Approval Confirmation Dialog --- */}
            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            >
                <DialogTitle>Confirm Hotel Approval</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to approve and activate the registration for 
                        <strong> {selectedHotel?.name || 'this hotel'}</strong>? 
                        This action will make the hotel live on the HourlyStay platform.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmApprove} color="success" variant="contained">
                        Approve & Activate
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}