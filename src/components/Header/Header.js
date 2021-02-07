import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

import ShoppingCartContext from "../../context/ShoppingCartContext";
import ShoppingCart from "../ShoppingCart";

const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontFamily: "'Quattrocento', sans-serif",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "28px",
    cursor: "pointer",
  },
  headerMenu: {
    marginLeft: "auto",
  },
}));

const Header = ({ history }) => {
  const classes = useStyles();
  const { cartItems, setShowCart } = useContext(ShoppingCartContext);

  const handleLogoClick = () => history.push("/");
  const handleCartClick = () => setShowCart(true);
  const handleSearchClick = () => history.push("/products");

  //calculate total cart items
  const numCartItems = Object.values(cartItems).reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  return (
    <>
      <AppBar color="transparent" variant="outlined" position="relative">
        <Toolbar>
          <Typography
            className={classes.headerTitle}
            variant="inherit"
            noWrap
            onClick={handleLogoClick}
          >
            Golden Shoe
          </Typography>
          <section className={classes.headerMenu}>
            <IconButton
              color="inherit"
              aria-label="Shopping Cart"
              onClick={handleCartClick}
            >
              <Badge color="primary" badgeContent={numCartItems}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Search"
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </IconButton>
          </section>
        </Toolbar>
      </AppBar>
      <ShoppingCart />
    </>
  );
};

export default withRouter(Header);
