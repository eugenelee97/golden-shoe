import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ProductCard from "../ProductCard";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    marginTop: theme.spacing(4),
  },
  featuredText: {
    margin: theme.spacing(2, 0),
    fontFamily: "'Montserrat', sans-serif",
  },
  header: {
    fontSize: "28px",
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: theme.spacing(2),
  },
}));

const AllProductsPage = ({ width, history }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  //calculare amount on row
  const getGridListCols = () => {
    if (isWidthUp("lg", width)) return 4;
    if (isWidthUp("md", width)) return 3;
    if (isWidthUp("sm", width)) return 2;
    return 1;
  };

  const productOnClick = (id) => history.push(`product/${id}`);

  // Run once when component mounts
  useEffect(() => {
    //get all products
    fetch("/api/products")
      .then((res) => res.json())
      .then((res) => {
        res.products && setProducts(res.products);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Container maxWidth="lg" className={classes.productContainer}>
        <Typography className={classes.header}>All Products</Typography>
        <GridList cellHeight="auto" cols={getGridListCols()} spacing={16}>
          {products.map(({ id, name, imgUrl, price }) => (
            <GridListTile key={id} cols={1} onClick={() => productOnClick(id)}>
              <ProductCard name={name} img={imgUrl} price={price} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </>
  );
};

export default withWidth()(withRouter(AllProductsPage));
