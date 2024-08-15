import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, Container, CircularProgress, Typography, Autocomplete, MenuItem, useTheme, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { addHeat } from 'src/store/heatsSlice';
import { fetchDances } from 'src/store/dancesSlice';
import { capitalizeWords } from 'src/utils/capitalize';
import { AGE_CATEGORIES, LEVELS } from 'src/utils';
import { tokens } from "src/utils/theme";
import { formSxSettings } from 'src/utils';

const EditHeat = () => {
    return (
        <div>
            <h1>Edit Heat</h1>
        </div>
    );
}

export default EditHeat;