import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import dayjs from 'dayjs';

export default function NextHeats({ upcomingHeats }) {
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Next Three Heats
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Dance</TableCell>
                            <TableCell>Entries</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {upcomingHeats.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No upcoming heats.
                                </TableCell>
                            </TableRow>
                        ) : (
                            upcomingHeats.map((heat) => (
                                <TableRow key={heat._id}>
                                    <TableCell>
                                        {dayjs(heat.dateTime).format('MMMM D YYYY, h:mm A')}
                                    </TableCell>
                                    <TableCell>
                                        {heat.dance.title} - {heat.dance.danceCategory.name}
                                    </TableCell>
                                    <TableCell>
                                        <List disablePadding>
                                            {heat.entries.map((entry) => (
                                                <ListItem key={entry._id} disablePadding>
                                                    <ListItemText
                                                        primary={`${entry.leader.fullName} & ${entry.follower.fullName}`}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}