import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeats, deleteHeat } from "src/store/heatsSlice";
// MUI Components
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// Components
import CustomToolbar from "src/components/CustomToolbar";
import ActionButtons from "src/components/ActionButtons";
// Utils
import { tokens } from "src/utils/theme";
import { capitalize, capitalizeWords } from "src/utils";
import { gridSxSettings, boxSxSettings } from "src/utils/customSX";
import LoadingModal from "src/components/LoadingModal";

const ViewHeats = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(fetchHeats());
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

    const handleDelete = id => {
        dispatch(deleteHeat(id));
        navigate('/admin/heats');
    };

    const handleMultiDelete = () => {
        selectedRows.forEach((row) => {
            dispatch(deleteHeat(row));
        })
        dispatch(fetchHeats());
    }

    const handleGetStudio = id => {
        navigate(`/admin/heats/${id}`);
    };

    const handleAddDancer = () => {
        navigate('/admin/heats/generate');
    };

    const columns = [
        {
            field: "number",
            headerName: "#",
            flex: .10,
            renderCell: (params) => (params.api.getRowIndexRelativeToVisibleRows(params.id) + 1)
        },
        // DateTime
        {
            field: "dateTime",
            headerName: "Date/Time",
            flex: .6,
            renderCell: (params) => (new Date(params.row.dateTime).toLocaleString())
        },
        {
            field: "dance",
            headerName: "Dance",
            flex: 1,
            renderCell: (params) => (`${params.row.dance.title} - ${params.row.dance.danceCategory.name}`)
        },
        {
            field: "ageCategory",
            headerName: "Age Category",
            flex: .3,
            align: 'center',
            renderCell: (params) => (
                capitalize(params.row.couples[0].ageCategory))
        },
        {
            field: "level",
            headerName: "Level",
            flex: .5,
            renderCell: (params) => (
                capitalizeWords(params.row.couples[0].level))
        },
        {
            field: "couples",
            headerName: "Entries",
            flex: 1,
            renderCell: (params) => {
                return params.row.couples.map(({ follower, leader }, i) => (
                    <div key={i}>
                        {follower.fullName} & {leader.fullName}
                    </div>
                ))

            }
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
                />
            </Box>
        </Box>
    );
};

export default ViewHeats;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchHeats, deleteHeat } from 'src/store/heatsSlice';
// import {
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     Container, Grid, Button, CircularProgress, TextField, Pagination
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { capitalizeWords } from 'src/utils';
// import LoadingModal from 'src/components/LoadingModal';

// const ViewHeats = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(7);

//     const heats = useSelector(state => state.heats.heats);
//     const loading = useSelector(state => state.heats.status) === 'loading';
//     const error = useSelector(state => state.heats.error);

//     useEffect(() => {
//         dispatch(fetchHeats());
//     }, [dispatch]);

//     const handleAddHeat = () => {
//         navigate('/admin/heats/new');
//     };

//     const handleGenerateHeat = () => {
//         navigate('/admin/heats/generate');
//     };

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//         setCurrentPage(1);
//     };

//     const handleDelete = (id) => {
//         dispatch(deleteHeat(id));
//         dispatch(fetchHeats());
//         navigate('/admin/heats');
//     };

//     const filteredHeats = heats.filter(heat => {
//         const couplesString = heat.couples.map(couple =>
//             `${couple.follower.fullName} & ${couple.leader.fullName}`).join(' ');
//         return couplesString.toLowerCase().includes(searchTerm.toLowerCase());
//     });

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentHeats = filteredHeats.slice(indexOfFirstItem, indexOfLastItem).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
//     const totalPages = Math.ceil(filteredHeats.length / itemsPerPage);

//     const paginate = (event, value) => setCurrentPage(value);

//     if (loading) {
//         return (
//             <Container sx={{ textAlign: 'center' }}>
//                 <CircularProgress />
//             </Container>
//         );
//     }

//     if (error) {
//         return (
//             <Container sx={{ textAlign: 'center' }}>
//                 <p>{error}</p>
//             </Container>
//         );
//     }

//     if (heats.length === 0) {
//         return (
//             <Container sx={{ textAlign: 'center' }}>
//                 <Button variant="contained" color="warning" onClick={handleGenerateHeat} sx={{ mb: 3 }}>
//                     Generate Heats
//                 </Button>
//                 <p>No Heats</p>
//             </Container>
//         );
//     }

//     return (
//         <Container>
//             {/* <LoadingModal loading resource="Heats" /> */}
//             <Button variant="contained" color="secondary" onClick={handleGenerateHeat} sx={{ mb: 3, float: 'right' }} className='add-heat'>
//                 Generate More Heats
//             </Button>
//             <TextField
//                 id="search"
//                 label="Search heats..."
//                 variant="outlined"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 sx={{ mb: 3 }}
//             />
//             <Grid container>
//                 <Grid item xs={12}>
//                     <TableContainer>
//                         <Table sx={{ fontSize: '1rem' }}>  {/* Increase font size here */}
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell sx={{ fontSize: '1rem' }}>#</TableCell> {/* Increase font size */}
//                                     <TableCell sx={{ fontSize: '1rem' }}>Date/Time</TableCell>
//                                     <TableCell sx={{ fontSize: '1rem' }}>Dance</TableCell>
//                                     <TableCell sx={{ fontSize: '1rem', textAlign: 'center' }}>Age Category</TableCell>
//                                     <TableCell sx={{ fontSize: '1rem' }}>Level</TableCell>
//                                     <TableCell sx={{ fontSize: '1rem' }}>Couples</TableCell>
//                                     <TableCell sx={{ fontSize: '1rem' }}>Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {currentHeats.map((heat, index) => (
//                                     <TableRow key={heat._id}>
//                                         <TableCell sx={{ fontSize: '1rem' }}>{index + 1}</TableCell>
//                                         <TableCell sx={{ fontSize: '1rem' }}>{new Date(heat.dateTime).toLocaleString()}</TableCell>
//                                         <TableCell sx={{ fontSize: '1rem' }}>{`${heat.couples[0].dance.danceCategory.name} - ${heat.couples[0].dance.title}`}</TableCell>
//                                         <TableCell sx={{ fontSize: '1rem', textAlign: 'center' }}>{capitalizeWords(heat.couples[0].ageCategory)}</TableCell>
//                                         <TableCell sx={{ fontSize: '1rem' }}>{capitalizeWords(heat.couples[0].level)}</TableCell>
//                                         <TableCell sx={{ fontSize: '1rem' }}>
//                                             {heat.couples.map(({ follower, leader }, i) => (
//                                                 <div key={i}>
//                                                     {follower.fullName} & {leader.fullName}
//                                                 </div>
//                                             ))}
//                                         </TableCell>
//                                         <TableCell sx={{ fontSize: '1rem' }}>
//                                             <Button
//                                                 variant="contained"
//                                                 color="primary"
//                                                 onClick={(e) => { e.stopPropagation(); handleEdit(heat._id); }}
//                                                 sx={{ mr: 1 }}
//                                             >
//                                                 Edit
//                                             </Button>
//                                             <Button
//                                                 variant="contained"
//                                                 color="error"
//                                                 onClick={(e) => { e.stopPropagation(); handleDelete(heat._id); }}
//                                             >
//                                                 Delete
//                                             </Button>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Grid>
//             </Grid>
//             <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={paginate}
//                 sx={{ mt: 3, justifyContent: 'center', display: 'flex' }}
//             />
//         </Container>
//     );
// };

// export default ViewHeats;