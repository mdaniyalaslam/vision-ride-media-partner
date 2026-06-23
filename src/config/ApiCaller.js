import Axios from 'axios';
import Toast from 'react-native-toast-message';
import {NavigationService} from '.';
import {ToastError} from './Constants';
import {Store} from '../redux';
import {AuthAction} from '../redux/Actions';

export var baseUrl =
  'https://client72.vtechost.com/VisionRideMedia/public/api/mobility-partner';
export const rootBaseUrl =
  'https://client72.vtechost.com/VisionRideMedia/public';
export const imageBaseUrl =
  'https://client72.vtechost.com/VisionRideMedia/public/';

var CancelToken = Axios.CancelToken.source();

Axios.interceptors.response.use(
  response => {
    if (response == undefined) {
      return {
        status: 401,
        data: {message: 'Session Expired! Please login.'},
      };
    }
    return response;
  },
  async ({response}) => {
    if (response?.status == 401) {
      try {
        CancelToken.cancel('Network error');
        console.log('Session Expired!', response);
        Toast.show(ToastError('Session Expired! Please login.'));
        Store.dispatch(AuthAction.ClearRedux());
        Store.dispatch(AuthAction.Signout());
        NavigationService.resetStack('AuthStack');
        setTimeout(() => {
          CancelToken = Axios.CancelToken.source();
        }, 500);
      } catch (err) {
        console.log('Interceptor Error:', err);
      }
    } else if (response?.status == 0) {
      return {...response, data: {message: response?._response}};
    }
    return response;
  },
);

export default class ApiCaller {
  static BearerHeaders = (token, More = {}) => {
    return {
      Authorization: 'Bearer ' + token,
      ...More,
    };
  };

  static Get = (url = '', headers = {}) => {
    this.source = CancelToken;
    console.log('===>>> API GET:', baseUrl + url);
    return Axios.get(`${baseUrl}${url}`, {
      cancelToken: this.source.token,
      headers: {
        Accept: 'application/json',
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
    customUrl = '',
    onUploadProgress = () => {},
  ) => {
    console.log('===>>> API POST:', baseUrl + endPoint, body);
    return Axios.post(
      customUrl ? customUrl : `${baseUrl}${endPoint}`,
      body,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        },
        onUploadProgress: progress => onUploadProgress(progress),
      },
    );
  };

  // For multipart/form-data (file uploads)
  static PostForm = async (
    endPoint = '',
    formData,
    headers = {},
    onUploadProgress = () => {},
  ) => {
    console.log('===>>> API POST (FormData):', baseUrl + endPoint);
    return Axios.post(`${baseUrl}${endPoint}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
      onUploadProgress: progress => onUploadProgress(progress),
    })
      .then(res => res)
      .catch(err => err.response);
  };

  // For multipart/form-data updates (Laravel parses multipart on POST only,
  // so we tunnel PUT through POST via the _method override)
  static PutForm = async (
    endPoint = '',
    formData,
    headers = {},
    onUploadProgress = () => {},
  ) => {
    formData.append('_method', 'PUT');
    console.log('===>>> API PUT (FormData):', baseUrl + endPoint);
    return Axios.post(`${baseUrl}${endPoint}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
      onUploadProgress: progress => onUploadProgress(progress),
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Put = (url = '', body = {}, headers = {}) => {
    console.log('===>>> API PUT:', baseUrl + url, body);
    return Axios.put(`${baseUrl}${url}`, body, {
      headers: {'Content-Type': 'application/json', ...headers},
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static GetHelper = (url = '') => {
    console.log('===>>> API GET (helper):', rootBaseUrl + url);
    return Axios.get(`${rootBaseUrl}${url}`, {
      headers: {Accept: 'application/json'},
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Delete = (url = '', body = {}, headers = {}) => {
    console.log('===>>> API DELETE:', baseUrl + url);
    return Axios.delete(`${baseUrl}${url}`, {
      headers: {'Content-Type': 'application/json', ...headers},
      data: body,
    })
      .then(res => res)
      .catch(err => err.response);
  };
}
