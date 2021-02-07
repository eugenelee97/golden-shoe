import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    background: "#242424",
    color: "#fff",
  },
  footerTitle: {
    fontFamily: "'Montserrat', sans-serif",
  },
  footerList: {
    listStyle: "none",
    paddingLeft: 0,
  },
  footerLink: {
    textDecoration: "none",
    color: theme.palette.common.white,
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Typography component="h3" className={classes.footerTitle}>QUICK LINKS</Typography>
            <ul className={classes.footerList}>
              <li><Link to="/faq/shipping" className={classes.footerLink}>Shipping</Link></li>
              <li>
                <Link to="/faq/refund" className={classes.footerLink}>Refunds</Link>
              </li>
              <li>
                <Link to="/faq/exchange" className={classes.footerLink}>Exchange</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography component="h3" className={classes.footerTitle}>CONTACT US</Typography>
            <ul className={classes.footerList}>
              <li>Mon - Fri</li>
              <li>9am - 5pm</li>
              <li>help@goldenshoe.com</li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography component="h3" className={classes.footerTitle}>FOLLOW US</Typography>
            <ul className={classes.footerList}>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
