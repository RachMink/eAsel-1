import { Grid } from "@material-ui/core";
import React from "react";
import AboutTheArtist from "../components/AboutTheArtist";
import PhotoGallery from "../components/PhotoGallery";

class ArtistPage extends React.Component {
  state = {
    artist: {},
    socials: {},
    artwork: [],
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // include artistId in fetch call
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          artist: Object.assign(data),
        })
      )
      .catch((err) => {
        this.setState({
          notFound: true,
        });
      });

    //include userId endpoint in the fetch call
    fetch(`/api/users/socials/${id}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          socials: data,
        })
      )
      .catch((err) => {
        this.setState({
          notFound: true,
        });
      });

    fetch(`/api/users/${id}/artworks`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          artwork: [...this.state.artwork, ...data],
        });
      })
      .catch((err) => {
        this.setState({
          notFound: true,
        });
      });
  }

  render() {
    return (
      <Grid>
        <AboutTheArtist
          artist={this.state.artist}
          socials={this.state.socials}
        />
        {/* send prop to photoGallery thats an array of all artist artwork?  */}
        <PhotoGallery artwork={this.state.artwork} />
      </Grid>
    );
  }
}

export default ArtistPage;
