import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
const CustomToolbar = ({ selectedRows, handleMultiDelete, handleAdd, theme, button, location = '', handleAddHeat, orphanEntries }) => {
    return (
        <GridToolbarContainer>
            <Box sx={{ flexGrow: 1 }}>
                <GridToolbar printOptions={{
                    pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }', hideToolbar: true,
                }} sx={{
                    'button': {
                        color: theme === 'dark' ? 'white' : 'black',

                    },
                }} />
            </Box>
            {orphanEntries && orphanEntries.length !== 0 && location == 'heats' && (<Box>
                <Alert severity="error" sx={{
                    '& .MuiAlert-message': {
                        fontSize: '1rem',
                    },
                    '& .MuiAlert-icon': {
                        fontSize: '1.5rem',
                    }
                }}>Entries NOT in heats: {orphanEntries?.length}</Alert>
            </Box>)}
            <Button
                color="secondary"
                variant="contained"
                onClick={handleAdd}
            >
                {button}
            </Button>
            {/* {location === 'heats' && <Button
                color="secondary"
                variant="contained"
                onClick={handleAddHeat}
            >
                Add Heat
            </Button>} */}
            {selectedRows?.length > 0 && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleMultiDelete}
                >
                    Delete Selected
                </Button>
            )}
        </GridToolbarContainer>
    );
};

export default CustomToolbar;