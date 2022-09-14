import React, { useContext, useState } from "react";
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
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Logo from "../img/logo.png";
// import { AuthContext } from '../context/AuthContext';

const theme = createTheme();

function SignUpForm() {
  // const auth = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState(0);
  const [passEqual, setPassEqual] = useState(false);
  const [pass, setPass] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const formValues = {
      email: data.get("email"),
      password: data.get("password"),
      // passwordConfirm: data.get('confirmPassword'),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      city: data.get("city"),
      bio: data.get("bio"),
      profilePic: data.get("profilePic"),
      state: data.get("state"),
      zipcode: data.get("zipcode"),
      instagram: data.get("instagram"),
      pinterest: data.get("pinterest"),
      linkedin: data.get("linkedin"),
      facebook: data.get("facebook"),
      twitter: data.get("twitter"),
    };
    // if(formValues.profilePic === ''){
    //   formValues.profilePic = "www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
    // }
    setLoading(true);
    // setPassEqual(formValues.password === formValues.passwordConfirm);
    // passEqual &&

    await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          setFailed("Unsucessful Sign up");
        }
      })
      .then((data) => {
        if (data) {
          setRedirect(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setFailed(err);
        setLoading(false);
      });
  };

  const checkPassword = () => {
    if (pass === confirmPass && pass && confirmPass) {
      setPassEqual(true);
    } else {
      setPassEqual(false);
    }
  };
  const previousScreen = () => {
    setScreen(screen - 1);
  };
  const nextScreen = () => {
    setScreen(screen + 1);
  };
  let err = "";
  // !passEqual && (err = "Password Mismatch..");
  // if(auth.isAuthenticated){
  //   setRedirect(true);
  // }
  if (redirect) {
    return <Redirect to="/" />;
  }
  if (loading) {
    return <Typography>Loading..</Typography>;
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
            Sign up
          </Typography>
          <Typography>{failed}</Typography>
          <Typography>{err}</Typography>

          <Grid
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              {screen === 0 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      type="email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password (8 Minimum)"
                      type="password"
                      id="password"
                      onChange={(e) => {
                        setPass(e.currentTarget.value);
                      }}
                      autoComplete="new-password"
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPass"
                      label="Confirm Password"
                      type="password"
                      id="confirmPass"
                      onChange={e => {
                        setConfirmPass(e.currentTarget.value)
                        
                      }}
                      autoComplete="new-password"
                    />
                  </Grid> */}
                  {/* {
                    !passEqual && <Typography>Complete Info to continue...</Typography>
                  }
                  {
                    passEqual && <Button onClick={nextScreen}>Next</Button>
                  } */}
                  {}
                </>
              )}
              {screen === 1 && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="city"
                      name="city"
                      label="City"
                      type="text"
                      autoComplete="address-level2"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="state"
                      name="state"
                      label="State"
                      type="text"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="zipcode"
                      name="zipcode"
                      label="ZipCode"
                      type="text"
                      autoComplete="postal-code"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="profilePic"
                      name="profilePic"
                      label="Profile Pic"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="bio"
                      name="bio"
                      label="Personal Bio"
                      type="text"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Button onClick={previousScreen}>Go Back</Button>
                  <Button onClick={nextScreen}>Next</Button>
                </>
              )}

              {screen === 2 && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="url"
                      name="pinterest"
                      label="Pinterest"
                      id="pinterest"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="url"
                      name="twitter"
                      label="Twitter"
                      id="twitter"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="url"
                      name="instagram"
                      label="Instagram"
                      id="instagram"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="url"
                      name="facebook"
                      label="Facebook"
                      id="facebook"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="url"
                      name="linkedin"
                      label="LinkedIn"
                      id="linkedin"
                    />
                  </Grid>

                  <Grid container justifyContent="center" alignContent="center">
                    <Button onClick={previousScreen}>Go Back</Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      // sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </>
              )}
              <Grid container justifyContent="center" alignContent="center">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/Login"
                  variant="contained"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignUpForm;
