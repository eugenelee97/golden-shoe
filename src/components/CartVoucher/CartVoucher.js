import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ShoppingCartContext from "../../context/ShoppingCartContext";

const useStyles = makeStyles((theme) => ({
  applyCouponBtn: {
    verticalAlign: "bottom",
  },
}));

const CartVoucher = ({ canApply }) => {
  const classes = useStyles();
  const { withVoucher, setWithVoucher } = useContext(ShoppingCartContext);

  const [disableVoucherBtn, setDisableVoucherBtn] = useState(withVoucher);
  const [voucher, setVoucher] = useState("");
  const [voucherStatus, setVoucherStatus] = useState("NONE");

  const onVoucherChange = (event) => setVoucher(event.target.value);

  const applyVoucher = (event) => {
    event.preventDefault();
    if (!voucher) return setVoucherStatus("INVALID");

    setDisableVoucherBtn(true);
    //call api for voucher status
    fetch(`/api/voucher/${voucher.toUpperCase()}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "ACTIVE") {
          setWithVoucher(true);
        } else {
          setVoucherStatus(res.status);
          setDisableVoucherBtn(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setVoucherStatus("ERROR");
        setDisableVoucherBtn(false);
      });
  };

  //return message by status
  const getVoucherMessage = () => {
    switch (voucherStatus) {
      case "ACTIVE":
        return "Voucher applied!";
      case "EXPIRED":
        return "This voucher has expired.";
      case "INVALID":
        return "This voucher is invalid.";
      case "ERROR":
        return "Sorry, there was a problem applying the voucher.";
      default:
        return "";
    }
  };

  const withVoucherMessage = canApply
    ? "Voucher applied!"
    : "Must spend at least £30 for voucher to be applied";

  return (
    <>
      {withVoucher && <Typography>{withVoucherMessage}</Typography>}
      {!withVoucher && (
        <>
          <Typography>{getVoucherMessage()}</Typography>
          <TextField
            label="Coupon code"
            onChange={onVoucherChange}
            disabled={withVoucher}
          />
          <Button
            className={classes.applyCouponBtn}
            color="secondary"
            onClick={applyVoucher}
            disabled={disableVoucherBtn}
          >
            Apply
          </Button>
        </>
      )}
    </>
  );
};

export default CartVoucher;
