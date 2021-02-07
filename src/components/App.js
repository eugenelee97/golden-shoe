import React from "react";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import AllProductsPage from "./AllProductsPage";
import FaqPage from "./FaqPage";
import { ShoppingCartContextProvider } from "../context/ShoppingCartContext";
import "./app.css"

const App = () => (
  <ShoppingCartContextProvider>
    <CssBaseline />
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/products" component={AllProductsPage} />
        <Route exact path="/faq" component={FaqPage} />
        <Route path="/faq/:id" component={FaqPage} />
        <Route component={HomePage} />
      </Switch>
    </main>
    <Footer />
  </ShoppingCartContextProvider>
);

export default App;
