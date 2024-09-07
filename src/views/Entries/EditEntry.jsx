import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import useTheme from '@mui/material/styles/useTheme';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { getOneEntry, editEntry } from 'src/store/entriesSlice';
import { fetchDancers } from 'src/store/dancersSlice';
import { fetchDances } from 'src/store/dancesSlice';
import { AGE_CATEGORIES, LEVELS } from 'src/utils';
import { capitalizeWords } from 'src/utils/capitalize';
import { tokens } from 'src/utils/theme';
import { formSxSettings } from 'src/utils';

const schema = yup.object().shape({
    leader: yup.string().required('Leader is required'),
    follower: yup.string().required('Follower is required'),
    dance: yup.string().required('Dance is required'),
    ageCategory: yup.string().required('Age Category is required'),
    level: yup.string().required('Level is required'),
});

export default function EditEntry() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({
        leader: '',
        follower: '',
        dance: '',
        ageCategory: '',
        level: '',
    });

    useEffect(() => {
        const fetchEntry = async () => {
            const response = await dispatch(getOneEntry(id));
            const entry = response.payload[0];
            setInitialValues({
                leader: entry.leader._id,
                follower: entry.follower._id,
                dance: entry.dance._id,
                ageCategory: entry.ageCategory,
                level: entry.level,
            });
        };

        fetchEntry();
        dispatch(fetchDancers());
        dispatch(fetchDances());
    }, [dispatch, id]);

    const entry = useSelector(state => state.entries.entry[0]);
    const dancers = useSelector(state => state.dancers.dancers);
    const dances = useSelector(state => state.dances.dances);
    const isLoading = useSelector(state => state.entries.status) === 'loading';
    const error = useSelector(state => state.entries.error);

    const handleCancel = () => {
        navigate(-1);
    };

    const danceOptions = dances.map(dance => ({
        value: dance._id,
        label: `${dance.title} - ${dance.danceCategory.name}`
    }));

    const dancerOptions = dancers.map(dancer => ({
        value: dancer._id,
        label: dancer.fullName
    }));

    if (isLoading) {
        return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary[400] }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(values) => {
                        dispatch(editEntry({ id, ...values }));
                        navigate(-1);
                    }}
                    enableReinitialize
                >
                    {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                            <FormControl fullWidth margin="normal">
                                <Autocomplete
                                    options={dancerOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={dancerOptions.find(option => option.value === values.leader) || null}
                                    onChange={(e, value) => setFieldValue('leader', value?.value || '')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Leader"
                                            error={touched.leader && Boolean(errors.leader)}
                                            helperText={touched.leader && errors.leader}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Autocomplete
                                    options={dancerOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={dancerOptions.find(option => option.value === values.follower) || null}
                                    onChange={(e, value) => setFieldValue('follower', value?.value || '')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Follower"
                                            error={touched.follower && Boolean(errors.follower)}
                                            helperText={touched.follower && errors.follower}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Autocomplete
                                    options={danceOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={danceOptions.find(option => option.value === values.dance) || null}
                                    onChange={(e, value) => setFieldValue('dance', value?.value || '')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Dance"
                                            error={touched.dance && Boolean(errors.dance)}
                                            helperText={touched.dance && errors.dance}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Field
                                    as={TextField}
                                    select
                                    label="Age Category"
                                    name="ageCategory"
                                    error={touched.ageCategory && Boolean(errors.ageCategory)}
                                    helperText={touched.ageCategory && errors.ageCategory}
                                    SelectProps={{
                                        multiple: false,
                                    }}
                                >
                                    {AGE_CATEGORIES.map(category => (
                                        <MenuItem key={category} value={category} sx={formSxSettings(colors)}>
                                            {capitalizeWords(category)}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Field
                                    as={TextField}
                                    select
                                    label="Level"
                                    name="level"
                                    error={touched.level && Boolean(errors.level)}
                                    helperText={touched.level && errors.level}
                                    SelectProps={{
                                        multiple: false,
                                    }}
                                >
                                    {LEVELS.map(level => (
                                        <MenuItem key={level} value={level} sx={formSxSettings(colors)}>
                                            {capitalizeWords(level)}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>

                            <Box mt={4} display="flex" justifyContent="space-between">
                                <Button variant="contained" color="primary" type="submit">
                                    Save
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
}