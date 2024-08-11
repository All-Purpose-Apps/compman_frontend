import { useEffect, useState } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchDances } from 'src/store/dancesSlice';
// MUI Components
import { Card, Grid, Button, useTheme, Tabs, Tab, Box, Typography } from '@mui/material';
// Components
import TabPanel from 'src/components/TabPanel';
// Utils
import { tokens } from "src/utils/theme";

export default function Settings() {
    // Theme Colors
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // Redux
    const dispatch = useDispatch();
    // Local state
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        dispatch(fetchDances());
    }, [dispatch]);

    const user = useSelector((state) => state.user.user);
    const dances = useSelector((state) => state.dances.dances);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const danceCategories = [
        "American Smooth",
        "American Rhythm",
        "Specialty",
        "International Ballroom",
        "International Latin",
        "Country Western"
    ];

    return (
        <Box className="dashboard">
            <Grid container spacing={4} className="mb-4">
                <Grid item xs={12}>
                    <Card>
                        <Box p={2}>
                            <Typography variant="h5">User</Typography>
                            <Typography variant="h6" style={{ fontSize: '24px' }}>{user?.email}</Typography>
                            <Box mt={2}>
                                <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Change Password</Button>
                                <Button variant="contained" color="secondary">Report/Request Feature</Button>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card>
                        <Box p={2}>
                            <Typography variant="h5">Dances Currently in System</Typography>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="dance categories"
                            >
                                {danceCategories.map((category, index) => (
                                    <Tab key={index} label={category} sx={{
                                        // change selected tab color
                                        '&.Mui-selected': {
                                            color: colors.greenAccent[300],
                                        }
                                    }} />
                                ))}
                            </Tabs>
                            {danceCategories.map((category, index) => (
                                <TabPanel key={index} value={tabValue} index={index}>
                                    {dances.filter(dance => dance.danceCategory.name === category).map(dance => (
                                        <Typography key={dance._id}>{dance.title}</Typography>
                                    ))}
                                </TabPanel>
                            ))}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

