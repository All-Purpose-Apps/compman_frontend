import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Container, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { addCouple, fetchCouples } from 'src/store/couplesSlice';
import { fetchDances } from 'src/store/dancesSlice';
import { capitalizeWords } from 'src/utils/capitalize';

const ageCategories = [
    'preteen i',
    'preteen ii',
    'junior',
    'a',
    'a1',
    'a2',
    'b',
    'b1',
    'b2',
    'c',
    'c1',
    'c2',
    'c3'
];

const levels = [
    'novice',
    'newcomer',
    'associate bronze',
    'associate silver',
    'associate gold',
    'full bronze',
    'full silver',
    'full gold'
];

const NewCouple = () => {
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
            navigate('/admin/couples');
        }
    };

    const handleCancel = () => {
        navigate('/admin/couples');
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
            <form onSubmit={onSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Leader</InputLabel>
                    <Select
                        name="leader"
                        value={formValues.leader}
                        onChange={handleChange}
                        error={!!errors.leader}
                    >
                        {dancerOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.leader && <Typography variant="caption" color="error">{errors.leader}</Typography>}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Follower</InputLabel>
                    <Select
                        name="follower"
                        value={formValues.follower}
                        onChange={handleChange}
                        error={!!errors.follower}
                    >
                        {dancerOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.follower && <Typography variant="caption" color="error">{errors.follower}</Typography>}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Dance</InputLabel>
                    <Select
                        name="dance"
                        multiple
                        value={formValues.dance}
                        onChange={handleChange}
                        error={!!errors.dance}
                    >
                        {danceOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.dance && <Typography variant="caption" color="error">{errors.dance}</Typography>}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Age Category</InputLabel>
                    <Select
                        name="ageCategory"
                        multiple
                        value={formValues.ageCategory}
                        onChange={handleChange}
                        error={!!errors.ageCategory}
                    >
                        {ageCategories.map(category => (
                            <MenuItem key={category} value={category}>
                                {capitalizeWords(category)}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.ageCategory && <Typography variant="caption" color="error">{errors.ageCategory}</Typography>}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Level</InputLabel>
                    <Select
                        name="level"
                        multiple
                        value={formValues.level}
                        onChange={handleChange}
                        error={!!errors.level}
                    >
                        {levels.map(level => (
                            <MenuItem key={level} value={level}>
                                {capitalizeWords(level)}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.level && <Typography variant="caption" color="error">{errors.level}</Typography>}
                </FormControl>

                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, mr: 2 }}>
                    Submit
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                    Cancel
                </Button>
            </form>
        </Container>
    );
};

export default NewCouple;