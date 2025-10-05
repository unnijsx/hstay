import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { dashboardData } from '../../data/dummyData';
import { useTheme } from '@mui/material/styles';

const uData = dashboardData.revenueData.series[0].data;
const xLabels = dashboardData.revenueData.labels;

export default function RevenueChart() {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Total Weekly Revenue
                </Typography>
                <Box height={300}>
                    <LineChart
                        series={[
                            { data: uData, label: 'Revenue ($)', color: theme.palette.primary.main },
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabels, label: 'Week' }]}
                        height={300}
                        margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}