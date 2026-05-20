import Axios from 'axios';
import Toast from 'react-native-toast-message';
import { NavigationService } from '.';
import { ToastError } from './Constants';
import { Store } from '../redux';
import { AuthAction } from '../redux/Actions';
import { useSelector } from 'react-redux';
import axios from 'axios';

//

export var baseUrl = 'https://favorauction.com/api/v1';
export const imageBaseUrl = 'https://favorauction.com/';
export const SQUARE_APP_ID = 'sandbox-sq0idb-0O2EKrJd72_CZWyEjZfiYw';
// export const SQUARE_APP_ID = 'sq0idp-u-jf34VX2g2aFwjXg0YtdA';

var CancelToken = Axios.CancelToken.source();

// const token = Store.getState().AuthReducer?.user?.token;
// axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

// Axios.interceptors.request.use(function (config) {
//  const id =  Store.getState().AuthReducer.accountId
//    console.log("userID===> ", Store.getState().AuthReducer.accountId);
//   config.headers.DefaultAccountId = id;
//   return config;
// });

Axios.interceptors.response.use(
  response => {
    if (response == undefined) {
      // Toast.show(ToastError('Network error, please try again.'));
      return {
        status: 401,
        data: { message: 'Session Expired! Please login.' },
      };
    }
    return response;
  },
  async ({ response, ...rest }) => {
    if (response?.status == 401) {
      try {
        // let {
        //   AuthReducer: {
        //     user: {refreshToken},
        //   },
        // } = Store.getState();
        //  console.warn("401 UnAuthenticated")
        // Axios.CancelToken();

        CancelToken.cancel('Network error');
        console.log('Session Expired!', response);
        Toast.show(ToastError('Session Expired! Please login.'));
        Store.dispatch(AuthAction.ClearRedux());
        Store.dispatch(AuthAction.Signout());
        NavigationService.resetStack('AuthStack');
        setTimeout(() => {
          CancelToken = Axios.CancelToken.source(); // 🔥 RESET TOKEN
        }, 500);
        // CancelToken = Axios.CancelToken.source(); // 🔥 RESET TOKEN
        // });
      } catch (err) {
        console.log('Error= ===', err);
        // Toast.show(ToastError('Network error, please try again.'));
      }
    } else if (response.status == 0) {
      // console.log('response', response);
      return { ...response, data: { message: response?._response } };
    }
    return response;
  },
);

export default class ApiCaller {
  static BearerHeaders = (token: any, More: AxiosRequestConfig = {}) => {
    return {
      Authorization: 'Bearer ' + token,
      ...More,
    };
  };
  static Get = (url = '', headers = {}, data = {}) => {
    this.source = CancelToken;
    console.log('===>>>APICALLGet', baseUrl, url);

    return Axios.get(`${baseUrl}${url}`, {
      cancelToken: this.source.token,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Post = async (
    endPoint = '',
    body = {},
    headers = {},
    cutomUrl = '',
    onUploadProgress = () => {},
  ) => {
    console.log('===>>>APICALLPost', baseUrl, endPoint, body);
    return Axios.post(cutomUrl ? cutomUrl : `${baseUrl}${endPoint}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      onUploadProgress: progress => onUploadProgress(progress),
    });
  };

  static Put = (url = '', body = {}, headers = {}) => {
    return Axios.put(`${baseUrl}${url}`, body, {
      headers: { 'Content-Type': 'application/json', ...headers },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Delete = (url = '', body = {}, headers = {}) => {
    return Axios.delete(`${baseUrl}${url}`, {
      headers: { 'Content-Type': 'application/json', ...headers },
      data: body,
    })
      .then(res => res)
      .catch(err => err.response);
  };
}
