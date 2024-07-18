import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { getOneDancer, editDancer } from '../../store/dancersSlice';
import { fetchStudios } from '../../store/studiosSlice';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required').positive().integer(),
    identifier: yup.string().oneOf(['teacher/professional', 'student', 'coach']).required('Identifier is required'),
    studio: yup.string().required('Studio is required'),
});

export default function EditDancer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchDancer = async () => {
            const response = await dispatch(getOneDancer(id));
            const dancer = response.payload[0]
            console.log(dancer.studio.name);
            setValue('firstName', dancer.firstName);
            setValue('lastName', dancer.lastName);
            setValue('age', dancer.age);
            setValue('identifier', dancer.identifier);
            setValue('studio', dancer.studio._id);
        };

        fetchDancer();
        dispatch(fetchStudios());
    }, [dispatch, id, setValue]);

    const studios = useSelector(state => state.studios.studios);
    const isLoading = useSelector(state => state.dancers.status) === 'loading';
    const error = useSelector(state => state.dancers.error);

    const onSubmit = (data) => {
        dispatch(editDancer({ id, ...data }));
        dispatch(getOneDancer(id));
        navigate('/dancers/' + id);
    };

    const handleCancel = () => {
        navigate('/dancers/' + id);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit(onSubmit)}>
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

                <Form.Group controlId="studio">
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
                        {errors.studio?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
}