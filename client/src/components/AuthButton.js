import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Grid } from "@material-ui/core";

const AuthButton = withRouter(({ history }) => {
  const auth = useContext(AuthContext);
  if (!auth.isAuthenticated) {
    return (
      <Button
        style={{ marginLeft: "10px", borderColor: "#7e57c2" }}
        variant="outlined"
        href="/login"
      >
        Log In
      </Button>
    );
  }
  const logout = () => {
    auth.signout().then(() => history.push("/"));
  };
  return (
    <Grid container>
      <Grid item>
        {/* <Typography style={{fontFamily: "Roboto Condensed"}}>Welcome { auth.user.firstName }</Typography> */}
        <Button
          style={{ marginLeft: "10px", borderColor: "#7e57c2" }}
          variant="outlined"
          onClick={logout}
        >
          {" "}
          Log Out
        </Button>
      </Grid>
    </Grid>
  );
});

export default AuthButton;
