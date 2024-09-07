import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useTheme from '@mui/material/styles/useTheme';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries } from 'src/store/entriesSlice';
import { tokens } from "src/utils/theme";
import { formSxSettings } from 'src/utils';
import { addOneHeat } from 'src/store/heatsSlice';



const CreateCustomHeat = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        dateTime: null,
        entries: [],
        number: 9999,
        level: 'newcomer',
        ageCategory: 'a',
        dance: '6629f2e63de4ac4180c495a4',
    });

    const [errors, setErrors] = useState({});
    const [availableEntries, setAvailableEntries] = useState([]);

    useEffect(() => {
        dispatch(fetchEntries());
    }, [dispatch]);

    const entries = useSelector(state => state.entries.entries);
    const isLoading = useSelector(state => state.entries.status) === 'loading';
    const error = useSelector(state => state.entries.error);

    useEffect(() => {
        setAvailableEntries(entries);
    }, [entries]);

    const handleDateTimeChange = (newValue) => {
        setFormValues({ ...formValues, dateTime: newValue });
    };
    const handleGoToEntries = () => {
        navigate('/admin/entries');
    };

    const handleEntriesChange = (event) => {
        const selectedValues = event.target.value;

        if (selectedValues.length <= 8) {
            const selectedEntries = selectedValues.map(id => availableEntries.find(entry => entry._id === id));


            const selectedLeaders = selectedEntries.map(entry => entry.leader.fullName);
            const selectedFollowers = selectedEntries.map(entry => entry.follower.fullName);


            const filteredEntries = entries.filter(entry =>
                selectedValues.includes(entry._id) ||
                (!selectedLeaders.includes(entry.leader.fullName) && !selectedFollowers.includes(entry.follower.fullName))
            );

            setAvailableEntries(filteredEntries);
            setFormValues({ ...formValues, entries: selectedValues });
            setErrors({ ...errors, entries: '' });
        } else {
            setErrors({ ...errors, entries: 'You can only select up to 8 entries' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formValues.dateTime) newErrors.dateTime = 'Date and Time are required';
        if (formValues.entries.length === 0) newErrors.entries = 'At least one entry is required';
        return newErrors;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dispatch(addOneHeat(formValues));
            navigate(-1);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const entryOptions = availableEntries.map(entry => ({
        value: entry._id,
        label: `${entry.leader.fullName} & ${entry.follower.fullName} :: ${entry.dance.title} - ${entry.dance.danceCategory.name}`,
    }));

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Container>
        );
    }

    if (entries.length === 0) {
        return <Dialog
            open={entries.length === 0}
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
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: colors.primary[400] }}>
                <form onSubmit={onSubmit}>
                    <FormControl fullWidth margin="normal">
                        <DateTimePicker
                            label="Date and Time"
                            value={formValues.dateTime}
                            onChange={handleDateTimeChange}
                            slot={(params) => <TextField {...params} error={!!errors.dateTime} helperText={errors.dateTime} />}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            select
                            name="entries"
                            label="Entries"
                            value={formValues.entries}
                            onChange={handleEntriesChange}
                            error={!!errors.entries}
                            helperText={errors.entries || 'Select up to 8 entries'}
                            SelectProps={{
                                multiple: true,
                                renderValue: (selected) => selected
                                    .map(id => entryOptions.find(option => option.value === id)?.label)
                                    .join(', ')
                            }}
                        >
                            {entryOptions.map(option => (
                                <MenuItem key={option.value} value={option.value} sx={formSxSettings(colors)}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, mr: 2 }}>
                        Create Heat
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                        Cancel
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateCustomHeat;