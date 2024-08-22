import { AppBar, Button, Toolbar, Typography, useTheme } from '@mui/material'
import { BRAND } from 'src/utils'
import { tokens } from 'src/utils/theme'

export default function TopBar() {
    const theme = useTheme()
    const colors = tokens(theme)
    return (
        <AppBar position="static" sx={{
            backgroundColor: colors.blueAccent[300],
        }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }} color="inherit">
                    {BRAND}
                </Typography>
                <Button color="inherit">Login</Button>
                {/* <Button color="inherit">Components</Button>
                <Button color="inherit">GitHub</Button> */}
            </Toolbar>
        </AppBar>
    )
}
