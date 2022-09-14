import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Slider,
  Button,
  Typography,
  Radio,
  makeStyles,
} from "@material-ui/core";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import CustomSnackBar from "./CustomSnackBar";

const defaultValues = {
  error: false,
  success: false,
  title: "",
  artistName: "",
  description: "",
  dimensionX: 0,
  dimensionY: 0,
  dimensionZ: 0,
  genre: "",
  price: 10,
  uri: "",
  redirect: false,
};

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

const SellForm = () => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState(defaultValues);
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleUriChange = (value) => {
    setFormValues({
      ...formValues,
      uri: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/api/artworks/new", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
      // body: JSON.stringify({ content: formValues.json }),
    })
      .then((res) => {
        if (res.ok) {
          //PLEASE CHECK THAT THIS WORKS IN THE FRONT END
          //snack bar's open - yum :P
          setSnackOpen(true);
          return res.json();
        }
      })
      .then(() => {
        setFormValues({
          success: true,
          redirect: true,
        });
      })
      .catch((err) => {
        setFormValues({
          error: true,
          //replace all the data values with nothing?
        });
        console.error("Error:", err);
      });
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  if (formValues.redirect) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            snackMessage: "Successfully posted artwork for sale",
          },
        }}
      />
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        // alignItems="center"
        justifyContent="center"
        direction="column"
        spacing={3}
      >
        <Grid item>
          <Typography variant="h5">
            Tell us a bit about your artwork...
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="text"
            variant="outlined"
            value={formValues.name}
            onChange={handleInputChange}
            name="title"
            label="Name Of Artwork"
            fullWidth
            autoComplete="none"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="text"
            variant="outlined"
            value={formValues.name} //get name from db and input
            onChange={handleInputChange}
            name="artistName"
            label="Name Of Artist"
            fullWidth
            autoComplete="none"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="text"
            variant="outlined"
            value={formValues.name}
            onChange={handleInputChange}
            name="description"
            label="Description i.e. color, style"
            fullWidth
            multiline
            rows={4}
            autoComplete="none"
          />
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
            direction="row"
          >
            <Grid item xs={12}>
              <FormLabel>Dimensions (in.)</FormLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                variant="outlined"
                value={formValues.name}
                onChange={handleInputChange}
                name="dimensionX"
                autoComplete="none"
                required
              />
            </Grid>
            <FormLabel>x</FormLabel>
            <Grid item xs={3}>
              <TextField
                type="number"
                variant="outlined"
                value={formValues.name}
                onChange={handleInputChange}
                name="dimensionY"
                autoComplete="none"
                required
              />
            </Grid>
            <FormLabel>x</FormLabel>
            <Grid item xs={3}>
              <TextField
                type="number"
                variant="outlined"
                value={formValues.name}
                onChange={handleInputChange}
                name="dimensionZ"
                autoComplete="none"
                required
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Genre</FormLabel>
            <RadioGroup
              name="genre"
              value={formValues.name}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="contemporary"
                value="contemporary"
                control={<Radio size="small" />}
                label="Contemporary"
              />
              <FormControlLabel
                key="antique"
                value="antique"
                control={<Radio size="small" />}
                label="Antique"
              />
              <FormControlLabel
                key="pop-art"
                value="pop"
                control={<Radio size="small" />}
                label="Pop-Art"
              />
              <FormControlLabel
                key="abstract"
                value="abstract"
                control={<Radio size="small" />}
                label="Abstract"
              />
              <FormControlLabel
                key="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
                // make text box for this option - so user can fill in themselves
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <div style={{ width: "80vw" }}>
            <Typography>
              <FormLabel> Price: </FormLabel> ${formValues.price}
            </Typography>
            <Slider
              value={formValues.price}
              onChange={handleSliderChange("price")}
              defaultValue={10}
              valueLabelDisplay="auto"
              step={10}
              min={10}
              max={10000}
              marks={[
                {
                  value: 1,
                  label: "$10",
                },
                {
                  value: 5000,
                  label: "$5,000",
                },
                {
                  value: 10000,
                  label: "$10,000",
                },
              ]}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <CloudinaryUploadWidget changeUri={handleUriChange} />
        </Grid>

        <Grid item xs={12}>
          {/* <Grid container alignItems="center" spacing={1} direction="row">  */}
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            fontSize="large"
          >
            Submit
          </Button>
          {/* </Grid> */}
        </Grid>

        {/* why another grid item? retouch grid system here */}
        <Grid item></Grid>
      </Grid>
    </form>
  );
};

export default SellForm;
