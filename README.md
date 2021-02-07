# Golden Shoe - Demo App

## Overview

Mobile first responsive website built as a demo prototype for Golden Shoe.

**New Features**

- Responsive website
- Stock availability
- Online vouchers
- Returns information

### Built with

- Razzle
- React
- Express
- DynamoDB
- Material UI

### Requirements

- Node (v14.7.0)
- Docker (for local dynamodb)

## Getting Started

You must have node and docker installed to running locally. There is `.env` file that you modify for custom environment variables.

1. Install node packages, run:

```
npm ci
```

2. Start local dynamodb, run:

```
docker-compose up -d
```

3. Initialise dynamodb with dummy data, run:

```
npm run init
```

4. Start app in development mode, run:

```
npm run dev
```

or build and start in production mode
(You will need to export environment variables to run in production) e.g.

```
npm run build
export PRODUCT_DB_NAME=Shoes
export STOCK_DB_NAME=Stock
export VOUCHER_DB_NAME=Vouchers
export DB_ENDPOINT=http://localhost:8000
export AWS_REGION=us-west-2
export AWS_ACCESS_KEY_ID=foo
export AWS_SECRET_KEY=bar
npm run start
```

## Backend

### Supported API

`/api/products` - returns all products

`/api/products?limit=10` - allows query param `limit`

`/api/product/:id` - returns data on product with stock availability

`/api/voucher/:code` - returns voucher code state

## Frontend

### Supported Features

- `Responsive website` - built mobile first and works well on all devices

- `Stock availability` - checks database if stock for shoe and shoe size is available and shows message depending on stock available. User cannot add to cart if no stock.

- `Online vouchers` - checks database if given voucher code state is `ACTIVE` or `EXPIRED`, else `INVALID`. Applys the £10 off discount if voucher code is active and cost is at least £30.

- `Returns information` - new FAQ page for give users more information about Returns, Exchange and Shippng. Links at footer, at bottom of page.

## Database

`Shoes`, `Stock` and `Vouchers` tables created in DynamoDB.
Dummy data and db setup scripts in `/scripts` folder.
