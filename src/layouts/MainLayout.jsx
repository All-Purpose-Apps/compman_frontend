import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { ColorModeContext, useMode } from "src/utils/theme";
import Topbar from "src/components/Topbar";
import { MyProSidebarProvider } from 'src/components/Sidebar/sidebarContext';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MainLayout() {
  const [theme, colorMode] = useMode();
  const isMobile = useMediaQuery('(max-width:600px)');

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
                    severity="error"
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