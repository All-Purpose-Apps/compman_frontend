import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from '../../store/dancersSlice';
import { addCouple, fetchCouples } from '../../store/couplesSlice';
import { fetchDances } from '../../store/dancesSlice';

const schema = yup.object().shape({
    leader: yup.string().required('Leader is required'),
    follower: yup.string().required('Follower is required'),
    dance: yup.string().required('Dance is required'),
    ageCategory: yup.string().required('Age Category is required'),
    level: yup.string().required('Level is required'),
});

const NewCouple = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dispatch(fetchDancers());
        dispatch(fetchDances());
    }, [dispatch]);

    const dancers = useSelector(state => state.dancers.dancers);
    const dances = useSelector(state => state.dances.dances);
    const isLoading = useSelector(state => state.dancers.status) === 'loading';
    const error = useSelector(state => state.dancers.error);

    const onSubmit = (data) => {
        dispatch(addCouple(data));
        dispatch(fetchCouples());
        navigate('/admin/couples');
    };

    const handleCancel = () => {
        navigate('/admin/couples');
    };

    const danceOptions = dances.map(dance => ({
        value: dance._id,
        label: `${dance.title} - ${dance.danceCategory.name}`
    }));

    const dancerOptions = dancers.map(dancer => ({
        value: dancer._id,
        label: dancer.fullName
    }));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="leader">
                    <Form.Label>Leader</Form.Label>
                    <Select
                        options={dancerOptions}
                        onChange={(selectedOption) => setValue('leader', selectedOption.value)}
                    />
                    {errors.leader && <div className="invalid-feedback d-block">{errors.leader.message}</div>}
                </Form.Group>

                <Form.Group controlId="follower">
                    <Form.Label>Follower</Form.Label>
                    <Select
                        options={dancerOptions}
                        onChange={(selectedOption) => setValue('follower', selectedOption.value)}
                    />
                    {errors.follower && <div className="invalid-feedback d-block">{errors.follower.message}</div>}
                </Form.Group>

                <Form.Group controlId="dance">
                    <Form.Label>Dance</Form.Label>
                    <Select
                        options={danceOptions}
                        onChange={(selectedOption) => setValue('dance', selectedOption.value)}
                    />
                    {errors.dance && <div className="invalid-feedback d-block">{errors.dance.message}</div>}
                </Form.Group>

                <Form.Group controlId="ageCategory">
                    <Form.Label>Age Category</Form.Label>
                    <Form.Control
                        as="select"
                        {...register('ageCategory')}
                        isInvalid={!!errors.ageCategory}
                    >
                        <option value="">Select Age Category</option>
                        <option value="preteen i">Preteen I</option>
                        <option value="preteen ii">Preteen II</option>
                        <option value="junior">Junior</option>
                        <option value="a">A</option>
                        <option value="a1">A1</option>
                        <option value="a2">A2</option>
                        <option value="b">B</option>
                        <option value="b1">B1</option>
                        <option value="b2">B2</option>
                        <option value="c">C</option>
                        <option value="c1">C1</option>
                        <option value="c2">C2</option>
                        <option value="c3">C3</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.ageCategory?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                        as="select"
                        {...register('level')}
                        isInvalid={!!errors.level}
                    >
                        <option value="">Select Level</option>
                        <option value="novice">Novice</option>
                        <option value="newcomer">Newcomer</option>
                        <option value="associate bronze">Associate Bronze</option>
                        <option value="associate silver">Associate Silver</option>
                        <option value="associate gold">Associate Gold</option>
                        <option value="full bronze">Full Bronze</option>
                        <option value="full silver">Full Silver</option>
                        <option value="full gold">Full Gold</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.level?.message}
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

export default NewCouple;