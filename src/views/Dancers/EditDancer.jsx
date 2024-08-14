import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios } from '../../store/studiosSlice';
import { getOneDancer, editDancer } from '../../store/dancersSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Collapse, Paper, useTheme } from '@mui/material';
import { tokens } from 'src/utils/theme';

const EditDancer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        number: '',
        firstName: '',
        lastName: '',
        age: '',
        identifier: '',
        studio: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchDancerData = async () => {
            const response = await dispatch(getOneDancer(id));
            const dancer = response.payload[0];
            if (dancer) {
                setFormData({
                    number: dancer.number ? dancer.number : '',
                    firstName: dancer.firstName,
                    lastName: dancer.lastName,
                    age: dancer.age,
                    identifier: dancer.identifier,
                    studio: dancer.studio._id,
                });
            }
        };

        fetchDancerData();
        dispatch(fetchStudios());
    }, [dispatch, id]);

    const studios = useSelector(state => state.studios.studios);
    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.age || formData.age <= 0) newErrors.age = 'Age is required and must be a positive integer';
        if (!['professional', 'student', 'coach'].includes(formData.identifier)) newErrors.identifier = 'Identifier is required';
        if (!formData.studio) newErrors.studio = 'Studio is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(editDancer({ id, ...formData }));
            getOneDancer(id)
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                navigate(`/admin/dancers/${id}`);
            }, 1000)
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
                <Alert severity="success" sx={{ mb: 2 }}> Updated dancer successfully, redirecting... </Alert>
            </Collapse>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary[400] }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        error={!!errors.number}
                        helperText={errors.number?.message}
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
                    <TextField
                        select
                        label="Studio"
                        name="studio"
                        value={formData.studio}
                        onChange={handleChange}
                        error={!!errors.studio}
                        helperText={errors.studio}
                        fullWidth
                        margin="normal"
                    >
                        {studios.map(studio => (
                            <MenuItem key={studio._id} value={studio._id}>
                                {studio.name}
                            </MenuItem>
                        ))}
                    </TextField>
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