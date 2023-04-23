import React from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      initialEvents: props.events || []
    };
    this.colorMap = {};
  }

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView="timeGridWeek"
            editable={false}
            selectable={false}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.initialEvents.map(event => {
              // generate a color code based on the event title
              const colorCode = this.getColorCode(event.title);
              // set the event color and text color
              event.color = colorCode;
              event.textColor = '#000';
              return event;
            })}
            eventContent={renderEventContent}
            initialDate='2023-03-06'
            dayHeaderFormat={{weekday: 'short'}}
            slotMinTime="08:00:00"
            slotMaxTime="21:00:00"
            contentHeight="auto"
            allDaySlot={false}
          />
        </div>
      </div>
    );
  }

  getColorCode = (title) => {
    // check if the title has already been assigned a color
    if (this.colorMap[title]) {
      return this.colorMap[title];
    }
    // generate a new color for the title
    const colorCode = this.generateColorCode();
    // check if the color has already been assigned to another title
    for (const t in this.colorMap) {
      if (this.colorMap[t] === colorCode) {
        return this.getColorCode(title);
      }
    }
    // assign the color to the title
    this.colorMap[title] = colorCode;
    return colorCode;
  };

  generateColorCode = () => {
    // select a random color from the allowed colors
    const colors = ['#fbf8cc', '#fde4cf', '#ffcfd2', '#f1c0e8', '#cfbaf0', '#a3c4f3', '#90dbf4', '#8eecf5', '#98f5e1', '#b9fbc0'];
    const colorIndex = Math.floor(Math.random() * colors.length);
    return colors[colorIndex];
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
