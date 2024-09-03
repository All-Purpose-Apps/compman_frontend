import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Box, Grid, Paper } from '@mui/material';
import { getOneStudio, editStudio } from '../../store/studiosSlice';

// Validation schema using Yup
const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    location: yup.string().required('Location is required'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    website: yup.string()
        .matches(
            /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9./]+$/,
            'Enter a valid URL'
        )
        .required('Website is required'),
});

const formFields = [
    { id: 'name', label: 'Name' },
    { id: 'location', label: 'Location' },
    { id: 'phone', label: 'Phone' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'website', label: 'Website' },
];

export default function EditStudio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            phone: '',
            email: '',
            website: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(editStudio({ id, ...values }));
            dispatch(getOneStudio(id));
            navigate(-1);
        },
    });

    useEffect(() => {
        const fetchStudio = async () => {
            const response = await dispatch(getOneStudio(id));
            const studio = response.payload[0];

            formik.setValues({
                name: studio.name,
                location: studio.location,
                phone: studio.phone,
                email: studio.email,
                website: studio.website,
            });
        };

        fetchStudio();
    }, [dispatch, id]);

    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        {formFields.map(({ id, label, type = 'text' }) => (
                            <Grid item xs={12} key={id}>
                                <TextField
                                    fullWidth
                                    id={id}
                                    name={id}
                                    label={label}
                                    type={type}
                                    value={formik.values[id]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched[id] && Boolean(formik.errors[id])}
                                    helperText={formik.touched[id] && formik.errors[id]}
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button color="primary" variant="contained" type="submit">
                                    Save
                                </Button>
                                <Button color="secondary" variant="outlined" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}