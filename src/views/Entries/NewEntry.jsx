import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, CircularProgress, Typography, Autocomplete, MenuItem, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { addEntry, fetchEntries } from 'src/store/entriesSlice';
import { fetchDances } from 'src/store/dancesSlice';
import { capitalizeWords } from 'src/utils/capitalize';
import { AGE_CATEGORIES, LEVELS } from 'src/utils';
import { tokens } from "src/utils/theme";
import { formSxSettings } from 'src/utils';
import { fetchStudios } from 'src/store/studiosSlice';

const NewEntryModal = ({ open, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        studio: '',
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
        dispatch(fetchStudios());
    }, [dispatch]);

    const dancers = useSelector(state => state.dancers.dancers);
    const dances = useSelector(state => state.dances.dances);
    const studios = useSelector(state => state.studios.studios);
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
        if (!formValues.studio) newErrors.studio = 'Studio is required';
        if (!formValues.leader) newErrors.leader = 'Leader is required';
        if (!formValues.follower) newErrors.follower = 'Follower is required';
        if (!formValues.dance.length) newErrors.dance = 'Dance is required';
        if (!formValues.ageCategory.length) newErrors.ageCategory = 'Age Category is required';
        if (!formValues.level.length) newErrors.level = 'Level is required';
        return newErrors;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dispatch(addEntry(formValues));
            dispatch(fetchEntries());
            setFormValues({
                studio: '',
                leader: '',
                follower: '',
                dance: [],
                ageCategory: [],
                level: [],
            });
            onClose();
        }
    };

    const studioOptions = studios.map(studio => ({
        value: studio._id,
        label: studio.name
    }));

    const danceOptions = dances.map(dance => ({
        value: dance._id,
        label: `${dance.title} - ${dance.danceCategory.name}`
    }));

    const filteredDancerOptions = (role) => {
        return dancers
            .filter(dancer => {
                // Filter dancers by the selected studio
                if (formValues.studio && dancer.studio._id !== formValues.studio) {
                    return false;
                }
                if (role === 'leader' && formValues.follower) {
                    return dancer._id !== formValues.follower;
                }
                if (role === 'follower' && formValues.leader) {
                    return dancer._id !== formValues.leader;
                }
                return true;
            })
            .map(dancer => ({
                value: dancer._id,
                label: dancer.fullName
            }));
    };

    const handleOnClose = () => {
        setFormValues({
            studio: '',
            leader: '',
            follower: '',
            dance: [],
            ageCategory: [],
            level: [],
        });
        setErrors({});
        onClose();
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Dialog open={open} onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
                onClose();
            }
        }} maxWidth="sm" fullWidth>
            <DialogTitle>New Entry</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={studioOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => handleAutocompleteChange(event, value?.value, 'studio')}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Studio"
                                    error={!!errors.studio}
                                    helperText={errors.studio}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={filteredDancerOptions('leader')}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => handleAutocompleteChange(event, value?.value, 'leader')}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            disabled={!formValues.studio}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Leader"
                                    error={!!errors.leader}
                                    helperText={errors.leader}
                                    disabled={!formValues.studio}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={filteredDancerOptions('follower')}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) => handleAutocompleteChange(event, value?.value, 'follower')}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            disabled={!formValues.studio}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Follower"
                                    error={!!errors.follower}
                                    helperText={errors.follower}
                                    disabled={!formValues.studio}
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
                            disabled={!formValues.studio}
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
                            disabled={!formValues.studio}
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
                            disabled={!formValues.studio}
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
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Submit
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleOnClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewEntryModal;