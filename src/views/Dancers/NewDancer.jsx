import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios } from '../../store/studiosSlice';
import { addDancer } from '../../store/dancersSlice';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required').positive().integer(),
    identifier: yup.string().oneOf(['teacher/professional', 'student', 'coach']).required('Identifier is required'),
    studio: yup.string().required('Studio is required'),
});

const NewDancer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dispatch(fetchStudios());
    }, [dispatch]);

    const studios = useSelector(state => state.studios.studios);
    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        dispatch(addDancer(data));
        navigate('/dancers');
    };

    const handleCancel = () => {
        navigate('/dancers');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('firstName')}
                        isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('lastName')}
                        isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        {...register('age')}
                        isInvalid={!!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.age?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="identifier">
                    <Form.Label>Identifier</Form.Label>
                    <Form.Control
                        as="select"
                        {...register('identifier')}
                        isInvalid={!!errors.identifier}
                    >
                        <option value="">Select Identifier</option>
                        <option value="teacher/professional">Teacher/Professional</option>
                        <option value="student">Student</option>
                        <option value="coach">Coach</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.identifier?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="studioId">
                    <Form.Label>Studio</Form.Label>
                    <Form.Control
                        as="select"
                        {...register('studio')}
                        isInvalid={!!errors.studio}
                    >
                        <option value="">Select Studio</option>
                        {studios.map(studio => (
                            <option key={studio._id} value={studio._id}>
                                {studio.name}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.studioId?.message}
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

export default NewDancer;