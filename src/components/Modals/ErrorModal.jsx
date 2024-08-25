import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ErrorModal({ errorOpen, onErrorClose, errorMessage, button }) {
    return (
        <Dialog open={errorOpen} onClose={onErrorClose} maxWidth="sm" fullWidth>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="error">
                    {errorMessage}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onErrorClose} color="primary" variant="contained">
                    {button}
                </Button>
            </DialogActions>
        </Dialog>
    );
}