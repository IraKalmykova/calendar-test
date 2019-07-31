import React from 'react';
import './App.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import NewEvent from './NewEvent';
import EventData from './EventData';
import './main.scss';

class App extends React.Component {
  state = {
    formIsActive: false,
    formEventDataIsActive: false,
    eventData: {},
    formTop: 0,
    formLeft: 0,
    defaultDate: new Date(),
    defaultTime: '09:00',
    calendarWeekends: true,
    calendarEvents: [
      {
        title: 'Example Event',
        start: '2019-07-29T11:30:00Z',
        id: 0,
      },
      {
        title: 'Example Event',
        start: '2019-07-30T12:30:00Z',
        id: 1,
      },
      {
        title: 'Example Event',
        start: '2019-07-10T09:30:00Z',
        id: 2,
      },
    ],
  };

  handleDateClick = (arg) => {
    this.setState(prevState => ({
      ...prevState,
      defaultDate: arg.dateStr,
      formIsActive: true,
      formTop: arg.jsEvent.pageY,
      formLeft: arg.jsEvent.layerX - 100,
    }));
  };

  handleEventClick = (arg) => {
    console.log(arg.jsEvent)
    this.setState(prevState => ({
      ...prevState,
      formEventDataIsActive: true,
      eventData: {
        title: arg.event.title,
        id: arg.event.id,
      },
      formTop: arg.jsEvent.clientY,
      formLeft: arg.jsEvent.clientX - 200,
    }));
  }

  addEvent = (eventMap) => {
    const newEvent = {
      title: eventMap.title,
      start: `${eventMap.date}T${eventMap.time}:00Z`,
      id: this.state.calendarEvents.length,
    };
    this.setState(prevState => ({
      ...prevState,
      calendarEvents: [
        ...prevState.calendarEvents,
        newEvent,
      ],
      formIsActive: false,
    }));
  };

  closeForm = () => {
    this.setState(prevState => ({
      ...prevState,
      formIsActive: false,
    }));
  };

  removeEvent = () => {
    this.setState(prevState => ({
      ...prevState,
      calendarEvents: prevState.calendarEvents.filter(calendarEvent => (
        calendarEvent.id !== prevState.eventData.id
      )),
      formEventDataIsActive: false,
    }));
  };

  updateEvent = () => {
    this.setState(prevState => ({
      ...prevState,
      formEventDataIsActive: false,
    }));
  }

  render() {
    const {
      calendarWeekends,
      calendarEvents,
      defaultDate,
      defaultTime,
      formTop,
      formLeft,
    } = this.state;

    return (
      <div className="app">
        <div className="app__calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={calendarWeekends}
            events={calendarEvents}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
          />
          {this.state.formIsActive
          && (
            <NewEvent
              defaultDate={defaultDate}
              defaultTime={defaultTime}
              onSubmit={this.addEvent}
              formTop={formTop}
              formLeft={formLeft}
              closeForm={this.closeForm}
            />
          )
          }
          {this.state.formEventDataIsActive && (
            <EventData
              eventData={this.state.eventData}
              removeEvent={this.removeEvent}
              updateEvent={this.updateEvent}
              formTop={formTop}
              formLeft={formLeft}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
