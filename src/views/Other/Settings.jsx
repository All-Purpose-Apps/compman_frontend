import { useEffect, useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchDances, fetchDanceCategories, turnOnOffDanceCategory } from 'src/store/dancesSlice';
// MUI Components
import { Card, Grid, Button, useTheme, Box, Typography, Switch, Divider, Collapse, IconButton } from '@mui/material';
// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { tokens } from "src/utils/theme";

export default function Settings() {
    // Theme Colors
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // Redux
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDances());
        dispatch(fetchDanceCategories());
    }, [dispatch]);

    const user = useSelector((state) => state.user.user);
    const dances = useSelector((state) => state.dances.dances);
    const danceCategories = useSelector((state) => state.dances.danceCategories);
    const loading = useSelector((state) => state.dances.loading);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleToggleChange = (category) => {
        const updatedCategory = { ...category, turnedOn: !category.turnedOn };
        dispatch(turnOnOffDanceCategory(updatedCategory));
        dispatch(fetchDances());
        dispatch(fetchDanceCategories());
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(prevCategoryId => (prevCategoryId === categoryId ? null : categoryId));
    };

    return (
        <Box className="dashboard" sx={{ p: 3 }}>
            <Grid container spacing={4} className="mb-4" justifyContent="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Card>
                        <Box p={2}>
                            <Typography variant="h5">User</Typography>
                            <Typography variant="h6" style={{ fontSize: '24px' }}>{user?.email}</Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={10} lg={4} mt={2}>
                    <Card>
                        <Box p={2}>
                            <Typography variant="h5">Dances Currently in System</Typography>
                            <Divider sx={{ my: 2 }} />
                            {danceCategories.map((category) => (
                                <Box key={category._id} mb={3}>
                                    {/* Category and Switch */}
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        onClick={() => category.turnedOn && handleCategoryClick(category._id)}
                                        sx={{
                                            cursor: category.turnedOn ? 'pointer' : 'not-allowed',
                                            p: 2,
                                            borderRadius: 1,
                                            backgroundColor: selectedCategoryId === category._id ? colors.primary[500] : 'transparent',
                                            '&:hover': {
                                                backgroundColor: category.turnedOn ? colors.primary[100] : 'transparent',
                                            },
                                            transition: 'background-color 0.3s ease',
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ flexGrow: 1, color: category.turnedOn ? 'inherit' : 'gray' }}>
                                            {category.name}
                                        </Typography>
                                        <Box display="flex" alignItems="center">
                                            <Switch
                                                size="small"
                                                checked={category.turnedOn}
                                                onChange={() => handleToggleChange(category)}
                                                color="secondary"
                                                sx={{ mr: 1 }}
                                            />
                                            <IconButton size="small" disabled={!category.turnedOn}>
                                                {selectedCategoryId === category._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    {/* Dances - Only show if category is selected */}
                                    <Collapse in={selectedCategoryId === category._id} timeout="auto" unmountOnExit>
                                        <Box mt={2} ml={4}>
                                            {!loading && dances
                                                .filter(dance => dance.danceCategory.name === category.name)
                                                .map(dance => (
                                                    <Typography key={dance._id}>
                                                        {dance.title}
                                                    </Typography>
                                                ))}
                                        </Box>
                                    </Collapse>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={10} lg={4} mt={2}>
                    <Card>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                            p={2}
                        >
                            {/* <Button variant="contained" color="primary" sx={{ mb: 2, width: '80%' }}>
                                Change Password
                            </Button> */}
                            <Button variant="contained" color="secondary" sx={{ width: '80%' }}>
                                Report/Request Feature
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}