import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, MenuItem, Box, Grid } from '@mui/material';
import { getOneStudio, editStudio } from '../../store/studiosSlice';

// Validation schema using Yup
const validationSchema = yup.object().shape({
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
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(editStudio({ id, ...values }));
            dispatch(getOneStudio(id));
            navigate(`/admin/studios/${id}`);
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
                studioType: studio.studioType,
                email: studio.email,
                website: studio.website,
            });
        };

        fetchStudio();
    }, [dispatch, id]);

    const handleCancel = () => {
        navigate(`/admin/studios/${id}`);
    };

    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                            Save
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
}