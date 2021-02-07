import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";

import ShoppingCartContext from "../../context/ShoppingCartContext";
import CartVoucher from "../CartVoucher";

const useStyles = makeStyles((theme) => ({
  cartCoupon: {
    textAlign: "center",
  },
  applyCouponBtn: {
    verticalAlign: "bottom",
  },
  deleteItemBtn: {
    alignSelf: "center",
    textAlign: "end",
  },
}));

const ShoppingCart = () => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const {
    showCart,
    setShowCart,
    cartItems,
    removeFromCart,
    withVoucher,
    clearCart,
  } = useContext(ShoppingCartContext);

  const handleClose = () => setShowCart(false);
  const handleBuy = () => {
    setShowCart(false);
    clearCart();
  };

  //calculare price from cart using quantity
  const cartItemList = Object.values(cartItems);
  let totalPrice = cartItemList.reduce((acc, item) => {
    acc += parseInt(item.price) * item.quantity;
    return acc;
  }, 0);

  //if £10 off should be applied
  const applyVoucher = totalPrice > 30;
  if (withVoucher && applyVoucher) totalPrice -= 10;

  return (
    <Dialog
      open={showCart}
      onClose={handleClose}
      fullScreen={fullScreen}
      scroll="paper"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Shopping Cart</DialogTitle>
      {cartItemList.map(({ id, name, colour, size, price, quantity }) => (
        <DialogContent key={`${id}-${size}`} dividers>
          <Grid container>
            <Grid item xs={10}>
              <Typography component="span" variant="h6">
                {name}
              </Typography>
              <Typography variant="body1">
                Colour: {colour} | Size: {size} | RRP: £{price}
              </Typography>
              <Typography variant="body2">Quantity: {quantity}</Typography>
            </Grid>
            <Grid item xs={2} className={classes.deleteItemBtn}>
              <IconButton
                color="inherit"
                onClick={() => removeFromCart(id, size)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
      ))}
      <DialogContent dividers className={classes.cartCoupon}>
        <CartVoucher canApply={applyVoucher} />
      </DialogContent>
      <DialogActions>
        <Typography variant="body1">Total: £{totalPrice}</Typography>
        <Button
          onClick={handleBuy}
          color="primary"
          variant="contained"
          disabled={!cartItemList.length}
        >
          Buy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingCart;
