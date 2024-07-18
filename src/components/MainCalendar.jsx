import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function MainCalendar() {

    const myEventsList = [
        {
            start: moment().toDate(),
            end: moment()
                .add(1, "days")
                .toDate(),
            title: "Some title"
        }
    ]
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
