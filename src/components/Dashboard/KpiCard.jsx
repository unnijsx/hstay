import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const iconMap = {
    EventAvailableOutlinedIcon: EventAvailableOutlinedIcon,
    HotelOutlinedIcon: HotelOutlinedIcon,
    AttachMoneyOutlinedIcon: AttachMoneyOutlinedIcon,
    AccessTimeOutlinedIcon: AccessTimeOutlinedIcon,
};

export default function KpiCard({ title, value, change, icon, color }) {
    const IconComponent = iconMap[icon];

    return (
        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <Typography color="textSecondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                            {value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: change.startsWith('+') ? 'green' : 'red' }}>
                            {change}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                        <Box sx={{ 
                            p: 1.5, 
                            borderRadius: '50%', 
                            display: 'inline-flex',
                            bgcolor: (theme) => theme.palette[color].light, 
                            color: (theme) => theme.palette[color].dark 
                        }}>
                            {IconComponent && <IconComponent fontSize="large" />}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}