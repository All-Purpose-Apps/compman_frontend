import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Box, Alert, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ColorModeContext, useMode } from "src/utils/theme";
import Topbar from "src/components/Topbar";
import { MyProSidebarProvider } from 'src/components/sidebarContext';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MainLayout() {
  const [theme, colorMode] = useMode();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleClose = () => {
    setAlertVisible(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div className="app">
            <main className="content">
              {isMobile && (
                <Box sx={{ mt: 2, mb: 2, mx: 2 }}>
                  <Alert
                    severity="warning"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Be advised, some components will not show up well on mobile. We suggest using a tablet or laptop to use this app.
                  </Alert>
                </Box>
              )}
              <Topbar />
              <Outlet />
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider >
    </ColorModeContext.Provider >
  );
}