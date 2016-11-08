import React, { PropTypes } from 'react';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

import BigCalendar from 'react-big-calendar';
import events from './events';
import moment from 'moment';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 0);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 0);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      /////FORM
      startTime: null,
      endTime: null,
      minDate: minDate,
      maxDate: maxDate,
      eventName: '',
      description: '',
      /////CALENDAR
      events: events,
      open: false,
      eventTitle: 'null',
      eventStart: 'null',
      eventEnd: 'null'
    };
  }

  /////FORM/////

  eventNameValue = (event) => {
    this.setState({eventName:event.target.value});
  }

  descriptionValue = (event) => {
    this.setState({description:event.target.value});
  }

  handleChangeStart = (event, date) => {
    this.setState({startTime: date});
    console.log('start time:');
  };

  handleChangeEnd = (event, date) => {
    this.setState({endTime: date});
    console.log('end time:');
  };

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };

  postForm = () => {
    var object = {
      title       : this.state.eventName,
      description : this.state.description,
      start       : this.state.minDate,
      end         : this.state.maxDate,
      startDate   : this.state.minDate,
      endDate     : this.state.maxDate
    }
    console.log(object);
    var tempArray = this.state.events;
    tempArray.push(object);
    this.setState({events:tempArray});
  };

  //////CALENDAR///////

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  eventModal = (object) => {
    this.handleOpen();
    this.setState({eventTitle: object.title.toString()});
    this.setState({eventStart: object.description.toString()});
    this.setState({eventEnd: object.start.toString()});
  }

  render() {

    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleClose}
      />
  ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <table>
        <colgroup>
          <col span={2}
          width={"15%"}
          >
          </col>
        </colgroup>
      <tbody>
        <tr>
          <td>
          <div className='form'>
          <div>
            <div>
              <TimePicker
                format="ampm"
                hintText="Select Start Time"
                value={this.state.startTime}
                onChange={this.handleChangeStart}
              />
              <TimePicker
                format="ampm"
                hintText="Select End Time"
                value={this.state.endTime}
                onChange={this.handleChangeEnd}
              />
            </div>
            <div>
              <DatePicker
                floatingLabelText="Select Reservation Timeframe"
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
              />
              <div>
                <DatePicker
                  onChange={this.handleChangeMinDate}
                  floatingLabelText="Start Date"
                  defaultDate={this.state.minDate}
                />
                <DatePicker
                  onChange={this.handleChangeMaxDate}
                  floatingLabelText="End Date"
                  defaultDate={this.state.maxDate}
                />
              </div>
              <div className='event-title'>
                <TextField
                  hintText="Enter Name of Event"
                  floatingLabelText="Event"
                  onChange={this.eventNameValue}
                />
              </div>
              <div className='event-description'>
                <TextField
                  hintText="Enter Description"
                  floatingLabelText="Description"
                  onChange={this.descriptionValue}
                  multiLine={true}
                  rows={4}
                />
              </div>
            </div>
            <RaisedButton label="Reset" onTouchTap={this.postForm} />
            <RaisedButton label="Submit" onTouchTap={this.postForm} />

          </div>
          </div>
          </td>
          <td>
            <div className='examples contain'>
            <div>
              <Dialog
                title={this.state.eventTitle}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                <h2>{this.state.eventStart}</h2>
                <h2>{this.state.eventEnd}</h2>

              </Dialog>
              <BigCalendar
                {...this.props}
                events={this.state.events}
                timeslots={8}
                defaultDate={new Date()}
                onSelectEvent={event => this.eventModal(event)}
              />
          </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      </MuiThemeProvider>
    );
  }
}
