import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, CircularProgress, Typography, Autocomplete, Grid, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDances } from 'src/store/dancesSlice';
import { useTheme } from '@mui/material/styles';
import { tokens } from 'src/utils/theme';
import { formSxSettings } from 'src/utils';
import { addSchedule, fetchSchedules } from 'src/store/schedulesSlice';

const ScheduleDanceForm = ({ open, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: '',
        startDate: null,
        endDate: null,
        dances: [],
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
        setFormValues({ ...formValues, dances: value });
    };

    const handleDateTimeChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formValues.name) newErrors.name = 'Name is required';
        if (!formValues.startDate) newErrors.startDate = 'Start Date & Time is required';
        if (!formValues.endDate) newErrors.endDate = 'End Date & Time is required';
        if (formValues.dances.length === 0) newErrors.dances = 'At least one Dance Category is required';
        if (!formValues.location) newErrors.location = 'Location is required';
        return newErrors;
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                await dispatch(addSchedule(formValues));
                await dispatch(fetchSchedules());
                onClose();
            } catch (error) {
                console.error("Failed to submit schedule:", error);
                // Handle the error appropriately, e.g., show an error message
            }
        }
    };

    const danceOptions = dances
        .map(dance => ({
            value: dance._id,
            label: `${dance.title} - ${dance.danceCategory.name}`
        }))
        .filter(option => !formValues.dances.some(selected => selected.value === option.value));

    return (
        <Dialog open={open} onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
                onClose();
            }
        }} maxWidth="sm" fullWidth>
            <DialogTitle>Schedule Dance</DialogTitle>
            <DialogContent dividers>
                {isLoading ? (
                    <CircularProgress sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                ) : error ? (
                    <Typography variant="h6" color="error">{error}</Typography>
                ) : (
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        fullWidth
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <DateTimePicker
                                        label="Start Date & Time"
                                        value={formValues.startDate}
                                        onChange={(newValue) => handleDateTimeChange('startDate', newValue)}
                                        slot={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.startDate}
                                                helperText={errors.startDate}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <DateTimePicker
                                        label="End Date & Time"
                                        value={formValues.endDate}
                                        onChange={(newValue) => handleDateTimeChange('endDate', newValue)}
                                        slot={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.endDate}
                                                helperText={errors.endDate}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <FormControl fullWidth margin="normal">
                            <TextField
                                select
                                name="dances"
                                label="Dance"
                                value={formValues.dances}
                                onChange={handleChange}
                                error={!!errors.dances}
                                helperText={errors.dances}
                                SelectProps={{
                                    multiple: true,
                                }}
                            >
                                {danceOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value} sx={formSxSettings(colors)}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                    </form>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleDanceForm;