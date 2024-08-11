import { Button, Box } from "@mui/material";
import { GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
const CustomToolbar = ({ selectedRows, handleMultiDelete, handleAdd, theme, button }) => {
    return (
        <GridToolbarContainer>
            <Box sx={{ flexGrow: 1 }}>
                <GridToolbar sx={{
                    'button': {
                        color: theme === 'dark' ? 'white' : 'black',
                    }
                }} />
            </Box>
            <Button
                color="secondary"
                variant="contained"
                onClick={handleAdd}
            >
                Add {button}
            </Button>
            {selectedRows.length > 0 && (
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