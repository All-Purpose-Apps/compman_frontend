import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries, deleteEntry } from 'src/store/entriesSlice';
// MUI Components
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// Components
import CustomToolbar from "src/components/CustomToolbar";
import ActionButtons from "src/components/ActionButtons";
// Utils
import { tokens } from "src/utils/theme";
import { capitalizeWords } from 'src/utils';
import { gridSxSettings, boxSxSettings } from "src/utils";
import LoadingModal from "src/components/Modals/LoadingModal";
import NewEntryModal from "./NewEntry";

export default function Entries() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [open, setOpen] = useState(false);

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchEntries());
        };

        fetchData();
    }, [dispatch]);

    const entries = useSelector(state => state.entries.entries);
    const loading = useSelector(state => state.entries.status) === 'loading';
    const error = useSelector(state => state.entries.error);

    function getRowId(row) {
        return row._id;
    }

    const handleEdit = id => {
        navigate(`/admin/entries/edit/${id}`);
    };

    const handleDelete = async (id) => {
        await dispatch(deleteEntry(id));
        navigate('/admin/entries');
    };

    const handleMultiDelete = async () => {
        await dispatch(deleteEntry(selectedRows));
        dispatch(fetchEntries());
    }

    const handleGetEntry = id => {
        navigate(`/admin/entries/${id}`);
    };

    const handleAddEntry = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    }

    const columns = [
        { field: 'leader', headerName: 'Leader', flex: 1, valueGetter: (params) => params.fullName },
        { field: 'follower', headerName: 'Follower', flex: 1, valueGetter: (params) => params.fullName },
        !isSmallScreen && {
            field: 'dance',
            headerName: 'Dance',
            flex: 1,
            valueGetter: (params) => `${params.title} - ${params.danceCategory.name}`,
        },
        !isSmallScreen && {
            field: 'ageCategory',
            headerName: 'Age Category',
            flex: 0.5,
            valueGetter: (params) => capitalizeWords(params),
        },
        !isSmallScreen && {
            field: 'level',
            headerName: 'Level',
            flex: 1,
            valueGetter: (params) => capitalizeWords(params),
        },
        !isSmallScreen && {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
                <ActionButtons params={params} handleEdit={handleEdit} handleDelete={handleDelete} />
            ),
        },
    ].filter(Boolean); // Filter out null or false values

    return (
        <Box m="20px">
            <LoadingModal loading={loading} resource='Entries' />
            <NewEntryModal open={open} onClose={onClose} />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={boxSxSettings(colors)}
            >
                <DataGrid
                    rows={entries}
                    columns={columns}
                    getRowId={getRowId}
                    onRowClick={params => handleGetEntry(params.row._id)}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{ toolbar: { selectedRows, handleMultiDelete, handleAdd: handleAddEntry, theme: theme.palette.mode, button: 'Add Entry' } }}
                    checkboxSelection={!isSmallScreen}
                    onRowSelectionModelChange={(params) => setSelectedRows(params)}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    initialState={{
                        ...entries.initialState,
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pagination={true}
                    sx={gridSxSettings(colors)}
                />
            </Box>
        </Box>
    );
}