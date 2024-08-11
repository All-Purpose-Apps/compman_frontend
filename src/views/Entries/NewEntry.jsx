import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, Container, CircularProgress, Typography, Autocomplete, MenuItem, useTheme, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { addCouple, fetchCouples } from 'src/store/couplesSlice';
import { fetchDances } from 'src/store/dancesSlice';
import { capitalizeWords } from 'src/utils/capitalize';
import { AGE_CATEGORIES, LEVELS } from 'src/utils/constants';
import { tokens } from "src/utils/theme";
import { formSxSettings } from 'src/utils/customSX';

const NewEntry = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        leader: '',
        follower: '',
        dance: [],
        ageCategory: [],
        level: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchDancers());
        dispatch(fetchDances());
    }, [dispatch]);

    const dancers = useSelector(state => state.dancers.dancers);
    const dances = useSelector(state => state.dances.dances);
    const isLoading = useSelector(state => state.dancers.status) === 'loading';
    const error = useSelector(state => state.dancers.error);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleAutocompleteChange = (event, value, name) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formValues.leader) newErrors.leader = 'Leader is required';
        if (!formValues.follower) newErrors.follower = 'Follower is required';
        if (!formValues.dance) newErrors.dance = 'Dance is required';
        if (!formValues.ageCategory) newErrors.ageCategory = 'Age Category is required';
        if (!formValues.level) newErrors.level = 'Level is required';
        return newErrors;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dispatch(addCouple(formValues));
            dispatch(fetchCouples());
            navigate('/admin/entries');
        }
    };

    const handleCancel = () => {
        navigate('/admin/entries');
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
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary[400] }}>
                <form onSubmit={onSubmit}>
                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={dancerOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => handleAutocompleteChange(event, value?.value, 'leader')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Leader"
                                    error={!!errors.leader}
                                    helperText={errors.leader}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={dancerOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => handleAutocompleteChange(event, value?.value, 'follower')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Follower"
                                    error={!!errors.follower}
                                    helperText={errors.follower}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            select
                            name="dance"
                            label="Dance"
                            value={formValues.dance}
                            onChange={handleChange}
                            error={!!errors.dance}
                            helperText={errors.dance}
                            SelectProps={{
                                multiple: true,
                            }}
                        >
                            {danceOptions.map(option => (
                                <MenuItem key={option.value} value={option.value} sx={formSxSettings(colors)}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            select
                            name="ageCategory"
                            label="Age Category"
                            value={formValues.ageCategory}
                            onChange={handleChange}
                            error={!!errors.ageCategory}
                            helperText={errors.ageCategory}
                            SelectProps={{
                                multiple: true,
                            }}
                        >
                            {AGE_CATEGORIES.map(category => (
                                <MenuItem key={category} value={category} sx={formSxSettings(colors)}>
                                    {capitalizeWords(category)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            select
                            name="level"
                            label="Level"
                            value={formValues.level}
                            onChange={handleChange}
                            error={!!errors.level}
                            helperText={errors.level}
                            SelectProps={{
                                multiple: true,
                            }}
                        >
                            {LEVELS.map(level => (
                                <MenuItem key={level} value={level} sx={formSxSettings(colors)}>
                                    {capitalizeWords(level)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, mr: 2 }}>
                        Submit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                        Cancel
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default NewEntry;