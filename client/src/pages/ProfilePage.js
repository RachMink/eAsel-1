import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  Avatar,
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Container,
  TextField,
  FormLabel,
  IconButton,
  Button,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import PinterestIcon from "@material-ui/icons/Pinterest";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import PhotoGallery from "../components/PhotoGallery";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
// import Stack from "@material-ui/core/Stack";

//include edit option- make this a form? to send edits to database.

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Container>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  avatar: {
    margin: 20,
    width: 150,
    height: 150,
  },
}));

function ProfilePage(props) {
  //so , we need to make a profile page which shows the user profile if they're logged in,
  //otherwise shows the login page.
  //so if the userid is empty then it displays the login page, otherwise it displays the userprofile- from the userid feature in the
  //db.
  const params = new URLSearchParams(window.location.search);
  const tab = parseInt(params.get("tab")) - 1;
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [value, setValue] = useState(tab || 0);
  const [soldArtworks, setSoldArtworks] = useState([]);
  const [purchasedArtworks, setPurchasedArtworks] = useState([]);
  const [likedArtworks, setLikedArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState("panel1");
  const [socials, setSocials] = useState({});
  const [profilePic, setProfilePic] = useState(auth.user.profilePic);
  const handleAccordionChange = () => (event, isExpanded) => {
    setExpandedPanel(expandedPanel === "panel2" ? "panel1" : "panel2");
  };
  const getSoldArtworks = () => {
    setLoading(true);
    fetch("/api/artworks/sold")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        getArtworksData(data, setSoldArtworks);
      });
    setLoading(false);
  };
  const getArtworksData = async (data, fn) => {
    let list = [];
    for (let item of data) {
      const res = await fetch(`/api/artworks/${item.artworkId}`);
      const data = await res.json();
      if (res.ok) {
        list.push(data);
      }
    }
    fn(list);
  };
  const getPurchasedArtworks = async () => {
    setLoading(true);
    await fetch("/api/artworks/purchased")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        getArtworksData(data, setPurchasedArtworks);
      });
    setLoading(false);
  };
  const getLikedArtworks = async () => {
    setLoading(true);
    await fetch("/api/liked")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        getArtworksData(data, setLikedArtworks);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  const getSocials = () => {
    fetch("/api/users/socials/" + auth.user.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setSocials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSoldArtworks();
    getPurchasedArtworks();
    getLikedArtworks();
  }, []);
  if (auth.user && Object.entries(socials).length === 0) {
    getSocials();
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleUriChange = (value) => {
    setProfilePic(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(e.currentTarget)
    const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    const formValues = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      city: data.get("city"),
      bio: data.get("bio"),
      state: data.get("state"),
      profilePic: profilePic,
      zipcode: data.get("zipcode"),
      instagram: data.get("instagram"),
      pinterest: data.get("pinterest"),
      linkedin: data.get("linkedin"),
      facebook: data.get("facebook"),
      twitter: data.get("twitter"),
    };
    console.log(formValues);
    await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        getSocials();
      })
      .catch((err) => {});
    setLoading(false);
  };
  if (loading) {
    return <Typography>Loading...</Typography>;
  } else if (!auth.isAuthenticated) {
    return <LoginForm from="/profile" />;
  } else {
    return (
      <Container
        disablegutters="true"
        // xs={12}
        className={classes.root}
      >
        <Grid
          container
          spacing={3}
          disablegutters="true"
          justifyContent="center"
        >
          <IconButton>
            <Avatar
              alt="profile pic"
              src={auth.user.profilePic}
              className={classes.avatar}
            />
          </IconButton>
          <TabPanel value={value} index={0}>
            <Grid component="form" noValidate onSubmit={handleSubmit}>
              <Grid
                container
                spacing={5}
                alignItems="center"
                justifyContent="center"
              >
                {/* <Typography>Edit Profile</Typography> */}
                <Grid xs={12}>
                  <Accordion
                    expanded={expandedPanel === "panel1"}
                    onChange={handleAccordionChange()}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Personal Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item xs={12}>
                          <TextField
                            label="First Name:"
                            id="firstName"
                            name="firstName"
                            fullWidth
                            defaultValue={`${auth.user.firstName}`}
                          ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Last Name:"
                            id="lastName"
                            name="lastName"
                            fullWidth
                            defaultValue={`${auth.user.lastName}`}
                          ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="State:"
                            id="state"
                            name="state"
                            fullWidth
                            defaultValue={`${auth.user.state}`}
                          ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Zip Code:"
                            id="zipcode"
                            name="zipcode"
                            fullWidth
                            defaultValue={`${auth.user.zipcode}`}
                          ></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="City:"
                            id="city"
                            name="city"
                            fullWidth
                            defaultValue={`${auth.user.city}`}
                          ></TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            minRows={3}
                            multiline
                            label="Bio:"
                            id="bio"
                            name="bio"
                            fullWidth
                            defaultValue={`${auth.user.bio}`}
                          ></TextField>
                        </Grid>
                        <Button type="submit">Submit</Button>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                {!loading && Object.entries(socials).length !== 0 && (
                  <Grid>
                    <Accordion
                      expanded={expandedPanel === "panel2"}
                      onChange={handleAccordionChange()}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Social Media</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid
                          container
                          spacing={0}
                          alignItems="center"
                          justifyContent="center"
                        >
                          {Object.entries(socials)
                            .slice(1, 6)
                            .map((item) => {
                              return (
                                <Grid item xs={12} key={item[0]}>
                                  <TextField
                                    label={`${
                                      item[0][0].toUpperCase() +
                                      item[0].slice(1)
                                    }:`}
                                    id={item[0]}
                                    name={item[0]}
                                    fullWidth
                                    defaultValue={`${item[1] || ""}`}
                                  ></TextField>
                                </Grid>
                              );
                            })}

                          <Button type="submit">Submit</Button>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Typography>Artworks Sold</Typography>
            <PhotoGallery artwork={soldArtworks} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography>Artworks Purchased</Typography>
            <PhotoGallery artwork={purchasedArtworks} />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Typography>Artworks Liked</Typography>
            <PhotoGallery artwork={likedArtworks} />
          </TabPanel>
        </Grid>
        <Grid container spacing={5}>
          <AppBar className={classes.AppBar} position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="PROFILE" {...a11yProps(0)} />
              <Tab label="SOLD" {...a11yProps(1)} />
              <Tab label="BOUGHT" {...a11yProps(2)} />
              <Tab label="LIKED" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
        </Grid>
      </Container>
    );
  }
}

export default ProfilePage;
