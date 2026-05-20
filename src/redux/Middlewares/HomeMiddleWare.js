import React, { Component } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import ApiCaller from '../../config/ApiCaller';
import { AuthAction, LoaderAction } from '../Actions';
import endPoints from '../../config/EndPoints';
import { ToastError, ToastSuccess } from '../../config/Constants';

export class HomeMiddleware extends Component {
  static MarkMessagesRead(token, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await ApiCaller.Post(
            endPoints.markMessagesRead,
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response MARKMESSAGESREAD', response);
          if (response?.data?.statusCode == 200) {
            dispatch(AuthAction.SaveNotificationCount(0));
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
  static AddCard(token, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Post(
            endPoints.addCard,
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response ADDCARD', response);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            // Toast.show(ToastError(response?.data?.message));
            Alert.alert(
              'Error',
              response?.data?.message ||
                'Failed to add card. Please try again.',
            );
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }
  static DeleteCard(token, id) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Delete(
            `${endPoints.deleteCard(id)}`,
            {},
            ApiCaller.BearerHeaders(token),
          );
          console.log('response DELETECARD', response);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            reject(false);
            // Toast.show(ToastError(response?.data?.message));
            Alert.alert(
              'Error',
              response?.data?.message ||
                'Failed to add card. Please try again.',
            );
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }
  static SetDefaultCard(token, id) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await ApiCaller.Post(
            `${endPoints.setDefaultCard}/${id}`,
            {},
            ApiCaller.BearerHeaders(token),
          );
          console.log('response SETDEFAULTCARD', response);
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
  static GetBankAccounts(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Get(
            endPoints.cards,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response GETBANKACCOUNTS', response);
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
  static GetNotificationsCount(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await ApiCaller.Get(
            endPoints.unreadNotifications,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response GETNOTIFICATIONSCount', response);
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
  static DownloadInvoice(token, invoiceId) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Get(
            endPoints.downloadInvoice(invoiceId),
            ApiCaller.BearerHeaders(token),
          );
          console.log('response DOWNLOADINVOICE', response);
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
  static ProcessPayment(token, invoiceId) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Post(
            endPoints.processPayment(invoiceId),
            {},
            ApiCaller.BearerHeaders(token),
          );
          console.log('response PROCESSPAYMENT', response);
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
  static GetOrders(token, filter) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Get(
            endPoints.orders + `?filter=${filter}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response getorderssss', response);
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
  static SendMessage(token, body) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Post(
            endPoints.sendMessage,
            body,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response SENDMESSAGE', response);
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
  static GetMessages(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await ApiCaller.Get(
            endPoints.messages,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response GETMESSAGES', response);
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
  static GetBids(filter, token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          // dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Get(
            endPoints.bids + `?filter=${filter}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response GETBIDS', response);
          if (response?.data?.statusCode == 200) {
            // dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else {
            // dispatch(LoaderAction.LoaderFalse());
            reject(false);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          // dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
        }
      });
    };
  }
  static PlaceBid(payload, token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());

          let response = await ApiCaller.Post(
            endPoints.bidPlace,
            payload,
            ApiCaller.BearerHeaders(token),
          );
          console.log('response', response);
          if (response?.data?.statusCode == 200) {
            dispatch(LoaderAction.LoaderFalse());
            resolve(response?.data);
          } else if (response?.data?.statusCode == 201) {
            // payment method required
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

  static GetBidStats(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await ApiCaller.Get(
            `${endPoints.bidsStats}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('STATS RESPONSE', response);
          if (response?.data?.statusCode == 200) {
            resolve(response?.data?.data);
          } else {
            reject(false);
            console.log(response?.data?.message);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          reject(false);
          Toast.show(ToastError(error.message));
          console.log(error);
        }
      });
    };
  }
  static GetCategories(token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await ApiCaller.Get(
            `${endPoints.categories}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('CATEGORIES RESPONSE', response);
          if (response?.data?.statusCode == 200) {
            resolve(response?.data?.data);
          } else {
            reject(false);
            console.log(response?.data?.message);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          reject(false);
          Toast.show(ToastError(error.message));
          console.log(error);
        }
      });
    };
  }
  static GetAuctions(token, params) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await ApiCaller.Get(
            `${endPoints.auctions}?${params}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('AUCTIONS RESPONSE', response);
          if (response?.data?.statusCode == 200) {
            resolve(response?.data?.data);
          } else {
            reject(false);
            console.log(response?.data?.message);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          reject(false);
          Toast.show(ToastError(error.message));
          console.log(error);
        }
      });
    };
  }
  static GetAuctionDetails(id, token) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          let response = await ApiCaller.Get(
            `${endPoints.auctions}/${id}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('RES AUCTION DETAILS', response);
          dispatch(LoaderAction.LoaderFalse());
          if (response?.data?.statusCode == 200) {
            resolve(response?.data?.data);
          } else {
            reject(false);
            console.log(response?.data?.message);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
          console.log(error);
        }
      });
    };
  }
  static GetInvoices(token, params) {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          let response = await ApiCaller.Get(
            `${endPoints.invoices}?${params}`,
            ApiCaller.BearerHeaders(token),
          );
          console.log('INVOICES RESPONSE', response);
          dispatch(LoaderAction.LoaderFalse());
          if (response?.data?.statusCode == 200) {
            resolve(response?.data?.data);
          } else {
            reject(false);
            console.log(response?.data?.message);
            Toast.show(ToastError(response?.data?.message));
          }
        } catch (error) {
          dispatch(LoaderAction.LoaderFalse());
          reject(false);
          Toast.show(ToastError(error.message));
          console.log(error);
        }
      });
    };
  }
}

export default HomeMiddleware;
