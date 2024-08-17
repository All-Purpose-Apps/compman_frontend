import { Button, Box } from "@mui/material";
import { GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
const CustomToolbar = ({ selectedRows, handleMultiDelete, handleAdd, theme, button, location = '', handleAddHeat }) => {

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