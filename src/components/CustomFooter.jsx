import { GridFooterContainer, GridPagination } from '@mui/x-data-grid';
import { Box, Switch, FormControlLabel } from '@mui/material';

const CustomFooter = ({ isAutoPaging, autoPageToggle }) => {
    return (
        <GridFooterContainer>
            <Box sx={{ flexGrow: 1 }} ml={2}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isAutoPaging}
                            onChange={autoPageToggle}
                            color="secondary"
                        />
                    }
                    label="Auto Pages"
                />
            </Box>
            <GridPagination />
        </GridFooterContainer>
    );
};

export default CustomFooter;