import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, useMediaQuery, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PaymentIcon from '@mui/icons-material/Payment';

// --- Dummy Data ---
const transactionData = [
    { id: 'TX1023', type: 'Booking', amount: 95.00, status: 'Success', method: 'Razorpay', date: '2024-07-20' },
    { id: 'RF501', type: 'Refund', amount: -45.00, status: 'Pending', method: 'Razorpay', date: '2024-07-20' },
    { id: 'TX1022', type: 'Booking', amount: 150.00, status: 'Success', method: 'Card', date: '2024-07-19' },
    { id: 'SE2024', type: 'Settlement', amount: 75210.00, status: 'Completed', method: 'Bank Transfer', date: '2024-07-15' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Success': return { color: 'success', label: 'Success' };
        case 'Pending': return { color: 'warning', label: 'Pending' };
        case 'Completed': return { color: 'info', label: 'Completed' };
        default: return { color: 'default', label: status };
    }
};

// --- Sub-Component ---
function TransactionTable({ isMobile }) {
    return (
        <TableContainer component={Paper}>
            <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Method</TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Date</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Invoice</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell align="right" sx={{ color: row.type === 'Refund' ? 'error.main' : 'success.main', fontWeight: 600 }}>
                                {row.type === 'Refund' ? '-' : ''}${Math.abs(row.amount).toFixed(2)}
                            </TableCell>
                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{row.method}</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{row.date}</TableCell>
                            <TableCell align="center">
                                <Chip {...getStatusColor(row.status)} size="small" />
                            </TableCell>
                            <TableCell align="center">
                                <Button size="small" startIcon={<DownloadIcon />} disabled={row.type === 'Settlement'}>
                                    {row.type === 'Settlement' ? 'Report' : 'PDF'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// --- Main Page Component ---
export default function PaymentsFinance() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <Box>
            <Typography variant="h4" mb={3}>Payments & Finance</Typography>

            {/* Top Action Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">Payment Gateway Status</Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                <Typography variant="h5">Razorpay Connected</Typography>
                                <PaymentIcon color="success" sx={{ fontSize: 40 }} />
                            </Box>
                            <Button variant="outlined" size="small" sx={{ mt: 1 }}>Configure Settings</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="secondary">Refund Management</Typography>
                            <Typography variant="body1">2 Pending Refunds</Typography>
                            <Button variant="contained" color="error" size="small" sx={{ mt: 1 }}>Review Refunds</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Transaction List */}
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5">Recent Transactions</Typography>
                        <Button variant="outlined" startIcon={<DownloadIcon />}>
                            Export Report
                        </Button>
                    </Box>
                    <TransactionTable isMobile={isMobile} />
                </CardContent>
            </Card>
        </Box>
    );
}