import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';
import moment from 'moment';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const Basic = props => (

  <div>
    <BigCalendar
      events={events}
      startAccessor='startDate'
      endAccessor='endDaste'
      />
  </div>
);

/*

let Basic = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
})
*/
export default Basic;
