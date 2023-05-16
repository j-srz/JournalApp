import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { ckeckingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { useMemo } from "react";

export const LoginPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth);

  const { email, password, onInputChange, formState } = useForm({
    email: 'jesus@correo.com',
    password: '123456'
  })

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  // const check = useSelector(checkinCredentials);
  const dispatch = useDispatch();



  const onSubmit = (e) => {
    e.preventDefault();
    
    console.log(email, password)
    dispatch(startLoginWithEmailPassword({email, password}));
    
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  }



  return (
    <AuthLayout title="Login">


        <form onSubmit={onSubmit}>
          <Grid container sx={{ mt: 3 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@correo.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                />
            </Grid>


            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid display={!!errorMessage ? '' : 'none'}  item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth sx={{ padding: 1 }}>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticating} onClick={onGoogleSignIn} variant="contained" fullWidth sx={{ padding: 1 }}>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear cuenta
              </Link>
            </Grid>
          </Grid>
        </form>

    </AuthLayout>
    );
};
