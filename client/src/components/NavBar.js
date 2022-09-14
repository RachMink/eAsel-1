import React, { useState, useContext } from "react";

import { AppBar, Toolbar, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../img/logo.png";

import {
  IconButton,
  Link,
  Container,
  Hidden,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  Badge,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRightSharp";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AuthButton from "./AuthButton";
import { AuthContext } from "../context/AuthContext";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
    backgroundSize: "cover",
    marginBottom: 3,
  },
  link: {
    marginRight: "20px",
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    flexGrow: 1,
    maxWidth: 80,
    marginRight: "auto",
  },
}));

const Navbar = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);
  let navigationLinks;
  if (auth.isAuthenticated) {
    navigationLinks = [
      { name: "Artists", href: "/artistlist" },
      { name: "Sell", href: "/sellwithus" },
      { name: "Liked", href: "/profile?tab=4" },
      {
        name: (
          <Badge color="secondary" variant="dot">
            <ShoppingCartOutlinedIcon />
          </Badge>
        ),
        href: "/cart",
      },
    ];
  } else {
    navigationLinks = [{ name: "Artists", href: "/artistlist" }];
  }
  return (
    <AppBar elevation={0} className={styles.appbar}>
      <Container maxWidth="md">
        <Toolbar>
          <Grid item>
            <Link href="/">
              <img src={logo} alt="logo" className={styles.logo} />
            </Link>
          </Grid>
          <Grid
            alignItems="center"
            justifyContent="flex-end"
            container
            // spacing={12}
          >
            {!auth.isAuthenticated && <AuthButton />}
            <Hidden xsDown>
              {navigationLinks.map((item) => (
                <Link
                  className={styles.link}
                  color="textPrimary"
                  variant="button"
                  underline="none"
                  href={item.href}
                  key={item.name}
                >
                  {item.name}
                </Link>
              ))}
              {/* <AuthButton /> */}
            </Hidden>

            <Grid item>
              {auth.isAuthenticated && (
                <>
                  <IconButton
                    color="secondary"
                    href={"/profile"} //get ModalDialog to open when pressing the customer icon
                  >
                    <AccountCircleOutlinedIcon fontSize="large" />
                  </IconButton>
                </>
              )}
            </Grid>

            <Grid item>
              <Hidden smUp>
                <IconButton onClick={() => setOpen(true)}>
                  <MenuIcon fontSize="large" color="secondary" />
                </IconButton>
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div
          onClick={() => setOpen(false)}
          onKeyPress={() => setOpen(false)}
          role="button"
          tabIndex={0}
        >
          <IconButton>
            <ChevronRightIcon color="secondary" />
          </IconButton>
        </div>

        <Divider />

        <List>
          {auth.isAuthenticated && <AuthButton />}

          {
            // auth.isAuthenticated ?
            navigationLinks.map((item) => (
              <ListItem key={item.name}>
                <Link
                  className={styles.link}
                  color="textPrimary"
                  variant="button"
                  underline="none"
                  href={item.href}
                >
                  {item.name}
                </Link>
              </ListItem>
            ))
            //     :
            // <ListItem >
            //     <Link
            //         className={styles.link}
            //         color="textPrimary"
            //         variant="button"
            //         underline="none"
            //         href={navigationLinks[0].href}
            //     >
            //         {navigationLinks[0].name}
            //     </Link>

            // </ListItem>
          }
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
};
export default Navbar;
