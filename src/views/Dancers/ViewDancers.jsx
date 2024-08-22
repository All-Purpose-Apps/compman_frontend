import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers, deleteDancer } from "src/store/dancersSlice";
// MUI Components
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// Components
import CustomToolbar from "src/components/CustomToolbar";
import ActionButtons from "src/components/ActionButtons";
// Utils
import { tokens } from "src/utils/theme";
import { capitalize } from "src/utils";
import { gridSxSettings, boxSxSettings } from "src/utils";
import LoadingModal from "src/components/LoadingModal";
import NewDancerModal from "./NewDancer";

const ViewDancers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchDancers());
    }, [dispatch]);

    const dancers = useSelector(state => state.dancers.dancers);
    const loading = useSelector(state => state.dancers.status) === 'loading';
    const error = useSelector(state => state.dancers.error);

    function getRowId(row) {
        return row._id;
    }

    const handleEdit = id => {
        navigate(`/admin/dancers/edit/${id}`);
    };

    const handleDelete = async (id) => {
        await dispatch(deleteDancer(id));
        dispatch(fetchDancers());
    };

    const handleMultiDelete = async () => {
        await dispatch(deleteDancer(selectedRows))
        dispatch(fetchDancers());
    }

    const handleGetStudio = id => {
        navigate(`/admin/dancers/${id}`);
    };

    const handleAddDancer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    }


    const columns = [
        { field: 'number', headerName: '#', flex: .2, align: 'center', headerAlign: 'center' },
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
                <ActionButtons params={params} handleEdit={handleEdit} handleDelete={handleDelete} />
            ),
        },
    ];

    return (
        <Box m="20px">
            <LoadingModal loading={loading} resource='Dancers' />
            <NewDancerModal open={open} onClose={onClose} />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={boxSxSettings(colors)}
            >
                <DataGrid
                    rows={dancers}
                    columns={columns}
                    getRowId={getRowId}
                    onRowClick={params => handleGetStudio(params.row._id)}
                    checkboxSelection
                    onRowSelectionModelChange={(params) => setSelectedRows(params)}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{ toolbar: { selectedRows, handleMultiDelete, handleAdd: handleAddDancer, theme: theme.palette.mode, button: 'Add Dancer' } }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    pageSize={5}
                    pagination={true}
                    initialState={{
                        ...dancers.initialState,
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    sx={gridSxSettings(colors)}
                />
            </Box>
        </Box>
    );
};

export default ViewDancers;
