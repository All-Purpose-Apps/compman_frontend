import React, { useEffect, useState } from 'react';
import {
    TextField, Button, FormControl, CircularProgress, Typography, Grid, MenuItem, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDances } from 'src/store/dancesSlice';
import { useTheme } from '@mui/material/styles';
import { tokens } from 'src/utils/theme';
import { formSxSettings } from 'src/utils';
import { editSchedule, fetchSchedules, getOneSchedule } from 'src/store/schedulesSlice';
import dayjs from 'dayjs';

const EditSchedule = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [formValues, setFormValues] = useState({
        name: '',
        startDate: null,
        endDate: null,
        dances: [],
        location: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(getOneSchedule(id));
            const entry = response.payload[0];
            setFormValues({
                name: entry.name,
                startDate: dayjs(entry.startDate),
                endDate: dayjs(entry.endDate),
                dances: entry.dances.map(dance => dance._id),
                location: entry.location,
            });
        };

        fetchData();
        dispatch(fetchDances());
    }, [dispatch, id]);

    const dances = useSelector(state => state.dances.dances);
    const isLoading = useSelector(state => state.schedules.status) === 'loading';
    const error = useSelector(state => state.schedules.error);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDateTimeChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCancel = () => {
        navigate(-1);
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
                await dispatch(editSchedule({ id, ...formValues }));
                await dispatch(fetchSchedules());
                navigate(-1);
            } catch (error) {
                console.error("Failed to submit schedule:", error);
            }
        }
    };

    const danceOptions = dances.map(dance => ({
        value: dance._id,
        label: `${dance.title} - ${dance.danceCategory.name}`
    }));

    return (
        <Paper elevation={3} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Edit Schedule
            </Typography>
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
                            label="Dances"
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

                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={handleCancel} color="secondary">
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button type="submit" color="secondary" variant="contained">
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Paper>
    );
};

export default EditSchedule;