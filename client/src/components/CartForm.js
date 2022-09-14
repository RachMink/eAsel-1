import {
  Typography,
  Button,
  Grid,
  Box,
  Container,
  createTheme,
  IconButton,
  Snackbar,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import { Redirect } from "react-router";
import CustomSnackBar from "./CustomSnackBar";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  alert: {
    color: "black",
    backgroundColor: "#4bb543",
    fontSize: "16px",
    borderRadius: "5px",
    padding: "10px",
    fontFamily: "Roboto Condensed",
  },
}));
export default function CartForm(props) {
  const auth = useContext(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackError, setSnackError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  //opens confirm checkout dialog
  const handleClickOpen = () => {
    if (artworks.length === 0) {
      setSnackError(true);
      setSnackMessage("Nothing to checkout...");
      handleClose();
      setSnackOpen(true);
      return;
    }
    setOpen(true);
  };

  //closes confirm checkout dialog
  const handleClose = () => {
    setOpen(false);
  };

  //closes snackbar
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const getCarts = async () => {
    fetch("/api/carts")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // console.log("FAILED");
      })
      .then(async (data) => {
        await getArtworks(data);
      })

      .catch((err) => {
        // console.log(err);
      });
  };
  const getArtworks = async (data) => {
    let urllist = [];
    let total = 0;
    for (let item of data) {
      const response = await fetch(`/api/artworks/${item.artworkId}`);
      const json = await response.json();
      urllist.push(json);
      //should we setTotalPrice(totalPrice + {json.price}) here?
      total += json.price;
    }
    setArtworks(urllist);
    setTotalPrice(total);
  };

  useEffect(() => {
    getCarts();
  }, []);
  const decrementPrice = (id) => {
    for (let item of artworks) {
      if (item.id === id) {
        setTotalPrice(totalPrice - item.price);
      }
    }
  };

  function deleteItem(id) {
    setLoading(true);
    fetch(`/api/carts/${id}`, {
      method: "DELETE",
    }).then(() => {
      getCarts();
    });
    decrementPrice(id);
    setSnackError(false);
    setSnackMessage("Successfully Deleted Artwork");
    setSnackOpen(true);
    setLoading(false);
  }
  function handleCheckout() {
    setLoading(true);
    fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setLoading(false);
    });
    setRedirect(true);
    setSnackError(true);
    setSnackMessage("Successfully Checked Out!");
    setSnackOpen(true);
  }
  // console.log(artworks)
  if (!auth.isAuthenticated && !loading) return <LoginForm from="/cart" />;
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" spacing={3}>
        <Box
          sx={{
            // m: 1,
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid>
            <Typography>Qty:{artworks.length}</Typography>
          </Grid>
          <Grid>
            <Typography>Total:${totalPrice}</Typography>
          </Grid>
          <Grid
            justifyContent="center"
            alignItems="center"
            container
            spacing={4}
          >
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen}>
                Checkout
              </Button>
              {/* confirm checkout Dialog */}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to checkout?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Please consider this purchase before buying as products
                    cannot be returned.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    No
                  </Button>
                  <Button onClick={handleCheckout} color="primary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

            {artworks.map((artwork) => {
              // console.log(artwork)
              return (
                <Grid item xs={12} key={artwork.id}>
                  <Grid
                    justifyContent="center"
                    alignItems="center"
                    variant="outlined"
                    container
                    direction="column"
                  >
                    <img width="100%" src={artwork.uri} alt="cart item" />
                    <Typography>${artwork.price}</Typography>
                    <Typography>{artwork.title}</Typography>
                    <IconButton onClick={() => deleteItem(artwork.id)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <CustomSnackBar
          open={snackOpen}
          message={snackMessage}
          close={handleSnackClose}
          error={snackError}
        />
      </Container>
    </ThemeProvider>
  );
}
