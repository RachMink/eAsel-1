import React from "react";
import {
  Grid,
  Dialog,
  //  DialogActions, Button, IconButton, Modal, DialogTitle
} from "@material-ui/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import CloseIcon from "@material-ui/icons/Close";
class PhotoGallery extends React.Component {
  state = {
    selectedTile: null,
    open: false,
  };
  handleClickOpen = (tile) => {
    // console.log(tile.id);
    this.setState({
      selectedTile: tile,
      open: true,
    });
  };

  handleClose = () => {
    // console.log(this.selectedTile)
    this.setState({
      selectedTile: null,
      open: false,
    });
    // console.log(this.selectedTile)
  };
  //   const Transition = React.forwardRef(function Transition(props, ref) {
  //     return <Slide direction="up" ref={ref} {...props} />;
  //   });
  render() {
    const { selectedTile } = this.state;
    // console.log(selectedTile)
    return (
      //two columns for screen sizes between 350 and 750 etc.
      <Grid>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 4 }}>
          <Masonry gutter="10px">
            {this.props.artwork.map((image, i) => (
              <img
                onClick={() => this.handleClickOpen(this.props.artwork[i])}
                key={i}
                src={image.uri}
                style={{ width: "100%", display: "block" }}
                alt=" "
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <Dialog open={selectedTile !== null} onClose={this.handleClose}>
          {/*  */}
          {selectedTile && (
            <>
              {/* <DialogTitle style={{position: 'absolute'}}>
                   <IconButton variant="contained" onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                   </DialogTitle> */}
              <img
                style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }}
                src={selectedTile.uri}
                alt={selectedTile.title}
              />
            </>
          )}
        </Dialog>
      </Grid>
    );
  }
}
export default PhotoGallery;
