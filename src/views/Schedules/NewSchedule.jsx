import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDances } from 'src/store/dancesSlice';
import { useTheme } from '@mui/material/styles';
import { tokens } from 'src/utils/theme';
import { formSxSettings } from 'src/utils';
import { addSchedule, fetchSchedules } from 'src/store/schedulesSlice';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ScheduleDanceForm = ({ open, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDances());
    }, [dispatch]);

    const dances = useSelector(state => state.dances.dances);
    const isLoading = useSelector(state => state.dances.status) === 'loading';
    const error = useSelector(state => state.dances.error);

    const initialValues = {
        name: '',
        startDate: null,
        endDate: null,
        dances: [],
        location: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        startDate: Yup.date().nullable().required('Start Date & Time is required'),
        endDate: Yup.date().nullable().required('End Date & Time is required'),
        dances: Yup.array().min(1, 'At least one Dance Category is required').required('Dance is required'),
        location: Yup.string().required('Location is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(addSchedule(values));
            await dispatch(fetchSchedules());
            onClose();
        } catch (error) {
            console.error("Failed to submit schedule:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const danceOptions = dances.map(dance => ({
        value: dance._id,
        label: `${dance.title} - ${dance.danceCategory.name}`
    }));

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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth margin="normal">
                                            <TextField
                                                label="Name"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                fullWidth
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <DateTimePicker
                                                label="Start Date & Time"
                                                value={values.startDate}
                                                onChange={(newValue) => setFieldValue('startDate', newValue)}
                                                slot={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={touched.startDate && !!errors.startDate}
                                                        helperText={touched.startDate && errors.startDate}
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
                                                value={values.endDate}
                                                onChange={(newValue) => setFieldValue('endDate', newValue)}
                                                slot={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={touched.endDate && !!errors.endDate}
                                                        helperText={touched.endDate && errors.endDate}
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
                                        value={values.dances}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.dances && !!errors.dances}
                                        helperText={touched.dances && errors.dances}
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
                                        value={values.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.location && !!errors.location}
                                        helperText={touched.location && errors.location}
                                        fullWidth
                                    />
                                </FormControl>

                                <DialogActions>
                                    <Button onClick={onClose} color="secondary" disabled={isSubmitting}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleDanceForm;