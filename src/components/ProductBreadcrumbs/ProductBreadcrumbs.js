import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const ProductBreadcrumbs = ({ shortName }) => {
  const classes = useStyles();

  return (
    <Breadcrumbs
      className={classes.breadcrumbs}
      separator="›"
      aria-label="breadcrumb"
    >
      <Link to="/" className={classes.link}>
        <Typography color="initial">Golden Shoe</Typography>
      </Link>
      <Link to="/products" className={classes.link}>
        <Typography color="inherit">Product</Typography>
      </Link>
      <Typography color="textPrimary">{shortName}</Typography>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
