const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });



app
    .use(express.json())
    .use(cookieParser());

app.use(function(req, res, next) {
    //res.header('Access-Control-Allow-Origin', 'http:/localhost:3000');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});


const customerRouter = require('./routes/customers');
const restaurantRouter = require('./routes/restaurants');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');



app.use('/customer', customerRouter);
app.use('/', restaurantRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

/*
app.get('/', function(req,res) {
   res.send('hi');
});

app.post("/",  function(req, res) {
    console.log(req.body.city);
     sql.query("SELECT * FROM restaurant WHERE city = ?", [req.body.city] , function (err, result) {

        if (err) throw err;
        res.send(result);
    });
});
*/
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
