import React from 'react';
import DatePicker from 'material-ui/DatePicker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

import TextField from 'material-ui/TextField';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
export default class DatePickerExampleToggle extends React.Component {
  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,

    };
  }

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

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
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
            errorText="This field is required."
            floatingLabelText="Event"
          />
        </div>
        <div className='event-description'>
          <TextField
            hintText="Enter Description"
            errorText="This field is required."
            floatingLabelText="Description"
            multiLine={true}
            rows={4}
          />
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
