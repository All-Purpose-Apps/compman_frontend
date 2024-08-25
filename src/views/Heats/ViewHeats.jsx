import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { fetchHeats, deleteHeat } from "src/store/heatsSlice";
import { fetchEntries } from "src/store/entriesSlice";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import CustomToolbar from "src/components/CustomToolbar";
import ActionButtons from "src/components/ActionButtons";
import AutoGenerateHeats from "src/views/Heats/AutoGenerateHeats";

import { tokens } from "src/utils/theme";
import { capitalize, capitalizeWords } from "src/utils";
import { gridSxSettings, boxSxSettings } from "src/utils";
import LoadingModal from "src/components/Modals/LoadingModal";
import moment from "moment";

const ViewHeats = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [orphanEntries, setOrphanEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchHeats());
            await dispatch(fetchEntries());
        };

        fetchData();
    }, [dispatch]);

    const heats = useSelector(state => state.heats.heats);
    const loading = useSelector(state => state.heats.status) === 'loading';
    const error = useSelector(state => state.heats.error);

    const entries = useSelector(state => state.entries.entries);

    // Compare entries with heats to find orphan entries
    useEffect(() => {
        if (entries && heats) {
            const allEntryIds = new Set(entries.map(entry => entry._id));
            const heatEntryIds = new Set(
                heats.flatMap(heat => heat.entries.map(entry => entry._id))
            );

            const orphanEntriesArray = entries.filter(entry => !heatEntryIds.has(entry._id));
            setOrphanEntries(orphanEntriesArray);
        }
    }, [entries, heats]);

    function getRowId(row) {
        return row._id;
    }

    const handleEdit = id => {
        navigate(`/admin/heats/edit/${id}`);
    };

    const handleDelete = async (id) => {
        await dispatch(deleteHeat(id));
        dispatch(fetchHeats());
        navigate('/admin/heats');
    };

    const handleMultiDelete = async () => {
        await dispatch(deleteHeat(selectedRows.join(',')));
        dispatch(fetchHeats());
    };

    const handleGetStudio = id => {
        navigate(`/admin/heats/${id}`);
    };

    const handleGenerateHeats = () => {
        setOpen(true);
    };

    const handleAddHeat = () => {
        navigate('/admin/heats/new');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getRowHeight = (params) => {
        const numberOfEntries = params.model.entries.length;
        const baseHeight = 32;
        const lineHeight = 24;

        return baseHeight + (numberOfEntries - 1) * lineHeight;
    };

    const columns = [
        {
            field: "number",
            headerName: "#",
            flex: 0.10,
            sortable: false,
        },
        {
            field: "date",
            headerName: "Date",
            flex: 0.30,
            sortable: false,
            renderCell: (params) => moment(params.row.dateTime).format('MM/DD/YYYY')
        },
        {
            field: "time",
            headerName: "Time",
            flex: 0.25,
            sortable: false,
            renderCell: (params) => moment(params.row.dateTime).format('h:mm A')
        },
        {
            field: "dance",
            headerName: "Dance",
            flex: .5,
            sortable: false,
            renderCell: (params) => `${params.row.dance.title} - ${params.row.dance.danceCategory?.name}`
        },
        {
            field: "ageCategory",
            headerName: "Age Category",
            flex: 0.3,
            sortable: false,
            align: 'center',
            renderCell: (params) => capitalize(params.row.ageCategory)
        },
        {
            field: "level",
            headerName: "Level",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => capitalizeWords(params.row.level)
        },
        {
            field: "entries",
            headerName: "Entries",
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {params.row.entries.map(({ follower, leader }, i) => (
                            <Typography key={i} component="li" sx={{ listStyleType: "none" }}>
                                {follower.fullName} & {leader.fullName}
                            </Typography>
                        ))}
                    </div>
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
                <ActionButtons params={params} handleEdit={handleEdit} handleDelete={handleDelete} />
            ),
        },
    ];

    return (
        <Box m="20px">
            <LoadingModal loading={loading} resource='Heats' />
            <AutoGenerateHeats open={open} onClose={handleClose} />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={boxSxSettings(colors)}
            >
                <DataGrid
                    rows={heats}
                    columns={columns}
                    getRowId={getRowId}
                    onRowClick={params => handleGetStudio(params.row._id)}
                    checkboxSelection
                    onRowSelectionModelChange={(params) => setSelectedRows(params)}
                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{ toolbar: { selectedRows, handleMultiDelete, handleAdd: handleGenerateHeats, handleAddHeat, theme: theme.palette.mode, button: 'Generate Heats', location: 'heats', orphanEntries } }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    autoPageSize
                    pagination={true}
                    sx={gridSxSettings(colors)}
                    getRowHeight={getRowHeight}
                />
            </Box>
        </Box>
    );
};

export default ViewHeats;