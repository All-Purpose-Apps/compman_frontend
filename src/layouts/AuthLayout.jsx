import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';

export default function AuthLayout() {
    return (
        <Box className="auth-layout picture-background" sx={{ minHeight: '100vh' }}>
            <Container maxWidth="xl">
                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12} md={4}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}