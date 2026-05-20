import { NOTIFICATION_COUNT, SIGNIN, SIGNOUT, SIGNUP } from '../Constants';

const initialState = {
  user: null,
  notificationCount: 0,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_COUNT:
      state = {
        ...state,
        notificationCount: action.payload,
      };
      break;
    // case THEME:
    //   state = {
    //     ...state,
    //     theme: action.payload,
    //   };
    //   break;
    case SIGNIN:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    case SIGNUP:
      state = {
        ...state,
        user: action.payload,
      };
      break;

    case SIGNOUT:
      state = {
        ...state,
        user: null,
      };
      break;
    //   case SKIP:
    //     state = {
    //       ...state,
    //       skip: action.payload,
    //     };
    //     break;
    default:
      break;
  }
  return state;
}
