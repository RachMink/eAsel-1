import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  DialogContent,
  ListItemIcon,
  ListItemText,
  DialogActions,
  Typography,
  Collapse,
  IconButton,
  Button,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AuthContext } from "../context/AuthContext";
export default function CustomDialog(props) {
  const {
    open,
    selectedTile,
    onClose,
    handleClose,
    addToCart,
    toggleLike,
    classes,
    descriptionOpen,
    color,
  } = props;
  const auth = useContext(AuthContext);
  return (
    <Dialog
      open={selectedTile != null}
      onClose={onClose}
      // TransitionComponent={Transition}
      style={{ overflow: "scroll" }}
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
          <Typography variant="subtitle2">{selectedTile.artistName}</Typography>
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
          <Button variant="outlined" onClick={addToCart}>
            <ShoppingCartIcon />
            Add to Cart
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
