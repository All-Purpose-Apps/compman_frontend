import React, { useEffect, useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, Paper, useTheme, DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries } from 'src/store/entriesSlice';
import { addHeats, fetchHeats } from 'src/store/heatsSlice';
import dayjs from 'dayjs';
import { tokens } from 'src/utils/theme';

const AutoGenerateHeats = ({ open, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedStartDate, setSelectedStartDate] = useState(dayjs(new Date()));
    const [selectedEndDate, setSelectedEndDate] = useState(dayjs(new Date()));
    const [interval, setInterval] = useState(1.5);

    useEffect(() => {
        dispatch(fetchEntries());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addHeats());
        dispatch(fetchHeats());
        onClose();
        navigate('/admin/heats');
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Auto Generate Heats</DialogTitle>
            <DialogContent
                dividers
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px', // Adjust height as needed
                }}
            >
                <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary, textAlign: 'center' }}>
                    <DialogContentText color="error">
                        WARNING:
                    </DialogContentText>
                    <DialogContentText color="error">
                        After you click the generate button, the heats will be automatically generated.
                    </DialogContentText>
                    <DialogContentText color="error">
                        If you do this twice, you may end up with duplicate heats.</DialogContentText>
                    <DialogContentText color="error">
                        ONLY CLICK THE GENERATE BUTTON ONCE, THEN EDIT HEATS AS NEEDED.</DialogContentText>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Generate
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AutoGenerateHeats;