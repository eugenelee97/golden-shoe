import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ShoppingCartContext from "../../context/ShoppingCartContext";
import ProductBreadcrumbs from "../ProductBreadcrumbs";
import UserRating from "../UserRating";

const useStyles = makeStyles((theme) => ({
  productImg: {
    width: "100%",
  },
  productForm: {
    margin: theme.spacing(2, 0),
  },
  productFormField: {
    marginRight: theme.spacing(2),
  },
  productInfo: {
    padding: theme.spacing(2, 4),
  },
  sizes: {
    margin: theme.spacing(2, 1, 2, 0),
  },
  addBtn: {
    margin: theme.spacing(2, 0),
  },
  review: {
    marginTop: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
    textTransform: "uppercase",
  },
  inStock: {
    color: theme.palette.success.dark,
    fontWeight: theme.typography.fontWeightBold,
  },
  outOfStock: {
    color: theme.palette.error.dark,
    fontWeight: theme.typography.fontWeightBold,
  },
  deliveryText: {
    textTransform: "uppercase",
  },
}));

const ProductPage = () => {
  const classes = useStyles();
  const { addToCart, cartItems } = useContext(ShoppingCartContext);
  const [size, setSize] = useState("");
  const [product, setProduct] = useState({
    name: "",
    shortName: "",
    colour: "",
    price: "",
    img: "",
    stock: {},
  });
  const { id } = useParams();

  // Run once when component mounts
  useEffect(() => {
    //get product data and set default shoe size
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.stock) {
          setProduct(res);
          setSize(Object.keys(res.stock)[0]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const addItemToCart = () => addToCart({ id, name, colour, size, price });
  const handleSizeChange = (size) => setSize(size);

  const { name, shortName, colour, price, imgUrl, stock } = product;

  //calculate shoe left if add to cart
  const amountOfItemInCart = cartItems[`${id}-${size}`]?.quantity || 0;
  const availableStockForSize = stock[size];
  const remainingStock = availableStockForSize - amountOfItemInCart;

  let stockLeftMessage = `Only ${remainingStock} items remaining!`;
  if (!remainingStock) stockLeftMessage = "Sorry, there is no more stock.";

  return (
    <>
      <ProductBreadcrumbs shortName={shortName} />
      <Container maxWidth="md" disableGutters>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <img className={classes.productImg} src={imgUrl} alt={name} />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.productInfo}>
            <Typography variant="h5" component="h1">
              {name}
            </Typography>

            <Typography
              component="h2"
              variant="h6"
              color="textSecondary"
              gutterBottom
            >
              £{parseFloat(price).toFixed(2)}
            </Typography>

            <Typography>
              <strong>Colour:</strong> {colour}
            </Typography>

            {Object.keys(stock).map((s) => (
              <Button
                key={s}
                className={classes.sizes}
                variant={s === size ? "contained" : "outlined"}
                onClick={() => handleSizeChange(s)}
                disableElevation
              >
                UK {s}
              </Button>
            ))}

            {remainingStock > 5 ? (
              <>
                <Typography variant="h5" className={classes.inStock}>
                  In stock
                </Typography>
                <Typography variant="caption" className={classes.deliveryText}>
                  Order before 11pm for guaranteed next day delivery
                </Typography>
              </>
            ) : (
              <Typography variant="h6" className={classes.outOfStock}>
                {stockLeftMessage}
              </Typography>
            )}

            <div>
              <Button
                className={classes.addBtn}
                variant="contained"
                color="primary"
                onClick={addItemToCart}
                disabled={!remainingStock}
              >
                Add to bag
              </Button>
            </div>

            <Typography className={classes.review}>Reviews</Typography>
            <UserRating title="Size" rating={3} />
            <UserRating title="Comfort" rating={3} />
            <UserRating title="Quality" rating={3} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductPage;
