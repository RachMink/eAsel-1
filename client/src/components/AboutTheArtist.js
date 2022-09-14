import {
  Avatar,
  Divider,
  IconButton,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import PinterestIcon from "@material-ui/icons/Pinterest";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  socials: {
    paddingBottom: 10,
  },
  artist: {
    padding: 4,
    fontFamily: "Roboto Condensed",
  },
  avatar: {
    margin: 20,
    width: 200,
    height: 200,
    // flexGrow: 1
  },
}));

export default function AboutTheArtist(props) {
  const { artist, socials } = props;
  const classes = useStyles();
  return (
    <Grid justifyContent="center" alignContent="center" container>
      <Grid item>
        <Avatar
          className={classes.avatar}
          alt="profilepic"
          src={artist.profilePic}
        />
      </Grid>
      <Grid container justifyContent="center" alignContent="center">
        <Typography component={"div"} variant={"h4"}>
          {artist.firstName} {artist.lastName}
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignContent="center">
        <Typography component={"div"} variant={"h5"}>
          {artist.city}, {artist.state}
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignContent="center">
        <Typography component={"div"}>{artist.bio}</Typography>
      </Grid>
      {/* <h3 className={classes.artist}> {artist.city}, {artist.state}</h3>
                <h4 className={classes.artist}>{artist.bio}</h4> */}
      <div className={classes.socials}>
        <Divider />
        {/* {
                    socials.instagram !== "" && (
                        <IconButton href={socials.instagram} target="_blank">
                            <InstagramIcon fontSize="large"/>
                        </IconButton>
                    )
                }
                {
                  socials.facebook !== "" && (
                        <IconButton href={socials.facebook} target="_blank">
                            <FacebookIcon fontSize="large"/>
                        </IconButton>
                    )  
                }
                 {
                  socials.pinterest !== "" && (
                        <IconButton href={socials.pinterest} target="_blank">
                            <PinterestIcon fontSize="large"/>
                        </IconButton>
                    )  
                }
                 {
                  socials.linkedin !== "" && (
                        <IconButton href={socials.linkedin} target="_blank">
                            <LinkedInIcon fontSize="large"/>
                        </IconButton>
                    )  
                }
                 {
                  socials.twitter !== "" && (
                        <IconButton href={socials.twitter} target="_blank">
                            <TwitterIcon fontSize="large"/>
                        </IconButton>
                    )  
                } */}
        <IconButton href={socials.instagram} target="_blank">
          <InstagramIcon fontSize="large" />
        </IconButton>
        <IconButton href={socials.facebook} target="_blank">
          <FacebookIcon fontSize="large" />
        </IconButton>

        <IconButton href={socials.pinterest} target="_blank">
          <PinterestIcon fontSize="large" />
        </IconButton>

        <IconButton href={socials.linkedin} target="_blank">
          <LinkedInIcon fontSize="large" />
        </IconButton>

        <IconButton href={socials.twitter} target="_blank">
          <TwitterIcon fontSize="large" />
        </IconButton>

        <Divider />
      </div>
    </Grid>
  );
}
