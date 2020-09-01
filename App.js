/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import StudentDashboard from './student/studentdashboard';
import StudentHomework from './student/studenthomework';
import StudentAttendance from './student/studentattendance';
import StudentEducationPortal from './student/studenteducationportal';
import StudentProfile from './student/studentprofile';
import Login from './login';
export default class App extends Component {
  render() {
    return (
      <Router hideNavBar="true">
        <Scene key="root">
          <Scene
            key="Login"
            component={Login}
            hideNavBar="true"
            initial={true}
          />
          <Scene
            key="StudentDashboard"
            component={StudentDashboard}
            hideNavBar="true"
          />
          <Scene
            key="StudentEducationPortal"
            component={StudentEducationPortal}
            hideNavBar="true"
          />
          <Scene
            key="StudentHomework"
            component={StudentHomework}
            hideNavBar="true"
            title="StudentHomework"
          />
          <Scene
            key="StudentAttendance"
            component={StudentAttendance}
            hideNavBar="true"
            title="StudentAttendance"
          />
          <Scene
            key="StudentProfile"
            component={StudentProfile}
            hideNavBar="true"
            title="StudentProfile"
          />
        </Scene>
      </Router>
    );
  }
}
