const sql = require("./db");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

const customerRouter = require('./routes/customers');
const restaurantRouter = require('./routes/restaurants');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');



app.use('/', customerRouter);
app.use('/restaurants', restaurantRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);


/*
**
**** SERVER CONFIG
***
*/
let port = process.env.PORT;

if(port == null || port === "") {
    port = 5000;
}

app.listen(port, function() {
    console.log("Server started successfully");
});
