// src/data/dummyData.js

// Function to generate data for the hourly trend chart (24 hours)
const generateHourlyData = () => {
    const data = [];
    for (let i = 0; i < 24; i++) {
        data.push({
            hour: i,
            // Higher bookings during daytime (9 AM to 6 PM)
            bookings: Math.floor(Math.random() * 50) + (i > 8 && i < 18 ? 30 : 5) 
        });
    }
    return data;
};

// --- Dashboard Data ---
export const dashboardData = {
    kpis: [
        { title: "Total Bookings (Today)", value: 452, change: "+12.5%", icon: "EventAvailableOutlinedIcon", color: "primary" },
        { title: "Occupancy Rate", value: "68%", change: "+5.1%", icon: "HotelOutlinedIcon", color: "secondary" },
        { title: "Total Revenue (Month)", value: "$75,210", change: "-2.1%", icon: "AttachMoneyOutlinedIcon", color: "success" },
        { title: "Pending Check-ins", value: 14, change: "Today", icon: "AccessTimeOutlinedIcon", color: "info" },
    ],

    revenueData: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
        series: [
            {
                name: 'Revenue',
                data: [1200, 1550, 980, 1800, 2100, 1650, 2300],
            },
        ],
    },

    hourlyTrendData: generateHourlyData(),

    recentBookings: [
        { id: 1001, customer: 'Alice Johnson', hotel: 'City View Grand', roomType: 'Deluxe', hours: 6, status: 'Confirmed', amount: 95.00, checkIn: '2024-07-20 09:00', checkOut: '2024-07-20 15:00' },
        { id: 1002, customer: 'Bob Smith', hotel: 'Airport Inn', roomType: 'Standard', hours: 3, status: 'Pending', amount: 45.00, checkIn: '2024-07-20 12:00', checkOut: '2024-07-20 15:00' },
        { id: 1003, customer: 'Charlie Davis', hotel: 'Downtown Suites', roomType: 'Executive', hours: 8, status: 'Canceled', amount: 120.00, checkIn: '2024-07-20 11:00', checkOut: '2024-07-20 19:00' },
        { id: 1004, customer: 'Diana Prince', hotel: 'City View Grand', roomType: 'Standard', hours: 4, status: 'Confirmed', amount: 60.00, checkIn: '2024-07-20 15:00', checkOut: '2024-07-20 19:00' },
        { id: 1005, customer: 'Ethan Hunt', hotel: 'Downtown Suites', roomType: 'Deluxe', hours: 10, status: 'Confirmed', amount: 150.00, checkIn: '2024-07-20 18:00', checkOut: '2024-07-21 04:00' },
    ]
};


// --- Hotel Management Data ---
export const hotelData = [
    { 
        id: 1, 
        name: 'City View Grand', 
        city: 'New Delhi', 
        rooms: 55, 
        status: 'Active', 
        occupancy: 0.75, 
        rating: 4.5 
    },
    { 
        id: 2, 
        name: 'Airport Inn Hub', 
        city: 'Mumbai', 
        rooms: 30, 
        status: 'Pending Approval', // Changed status
        occupancy: 0.00, // No occupancy yet
        rating: 0.0 // No rating yet
    },
    { 
        id: 3, 
        name: 'Downtown Suites', 
        city: 'Bangalore', 
        rooms: 72, 
        status: 'Active', 
        occupancy: 0.90, 
        rating: 4.8 
    },
    { 
        id: 4, 
        name: 'Newcomer Lodge', // New hotel name for clarity
        city: 'Chennai', 
        rooms: 20, 
        status: 'Pending Approval', // Changed status
        occupancy: 0.00, 
        rating: 0.0
    },
];


// --- Booking Management Data (extended from dashboard) ---
export const bookingData = [
    ...dashboardData.recentBookings, 
    { id: 1006, customer: 'Frank Miller', hotel: 'Airport Inn Hub', roomType: 'Standard', hours: 5, status: 'Confirmed', amount: 75.00, checkIn: '2024-07-20 10:00', checkOut: '2024-07-20 15:00' },
    { id: 1007, customer: 'Grace Hopper', hotel: 'City View Grand', roomType: 'Executive', hours: 12, status: 'Completed', amount: 200.00, checkIn: '2024-07-19 09:00', checkOut: '2024-07-19 21:00' },
    { id: 1008, customer: 'Ivy Wang', hotel: 'Tech Park Lodge', roomType: 'Deluxe', hours: 7, status: 'Confirmed', amount: 110.00, checkIn: '2024-07-20 14:00', checkOut: '2024-07-20 21:00' },
];

// --- Customer Management Data ---
export const customerData = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '9876543210', totalBookings: 15, lastBooking: '2024-07-10' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '9988776655', totalBookings: 8, lastBooking: '2024-07-20' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', phone: '9000111222', totalBookings: 2, lastBooking: '2024-07-01' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '8887776665', totalBookings: 25, lastBooking: '2024-07-15' },
];