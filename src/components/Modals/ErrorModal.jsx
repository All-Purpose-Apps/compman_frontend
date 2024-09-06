import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ErrorModal({ errorOpen, errorMessage, button }) {
    // Local state to control the open/close behavior
    const [open, setOpen] = useState(false);

    // Sync local state with the errorOpen prop
    useEffect(() => {
        if (Boolean(errorOpen)) {
            setOpen(true);
        }
    }, [errorOpen]);

    // Function to handle closing the modal
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="error">
                    {errorMessage}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    {button || 'Close'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}