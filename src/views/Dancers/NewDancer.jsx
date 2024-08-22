import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    TextField, Button, Select, MenuItem, FormControl, InputLabel,
    FormHelperText, Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { fetchStudios } from 'src/store/studiosSlice';
import { addDancer } from 'src/store/dancersSlice';

const validationSchema = yup.object().shape({
    number: yup.number().integer().nullable(),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required').positive().integer().min(1, 'Age must be at least 1').max(99, 'Age must be at most 99'),
    identifier: yup.string().oneOf(['professional', 'student', 'coach']).required('Identifier is required'),
    studio: yup.string().required('Studio is required'),
});

const NewDancerModal = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const firstNameRef = useRef(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchStudios());
    }, [dispatch]);

    const studios = useSelector(state => state.studios.studios);

    const formik = useFormik({
        initialValues: {
            number: '',
            firstName: '',
            lastName: '',
            age: '',
            identifier: '',
            studio: '',
        },
        validationSchema,
        onSubmit: (data) => {
            dispatch(addDancer(data));
            formik.resetForm();
            if (firstNameRef.current) {
                firstNameRef.current.focus();
            }
            setSnackbarOpen(true);  // Show snackbar on successful submit
        },
    });

    const handleCancel = () => {
        formik.resetForm();
        onClose();  // Close modal on cancel
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Dialog open={open} onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
                onClose();
            }
        }} maxWidth="sm" fullWidth>
            <DialogTitle>New Dancer</DialogTitle>
            <DialogContent>
                <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Number"
                            type="number"
                            id="number"
                            name="number"
                            value={formik.values.number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.number && Boolean(formik.errors.number)}
                            helperText={formik.touched.number && formik.errors.number}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="First Name"
                            id="firstName"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            inputRef={firstNameRef}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last Name"
                            id="lastName"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Age"
                            type="number"
                            id="age"
                            name="age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.age && Boolean(formik.errors.age)}
                            helperText={formik.touched.age && formik.errors.age}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal" error={formik.touched.identifier && Boolean(formik.errors.identifier)}>
                            <InputLabel>Identifier</InputLabel>
                            <Select
                                id="identifier"
                                name="identifier"
                                value={formik.values.identifier}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Identifier"
                            >
                                <MenuItem value="professional">Professional</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                                <MenuItem value="coach">Coach</MenuItem>
                            </Select>
                            <FormHelperText>{formik.touched.identifier && formik.errors.identifier}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin="normal" error={formik.touched.studio && Boolean(formik.errors.studio)}>
                            <InputLabel id="studio">Studio</InputLabel>
                            <Select
                                id="studio"
                                name="studio"
                                value={formik.values.studio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Studio"
                            >
                                {studios.map(studio => (
                                    <MenuItem key={studio._id} value={studio._id}>
                                        {studio.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.studio && formik.errors.studio}</FormHelperText>
                        </FormControl>
                    </form>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={formik.handleSubmit}>
                    Submit
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </DialogActions>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Dancer added successfully"
            />
        </Dialog>
    );
};

export default NewDancerModal;