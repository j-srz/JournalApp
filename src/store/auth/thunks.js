import { Password } from "@mui/icons-material";
import { checkinCredentials, login, logout } from "./authSlice";
import { signInWithGoogle } from "../../firebase/providers";

export const ckeckingAuthentication = (email, Password) => {
    return async(dispatch) => {
        dispatch(checkinCredentials() )
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkinCredentials() )

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result))
    }
}