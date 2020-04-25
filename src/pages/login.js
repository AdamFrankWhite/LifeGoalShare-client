import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class LogIn extends Component {
  constructor(props) {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange(e) {
    let changeProp = e.target.name;
    this.setState({ [changeProp]: e.target.value });
  }
  handleLogin(e) {
    console.log(this.state.username, this.state.password);
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((data) => {
        console.log(data.data.token);
        if (data.data.token) {
          this.setState({
            sessionToken: data.data.token,
            loggedIn: true,
            isAuthenticated: true,
          });
          window.localStorage.setItem("access_token", data.data.token);
          axios
            .get("http://localhost:5000/users/profile/get", {
              headers: {
                Authorization: data.data.token,
              },
            })
            .then((data) => {
              console.log(data.data);
              this.setState({ userData: data.data, redirect: "dashboard" });
            });
        } else {
          //Error
        }
      });
  }

  handleLogout() {
    this.setState({
      loggedIn: false,
      username: "",
      userData: null,
      sessionToken: "",
      redirect: "",
      isAuthenticated: false,
    });
    window.localStorage.clear();

    //TODO - redux reducer
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={this.handleLogin} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={this.state.username}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(LogIn);
