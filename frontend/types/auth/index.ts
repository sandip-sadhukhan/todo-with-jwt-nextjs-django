import { Dispatch } from "react";

export interface IUser {
  access: string;
  name: string;
}

export interface IState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface IAction {
  type: string;
  payload?: IUser;
}

export interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}
