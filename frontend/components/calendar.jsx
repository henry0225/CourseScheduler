import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      eventMoveHandling: "Update",
      eventResizeHandling: "Update",
      viewType: "Week",
      durationBarVisible: true,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
      headerDateFormat: "dddd", // set the column header to display day names
      onBeforeEventRender: args => {
        const color = this.getColorForEvent(args.data.text);
        args.data.backColor = color;
        args.data.borderRadius = "5px"; // Set the border radius to 5 pixels
      }
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    const { startDate } = this.props;
    const events = this.props.events;

    this.calendar.update({startDate, events});
  }

  getColorForEvent(text) {
    // Define an array of allowed hue values
    const hues = [100, 120, 140, 160, 180, 200, 220, 240];
  
    // Generate a hash value based on the text attribute
    const hash = text.split('').reduce((acc, val) => {
      acc = ((acc << 5) - acc) + val.charCodeAt(0);
      return acc & acc;
    }, 0);
  
    // Use the hash to select a hue from the allowed hues array
    const hue = hues[Math.abs(hash) % hues.length];
  
    // Set the saturation and lightness values to fixed values
    const saturation = 70;
    const lightness = 80;
  
    // Construct and return the HSL color string
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  render() {
    const calendarStyle = {
      borderRadius: "20px",
      overflow: "hidden", // ensure that content is clipped at the rounded corners
      
    };
    const eventStyle = {
      borderRadius: "20px",
      overflow: "hidden", // ensure that content is clipped at the rounded corners
      border: "5px",
      fontSize: "10pt",
      padding: "5px",
      opacity: "0.8",
    };
    return (
      <div style={calendarStyle}>
        <DayPilotCalendar
          {...this.state}
          ref={this.calendarRef}
          eventStyle={eventStyle}
        />
      </div>
    );
  }
}

export default Calendar;
