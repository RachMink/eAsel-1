import React from "react";
import Card from "@material-ui/core/Card";
import {
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "2",
  },
}));

export default function ArtistName({ artist, picture }) {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea href={`/ArtistPage/?id=${artist.id}`}>
        <CardMedia
          component="img"
          height="160"
          image={artist.profilePic}
          alt="artist profile"
        />
        <CardContent className={classes.content}>
          <Typography variant="h6" component="span">
            {artist.firstName} {artist.lastName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
