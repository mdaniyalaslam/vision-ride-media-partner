import React, { Component } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthAction, LoaderAction } from '../Actions';
import endPoints from '../../config/EndPoints';
import { ToastError, ToastSuccess } from '../../config/Constants';
import ApiCaller from '../../config/ApiCaller';
import { NavigationService } from '../../config';
// import messaging from '@react-native-firebase/messaging';

export class AuthMiddleware extends Component {
  static Login(payload) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Post(endPoints.login, payload);
          console.log('responseLOGIN', response);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(
              AuthAction.Signin({
                ...response?.data?.data.user,
                token: response?.data?.data.token,
              }),
            );
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('Error', e);
        }
      });
    };
  }
  static Register(payload) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          let response = await ApiCaller.Post(endPoints.register, payload);
          console.log('responseREGISTER', response);
          // if (response?.status == 201 || response?.status == 200) {
          if (
            response?.data?.statusCode == 201 ||
            response?.data?.statusCode == 200
          ) {
            Toast.show(ToastSuccess(response.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            dispatch(
              AuthAction.Signin({
                ...response?.data?.data.user,
                token: response?.data?.data.token,
              }),
            );
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response.data?.message));
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  static ForgetPassword({ email, token }) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          let payload = {
            email,
          };
          let response = await ApiCaller.Post(
            endPoints.forgotPassword,
            payload,
            ApiCaller.BearerHeaders(token),
          );
          console.log('ForgetPassword Response:', response);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('Error', e);
        }
      });
    };
  }

  static VerifyOtp(token, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          let response = await ApiCaller.Post(
            endPoints.verifyOtp,
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log('VerifyOtp Response:', response);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('Error', e);
        }
      });
    };
  }
  static ResetPassword(body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Post(endPoints.resetPassword, body);
          console.log('ResetPassword Response:', response);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('Error', e);
        }
      });
    };
  }
  static DeleteAccount(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Delete(
            endPoints.deleteAccount,
            {},
            ApiCaller.BearerHeaders(token),
          );
          console.log('DeleteAccount Response:', response);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('Error', e);
        }
      });
    };
  }
  static GetCountries(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Get(
            endPoints.countries,
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetCountries Response:', response);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('Error', e);
        }
      });
    };
  }

  static ChangePassword(token, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          const response = await ApiCaller.Post(
            endPoints.changePassword,
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log(response);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('Error', e);
        }
      });
    };
  }

  static UpdateProfile(token, userData) {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Put(
            `${endPoints.profile}`,
            userData,
            ApiCaller.BearerHeaders(token),
          );
          console.log('RES UpdateProfile', response);
          if (response.data.statusCode === 200) {
            resolve(response.data.data);
            dispatch(LoaderAction.LoaderFalse());
          } else {
            reject(false);
            dispatch(LoaderAction.LoaderFalse());
          }
        } catch (error) {
          reject(false);
          dispatch(LoaderAction.LoaderFalse());
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  static GetProfile(token) {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Get(
            `${endPoints.profile}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('RES GetProfile', response);
          if (response.data.statusCode === 200) {
            resolve(response.data.data);
            dispatch(LoaderAction.LoaderFalse());
          } else {
            reject(false);
            dispatch(LoaderAction.LoaderFalse());
          }
        } catch (error) {
          reject(false);
          dispatch(LoaderAction.LoaderFalse());
          Toast.show(ToastError(error.message));
        }
      });
    };
  }
}

export default AuthMiddleware;
