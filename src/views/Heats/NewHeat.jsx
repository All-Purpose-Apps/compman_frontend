import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouples } from 'src/store/couplesSlice';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { addHeat, fetchHeats } from 'src/store/heatsSlice';


const NewHeat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCouples, setSelectedCouples] = useState([]);

    useEffect(() => {
        dispatch(fetchCouples());
    }, [dispatch]);

    const couples = useSelector(state => state.couples.couples);
    const isLoading = useSelector(state => state.couples.status) === 'loading';
    const errors = useSelector(state => state.couples.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        const coupleIds = selectedCouples.map(couple => couple.value);
        dispatch(addHeat({ dateTime: selectedDate, couples: coupleIds }));
        dispatch(fetchHeats());
        navigate('/admin/heats');
    };

    const handleCancel = () => {
        navigate('/admin/heats');
    };

    const coupleOptions = couples.map(couple => ({
        value: couple._id,
        label: `${couple.leader.fullName} & ${couple.follower.fullName}`
    }));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors}</div>;
    }

    if (couples.length === 0) {
        return <div>No couples available. Please create couples first.</div>;
    }

    return (
        <div className='form-container'>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="dateTime">
                    <Form.Label>Date and Time</Form.Label>
                    <DateTimePicker onChange={(x) => setSelectedDate(x)} value={selectedDate} />
                </Form.Group>

                <Form.Group controlId="couples">
                    <Form.Label>Couples</Form.Label>
                    <Select
                        options={coupleOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={(selected) => setSelectedCouples(selected)}
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>Save</Button>
                <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
            </Form>
        </div>
    );
};

export default NewHeat;
