import { useEffect, useState } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchDances, fetchDanceCategories, turnOnOffDanceCategory } from 'src/store/dancesSlice';
// MUI Components
import { Card, Grid, Button, useTheme, Tabs, Tab, Box, Typography, Switch } from '@mui/material';
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
        dispatch(fetchDanceCategories());
    }, [dispatch]);

    const user = useSelector((state) => state.user.user);
    const dances = useSelector((state) => state.dances.dances);
    const danceCategories = useSelector((state) => state.dances.danceCategories);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleToggleChange = (category) => {
        // create a new object with the same properties as the category object but with the turnedOn property toggled
        const updatedCategory = { ...category, turnedOn: !category.turnedOn };
        dispatch(turnOnOffDanceCategory(updatedCategory));
        dispatch(fetchDances());
        dispatch(fetchDanceCategories());
    }

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
                                    <Tab
                                        key={category._id}
                                        label={
                                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                                <Typography variant="body1">{category.name}</Typography>
                                                <Switch
                                                    size="small"
                                                    checked={category.turnedOn}
                                                    onChange={() => handleToggleChange(category)}
                                                    color="secondary"
                                                    sx={{ marginLeft: 1 }}
                                                />
                                            </Box>
                                        }
                                        sx={{
                                            '&.Mui-selected': {
                                                color: colors.greenAccent[300],
                                            }
                                        }}
                                    />
                                ))}
                            </Tabs>
                            {danceCategories.map((category, index) => (
                                <TabPanel key={index} value={tabValue} index={index}>
                                    {dances.filter(dance => dance.danceCategory.name === category.name).map(dance => (
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

