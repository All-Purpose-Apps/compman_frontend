import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, MenuItem, TextField, Typography, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { getOneCouple, editCouple } from '../../store/couplesSlice';
import { fetchDancers } from '../../store/dancersSlice';
import { fetchDances } from '../../store/dancesSlice';

const schema = yup.object().shape({
    leader: yup.string().required('Leader is required'),
    follower: yup.string().required('Follower is required'),
    dance: yup.string().required('Dance is required'),
    ageCategory: yup.string().required('Age Category is required'),
    level: yup.string().required('Level is required'),
});

export default function EditCouple() {
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
        navigate('/admin/couples/' + id);
    };

    const handleCancel = () => {
        navigate('/admin/couples/' + id);
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Leader</InputLabel>
                    <Select
                        defaultValue={couple?.leader._id || ''}
                        onChange={(e) => setValue('leader', e.target.value)}
                    >
                        {dancerOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.leader && <Typography color="error">{errors.leader.message}</Typography>}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Follower</InputLabel>
                    <Select
                        defaultValue={couple?.follower._id || ''}
                        onChange={(e) => setValue('follower', e.target.value)}
                    >
                        {dancerOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.follower && <Typography color="error">{errors.follower.message}</Typography>}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Dance</InputLabel>
                    <Select
                        defaultValue={couple?.dance._id || ''}
                        onChange={(e) => setValue('dance', e.target.value)}
                    >
                        {danceOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.dance && <Typography color="error">{errors.dance.message}</Typography>}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Age Category</InputLabel>
                    <Select
                        defaultValue={couple?.ageCategory || ''}
                        {...register('ageCategory')}
                    >
                        <MenuItem value="">Select Age Category</MenuItem>
                        <MenuItem value="preteen i">Preteen I</MenuItem>
                        <MenuItem value="preteen ii">Preteen II</MenuItem>
                        <MenuItem value="junior">Junior</MenuItem>
                        <MenuItem value="a">A</MenuItem>
                        <MenuItem value="a1">A1</MenuItem>
                        <MenuItem value="a2">A2</MenuItem>
                        <MenuItem value="b">B</MenuItem>
                        <MenuItem value="b1">B1</MenuItem>
                        <MenuItem value="b2">B2</MenuItem>
                        <MenuItem value="c">C</MenuItem>
                        <MenuItem value="c1">C1</MenuItem>
                        <MenuItem value="c2">C2</MenuItem>
                        <MenuItem value="c3">C3</MenuItem>
                    </Select>
                    {errors.ageCategory && <Typography color="error">{errors.ageCategory.message}</Typography>}
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Level</InputLabel>
                    <Select
                        defaultValue={couple?.level || ''}
                        {...register('level')}
                    >
                        <MenuItem value="">Select Level</MenuItem>
                        <MenuItem value="novice">Novice</MenuItem>
                        <MenuItem value="newcomer">Newcomer</MenuItem>
                        <MenuItem value="associate bronze">Associate Bronze</MenuItem>
                        <MenuItem value="associate silver">Associate Silver</MenuItem>
                        <MenuItem value="associate gold">Associate Gold</MenuItem>
                        <MenuItem value="full bronze">Full Bronze</MenuItem>
                        <MenuItem value="full silver">Full Silver</MenuItem>
                        <MenuItem value="full gold">Full Gold</MenuItem>
                    </Select>
                    {errors.level && <Typography color="error">{errors.level.message}</Typography>}
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
        </Box>
    );
}