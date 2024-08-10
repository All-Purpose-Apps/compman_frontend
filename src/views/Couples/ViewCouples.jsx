import { useState, useEffect } from "react";
import { Box, IconButton, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "src/utils/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatPhoneNumber } from 'src/utils/formatPhoneNumber';
import { GridToolbarContainer } from "@mui/x-data-grid";
import { capitalizeWords } from 'src/utils';
import { fetchCouples, deleteCouple } from "src/store/couplesSlice";

const CustomToolbar = ({ selectedRows }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddCouple = () => {
        navigate('/admin/couples/new');
    };
    const handleDelete = () => {
        selectedRows.forEach((row) => {
            dispatch(deleteCouple(row));
        })
        dispatch(fetchCouples());
    }
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
                onClick={handleAddCouple}
            >
                Add Entries
            </Button>
            {selectedRows.length > 0 && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                >
                    Delete Selected
                </Button>
            )}
        </GridToolbarContainer>
    );
};

const Couples = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(fetchCouples());
    }, [dispatch]);

    const couples = useSelector(state => state.couples.couples);

    function getRowId(row) {
        return row._id;
    }

    const handleEdit = id => {
        navigate(`/admin/couples/edit/${id}`);
    };

    const handleDelete = id => {
        dispatch(deleteCouple(id));
        navigate('/admin/couples');
    };



    const handleGetCouple = id => {
        navigate(`/admin/couples/${id}`);
    };

    const columns = [
        { field: 'leader', headerName: 'Leader', flex: 1, valueGetter: (params) => params.fullName },
        { field: 'follower', headerName: 'Follower', flex: 1, valueGetter: (params) => params.fullName },
        {
            field: 'dance',
            headerName: 'Dance',
            flex: 1,
            valueGetter: (params) => `${params.title} - ${params.danceCategory.name}`,
        },
        {
            field: 'ageCategory',
            headerName: 'Age Category',
            flex: .5,
            valueGetter: (params) => capitalizeWords(params),
        },
        {
            field: 'level',
            headerName: 'Level',
            flex: 1,
            valueGetter: (params) => capitalizeWords(params),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: .5,
            sortable: false,
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
                    rows={couples}
                    columns={columns}
                    getRowId={getRowId}
                    onRowClick={params => handleGetCouple(params.row._id)}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{ toolbar: { selectedRows } }}
                    checkboxSelection
                    onRowSelectionModelChange={(params) => setSelectedRows(params)}
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
        </Box >
    );
};

export default Couples;