import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Dialog,
  ListItemText,
  List,
  ListItem,
  Typography,
  Collapse,
  Slide,
  ListItemIcon,
  makeStyles,
  IconButton,
} from "@material-ui/core";
// import Snackbar from '@material-ui/core/Snackbar';
import React, { useEffect, useContext, useState } from "react";
// import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Loading from "../components/Loading";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { AuthContext } from "../context/AuthContext";
import CustomSnackBar from "../components/CustomSnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "auto",
    height: "auto",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  checkIcon: {
    minWidth: "40px",
  },
  alert: {
    color: "black",
    backgroundColor: "#4bb543",
    fontSize: "16px",
    borderRadius: "5px",
    padding: "10px",
    fontFamily: "Roboto Condensed",
  },
  like: {
    position: "absolute",
    right: theme.spacing(3),
    font: "large",
    //top: theme.spacing(0),
  },
}));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="outline" {...props} />;
// }
function BuyHomePage(props) {
  console.log(props.location.state);
  //get id of user so we can add the specific artwork to user's cart - does this get the artist of the artwork's id? or the person using the app's id
  // const params = new URLSearchParams(window.location.search);
  // const id = params.get("id");
  // const auth = useContext(AuthContext);
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [artwork, setArtwork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedArtworks, setLikedArtworks] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  if (typeof props.location.state !== "undefined") {
    setSnackMessage(props.location.state.snackMessage);
    setSnackOpen(true);
    props.location.state = undefined;
  }
  const changeColor = () => {
    color === "" ? setColor("red") : setColor("");
  };
  const toggleLike = (artworkid) => {
    let method = "";
    let additional = "";
    let headers = {};
    let body = "";
    if (color === "") {
      method = "POST";
      additional = "/new";
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify({ artworkid });
    } else {
      method = "DELETE";
      additional = `/${artworkid}`;
      // headers = {};
    }
    fetch(`/api/liked${additional}`, {
      method,
      headers,
      body,
    }).then((res) => {
      if (res.ok) {
        getLikedArtworks();
        changeColor();
      }
    });
  };
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
    setSnackMessage("");
  };
  const handleClickOpen = (tile) => {
    // console.log(tile.id);
    setSelectedTile(tile);
    for (let item of likedArtworks) {
      if (item.artworkId === tile.id) {
        changeColor();
      }
    }
    // console.log("clicked");
    // console.log(tile);
  };

  const handleClose = () => {
    setColor("");
    setSelectedTile(null);
    setOpen(false);
  };

  const getLikedArtworks = () => {
    // console.log("hi")
    // setLoading(false);
    fetch("/api/liked")
      .then((res) => {
        if (res.ok) {
          // console.log("hi")
          return res.json();
        }
      })
      .then((data) => {
        if (!data) {
          // console.log("hi")
          setLikedArtworks([]);
        } else {
          setLikedArtworks(data);
        }
        setLoading(false);
      });
  };

  const addToCart = () => {
    //add item to to specific user's cart
    // console.log("adding ", selectedTile);
    setOpen(false);
    // console.log(selectedTile.id);
    fetch(`/api/carts/${selectedTile.id}/new`, {
      //replace with user id from the
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedTile),
    })
      .then((res) => {
        if (res.ok) {
          // console.log("yay");
          return res.json();
        }
        // throw new Error('Content validation');
      })
      .catch((err) => {
        // console.log("Error:", err);
      });
    handleClose();
    setSnackOpen(true);
    setSnackMessage("Successfully added artwork to cart 🙂");
  };

  const descriptionOpen = () => {
    setOpen(!open);
  };

  const getArtworks = () => {
    fetch("/api/artworks")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (!data) {
          setArtwork([]);
        } else {
          setArtwork(data);
        }
      });
  };
  useEffect(() => {
    setLoading(true);
    getArtworks();
    getLikedArtworks();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (artwork.length === 0) {
    return (
      <Container>
        <Typography>No Items for sale..</Typography>
      </Container>
    );
  }
  return (
    <div className={classes.root}>
      <ImageList cols={1} className={classes.gridList}>
        {artwork.map((tile) => (
          <ImageListItem key={tile.id} onClick={() => handleClickOpen(tile)}>
            <img src={tile.uri} alt={tile.uri} />
            <ImageListItemBar
              title={tile.title}
              subtitle={<span>by: {tile.artistName}</span>} //how to get artistName according to artwork...
            />
          </ImageListItem>
        ))}
      </ImageList>
      {/* <CustomDialog open={selectedTile !== null} onClose={handleClose} selectedTile={selectedTile} > */}
      <Dialog
        open={selectedTile !== null}
        onClose={handleClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexWrap: "wrap",
        }}
        // TransitionComponent={Transition}
        // style={{ overflow: "scroll" }}
      >
        {selectedTile && (
          <img
            style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }}
            src={selectedTile.uri}
            alt={selectedTile.title}
          />
        )}
        {selectedTile && (
          <DialogTitle id="scroll-dialog-title">
            {auth.isAuthenticated && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span>{selectedTile.title}</span>
                <IconButton
                  style={{ color: color }}
                  onClick={() => toggleLike(selectedTile.id)}
                  className={classes.like}
                >
                  <FavoriteIcon />
                </IconButton>
              </div>
            )}
            <Typography variant="subtitle2">
              {selectedTile.artistName}
            </Typography>
            <Typography variant="subtitle2">
              {"$"}
              {selectedTile.price}
              {".00"}
            </Typography>
          </DialogTitle>
        )}{" "}
        {selectedTile && (
          <DialogContent
            style={{ overflow: "scroll-view" }}
            id="scroll-dialog-description"
          >
            <List disablepadding="true" disablegutters="true" dense={true}>
              <ListItem
                alignItems="flex-start"
                disablepadding="true"
                disablegutters="true"
              >
                <ListItemIcon className={classes.checkIcon}>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Genre:" secondary={selectedTile.genre} />
              </ListItem>

              <ListItem
                button
                onClick={descriptionOpen}
                alignItems="flex-start"
                disablepadding="true"
                disablegutters="true"
              >
                <ListItemIcon className={classes.checkIcon}>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Description:" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablepadding="true">
                  <ListItem button sx={{ pl: 4 }}>
                    <Typography>{`${selectedTile.description}`}</Typography>
                  </ListItem>
                </List>
              </Collapse>

              <ListItem disablepadding="true" disablegutters="true">
                <ListItemIcon className={classes.checkIcon}>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dimensions(in):"
                  secondary={`${selectedTile.dimensionX} x ${selectedTile.dimensionY} x ${selectedTile.dimensionZ}`}
                />
              </ListItem>
            </List>
          </DialogContent>
        )}{" "}
        {selectedTile && (
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              <CloseIcon />
              Go Back
            </Button>
            {auth.isAuthenticated && (
              <Button variant="outlined" onClick={addToCart}>
                <ShoppingCartIcon />
                Add to Cart
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>

      <CustomSnackBar
        open={snackOpen}
        close={handleSnackClose}
        // classes={classes}
        message={snackMessage}
      />
    </div>
  );
}
export default BuyHomePage;
