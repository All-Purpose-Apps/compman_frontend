import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouples, deleteCouple } from "src/store/couplesSlice";
// MUI Components
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// Components
import CustomToolbar from "src/components/CustomToolbar";
import ActionButtons from "src/components/ActionButtons";
// Utils
import { tokens } from "src/utils/theme";
import { capitalizeWords } from 'src/utils';
import { gridSxSettings, boxSxSettings } from "src/utils/customSX";
import LoadingModal from "src/components/LoadingModal";

export default function Entries() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCouples());
        };

        fetchData();
    }, [dispatch]);

    const couples = useSelector(state => state.couples.couples);
    const loading = useSelector(state => state.couples.status) === 'loading';
    const error = useSelector(state => state.couples.error);

    function getRowId(row) {
        return row._id;
    }

    const handleEdit = id => {
        navigate(`/admin/entries/edit/${id}`);
    };

    const handleDelete = async (id) => {
        await dispatch(deleteCouple(id));
        navigate('/admin/entries');
    };

    const handleMultiDelete = async () => {
        await dispatch(deleteCouple(selectedRows));
        dispatch(fetchCouples());
    }

    const handleGetCouple = id => {
        navigate(`/admin/entries/${id}`);
    };

    const handleAddEntry = () => {
        navigate('/admin/entries/new');
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
                <ActionButtons params={params} handleEdit={handleEdit} handleDelete={handleDelete} />
            ),
        },
    ];

    return (
        <Box m="20px">
            <LoadingModal loading={loading} resource='Entries' />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={boxSxSettings(colors)}
            >
                <DataGrid
                    rows={couples}
                    columns={columns}
                    getRowId={getRowId}
                    onRowClick={params => handleGetCouple(params.row._id)}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{ toolbar: { selectedRows, handleMultiDelete, handleAdd: handleAddEntry, theme: theme.palette.mode, button: 'Add Entry' } }}
                    checkboxSelection
                    onRowSelectionModelChange={(params) => setSelectedRows(params)}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    pageSize={5}
                    pagination={true}
                    sx={gridSxSettings(colors)}
                />
            </Box>
        </Box >
    );
};