import React from 'react';

import { render } from 'react-dom';
import Basic from './calendar.js';

import localizer from 'react-big-calendar/lib/localizers/globalize';
import globalize from 'globalize';

import Toolbar from './Toolbar.js';
import Main from './Main.js';
import Date from './Date.js';

localizer(globalize);

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//import 'react-big-calendar/lib/less/styles.less';
import './styles/calendar-styles.less';
import './styles/styles.less';
import './styles/prism.less';


const Example = React.createClass({

  render() {
    return (
      <div className='app'>
        <Main/>
      </div>
    );
  }

});

render(<Toolbar/>, document.getElementById('toolbar'));
render(<Example/>, document.getElementById('root'));
