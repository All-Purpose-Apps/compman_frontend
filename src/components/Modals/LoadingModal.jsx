import { Box, Dialog, DialogTitle, DialogContent, CircularProgress } from "@mui/material";

export default function LoadingModal({ loading, resource }) {
    return (
        <Dialog
            open={loading}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Loading {resource}
            </DialogTitle>
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress sx={{ mt: 2 }} />
                </Box>
            </DialogContent>
        </Dialog>
    )
}
