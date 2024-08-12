import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios } from '../../store/studiosSlice';
import { addDancer } from '../../store/dancersSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Collapse, Paper, useTheme } from '@mui/material';
import { tokens } from 'src/utils/theme';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required').positive().integer(),
    identifier: yup.string().oneOf(['professional', 'student', 'coach']).required('Identifier is required'),
    studio: yup.string().required('Studio is required'),
});

const NewDancer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const firstNameRef = useRef(null); // Ref to focus on the first input field

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dispatch(fetchStudios());
    }, [dispatch]);

    const studios = useSelector(state => state.studios.studios);
    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    const onSubmit = (data) => {
        dispatch(addDancer(data));
        if (!error) {
            setOpen(true);
            reset();
            if (firstNameRef.current) {
                firstNameRef.current.focus(); // Focus on the first input field after reset
            }
            setTimeout(() => {
                setOpen(false)
            }, 3000);
        }
    };

    const handleCancel = () => {
        navigate('/admin/dancers');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Collapse in={open}>
                <Alert severity="success">Dancer added successfully!</Alert>
            </Collapse>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary[400] }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="First Name"
                        {...register('firstName')}
                        inputRef={firstNameRef} // Attach the ref to the first input field
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
                        >
                            <MenuItem value="professional">Professional</MenuItem>
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="coach">Coach</MenuItem>
                        </Select>
                        <FormHelperText>{errors.identifier?.message}</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth margin="normal" error={!!errors.studio}>
                        <InputLabel>Studio</InputLabel>
                        <Select
                            {...register('studio')}
                        >
                            {studios.map(studio => (
                                <MenuItem key={studio._id} value={studio._id}>
                                    {studio.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.studio?.message}</FormHelperText>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default NewDancer;