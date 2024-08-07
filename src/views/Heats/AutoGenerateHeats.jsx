import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouples } from 'src/store/couplesSlice';
import { addHeat, fetchHeats } from 'src/store/heatsSlice';
import dayjs from 'dayjs';

const AutoGenerateHeats = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedStartDate, setSelectedStartDate] = useState(dayjs(new Date()));
    const [selectedEndDate, setSelectedEndDate] = useState(dayjs(new Date()));
    const [selectedCouples, setSelectedCouples] = useState([]);

    useEffect(() => {
        dispatch(fetchCouples());
    }, [dispatch]);

    const couples = useSelector(state => state.couples.couples);
    const isLoading = useSelector(state => state.couples.status) === 'loading';
    const errors = useSelector(state => state.couples.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('start: ', selectedStartDate, 'end: ', selectedEndDate);
        // const coupleIds = selectedCouples.map(couple => couple.value);
        // dispatch(fetchHeats());
        // navigate('/admin/heats');
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
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors}</div>;
    }

    if (couples.length === 0) {
        return <div>No couples available. Please create couples first.</div>;
    }

    return (
        <Box className='form-container' sx={{ p: 2 }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl fullWidth margin="normal">
                    <DateTimePicker
                        label="Start"
                        value={selectedStartDate}
                        onChange={(date) => setSelectedStartDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <DateTimePicker
                        label="End"
                        value={selectedEndDate}
                        onChange={(date) => setSelectedEndDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" color="primary" type="submit">Generate</Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
                </Box>
            </form>
        </Box>
    );
};

export default AutoGenerateHeats;