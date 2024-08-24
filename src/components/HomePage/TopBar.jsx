import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { BRAND } from 'src/utils';
import { tokens } from 'src/utils/theme';

const TopBar = memo(() => {
    const theme = useTheme();
    const colors = tokens(theme);
    const navigate = useNavigate();

    const handleLoginClick = useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: colors.blueAccent[300],
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }} color="inherit">
                    {BRAND}
                </Typography>
                <Button color="inherit" onClick={handleLoginClick}>Login</Button>
            </Toolbar>
        </AppBar>
    );
});

export default TopBar;