import { useEffect } from "react";
import { Box, IconButton, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "src/utils/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios, deleteStudio } from 'src/store/studiosSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatPhoneNumber } from 'src/utils/formatPhoneNumber';
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";

const CustomToolbar = () => {
    const navigate = useNavigate();
    const handleAddStudio = () => {
        navigate('/admin/studios/new');
    };
    return (
        <GridToolbarContainer>
            <Box sx={{ flexGrow: 1 }}>
                <GridToolbarQuickFilter />
            </Box>
            <Button
                color="secondary"
                variant="contained"
                onClick={handleAddStudio}
            >
                Add Studio
            </Button>
        </GridToolbarContainer>
    );
};

const Studios = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchStudios());
    }, [dispatch]);

    const studios = useSelector(state => state.studios.studios);

    function getRowId(row) {
        return row._id;
    }

    const handleEdit = id => {
        navigate(`/admin/studios/edit/${id}`);
    };

    const handleDelete = id => {
        dispatch(deleteStudio(id));
        navigate('/admin/studios');
    };



    const handleGetStudio = id => {
        navigate(`/admin/studios/${id}`);
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: .5,
            renderCell: (params) => (
                formatPhoneNumber(params.row.phone)
            ),
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "website",
            headerName: "Website",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: .5,
            renderCell: (params) => (
                <Box>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(params.row._id); }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(params.row._id); }}>
                        <DeleteIcon />
                    </IconButton>
                </Box >
            ),
        },
    ];

    return (
        <Box m="20px">
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        fontSize: "16px", // Adjust cell font size
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                        fontSize: "18px", // Adjust header font size
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                        fontSize: "16px",
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },

                }}
            >
                <DataGrid
                    rows={studios}
                    columns={columns}
                    getRowId={getRowId}
                    onRowClick={params => handleGetStudio(params.row._id)}
                    slots={{ toolbar: CustomToolbar }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    pageSize={5}
                    pagination={true}
                    sx={{
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                            fontSize: "16px",
                            display: 'flex',
                            alignItems: 'center',
                        },
                        "& .MuiTablePagination-toolbar": {
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                            fontSize: "14px",
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '0',
                        },
                        //increase font size select input
                        "& .MuiSelect-select": {
                            fontSize: "14px",
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Studios;