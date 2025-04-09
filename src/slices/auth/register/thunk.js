//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/hosterbackend_helper";

// action
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange
} from "./reducer";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
export const registerUser = (user) => async (dispatch) => {
  try {
    let response;
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      response = fireBaseBackend.registerUser(user.email, user.password);
      // yield put(registerUserSuccessful(response));
    } else if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      response = postJwtRegister('/post-jwt-register', user);
      // yield put(registerUserSuccessful(response));
    } else if (import.meta.env.VITE_APP_API_URL) {
      user.Sourcing = "WEB";
      user.IdPublicacion = "Sitio WEB";
      response = postFakeRegister(user);
      console.log(response);
      const data = await response;
      console.log("[registerUser] data: ", data);

      if (data.estatusCode === 200) {
        console.log("[registerUser] data: ", data.estatusCode);
        dispatch(registerUserSuccessful(data));
      } else {
        console.log("[registerUser] data: ", "Fallido");
        dispatch(registerUserFailed(data));
      }
    }
  } catch (error) {
    console.log("[registerUser] error: ", error);
    dispatch(registerUserFailed(error));
  }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange();
    return response;
  } catch (error) {
    return error;
  }
};