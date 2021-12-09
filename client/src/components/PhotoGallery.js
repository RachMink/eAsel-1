import React from 'react';
import { Grid } from '@material-ui/core';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

class PhotoGallery extends React.Component {
    render() {
        return (
          //two columns for screen sizes between 350 and 750 etc. 
          <Grid>
              <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 4} } 
                >
                    <Masonry gutter="10px">
                        {this.props.artwork.map((image, i) => (
                            <img
                                key={i}
                                src={image.uri}
                                style={{width: "100%", display: "block"}}
                                alt=" "
                            />
                        ))}
                    </Masonry>
                    </ResponsiveMasonry>
          </Grid>
        )
    }
}
export default PhotoGallery;