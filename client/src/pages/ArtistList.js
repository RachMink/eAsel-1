import React from "react";
import { Grid } from "@material-ui/core";
import ArtistName from "../components/ArtistName";
import Loading from "../components/Loading";

class ArtistList extends React.Component {
  state = {
    loading: true,
    artists: [],
    notFound: false,
  };

  componentDidMount() {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState((prevState) => ({
          artists: [...prevState.artists, ...data],
          loading: false,
        }));
      })
      .catch((err) => {
        this.setState({
          notFound: true,
        });
      });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Grid container rowSpacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          {/* add key  */}
          {this.state.artists.map((artist) => {
            return <ArtistName artist={artist} />;
          })}
        </Grid>
      </Grid>
    );
  }
}

export default ArtistList;
