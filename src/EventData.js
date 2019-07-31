import PropTypes from 'prop-types';
import React from 'react';
import './App.css';

class EventData extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();

    const { updateEvent } = this.props;
    updateEvent();
  };

  render() {
    const {
      formTop,
      formLeft,
      eventData,
      removeEvent,
    } = this.props;

    return (
      <form
        className="event-form"
        onSubmit={this.handleFormSubmit}
        style={{ top: formTop, left: formLeft }}
      >
        <div className="event-form__close" />
        <input
          className="event-form__data"
          placeholder="event name"
          name="title"
          value={eventData.title}
          type="text"
        />

        <input
          className="event-form__data"
          value={eventData.start}
          name="date"
          type="date"
        />
        <input
          className="event-form__data"
          placeholder="event time"
          value={eventData.start}
          name="time"
          type="time"
        />
        <input
          className="event-form__data"
          placeholder="notes"
          name="notes"
          type="text"
        />
        <button
          className="event-form__btn"
          type="button"
          onClick={removeEvent}
        >
          Discard
        </button>
        <button
          className="event-form__btn event-form__btn--active"
          type="submit"
        >
          Save
        </button>
      </form>
    );
  }
}

EventData.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  formTop: PropTypes.number.isRequired,
  formLeft: PropTypes.number.isRequired,
  eventData: PropTypes.array.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

export default EventData;
