import { IAction, IState, IUser } from "@/types/auth";
import {
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "@/auth/constants";

export const initialState: IState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const authReducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload as IUser,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
