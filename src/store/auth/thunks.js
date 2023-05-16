import { Password } from "@mui/icons-material";
import { checkinCredentials, login, logout } from "./authSlice";
import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
} from "../../firebase/providers";

export const ckeckingAuthentication = (email, Password) => {
  return async (dispatch) => {
    dispatch(checkinCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkinCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkinCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({uid, displayName, email, photoURL}));
  };
};




export const startLoginWithEmailPassword = ({email, password}) => {

  return async (dispatch) => {
    dispatch(checkinCredentials());

    const result = await loginWithEmailPassword({email, password});
    console.log(result);

    if (!result.ok) return dispatch( logout(result))
    dispatch( login(result));
  }
}