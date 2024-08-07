import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchHeats } from 'src/store/heatsSlice';
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function MainCalendar() {
    const dispatch = useDispatch();
    const heats = useSelector(state => state.heats.heats);
    const isLoading = useSelector(state => state.heats.status) === 'loading';
    const errors = useSelector(state => state.heats.error);

    useEffect(() => {
        dispatch(fetchHeats());
    }
        , [dispatch]);

    const myEventsList = heats.map(heat => ({
        start: moment(heat.dateTime).toDate(),
        end: moment(heat.dateTime).toDate(),
        title: heat.couples.map(couple => couple.leader.fullName).join(' & ')
    }));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors}</div>;
    }

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}
