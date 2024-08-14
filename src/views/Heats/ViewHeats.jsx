import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeats, deleteHeat } from "src/store/heatsSlice";
// MUI Components
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// Components
import CustomToolbar from "src/components/CustomToolbar";
import ActionButtons from "src/components/ActionButtons";
// Utils
import { tokens } from "src/utils/theme";
import { capitalize, capitalizeWords } from "src/utils";
import { gridSxSettings, boxSxSettings } from "src/utils";
import LoadingModal from "src/components/LoadingModal";

const ViewHeats = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchHeats());
        };

        fetchData();
    }, [dispatch]);

    const heats = useSelector(state => state.heats.heats);
    const loading = useSelector(state => state.heats.status) === 'loading';
    const error = useSelector(state => state.heats.error);


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
        await dispatch(deleteHeat(selectedRows.join(',')))
        dispatch(fetchHeats());
    };

    const handleGetStudio = id => {
        navigate(`/admin/heats/${id}`);
    };

    const handleAddDancer = () => {
        navigate('/admin/heats/generate');
    };

    const getRowHeight = (params) => {
        const numberOfCouples = params.model.couples.length;
        const baseHeight = 32; // Default row height for one line
        const lineHeight = 24; // Estimated line height for each additional couple entry

        return baseHeight + (numberOfCouples - 1) * lineHeight;
    };

    const columns = [
        {
            field: "number",
            headerName: "#",
            flex: .10,
            sortable: false,
        },
        {
            field: "dateTime",
            headerName: "Date/Time",
            flex: .6,
            sortable: false,
            renderCell: (params) => (new Date(params.row.dateTime).toLocaleString())
        },
        {
            field: "dance",
            headerName: "Dance",
            flex: 1,
            sortable: false,
            renderCell: (params) => (`${params.row.dance.title} - ${params.row.dance.danceCategory.name}`)
        },
        {
            field: "ageCategory",
            headerName: "Age Category",
            flex: .3,
            sortable: false,
            align: 'center',
            renderCell: (params) => (capitalize(params.row.ageCategory))
        },
        {
            field: "level",
            headerName: "Level",
            flex: .5,
            sortable: false,
            renderCell: (params) => (capitalizeWords(params.row.level))
        },
        {
            field: "couples",
            headerName: "Entries",
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {params.row.couples.map(({ follower, leader }, i) => (
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
            flex: .5,
            sortable: false,
            renderCell: (params) => (
                <ActionButtons params={params} handleEdit={handleEdit} handleDelete={handleDelete} />
            ),
        },
    ];

    return (
        <Box m="20px">
            <LoadingModal loading={loading} resource='Heats' />
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
                    slotProps={{ toolbar: { selectedRows, handleMultiDelete, handleAdd: handleAddDancer, theme: theme.palette.mode, button: 'Generate Heats' } }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    pageSize={5}
                    pagination={true}
                    sx={gridSxSettings(colors)}
                    getRowHeight={getRowHeight}
                />
            </Box>
        </Box>
    );
};

export default ViewHeats;
