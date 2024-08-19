import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, Container, CircularProgress, Typography, Autocomplete, Paper, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDances } from 'src/store/dancesSlice';
import { useTheme } from '@mui/material/styles';
import { tokens } from 'src/utils/theme';

const ScheduleDanceForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        startDateTime: null,
        endDateTime: null,
        dance: null,
        location: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchDances());
    }, [dispatch]);

    const dances = useSelector(state => state.dances.dances);
    const isLoading = useSelector(state => state.dances.status) === 'loading';
    const error = useSelector(state => state.dances.error);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleAutocompleteChange = (event, value) => {
        setFormValues({ ...formValues, dance: value });
    };

    const handleDateTimeChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formValues.startDateTime) newErrors.startDateTime = 'Start Date & Time is required';
        if (!formValues.endDateTime) newErrors.endDateTime = 'End Date & Time is required';
        if (!formValues.dance) newErrors.dance = 'Dance Category is required';
        if (!formValues.location) newErrors.location = 'Location is required';
        return newErrors;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Form Submitted:', formValues);
            // Submit form logic here
        }
    };

    const danceOptions = dances.map(dance => ({
        value: dance._id,
        label: `${dance.title} - ${dance.danceCategory.name}`
    }));

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary[400] }}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <DateTimePicker
                                    label="Start Date & Time"
                                    value={formValues.startDateTime}
                                    onChange={(newValue) => handleDateTimeChange('startDateTime', newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={!!errors.startDateTime}
                                            helperText={errors.startDateTime}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <DateTimePicker
                                    label="End Date & Time"
                                    value={formValues.endDateTime}
                                    onChange={(newValue) => handleDateTimeChange('endDateTime', newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={!!errors.endDateTime}
                                            helperText={errors.endDateTime}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={danceOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Dance Category"
                                    error={!!errors.dance}
                                    helperText={errors.dance}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Location"
                            name="location"
                            value={formValues.location}
                            onChange={handleChange}
                            error={!!errors.location}
                            helperText={errors.location}
                            fullWidth
                        />
                    </FormControl>

                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, mr: 2 }}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ScheduleDanceForm;