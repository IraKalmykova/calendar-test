import PropTypes from 'prop-types';
import React from 'react';
import './App.css';

class NewEvent extends React.Component {
  state = {
    eventMap: {
      title: '',
      date: this.props.defaultDate,
      time: this.props.defaultTime,
      notes: '',
    },

    errorsMap: {
      title: '',
    },
  }

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      eventMap: {
        ...prevState.eventMap,
        [name]: value,
      },
      errorsMap: {
        ...prevState.errorsMap,
        [name]: '',
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { eventMap } = this.state;
    const { onSubmit } = this.props;

    if (eventMap.title === '') {
      this.setState(prevState => ({
        errorsMap: {
          ...prevState.errorsMap,
          title: 'Please, enter the name of your event',
        },
      }));
    } else {
      onSubmit(eventMap);
    }
  }

  render() {
    const { formTop, formLeft, closeForm } = this.props;

    const { title, date, time } = this.state.eventMap;
    const { errorsMap } = this.state;
    return (
      <form
        className="event-form"
        onSubmit={this.handleFormSubmit}
        style={{ top: formTop, left: formLeft }}
      >
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="event-form__close"
          onClick={closeForm}
        />
        <input
          className="event-form__data"
          placeholder="event name"
          name="title"
          value={title}
          type="text"
          onChange={this.handleFieldChange}
        />
        {errorsMap.title && (
          <div className="error">{errorsMap.title}</div>
        )}
        <input
          className="event-form__data"
          value={date}
          name="date"
          type="date"
          onChange={this.handleFieldChange}
        />
        <input
          className="event-form__data"
          placeholder="event time"
          value={time}
          name="time"
          type="time"
          onChange={this.handleFieldChange}
        />
        <input
          className="event-form__data"
          placeholder="notes"
          name="notes"
          type="text"
          onChange={this.handleFieldChange}
        />
        <button
          className="event-form__btn"
          type="button"
          onClick={closeForm}
        >
          Cancel
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

NewEvent.propTypes = {
  defaultDate: PropTypes.string.isRequired,
  defaultTime: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formTop: PropTypes.number.isRequired,
  formLeft: PropTypes.number.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default NewEvent;
