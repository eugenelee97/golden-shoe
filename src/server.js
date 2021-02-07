import express from "express";
import bodyParser from "body-parser";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import React from "react";
import apiRouter from "./api/router";
import App from "./components/App";
import {
  ServerStyleSheets,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
const theme = createMuiTheme({});

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server.use(bodyParser.json());
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

//backend api
server.use("/api", apiRouter);

//render react pages if route is not /api
server.get("/*", (req, res) => {
  const context = {};
  const sheets = new ServerStyleSheets();
  const markup = renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    )
  );

  const materialCss = sheets.toString();

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(
      `<!doctype html>
          <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              <title>Golden Shoe - Eugene Lee</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${
                assets.client.css
                  ? `<link rel="stylesheet" href="${assets.client.css}">`
                  : ""
              }
              <style id="jss-server-side">${materialCss}</style>
              ${
                process.env.NODE_ENV === "production"
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`
              }
              <link rel="preconnect" href="https://fonts.gstatic.com">
              <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;1,600&family=Quattrocento:wght@400;700&display=swap" rel="stylesheet">
          </head>
          <body>
              <div id="root">${markup}</div>
          </body>
      </html>`
    );
  }
});

// express error handler
server.use((err, req, res, next) => {
  if (!err.message) res.status(500).send({ err: "Internal server error" });
  res.status(500).send({ err });
});

export default server;
