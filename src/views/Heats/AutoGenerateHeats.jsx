import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress, Paper, useTheme } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouples } from 'src/store/couplesSlice';
import { addHeat, fetchHeats } from 'src/store/heatsSlice';
import dayjs from 'dayjs';
import { tokens } from 'src/utils/theme';

const AutoGenerateHeats = () => {
    const theme = useTheme();
    const colors = tokens(theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedStartDate, setSelectedStartDate] = useState(dayjs(new Date()));
    const [selectedEndDate, setSelectedEndDate] = useState(dayjs(new Date()));
    const [interval, setInterval] = useState(1.5);

    useEffect(() => {
        dispatch(fetchCouples());
    }, [dispatch]);

    const couples = useSelector(state => state.couples.couples);
    const isLoading = useSelector(state => state.couples.status) === 'loading';
    const errors = useSelector(state => state.couples.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            start: selectedStartDate,
            end: selectedEndDate,
            interval: interval
        };
        dispatch(addHeat(data));
        dispatch(fetchHeats());
        navigate('/admin/heats');
    };

    const handleCancel = () => {
        navigate('/admin/heats');
    };

    const handleGoToEntries = () => {
        navigate('/admin/entries');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (couples.length === 0) {
        return <Dialog
            open={couples.length === 0}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="150px" // Adjust height as needed
                >
                    <DialogContentText
                        id="alert-dialog-description"
                        align="center" // Center text horizontally
                    >
                        No Entries, Please create entries first.
                    </DialogContentText>
                    <Button variant="outlined" onClick={() => handleGoToEntries()} sx={{ color: 'white', mt: 2 }}>
                        Go to Entries
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    }

    return (
        <Box className='form-container' sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary, maxWidth: '500px' }}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FormControl fullWidth margin="normal">
                        <DateTimePicker
                            label="Start"
                            value={selectedStartDate}
                            onChange={(date) => setSelectedStartDate(date)}
                            slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <DateTimePicker
                            label="End"
                            value={selectedEndDate}
                            onChange={(date) => setSelectedEndDate(date)}
                            slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Interval (minutes)"
                            type="number"
                            value={interval}
                            onChange={(e) => setInterval(e.target.value)}
                            required
                        />
                    </FormControl>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" color="primary" type="submit">Generate</Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AutoGenerateHeats;