import React, {Component} from 'react';
import Toast from 'react-native-toast-message';
import {AuthAction, LoaderAction} from '../Actions';
import endPoints from '../../config/EndPoints';
import {ToastError, ToastSuccess} from '../../config/Constants';
import ApiCaller from '../../config/ApiCaller';
import {NavigationService} from '../../config';

export class AuthMiddleware extends Component {
  static Login(payload) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(endPoints.login, payload);
          console.log('Login Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(
              AuthAction.Signin({
                ...response?.data?.data,
                token: response?.data?.data?.token,
              }),
            );
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('Login Error:', e);
        }
      });
    };
  }

  static Register(payload) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(endPoints.register, payload);
          console.log('Register Response:', response?.data);
          if (
            response?.data?.statusCode == 201 ||
            response?.data?.statusCode == 200
          ) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            dispatch(
              AuthAction.Signin({
                ...response?.data?.data,
                token: response?.data?.data?.token,
              }),
            );
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  static ForgetPassword({email}) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(endPoints.forgotPassword, {
            email,
          });
          console.log('ForgotPassword Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('ForgotPassword Error:', e);
        }
      });
    };
  }

  static VerifyOtp(token, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(
            endPoints.verifyOtp,
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log('VerifyOtp Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('VerifyOtp Error:', e);
        }
      });
    };
  }

  static ResetPassword(body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(endPoints.resetPassword, body);
          console.log('ResetPassword Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('ResetPassword Error:', e);
        }
      });
    };
  }

  static Logout(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Post(
            endPoints.logout,
            {},
            ApiCaller.BearerHeaders(token),
          );
          console.log('Logout Response:', response?.data);
          dispatch(LoaderAction.LoaderFalse());
          dispatch(AuthAction.Signout());
          resolve(response?.data);
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          dispatch(AuthAction.Signout());
          console.log('Logout Error:', e);
        }
      });
    };
  }

  static DeleteAccount(token, password) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Delete(
            endPoints.deleteAccount,
            {password},
            ApiCaller.BearerHeaders(token),
          );
          console.log('DeleteAccount Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('DeleteAccount Error:', e);
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
            endPoints.profile,
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetProfile Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  static GetSettings(token) {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Get(
            endPoints.getSettings,
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetSettings Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
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
            endPoints.updateProfile,
            userData,
            ApiCaller.BearerHeaders(token),
          );
          console.log('UpdateProfile Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  static ChangePassword(token, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Put(
            endPoints.updatePassword,
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log('ChangePassword Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('ChangePassword Error:', e);
        }
      });
    };
  }

  static GetStates() {
    return async dispatch => {
      try {
        const response = await ApiCaller.GetHelper(endPoints.states);
        console.log('GetStates Response:', response?.data);
        if (response?.data?.statusCode == 200) {
          return response?.data?.data ?? [];
        }
        return [];
      } catch (e) {
        console.log('GetStates Error:', e);
        return [];
      }
    };
  }

  static GetCitiesByState(stateId) {
    return async dispatch => {
      try {
        const response = await ApiCaller.GetHelper(
          endPoints.citiesByState(stateId),
        );
        console.log('GetCitiesByState Response:', response?.data);
        if (response?.data?.statusCode == 200) {
          return response?.data?.data ?? [];
        }
        return [];
      } catch (e) {
        console.log('GetCitiesByState Error:', e);
        return [];
      }
    };
  }

  static UpdateBankDetails(token, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Put(
            endPoints.updateBank,
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log('UpdateBankDetails Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (e) {
          dispatch(LoaderAction.LoaderFalse());
          console.log('UpdateBankDetails Error:', e);
        }
      });
    };
  }
}

export default AuthMiddleware;
