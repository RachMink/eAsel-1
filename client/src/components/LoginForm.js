import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import Logo from "../img/logo.png";
import { AuthContext } from "../context/AuthContext";

const theme = createTheme();

function LoginForm(props) {
  const auth = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [failed, setFailed] = useState(false);

  const login = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    let email = data.get("email");
    let password = data.get("password");
    auth
      .authenticate(email, password)
      .then((user) => {
        if (user) {
          setRedirect(true);
          return;
        }
      })
      .then((err) => {
        setFailed(true);
      });
  };
  // console.log(props);
  if (redirect) {
    if (!props.from) {
      return <Redirect to="/" />;
    } else {
      return <Redirect to={props.from} />;
    }
  }
  let err = "";
  if (failed) {
    err = <Container>Login Failed</Container>;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="logo" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography>{err}</Typography>
          <Grid component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid item>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/signup"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
