import React, { Component } from 'react';
import { Service } from "./service";
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastStyle } from './defaultvalues';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: [],
      time: new Date(),
      formData: {
        time: '',
        dayOfWeek: ''
      }
    };
  }

  componentDidMount = () => {
    this.fetchAlarms();
    this.timer = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchAlarms = () => {
    Service.getAlarms()
      .then((response) => {
        this.setState({ alarms: response.data });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          localStorage.clear();
          window.location.reload();
        } else {
          console.log(err);
        }
      });
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`/alarms/${id}`);
      this.setState({
        alarms: this.state.alarms.filter(alarm => alarm._id !== id)
      });
    } catch (error) {
      console.error('Error deleting alarm:', error);
    }
  };

  handleSnooze = async (id) => {
    try {
      const response = await axios.post(`/alarms/${id}/snooze`);
      this.setState({
        alarms: this.state.alarms.map(alarm => (alarm._id === id ? response.data : alarm))
      });
    } catch (error) {
      console.error('Error snoozing alarm:', error);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { time, dayOfWeek } = this.state.formData;
    try {
      const response = await Service.createAlarm({ time, dayOfWeek });
      this.setState(prevState => ({
        alarms: [...prevState.alarms, response.data],
        formData: { time: '', dayOfWeek: '' }
      }));
      toast.success('Alarm added successfully', toastStyle);
    } catch (error) {
      console.error('Error adding alarm:', error);
      toast.error('Error adding alarm', toastStyle);
    }
  };

  handleUpdate = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      formData: { ...prevState.formData, [name]: value }
    }));
  };

  render() {
    const { time, alarms, formData } = this.state;

    return (
      <div>
        <h1>Current Time: {time.toLocaleTimeString()}</h1>
        <ul>
          {alarms.map(alarm => (
            <li key={alarm._id}>
              {alarm.time} on {alarm.dayOfWeek}
              <button onClick={() => this.handleSnooze(alarm._id)}>Snooze</button>
              <button onClick={() => this.handleDelete(alarm._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={this.handleUpdate}
              required
            />
          </div>
          <div>
            <label>Day of the Week:</label>
            <select
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={this.handleUpdate}
              required
            >
              <option value="">Select a day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
          <button type="submit">Add Alarm</button>
        </form>
      </div>
    );
  }
}
