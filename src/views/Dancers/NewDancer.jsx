import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    TextField, Button, Select, MenuItem, FormControl, InputLabel,
    FormHelperText, Box, Paper, useTheme, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { tokens } from 'src/utils/theme';
import { fetchStudios } from '../../store/studiosSlice';
import { addDancer } from '../../store/dancersSlice';

const schema = yup.object().shape({
    number: yup.number().integer().transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required').positive().integer().min(1, 'Age must be at least 1')
        .max(99, 'Age must be at most 99'),
    identifier: yup.string().oneOf(['professional', 'student', 'coach']).required('Identifier is required'),
    studio: yup.string().required('Studio is required'),
});

const NewDancerModal = ({ open, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const firstNameRef = useRef(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            identifier: '',
            studio: ''
        }
    });

    useEffect(() => {
        dispatch(fetchStudios());
    }, [dispatch]);

    const studios = useSelector(state => state.studios.studios);
    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    const onSubmit = (data) => {
        dispatch(addDancer(data));
        reset();
        if (firstNameRef.current) {
            firstNameRef.current.focus();
        }
        setSnackbarOpen(true);  // Show snackbar on successful submit
    };

    const handleCancel = () => {
        reset();
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Number"
                            type="number"
                            {...register('number')}
                            error={!!errors.number}
                            helperText={errors.number?.message}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="First Name"
                            {...register('firstName')}
                            inputRef={firstNameRef}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last Name"
                            {...register('lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Age"
                            type="number"
                            {...register('age')}
                            error={!!errors.age}
                            helperText={errors.age?.message}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal" error={!!errors.identifier}>
                            <InputLabel>Identifier</InputLabel>
                            <Select
                                {...register('identifier')}
                                defaultValue=""
                                label="Identifier"
                            >
                                <MenuItem value="professional">Professional</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                                <MenuItem value="coach">Coach</MenuItem>
                            </Select>
                            <FormHelperText>{errors.identifier?.message}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin="normal" error={!!errors.studio}>
                            <InputLabel id="studio">Studio</InputLabel>
                            <Select
                                {...register('studio')}
                                defaultValue=""
                                label="Studio"
                            >
                                {studios.map(studio => (
                                    <MenuItem key={studio._id} value={studio._id}>
                                        {studio.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.studio?.message}</FormHelperText>
                        </FormControl>
                    </form>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
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