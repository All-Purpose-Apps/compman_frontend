import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios } from 'src/store/studiosSlice';
import { getOneDancer, editDancer } from 'src/store/dancersSlice';
import { TextField, Button, MenuItem, Box, Paper, useTheme, FormControl, Select, InputLabel } from '@mui/material';
import { tokens } from 'src/utils/theme';

const EditDancer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        number: '',
        firstName: '',
        middleInitial: '',
        lastName: '',
        age: '',
        identifier: '',
        studio: '',
    });
    const [errors, setErrors] = useState({});

    const studios = useSelector(state => state.studios.studios);
    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(getOneDancer(id));
            const dancer = response.payload[0];
            if (dancer) {
                setFormData({
                    number: dancer.number || '',
                    firstName: dancer.firstName,
                    middleInitial: dancer.middleInitial,
                    lastName: dancer.lastName,
                    age: dancer.age,
                    identifier: dancer.identifier,
                    studio: dancer.studio._id,
                });
            }
        };

        fetchData();
        dispatch(fetchStudios());
    }, [dispatch, id]);

    const validate = () => {
        const validationErrors = {};
        if (!formData.firstName) validationErrors.firstName = 'First Name is required';
        if (!formData.lastName) validationErrors.lastName = 'Last Name is required';
        if (!formData.age || formData.age <= 0) validationErrors.age = 'Age must be a positive integer';
        if (!['professional', 'student', 'coach'].includes(formData.identifier)) validationErrors.identifier = 'Invalid Identifier';
        if (!formData.studio) validationErrors.studio = 'Studio is required';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            await dispatch(editDancer({ id, ...formData }));
            navigate(-1);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary[400] }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Middle Initial"
                        name="middleInitial"
                        value={formData.middleInitial}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        error={!!errors.age}
                        helperText={errors.age}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Identifier"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        error={!!errors.identifier}
                        helperText={errors.identifier}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="professional">Professional</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="coach">Coach</MenuItem>
                    </TextField>
                    <FormControl fullWidth margin="normal" error={!!errors.studio}>
                        <InputLabel>Studio</InputLabel>
                        <Select
                            label="Studio"
                            name="studio"
                            value={formData.studio}
                            onChange={handleChange}
                        >
                            {studios.map((studio) => (
                                <MenuItem key={studio._id} value={studio._id}>
                                    {studio.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.studio && <FormHelperText>{errors.studio}</FormHelperText>}
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save
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

export default EditDancer;