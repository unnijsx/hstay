import React from 'react';
import { Box, Typography, Button, Grid, Chip, Tooltip, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BlockIcon from '@mui/icons-material/Block';

// --- Dummy Data ---
const userData = [
    { id: 1, name: 'Super Admin', email: 'admin@hourlystay.com', role: 'Super Admin', status: 'Active', hotel: 'Global' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh@cityview.in', role: 'Hotel Manager', status: 'Active', hotel: 'City View Grand' },
    { id: 3, name: 'Priya Sharma', email: 'priya.s@airport.in', role: 'Hotel Staff', status: 'Active', hotel: 'Airport Inn Hub' },
    { id: 4, name: 'Blocked User', email: 'blocked@hourlystay.com', role: 'Customer Support', status: 'Suspended', hotel: 'Global' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Active': return { color: 'success', label: 'Active' };
        case 'Suspended': return { color: 'error', label: 'Suspended' };
        default: return { color: 'default', label: status };
    }
};

const getRoleColor = (role, theme) => {
    switch (role) {
        case 'Super Admin': return theme.palette.primary.main;
        case 'Hotel Manager': return theme.palette.secondary.main;
        case 'Hotel Staff': return theme.palette.info.main;
        default: return 'grey';
    }
};

const getColumns = (isMobile, theme) => [
    { field: 'id', headerName: 'ID', width: 50, minWidth: 50 },
    { field: 'name', headerName: 'Name', flex: 1.5, minWidth: 120 },
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 180, hide: isMobile },
    { 
        field: 'role', 
        headerName: 'Role', 
        flex: 1, 
        minWidth: 120, 
        renderCell: (params) => (
            <Chip 
                label={params.value} 
                size="small" 
                sx={{ 
                    bgcolor: getRoleColor(params.value, theme), 
                    color: 'white',
                    fontWeight: 600 
                }}
            />
        )
    },
    { field: 'hotel', headerName: 'Assigned Hotel', flex: 1.5, minWidth: 120, hide: isMobile },
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
        renderCell: (params) => (
            <Box>
                <Tooltip title="Change Role/Permissions">
                    <IconButton size="small" color="primary">
                        <VpnKeyIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title={params.row.status === 'Active' ? "Suspend User" : "Activate User"}>
                    <IconButton size="small" color={params.row.status === 'Active' ? "error" : "success"}>
                        <BlockIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    },
];


export default function UserManagement() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const columns = getColumns(isMobile, theme);

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
                <Typography variant="h4">User & Access Management (RBAC)</Typography>
                <Button variant="contained" color="primary" startIcon={<PersonAddIcon />}>
                    Add New User
                </Button>
            </Box>

            <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                <DataGrid
                    rows={userData}
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