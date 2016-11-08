import React from 'react';

import { render } from 'react-dom';
import Basic from './demos/basic.js';

import localizer from 'react-big-calendar/lib/localizers/globalize';
import globalize from 'globalize';

localizer(globalize);

//import 'react-big-calendar/lib/less/styles.less';
import './calendar-styles.less';
import './styles.less';
import './prism.less';


const Example = React.createClass({
  getInitialState(){
    return {
      selected: 'basic'
    };
  },

  render() {
    return (
      <div className='app'>
        <div className='examples contain'>
          <Basic/>
        </div>
      </div>
    );
  }

});

render(<Example/>, document.getElementById('root'));
