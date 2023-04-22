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
      };
    }
  
    get calendar() {
      return this.calendarRef.current.control;
    }
  
    componentDidMount() {
      console.log("kekee", this.props.events)
      const { startDate } = this.props;
      const events = this.props.events;
  
      this.calendar.update({startDate, events});
    }
  
    render() {
      return (
        <div style={styles.main}>
          <DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
      );
    }
  }
  

export default Calendar;