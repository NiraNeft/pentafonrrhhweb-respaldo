//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { setAuthorization } from "../../../helpers/api_helper";
import {
  postApiLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/hosterbackend_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';

// const fireBaseBackend = getFirebaseBackend();

export const loginUser = (user, history) => async (dispatch) => {
  try {
    let response;
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      let fireBaseBackend = getFirebaseBackend();
      console.log("[loginUser] firebase");
      response = fireBaseBackend.loginUser(
        user.email,
        user.password
      );
    } else if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      console.log("[loginUser] jwt");
      response = postJwtLogin({
        email: user.email,
        password: user.password
      });

    } else if (import.meta.env.VITE_APP_API_URL) {
      console.log("[loginUser] VITE_APP_API_URL");
      response = postApiLogin({
        NombreUsuario: user.NombreUsuario,
        Contrasenia: user.Contrasenia,
      });
    } else {
      console.log("[loginUser] postApiLogin");
      response = postApiLogin({
        email: user.email,
        password: user.password,
      });
    }

    var dataLogin = await response;
    var data = {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWYxNWM3NzBhNDcwYTIzMGNjNWQ1YSIsImlhdCI6MTczOTIyMDY4MCwiZXhwIjoxNzQ2OTk2NjgwfQ._YWwaSW-cyzCMDtumjakkik4_6BOgY5dqEuAfuDcYpo",
        "data": {
            "_id": "629f15c770a470a230cc5d5a",
            "first_name": "Jorge",
            "email": "admin@themesbrand.com",
            "password": "$2a$12$tOmV5oSs.Itd7KZ6IEV3L.kDnDZz9N2TadTrrnu0M/9ktxplL/lzC",
            "confirm_password": "123456",
            "changePasswordAt": "2022-06-07T09:06:27.077Z",
            "skills": [],
            "__v": 1,
            "passwordtoken": "b6477d39670f348626f069033610d007bd85e68930c5d8b45995b59c88faf7f8",
            "passwordtokenexp": "2025-01-17T08:42:51.917Z",
            "exp_year": [],
            "portfolio": []
        }
    };
    data.token = dataLogin.data.token;
    //import.meta.env.VITE_APP_DEFAULTAUTH = "fake";
    console.log(import.meta.env.VITE_APP_DEFAULTAUTH);
    console.log("data", data);
    console.log("dataLogin", dataLogin);
    if (data) {
      sessionStorage.setItem("authUser", JSON.stringify(data));
      console.log("sessionStorage", sessionStorage);
      setAuthorization(data.token);
      if (import.meta.env.VITE_APP_DEFAULTAUTH === "fake") {
        var finallogin = JSON.stringify(data);
        finallogin = JSON.parse(finallogin)
        data = finallogin.data;
        console.log("finallogin.status", finallogin.status);
        if (finallogin.status === "success") {
          dispatch(loginSuccess(data));
          history('/job-requisicion-lists') // /dashboard
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(data));
        history('/job-requisicion-lists')// /dashboard
      }
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");
    let fireBaseBackend = getFirebaseBackend();
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type, history) => async (dispatch) => {
  try {
    let response;

    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }
    //  else {
      //   response = postSocialLogin(data);
      // }
      
      const socialdata = await response;
    if (socialdata) {
      sessionStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history('/dashboard')
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};