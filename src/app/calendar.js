import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import events from './events';
import moment from 'moment';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class Calendar extends React.Component {


state = {
  open: false,
  eventTitle: 'null',
  eventStart: 'null',
  eventEnd: 'null'
}

handleOpen = () => {
  this.setState({open: true});
}

handleClose = () => {
  this.setState({open: false});
}

eventModal = (object) => {
  this.handleOpen();
  this.setState({eventTitle: object.title.toString()});
  this.setState({eventStart: object.start.toString()});
  this.setState({eventEnd: object.end.toString()});
}

  render(){
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleClose}
      />
  ];
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
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
            events={events}
            timeslots={8}
            defaultDate={new Date(2015, 3, 1)}
            onSelectEvent={event => this.eventModal(event)}
          />
      </div>
    </MuiThemeProvider>

  );
  }
}
