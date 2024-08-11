import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Typography, TextField, FormControl, CircularProgress, Paper, useTheme, Autocomplete, MenuItem } from '@mui/material';
import { getOneCouple, editCouple } from 'src/store/couplesSlice';
import { fetchDancers } from 'src/store/dancersSlice';
import { fetchDances } from 'src/store/dancesSlice';
import { AGE_CATEGORIES, LEVELS } from 'src/utils/constants';
import { capitalizeWords } from 'src/utils/capitalize';
import { tokens } from 'src/utils/theme';
import { formSxSettings } from 'src/utils/customSX';

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
    const couple = useSelector(state => state.couples.couple[0]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchCouple = async () => {
            const response = await dispatch(getOneCouple(id));
            const couple = response.payload[0];
            setValue('leader', couple.leader._id);
            setValue('follower', couple.follower._id);
            setValue('dance', couple.dance._id);
            setValue('ageCategory', couple.ageCategory);
            setValue('level', couple.level);
        };

        fetchCouple();
        dispatch(fetchDancers());
        dispatch(fetchDances());
    }, [dispatch, id, setValue]);

    const dancers = useSelector(state => state.dancers.dancers);
    const dances = useSelector(state => state.dances.dances);
    const isLoading = useSelector(state => state.couples.status) === 'loading';
    const error = useSelector(state => state.couples.error);

    const onSubmit = (data) => {
        dispatch(editCouple({ id, ...data }));
        navigate('/admin/entries/' + id);
    };

    const handleCancel = () => {
        navigate('/admin/entries/' + id);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={dancerOptions}
                            getOptionLabel={(option) => option.label}
                            defaultValue={dancerOptions.find(option => option.value === couple?.leader._id)}
                            onChange={(e, value) => setValue('leader', value?.value || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Leader"
                                    error={!!errors.leader}
                                    helperText={errors.leader?.message}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={dancerOptions}
                            getOptionLabel={(option) => option.label}
                            defaultValue={dancerOptions.find(option => option.value === couple?.follower._id)}
                            onChange={(e, value) => setValue('follower', value?.value || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Follower"
                                    error={!!errors.follower}
                                    helperText={errors.follower?.message}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={danceOptions}
                            getOptionLabel={(option) => option.label}
                            defaultValue={danceOptions.find(option => option.value === couple?.dance._id)}
                            onChange={(e, value) => setValue('dance', value?.value || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Dance"
                                    error={!!errors.dance}
                                    helperText={errors.dance?.message}
                                />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            select
                            label="Age Category"
                            defaultValue={couple?.ageCategory || ''}
                            {...register('ageCategory')}
                            error={!!errors.ageCategory}
                            helperText={errors.ageCategory?.message}
                            SelectProps={{
                                multiple: false,
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
                            label="Level"
                            defaultValue={couple?.level || ''}
                            {...register('level')}
                            error={!!errors.level}
                            helperText={errors.level?.message}
                            SelectProps={{
                                multiple: false,
                            }}
                        >
                            {LEVELS.map(level => (
                                <MenuItem key={level} value={level} sx={formSxSettings(colors)}>
                                    {capitalizeWords(level)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <Box mt={4}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Save
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Button variant="outlined" color="secondary" onClick={handleCancel} fullWidth>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}