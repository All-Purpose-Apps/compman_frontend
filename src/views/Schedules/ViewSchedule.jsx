import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from 'src/store/schedulesSlice';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';

export default function ViewSchedule() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSchedules());
    }, [dispatch]);

    const schedules = useSelector((state) => state.schedules.schedules);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>
                Schedule Overview
            </Typography>
            <Table aria-label="schedule table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Event</TableCell>
                        <TableCell align="center">Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                            <TableCell component="th" scope="row">
                                {new Date(schedule.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="center">
                                {new Date(schedule.time).toLocaleTimeString()}
                            </TableCell>
                            <TableCell align="center">{schedule.event}</TableCell>
                            <TableCell align="center">{schedule.location}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}