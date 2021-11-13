const express = require('express');
const router = express.Router();
const sql = require('../db');



router.get("/", (req,res) => {
        //not sure it this even has to be here

});

router.post("/",  (req, res) => {
    //console.log(req.body.city);
   // sql.query("SELECT * FROM restaurant WHERE city = $1", [req.body.city] , function (err, result) {

    sql.query("SELECT * FROM customer", function (err, result) {

        if (err) throw err;
        res.send(result);
    });
});

router.post('/add-customer', (req,res) => {
    sql.query("INSERT INTO customer (firstname, lastname, mail, psw, address, city) VALUES ($1, $2, $3, $4, $5, $6)",
        [req.body.firstname, req.body.lastname, req.body.mail, req.body.psw, req.body.address, req.body.city]);
});
router.post('/edit-customer/:id', (req,res) => {

    //id comes from params not body
        sql.query("UPDATE customer SET firstname = $1, lastname = $2, mail = $3, psw = $4, address = $5, city = $6 WHERE id_customer = $7",
        [req.body.firstname, req.body.lastname, req.body.mail, req.body.psw, req.body.address, req.body.city, req.params.id]);
});

module.exports = router;
