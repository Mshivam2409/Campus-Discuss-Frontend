// @flow
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Avatar,
  Typography,
  // LinearProgress,
} from "@material-ui/core";
import { indigo, blueGrey, grey } from "@material-ui/core/colors";
import { Screen } from "../utils";
import { useSelector } from "react-redux";
import { userProfile } from "../../redux/selectors";

const useStyles = makeStyles((theme) => {
  const dark = theme.palette.type === "dark";
  return {
    outer: {
      height: "100%",
      backgroundColor: dark ? grey["900"] : blueGrey["50"],
      borderRadius: 0,
    },
    root: {
      padding: 10,
      margin: 10,
    },
    details: {
      display: "flex",
    },
    avatar: {
      marginLeft: "auto",
      height: 110,
      width: 100,
      flexShrink: 0,
      flexGrow: 0,
    },
    progress: {
      marginTop: "2px",
    },
    uploadButton: {
      marginRight: "2px",
    },
    uploadText: {
      color: dark ? indigo["400"] : indigo["600"],
    },
    submitButton: {
      backgroundColor: dark ? indigo["900"] : indigo["600"],
      color: dark ? blueGrey["100"] : blueGrey["50"],
    },
    profile2: {
      height: 1100,
      width: 800,
    },
  };
});

type Props = {
  name: string,
  userName: string,
  mail: string,
  fbLink: string,
  followers: number,
  following: number,
  hall: number,
};

const Profile = (props: Props) => {
  const dpInput = React.useRef<HTMLInputElement | null>(null);
  const profile = useSelector(userProfile);

  const classes = useStyles();

  //Handle change in text fields and update profile completeness

  // const [completenessIndex, setCompletenessIndex] = useState(0);

  const handleChange = (event) => {
    // setValues({
    //   ...values,
    //   [event.target.name]: event.target.value,
    // });
    // var count = 0;
    // for (var key in values) {
    //   if (values[key]) {
    //     count++;
    //   }
    // }
    // setCompletenessIndex(parseInt((count * 100) / 6));
  };

  //Defined functions for Profile Image upload
  const [avatar, setAvatar] = useState({ selectedFile: null });

  const triggerInput = () => {
    if (!dpInput.current) return;
    dpInput.current.click();
  };

  const fileSelectedHandler = (event) => {
    setAvatar({ selectedFile: URL.createObjectURL(event.target.files[0]) });
    uploadHandler();
  };

  const uploadHandler = () => {
    console.log(avatar.selectedFile);
  };

  const removeImage = () => {
    setAvatar({ selectedFile: null });
  };

  const handleSave = () => {
    alert("Details saved!");
  };

  const halls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((val) => {
    return {
      value: val,
      label: "Hall " + val,
    };
  });

  return (
    <React.Fragment>
      <Card className={classes.outer}>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={6} lg={4} xl={4} xs={12}>
              <Card>
                <CardContent>
                  <div className={classes.details}>
                    <div>
                      <Typography gutterBottom variant="h4">
                        {profile.name}
                        <Typography>{<i>{profile.username}</i>}</Typography>
                      </Typography>
                      <Typography color="textSecondary" variant="body1">
                        Following: {profile.following}
                      </Typography>
                      {/* <Typography color="textSecondary" variant="body1">
                        Followers: {profile.followers}
                      </Typography> */}
                    </div>
                    <Avatar
                      className={classes.avatar}
                      src={avatar.selectedFile}
                    />
                  </div>
                  {/* <div className={classes.progress}>
                    <Typography variant="body1">
                      Profile Completeness: {completenessIndex}%
                    </Typography>
                    <LinearProgress
                      value={completenessIndex}
                      variant="determinate"
                    />
                  </div> */}
                </CardContent>
                <Divider />
                <CardActions>
                  <div>
                    <label htmlFor="dpInput">
                      <Button
                        className={classes.uploadButton}
                        color="primary"
                        variant="text"
                        onClick={triggerInput}
                      >
                        <Typography className={classes.uploadText}>
                          Upload Picture
                        </Typography>
                      </Button>
                    </label>
                    <input
                      id="dpInput"
                      style={{ display: "none" }}
                      type="file"
                      onChange={fileSelectedHandler}
                      ref={dpInput}
                    />
                  </div>
                  <Button variant="text" onClick={removeImage}>
                    Remove picture
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item md={6} xs={12} xl={8} lg={8}>
              <Card>
                <form autoComplete="off" noValidate>
                  <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Name"
                          margin="dense"
                          name="name"
                          value={profile.name}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Username"
                          margin="dense"
                          name="userName"
                          value={profile.username}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="IITK Email Address"
                          helperText="Please specify your IITK mail ID"
                          margin="dense"
                          name="email"
                          onChange={handleChange}
                          required
                          value={profile.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Facebook ID"
                          margin="dense"
                          name="fblink"
                          helperText="e.g.https://www.facebook.com/kartikeya.gupta.750 "
                          onChange={handleChange}
                          required
                          type="url"
                          value={profile.fblink}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Hall of Residence"
                          margin="dense"
                          name="hall"
                          onChange={handleChange}
                          required
                          select
                          // eslint-disable-next-line react/jsx-sort-props
                          SelectProps={{ native: true }}
                          value={profile.hall}
                          variant="outlined"
                        >
                          {halls.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="primary"
                      className={classes.submitButton}
                      variant="contained"
                      onClick={handleSave}
                    >
                      Save details
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Card>
    </React.Fragment>
  );
};

const ProfileScreen = () => {
  return (
    <Screen
      title={"Profile"}
      renderMain={() => (
        <Profile
          name="John Doe"
          mail="john@iitk.ac.in"
          userName="Johnny"
          fbLink="something"
          followers={24}
          following={11}
          hall={2}
        />
      )}
    />
  );
};

export default ProfileScreen;
