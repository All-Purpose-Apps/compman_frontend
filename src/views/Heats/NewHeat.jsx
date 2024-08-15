import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries } from 'src/store/entriesSlice';
import { addHeat, fetchHeats } from 'src/store/heatsSlice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import "react-datetime/css/react-datetime.css";

const NewHeat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
    const [selectedEntries, setSelectedEntries] = useState([]);

    useEffect(() => {
        dispatch(fetchEntries());
    }, [dispatch]);

    const entries = useSelector(state => state.entries.entries);
    const isLoading = useSelector(state => state.entries.status) === 'loading';
    const errors = useSelector(state => state.entries.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        const entryIds = selectedEntries.map(entry => entry.value);
        dispatch(addHeat({ dateTime: selectedDate, entries: entryIds }));
        dispatch(fetchHeats());
        navigate('/admin/heats');
    };

    const entryOptions = entries.map(entry => ({
        value: entry._id,
        label: `${entry.leader.fullName} & ${entry.follower.fullName} - ${entry.dance.danceCategory.name} - ${entry.dance.title}`
    }));

    const handleCancel = () => {
        navigate('/admin/heats');
    };

    const handleChange = (selected) => {
        setSelectedEntries(selected);
    };

    if (isLoading) {
        return <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>;
    }


    if (entries.length === 0) {
        return <Typography>No entries available. Please create entries first.</Typography>;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className='form-container'>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Modal open={errors}>
                    <Box sx={{ width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Error
                        </Typography>
                        <Typography color="error">Error: {errors}</Typography>
                    </Box>
                </Modal>
            </Box>
            <FormControl fullWidth margin="normal">
                <DateTimePicker
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    slotProps={{ textField: { variant: 'outlined' } }}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Entries</InputLabel>
                <Select
                    multiple
                    value={selectedEntries}
                    onChange={handleChange}
                    renderValue={(selected) => selected.map(entry => entry.label).join(', ')}
                >
                    {entryOptions.map((option) => (
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