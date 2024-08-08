import { fetchDances } from 'src/store/dancesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Button, List, ListItem, ListItemText, Tabs, Tab, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Settings() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDances());
    }, [dispatch]);

    const user = useSelector((state) => state.user.user);
    const dances = useSelector((state) => state.dances.dances);
    const [tabValue, setTabValue] = useState(0);

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
                                    <Tab key={index} label={category} />
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}