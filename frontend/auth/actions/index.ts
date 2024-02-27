import { Dispatch } from "react";
import { IAction } from "@/types/auth";
import {
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "@/auth/constants";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import {
  localStorageClear,
  localStorageSave,
} from "@/utils/localStorageService";

// login action
interface ILoginResult {
  name: string;
  access: string;
}

export const login = async (
  email: string,
  password: string,
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  try {
    const response = await axiosInstance.post("/api/accounts/login/", {
      email,
      password,
    });

    const data: ILoginResult = response.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        name: data.name,
        access: data.access,
      },
    });

    localStorageSave(data.access, data.name);

    return [true, "Login Successfully"];
  } catch (error) {
    const err = error as AxiosError;

    // Dispatch the data
    dispatch({
      type: LOGIN_FAIL,
    });
    localStorageClear();

    if (err.response?.status === 401) {
      return [false, "Email or Password is incorrect."];
    } else {
      console.log(err);
      return [false, `${err.message}`];
    }
  }
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  try {
    await axiosInstance.post("/api/accounts/signup/", {
      name,
      email,
      password,
    });

    return await login(email, password, dispatch);
  } catch (error) {
    const err = error as AxiosError;

    dispatch({
      type: SIGNUP_FAIL,
    });
    localStorageClear();
    console.log(err);

    interface errorResponse {
      data: {
        error: string;
      };
    }
    const response = err.response as errorResponse;

    return [false, response.data.error];
  }
};

export const logout = (dispatch: Dispatch<IAction>) => {
  dispatch({ type: LOGOUT });
  localStorageClear();
};

interface IAuthenticateResult {
  username: string;
  name: string;
  profile_picture: string;
}
export const authenticate = async (
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch({
      type: LOGIN_FAIL,
    });
    localStorageClear();
    return [false, "Please Login/Signup to continue"];
  }

  try {
    const response = await axiosInstance.get("/api/accounts/get-user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: IAuthenticateResult = await response.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        access: token,
        name: data.name,
      },
    });

    return [true, "Login Successfully"];
  } catch (error) {
    const err = error as AxiosError;

    dispatch({
      type: LOGIN_FAIL,
    });

    localStorageClear();
    console.log(err);

    return [false, "Please Login to continue"];
  }
};
