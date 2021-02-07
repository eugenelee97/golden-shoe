import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage: "url('./images/hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(48, 0, 4),
  },
  heroText: {
    background: theme.palette.common.black,
    padding: theme.spacing(2),
    display: "flex",
  },
  heroTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
  },
  heroBtnLink: {
    textDecoration: "none",
    color: theme.palette.common.black,
    fontSize: "18px",
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Grid container>
        <Grid item className={classes.heroText}>
          <Typography component="h1" variant="h4" className={classes.heroTitle}>
            BRAND NEW STYLES
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Hero;
