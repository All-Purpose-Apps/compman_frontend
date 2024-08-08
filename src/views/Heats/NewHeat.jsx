import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouples } from 'src/store/couplesSlice';
import { addHeat, fetchHeats } from 'src/store/heatsSlice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import "react-datetime/css/react-datetime.css";

const NewHeat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
    const [selectedCouples, setSelectedCouples] = useState([]);

    useEffect(() => {
        dispatch(fetchCouples());
    }, [dispatch]);

    const couples = useSelector(state => state.couples.couples);
    const isLoading = useSelector(state => state.couples.status) === 'loading';
    const errors = useSelector(state => state.couples.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        const coupleIds = selectedCouples.map(couple => couple.value);
        dispatch(addHeat({ dateTime: selectedDate, couples: coupleIds }));
        dispatch(fetchHeats());
        navigate('/admin/heats');
    };

    const coupleOptions = couples.map(couple => ({
        value: couple._id,
        label: `${couple.leader.fullName} & ${couple.follower.fullName} - ${couple.dance.danceCategory.name} - ${couple.dance.title}`
    }));

    const handleCancel = () => {
        navigate('/admin/heats');
    };

    const handleChange = (selected) => {
        setSelectedCouples(selected);
    };

    if (isLoading) {
        return <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>;
    }

    if (errors) {
        return <Typography color="error">Error: {errors}</Typography>;
    }

    if (couples.length === 0) {
        return <Typography>No couples available. Please create couples first.</Typography>;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className='form-container'>
            <FormControl fullWidth margin="normal">
                <DateTimePicker
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Couples</InputLabel>
                <Select
                    multiple
                    value={selectedCouples}
                    onChange={handleChange}
                    renderValue={(selected) => selected.map(couple => couple.label).join(', ')}
                >
                    {coupleOptions.map((option) => (
                        <MenuItem key={option.value} value={option}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant='contained' color='primary' type='submit'>Save</Button>
                <Button variant='contained' color='secondary' onClick={handleCancel}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default NewHeat;