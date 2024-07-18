import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addStudio } from '../../store/studiosSlice';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    location: yup.string().required('Location is required'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone is required'),
    studioType: yup.string().required('Studio Type is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    website: yup.string().url('Invalid URL').required('Website is required'),
});

const NewStudio = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        dispatch(addStudio(data));
        navigate('/studios');
    };

    const handleCancel = () => {
        navigate('/studios');
    };

    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('name')}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('location')}
                        isInvalid={!!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.location?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('phone')}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="studioType">
                    <Form.Label>Studio Type</Form.Label>
                    <Form.Control
                        as="select"
                        {...register('studioType')}
                        isInvalid={!!errors.studioType}
                    >
                        <option value="">Select Studio Type</option>
                        <option value="franchise">Franchise</option>
                        <option value="independent">Independent</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.studioType?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        {...register('email')}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('website')}
                        isInvalid={!!errors.website}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.website?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default NewStudio;