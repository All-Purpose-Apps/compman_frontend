import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import moment from 'moment';

export default function CurrentSchedule({ schedules }) {
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>Current Schedule</Typography>
            <List>
                {schedules.length === 0 ? (
                    <ListItem>
                        <Typography variant="body1">No schedule available.</Typography>
                    </ListItem>
                ) : (
                    schedules.map((schedule, index) => (
                        <Fragment key={schedule._id}>
                            <ListItem component="div">
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" mb={2}>
                                            {moment(schedule.startDate).format('MMMM Do YYYY, h:mm A')}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body1">
                                                <strong>Event:</strong> {schedule.dances.map((dance) => `${dance.title} - ${dance.danceCategory.name}`).join(', ')}
                                            </Typography>
                                            <Typography component="span" variant="body1" mt={1}>
                                                <strong>Location:</strong> {schedule.location}
                                            </Typography>
                                        </>
                                    }
                                    className='dashboard-schedule' />
                            </ListItem>
                            {index < schedules.length - 1 && <Divider />}
                        </Fragment>
                    ))
                )}
            </List>
        </Paper>
    );
}