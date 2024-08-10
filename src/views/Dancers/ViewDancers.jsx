import { useEffect } from "react";
import { Box, IconButton, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "src/utils/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers, deleteDancer } from "src/store/dancersSlice";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { capitalize } from "src/utils/capitalize";

const CustomToolbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleAddDancer = () => {
        navigate('/admin/dancers/new');
    };
    return (
        <GridToolbarContainer>
            <Box sx={{ flexGrow: 1 }}>
                <GridToolbar sx={{
                    'button': {
                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    }
                }} />
            </Box>
            <Button
                color="secondary"
                variant="contained"
                onClick={handleAddDancer}
            >
                Add Dancer
            </Button>
        </GridToolbarContainer>
    );
};

const ViewDancers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchDancers());
    }, [dispatch]);

    const dancers = useSelector(state => state.dancers.dancers);
    function getRowId(row) {
        return row._id;
    }

    const handleEdit = id => {
        navigate(`/admin/dancers/edit/${id}`);
    };

    const handleDelete = id => {
        dispatch(deleteDancer(id));
        navigate('/admin/dancers');
    };



    const handleGetStudio = id => {
        navigate(`/admin/dancers/${id}`);
    };

    const columns = [
        {
            field: "fullName",
            headerName: "Full Name",
            flex: 1,
        },
        {
            field: "age",
            headerName: "Age",
            flex: .5,
        },
        {
            field: "identifier",
            headerName: "Identifier",
            flex: 1,
            renderCell: (params) => (
                capitalize(params.row.identifier))
        },
        {
            field: "studio",
            headerName: "Studio",
            flex: 1,
            renderCell: (params) => (
                params.row.studio.name)
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
                    rows={dancers}
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

export default ViewDancers;
