import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { dashboardData } from '../../data/dummyData';
import { useTheme } from '@mui/material/styles';

const data = dashboardData.hourlyTrendData;
const bookings = data.map(d => d.bookings);
const hours = data.map(d => `${d.hour}:00`);

export default function HourlyTrendChart() {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Hourly Booking Trend (Selected Date)
                </Typography>
                <Box height={300}>
                    <BarChart
                        series={[
                            { data: bookings, label: 'Bookings', color: theme.palette.secondary.main },
                        ]}
                        xAxis={[{ scaleType: 'band', data: hours }]}
                        height={300}
                        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                        // Limit visible ticks for better readability on x-axis
                        slotProps={{
                            xAxis: {
                                tickLabelStyle: {
                                    angle: -45,
                                    textAnchor: 'end',
                                    fontSize: 10,
                                },
                            },
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}