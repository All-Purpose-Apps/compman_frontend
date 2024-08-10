import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, MenuItem, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addStudio } from 'src/store/studiosSlice';

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

const NewStudio = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            phone: '',
            email: '',
            website: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addStudio(values));
            navigate('/admin/studios');
        },
    });

    const handleCancel = () => {
        navigate('/admin/studios');
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <form onSubmit={() => formik.handleSubmit()}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="website"
                            name="website"
                            label="Website"
                            value={formik.values.website}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.website && Boolean(formik.errors.website)}
                            helperText={formik.touched.website && formik.errors.website}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            variant="outlined"
                            fullWidth
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default NewStudio;