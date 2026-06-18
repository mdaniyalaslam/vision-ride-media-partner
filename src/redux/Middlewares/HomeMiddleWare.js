import React, {Component} from 'react';
import Toast from 'react-native-toast-message';
import ApiCaller from '../../config/ApiCaller';
import {AuthAction, LoaderAction} from '../Actions';
import endPoints from '../../config/EndPoints';
import {ToastError, ToastSuccess} from '../../config/Constants';

export class HomeMiddleware extends Component {
  // ─── Vehicles ─────────────────────────────────────────────────────────────

  static GetVehicles(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Get(
            endPoints.vehicles,
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetVehicles Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
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

  static GetVehicle(token, id) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Get(
            endPoints.vehicleById(id),
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetVehicle Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
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

  static CreateVehicle(token, formData) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.PostForm(
            endPoints.vehicles,
            formData,
            ApiCaller.BearerHeaders(token),
          );
          console.log('CreateVehicle Response:', response?.data);
          if (
            response?.data?.statusCode == 201 ||
            response?.data?.statusCode == 200
          ) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
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

  static UpdateVehicle(token, id, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Put(
            endPoints.vehicleById(id),
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log('UpdateVehicle Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
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

  static DeleteVehicle(token, id, reason) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Delete(
            endPoints.vehicleById(id),
            {reason},
            ApiCaller.BearerHeaders(token),
          );
          console.log('DeleteVehicle Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
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

  static GetVehicleImages(token, vehicleId) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await ApiCaller.Get(
            endPoints.vehicleImages(vehicleId),
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetVehicleImages Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            resolve(response?.data);
          } else {
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  static UploadVehicleImages(token, vehicleId, formData) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.PostForm(
            endPoints.vehicleImages(vehicleId),
            formData,
            ApiCaller.BearerHeaders(token),
          );
          console.log('UploadVehicleImages Response:', response?.data);
          if (
            response?.data?.statusCode == 200 ||
            response?.data?.statusCode == 201
          ) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
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

  static UpdateVehicleImage(token, vehicleId, imageId, formData) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.PutForm(
            endPoints.vehicleImageById(vehicleId, imageId),
            formData,
            ApiCaller.BearerHeaders(token),
          );
          console.log('UpdateVehicleImage Response:', response?.data);
          if (
            response?.data?.statusCode == 200 ||
            response?.data?.statusCode == 201
          ) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
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

  static DeleteVehicleImage(token, vehicleId, imageId) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Delete(
            endPoints.vehicleImageById(vehicleId, imageId),
            {},
            ApiCaller.BearerHeaders(token),
          );
          console.log('DeleteVehicleImage Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
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

  // ─── Messages ─────────────────────────────────────────────────────────────

  static GetMessages(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await ApiCaller.Get(
            endPoints.messages,
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetMessages Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            resolve(response?.data);
          } else {
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  static SendMessage(token, formData) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.PostForm(
            endPoints.messages,
            formData,
            ApiCaller.BearerHeaders(token),
          );
          console.log('SendMessage Response:', response?.data);
          if (
            response?.data?.statusCode == 200 ||
            response?.data?.statusCode == 201
          ) {
            dispatch(LoaderAction.LoaderFalse());
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

  static GetUnreadCount(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await ApiCaller.Get(
            endPoints.messagesUnreadCount,
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetUnreadCount Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(AuthAction.SaveNotificationCount(response?.data?.data?.count ?? 0));
            resolve(response?.data);
          } else {
            reject(false);
          }
        } catch (error) {
          reject(false);
          console.log('GetUnreadCount Error:', error.message);
        }
      });
    };
  }

  static PollMessages(token, lastMessageId = 0) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await ApiCaller.Get(
            `${endPoints.messagesPoll}?last_message_id=${lastMessageId}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('PollMessages Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            resolve(response?.data);
          } else {
            reject(false);
          }
        } catch (error) {
          reject(false);
          console.log('PollMessages Error:', error.message);
        }
      });
    };
  }

  static MarkMessagesRead(token, messageIds) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await ApiCaller.Post(
            endPoints.messagesMarkAsRead,
            {message_ids: messageIds},
            ApiCaller.BearerHeaders(token),
          );
          console.log('MarkMessagesRead Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(AuthAction.SaveNotificationCount(0));
            resolve(response?.data);
          } else {
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  static DeleteMessage(token, id) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await ApiCaller.Delete(
            endPoints.deleteMessage(id),
            {},
            ApiCaller.BearerHeaders(token),
          );
          console.log('DeleteMessage Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            resolve(response?.data);
          } else {
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }

  // ─── Monthly Reports ───────────────────────────────────────────────────────

  static SubmitMonthlyReport(token, formData) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.PostForm(
            endPoints.monthlyReports,
            formData,
            ApiCaller.BearerHeaders(token),
          );
          console.log('SubmitMonthlyReport Response:', response?.data);
          if (
            response?.data?.statusCode == 201 ||
            response?.data?.statusCode == 200
          ) {
            Toast.show(ToastSuccess(response?.data?.message));
            dispatch(LoaderAction.LoaderFalse());
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

  static GetMonthlyReports(token, orderId) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Get(
            endPoints.monthlyReportsByOrder(orderId),
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetMonthlyReports Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
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

  // ─── Orders ───────────────────────────────────────────────────────────────

  static GetOrders(token, perPage = 15) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Get(
            `${endPoints.orders}?per_page=${perPage}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetOrders Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
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

  // ─── Payments ─────────────────────────────────────────────────────────────

  static GetPayments(token, perPage = 20) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          const response = await ApiCaller.Get(
            `${endPoints.payments}?per_page=${perPage}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('GetPayments Response:', response?.data);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
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
}

export default HomeMiddleware;
