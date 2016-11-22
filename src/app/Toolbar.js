import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

import cookie from 'react-cookie';

var baseURL = 'https://eipihblfcp.localtunnel.me';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class Login extends Component {
  static muiName = 'FlatButton';

  state = {
    open: false,
    username: null,
    password: null,
    login: cookie.load('token')
  }

  quickConsole = () => {
    console.log(cookie.load('token'));
  }

  onLogin = () => {
    var token = this.state.username;
    this.setState.login = token;

    var opt = {
      maxAge: '30'
    }

    cookie.save('token', token, opt, { path: '/' });
    console.log('Saved token with data: ', token);
  }

  onLogout() {
    cookie.remove('token', { path: '/' });
    console.log('deleted token');
    /** Clear all cookies starting with 'session' (to get all cookies, omit regex argument) */
    Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, { path: '/' }))
  }


  usernameValue = (event) => {
    this.setState({username:event.target.value});
  }

  passwordValue = (event) => {
    this.setState({password:event.target.value});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleSubmit = () => {
    this.setState({open: false});
    var object = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(object);
    $.ajax({
      type : 'GET',
      url  : baseURL+'/login/'+object.username+'***'+object.password,
      success: function(response){
        console.log(response);
        var opt = {
          maxAge: '120' // 7 days in seconds '10,080'
        }
        cookie.save('token', response.token, opt, {path: '/'});
        console.log(cookie.load('token'));
      }
    });

  }

  render() {

    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
      <FlatButton
        label="ResetCookies"
        primary={true}
        onTouchTap={this.onLogout}
      />,
      <FlatButton
        label="SaveCookies"
        primary={true}
        onTouchTap={this.onLogin}
      />,
      <FlatButton
        label="QuickPrint"
        primary={true}
        onTouchTap={this.quickConsole}
      />
    ];

    return (
      <div>
        <Dialog
          title={"Test"}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          actions={actions}
        >
        <div>
          <TextField
            hintText="username"
            floatingLabelText="Username"
            onChange={this.usernameValue}
          />
        </div>
        <div>
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            onChange={this.passwordValue}
          />
        </div>
      </Dialog>
        <FlatButton {...this.props} label="Login"
          onTouchTap={this.handleOpen}
        />
      </div>
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
 export default class newToolbar extends React.Component {
  state = {
    logged: false,
    open: false
  }



  render() {
      $.ajax({
        type : 'GET',
        url  : baseURL+'/api/session/'+cookie.load('token'),
        success: function(response){
          console.log(response);

          if (response.valid === true){
            this.state.logged = true
          }
          else {
            this.state.logged = false
          }
        }
      });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Room Reservation System"
            showMenuIconButton={false}
            iconElementRight={this.state.logged ? <Logged /> : <Login />}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
