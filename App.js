const sql = require("./db");

const express = require("express");
const Quote = require('inspirational-quotes');
const app = express();
const bodyParser = require('body-parser');


const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });



app.get("/", async (req, res) => {

    const command = sql.query("SELECT * FROM restaurant", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
/*
app.post('/', function (req, res) {
    //const location = req.body;
    const command = sql.query('SELECT * FROM restaurant');
    sql.query(command, function (error, results) {
            if (error) throw error;
            console.log("restaurants:  ");
            console.log(results);
            //res.send(results);
           }

    );
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
