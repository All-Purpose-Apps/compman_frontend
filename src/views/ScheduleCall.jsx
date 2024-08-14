import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    useTheme,
    Paper,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { tokens } from "src/utils/theme";
import dayjs from "dayjs";

const ScheduleCall = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        phone: "",
        date: null,
        time: null,
        message: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: false,
        email: false,
        phone: false,
        date: false,
        time: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormValues({ ...formValues, date });
    };

    const handleTimeChange = (time) => {
        setFormValues({ ...formValues, time });
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        return /^[0-9]{10}$/.test(phone);
    };

    const isWeekday = (date) => {
        const day = date.day();
        return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
    };

    const isWithinWorkingHours = (time) => {
        const hour = time.hour();
        return hour >= 9 && hour < 17; // 9 AM to 5 PM
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {
            name: formValues.name === "",
            email: !validateEmail(formValues.email),
            phone: !validatePhone(formValues.phone),
            date: !formValues.date || !isWeekday(formValues.date),
            time: !formValues.time || !isWithinWorkingHours(formValues.time),
        };

        setFormErrors(errors);

        const hasErrors = Object.values(errors).some((error) => error === true);
        if (!hasErrors) {
            // Handle form submission
            console.log("Form submitted successfully", formValues);
        }
    };

    return (
        <Box m="20px">
            <Paper elevation={3} sx={{ padding: "20px" }}>
                <Typography variant="h4" color={colors.greenAccent[500]} gutterBottom>
                    Schedule a Call
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                error={formErrors.name}
                                helperText={formErrors.name ? "Name is required" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                error={formErrors.email}
                                helperText={formErrors.email ? "Invalid email address" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                type="tel"
                                value={formValues.phone}
                                onChange={handleInputChange}
                                error={formErrors.phone}
                                helperText={formErrors.phone ? "Invalid phone number" : ""}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={6} spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    label="Select Date"
                                    value={formValues.date}
                                    onChange={handleDateChange}
                                    shouldDisableDate={(date) => !isWeekday(date)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: formErrors.date,
                                            helperText: formErrors.date ? "Date must be a weekday" : "",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TimePicker
                                    label="Select Time"
                                    value={formValues.time}
                                    onChange={handleTimeChange}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: formErrors.time,
                                            helperText: formErrors.time
                                                ? "Time must be between 9 AM and 5 PM"
                                                : "",
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                value={formValues.message}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Schedule Call
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default ScheduleCall;