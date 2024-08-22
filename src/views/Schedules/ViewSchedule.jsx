import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules, deleteSchedule } from "src/store/schedulesSlice";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import CustomToolbar from "src/components/CustomToolbar";
import ActionButtons from "src/components/ActionButtons";

import { tokens } from "src/utils/theme";
import { gridSxSettings, boxSxSettings } from "src/utils";
import LoadingModal from "src/components/LoadingModal";
import moment from "moment";
import ScheduleDanceForm from "./NewSchedule";

const ViewSchedule = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchSchedules());
        };

        fetchData();
    }, [dispatch]);

    const schedules = useSelector(state => state.schedules.schedules);
    const loading = useSelector(state => state.schedules.status) === 'loading';
    const error = useSelector(state => state.schedules.error);

    // Ensure schedules is always an array
    const rows = Array.isArray(schedules) ? schedules : [];

    function getRowId(row) {
        return row._id;
    }

    const handleEdit = id => {
        navigate(`/admin/schedule/edit/${id}`);
    };

    const handleDelete = async (id) => {
        await dispatch(deleteSchedule(id));
        dispatch(fetchSchedules());
        navigate('/admin/schedule');
    };

    const handleMultiDelete = async () => {
        await dispatch(deleteSchedule(selectedRows.join(',')));
        dispatch(fetchSchedules());
    };

    const handleGetSchedule = id => {
        navigate(`/admin/schedules/${id}`);
    };

    const handleAddSchedule = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const getRowHeight = (params) => {
        const numberOfDances = params.model.dances.length;
        const baseHeight = 52;  // Base height for a row with no dances
        const lineHeight = 24;  // Line height for each additional dance

        return baseHeight + (numberOfDances * lineHeight);
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 0.2,
            sortable: false,
        },
        {
            field: "startDate",
            headerName: "Start Date",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => moment(params.row.startDate).format('MM/DD/YYYY, h:mm A'),
        },
        {
            field: "endDate",
            headerName: "End Date",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => moment(params.row.endDate).format('MM/DD/YYYY, h:mm A'),
        },
        {
            field: "dances",
            headerName: "Dances",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {params.row.dances.map((dance, index) => (
                        <Typography key={index} component="li" sx={{ listStyleType: "none" }}>
                            {dance.title} - {dance.danceCategory.name}
                        </Typography>
                    ))}
                </div>
            ),
        },
        {
            field: "location",
            headerName: "Location",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => params.row.location,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <ActionButtons params={params} handleEdit={handleEdit} handleDelete={handleDelete} />
            ),
        },
    ];

    return (
        <Box m="20px">
            <LoadingModal loading={loading} resource='Schedules' />
            <ScheduleDanceForm open={open} onClose={onClose} />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={boxSxSettings(colors)}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                    // onRowClick={params => handleGetSchedule(params.row._id)}
                    checkboxSelection
                    onRowSelectionModelChange={(params) => setSelectedRows(params)}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{ toolbar: { selectedRows, handleMultiDelete, handleAdd: handleAddSchedule, theme: theme.palette.mode, button: 'Add Schedule', location: 'schedules' } }}
                    pageSizeOptions={[1, 3, 5, 10, 25, 50, 100]}
                    initialState={{
                        ...rows.initialState,
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pagination={true}
                    sx={gridSxSettings(colors)}
                    getRowHeight={getRowHeight}
                />
            </Box>
        </Box>
    );
};

export default ViewSchedule;