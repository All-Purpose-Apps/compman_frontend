import { useContext } from "react";
import { ColorModeContext, tokens } from "src/utils/theme";
import { useTheme, Box, IconButton, Typography } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import { app } from 'src/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { clearUser } from 'src/store/userSlice';
import { useDispatch } from 'react-redux';

// Icons
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { toggleSidebar, broken, rtl } = useProSidebar();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            console.log('User signed out');
            dispatch(clearUser());
            navigate('/auth/login');
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex">
                {broken && !rtl && (
                    <IconButton
                        sx={{ margin: "0 6 0 2" }}
                        onClick={() => toggleSidebar()}
                    >
                        <MenuOutlinedIcon />
                    </IconButton>
                )}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    p={0.2}
                    borderRadius={1}
                >
                    <IconButton type="button" onClick={() => handleLogout()}>
                        <ExitToAppOutlinedIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: colors.primary[50], p: 1, cursor: 'pointer' }} onClick={() => handleLogout()}>
                        Logout
                    </Typography>
                </Box>
            </Box>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (

                        <LightModeOutlinedIcon />
                    ) : (
                        <DarkModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton onClick={() => navigate('/admin/settings')}>
                    <SettingsOutlinedIcon />
                </IconButton>

                {broken && rtl && (
                    <IconButton
                        sx={{ margin: "0 6 0 2" }}
                        onClick={() => toggleSidebar()}
                    >
                        <MenuOutlinedIcon />
                    </IconButton>
                )}
            </Box>
        </Box >
    );
};

export default Topbar;
