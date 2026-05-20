import React, { Component } from 'react';
import { SIGNUP, SIGNOUT, SIGNIN, NOTIFICATION_COUNT } from '../Constants';

export class AuthAction extends Component {
  static Signin(data) {
    return { type: SIGNIN, payload: data };
  }
  static Signup(data) {
    return { type: SIGNUP, payload: data };
  }
  static Signout() {
    return { type: SIGNOUT };
  }
  static ClearRedux() {
    return { type: SIGNOUT };
  }

  static SaveNotificationCount(data) {
    return {
      type: NOTIFICATION_COUNT,
      payload: data,
    };
  }

  // static SaveTheme(data) {
  //   return {
  //     type: THEME,
  //     payload: data,
  //   };
  // }
  // static SaveSkip(data) {
  //   return {
  //     type: SKIP,
  //     payload: data,
  //   };
  // }
  // static SaveAccountID(data) {
  //   return {
  //     type: ACCOUNT_ID,
  //     payload: data,
  //   };
  // }
}

export default AuthAction;
