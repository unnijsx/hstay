import React from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Divider, Checkbox, FormControlLabel, useTheme } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function Settings() {
    const theme = useTheme();

    return (
        <Box>
            <Typography variant="h4" mb={3}>Settings & Configurations</Typography>
            
            <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" mb={2} color="primary">
                        General Platform Settings
                    </Typography>
                    
                    <Grid container spacing={3}>
                        {/* 1. Localization */}
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth select label="Default Language" defaultValue="en">
                                <option value="en">English</option>
                                <option value="es">Spanish (Placeholder)</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth select label="Default Currency" defaultValue="USD">
                                <option value="USD">USD - US Dollar</option>
                                <option value="INR">INR - Indian Rupee</option>
                            </TextField>
                        </Grid>
                        
                        {/* 2. Time/Date */}
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Timezone" defaultValue="Asia/Kolkata" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth select label="Date Format" defaultValue="DD/MM/YYYY">
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" mt={2} mb={1} color="primary">
                                Privacy & Compliance
                            </Typography>
                        </Grid>
                        
                        {/* 3. Privacy */}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox defaultChecked color="primary" />}
                                label="Enable GDPR / Data Privacy Compliance Tools"
                            />
                        </Grid>
                        
                        {/* 4. Save Button (Responsive alignment) */}
                        <Grid item xs={12} sx={{ mt: 2, textAlign: { xs: 'left', sm: 'right' } }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                startIcon={<SaveIcon />}
                                // Full width on mobile, auto width on desktop
                                fullWidth={!theme.breakpoints.up('sm')}
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}