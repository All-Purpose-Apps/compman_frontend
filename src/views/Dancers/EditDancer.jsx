import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Container, CircularProgress, Typography } from '@mui/material';
import { getOneDancer, editDancer } from '../../store/dancersSlice';
import { fetchStudios } from '../../store/studiosSlice';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required').positive().integer(),
    identifier: yup.string().oneOf(['professional', 'student', 'coach']).required('Identifier is required'),
    studio: yup.string().required('Studio is required'),
});

export default function EditDancer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchDancer = async () => {
            const response = await dispatch(getOneDancer(id));
            const dancer = response.payload[0];
            setValue('firstName', dancer.firstName);
            setValue('lastName', dancer.lastName);
            setValue('age', dancer.age);
            setValue('identifier', dancer.identifier);
            setValue('studio', dancer.studio._id);
        };

        fetchDancer();
        dispatch(fetchStudios());
    }, [dispatch, id, setValue]);

    const studios = useSelector(state => state.studios.studios);
    const isLoading = useSelector(state => state.dancers.status) === 'loading';
    const error = useSelector(state => state.dancers.error);

    const onSubmit = (data) => {
        dispatch(editDancer({ id, ...data }));
        navigate('/admin/dancers/' + id);
    };

    const handleCancel = () => {
        navigate('/admin/dancers/' + id);
    };

    if (isLoading) {
        return <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Container>;
    }

    if (error) {
        return <Container sx={{ mt: 4 }}>
            <Typography variant="h6" color="error">{error}</Typography>
        </Container>;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="First Name"
                    {...register('firstName')}
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
                        value={getValues('identifier')}
                    >
                        <MenuItem value="">Select Identifier</MenuItem>
                        <MenuItem value="professional">Professional</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="coach">Coach</MenuItem>
                    </Select>
                    <Typography variant="caption" color="error">{errors.identifier?.message}</Typography>
                </FormControl>
                <FormControl fullWidth margin="normal" error={!!errors.studio}>
                    <InputLabel>Studio</InputLabel>
                    <Select
                        {...register('studio')}
                        value={getValues('studio')}
                    >
                        <MenuItem value="">Select Studio</MenuItem>
                        {studios.map(studio => (
                            <MenuItem key={studio._id} value={studio._id}>
                                {studio.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="caption" color="error">{errors.studio?.message}</Typography>
                </FormControl>
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, mr: 2 }}>
                    Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                    Cancel
                </Button>
            </form>
        </Container>
    );
}