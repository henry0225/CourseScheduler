import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
const localizer = momentLocalizer(moment);

localizer.formats.dayFormat = "ddd";

const dayMappings = {
  'S': 0,
  'M': 1,
  'T': 2,
  'W': 3,
  'R': 4,
  'F': 5,
  'A': 6,
};
function Toolbar({ date, onNavigate, label }) {
    const startOfWeek = moment(date).startOf('week')
    const endOfWeek = moment(date).endOf('week')
  
    const dateFormat = "dddd";
  
    return (
      <div className="rbc-toolbar">
        <span className="rbc-toolbar-label">{moment(startOfWeek).format(dateFormat)} - {moment(endOfWeek).format(dateFormat)}</span>
      </div>
    )
  }
function WeeklyCalendar({ blocks }) {
  const events = blocks.map((block) => {
    const [title, timeRange] = block.split(', ');

    const [startTimeStr, endTimeStr] = timeRange.split(' - ');
    const [startHour, startDayAbbrev] = startTimeStr.split(' ');
    const [endHour, endDayAbbrev] = endTimeStr.split(' ');

    const startHourRegex = /(\d{1,2}):(\d{2})(AM|PM)/;
    const endHourRegex = /(\d{1,2}):(\d{2})(AM|PM)/;

    const startHourMatch = startHour.match(startHourRegex);
    const endHourMatch = endHour.match(endHourRegex);

    const startHourInt = parseInt(startHourMatch[1]);
    const endHourInt = parseInt(endHourMatch[1]);
    const startMinuteInt = parseInt(startHourMatch[2]);
    const endMinuteInt = parseInt(endHourMatch[2]);

    const startDateTime = moment()
      .day(dayMappings[startDayAbbrev])
      .hour(startHourInt + (startHourMatch[3] === 'PM' && startHourInt !== 12 ? 12 : 0))
      .minute(startMinuteInt)
      .toDate();
    const endDateTime = moment()
      .day(dayMappings[endDayAbbrev])
      .hour(endHourInt + (endHourMatch[3] === 'PM' && endHourInt !== 12 ? 12 : 0))
      .minute(endMinuteInt)
      .toDate();
    return {
      title,
      start: startDateTime,
      end: endDateTime,
    };
  });
  const dayPropGetter = (date) => {
    const isToday = moment(date).isSame(moment(), 'day');
    return isToday ? { className: 'rbc-today' } : {};
  };

  return (
    <div className="weekly-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        views={['week']}
        step={60}
        defaultDate={new Date()}
        defaultView="week"
        selectable={true}
        style={{ height: '600px' }}
        dayPropGetter={dayPropGetter} // Add the custom day prop getter
        weekStartsOn={1} // Set to Monday
        components={{
            toolbar: Toolbar
          }}
      />
      <style>{`
        .rbc-today {
            background-color: transparent !important;
          }
      `}</style>
    </div>
  );
}

export default WeeklyCalendar;