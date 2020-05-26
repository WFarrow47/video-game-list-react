import React from "react";

import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link
        color="inherit"
        href="https://github.com/WFarrow47/video-game-list-react"
      >
        William Farrow (MIT License)
      </Link>
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        <Link color="inherit" href="https://wfarrow.dev/">
          William Farrow
        </Link>
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Data sourced from:{" "}
        <a href="https://rawg.io/" rel="noopener noreferrer">
          https://rawg.io/
        </a>
        <br />
        Material UI theme:{" "}
        <a href="https://material-ui.com/" rel="noopener noreferrer">
          https://material-ui.com/
        </a>
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
