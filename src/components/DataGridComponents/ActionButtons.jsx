
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function ActionButtons({ params, handleEdit, handleDelete }) {
    return (
        <Box>
            <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(params.row._id); }}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(params.row._id); }}>
                <DeleteIcon />
            </IconButton>
        </Box >
    )
}
