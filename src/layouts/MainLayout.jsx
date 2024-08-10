import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "src/utils/theme";
import Topbar from "src/components/Topbar";
import { MyProSidebarProvider } from 'src/components/sidebarContext';

export default function MainLayout() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div className="app">
            <main className="content">
              <Topbar />
              <Outlet />
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider >
    </ColorModeContext.Provider >
  );
}