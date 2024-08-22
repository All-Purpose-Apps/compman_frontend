import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomToolbar from "src/components/CustomToolbar";
import ErrorModal from "src/components/ErrorModal";
import LoadingModal from "src/components/LoadingModal";
import NewStudioModal from "./NewStudio";
import { deleteStudio, fetchStudios } from 'src/store/studiosSlice';
import { boxSxSettings, gridSxSettings } from "src/utils";
import { formatPhoneNumber } from 'src/utils/formatPhoneNumber';
import { tokens } from "src/utils/theme";

const Studios = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const studios = useSelector(state => state.studios.studios);
    const loading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error) || false;

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens

    useEffect(() => {
        dispatch(fetchStudios());
    }, [dispatch, navigate]);

    const handleEdit = (id) => {
        navigate(`/admin/studios/edit/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(deleteStudio(id));
        navigate('/admin/studios');
    };

    const handleAddStudio = () => {
        setOpen(true);
    };

    const handleGetStudio = (id) => {
        navigate(`/admin/studios/${id}`);
    };

    const onClose = () => {
        setOpen(false);
    };

    const reloadWindow = () => {
        window.location.reload();
    };
    // Define columns with conditional rendering based on screen size
    const columns = [
        { field: "name", headerName: "Name", flex: 1 },
        !isSmallScreen && { field: "location", headerName: "Location", flex: 1 },
        !isSmallScreen && {
            field: "phone",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => formatPhoneNumber(params.row.phone),
        },
        !isSmallScreen && { field: "email", headerName: "Email", flex: 1 },
        !isSmallScreen && { field: "website", headerName: "Website", flex: 1 },
        !isSmallScreen && {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            renderCell: (params) => (
                <Box>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(params.row._id); }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(params.row._id); }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ].filter(Boolean); // Filter out null or false values

    return (
        <Box m="20px">
            <LoadingModal loading={loading} resource="Studios" />
            <NewStudioModal open={open} onClose={onClose} />
            <ErrorModal errorOpen={error} onErrorClose={reloadWindow} errorMessage={error} button="Refresh Page" />
            <Box m="40px 0 0 0" height="75vh" sx={boxSxSettings(colors)}>
                <DataGrid
                    rows={studios}
                    columns={columns}
                    getRowId={(row) => row._id}
                    onRowClick={(params) => handleGetStudio(params.row._id)}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{ toolbar: { handleAdd: handleAddStudio, theme: theme.palette.mode, button: 'Add Studio' } }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    initialState={{
                        ...studios.initialState,
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pagination
                    sx={gridSxSettings(colors)}
                />
            </Box>
        </Box>
    );
};

export default Studios;