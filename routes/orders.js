const express = require('express');
const router = express.Router();
const sql = require('../db');



router.get("/", (req,res) => {
        //not sure it this even has to be here

});

router.post("/",  (req, res) => {
    //console.log(req.body.city);

    //for customers
    //sql.query("SELECT * FROM orders WHERE id_customer = $1", [req.body.id] , function (err, result) {
    //for restaurant
    //sql.query("SELECT * FROM orders WHERE id_restaurant = $1", [req.body.id] , function (err, result) {

    sql.query("SELECT * FROM orders", function (err, result) {

        if (err) throw err;
        res.send(result);
    });
});

router.post('/add-order', (req,res) => {
    sql.query("INSERT INTO orders (id_restaurant, id_customer, price, time, date, status, content, paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [req.body.id_restaurant, req.body.id_customer, req.body.price, req.body.time, req.body.date, req.body.status, req.body.content, req.body.paid]);
});
router.post('/edit-order/:id', (req,res) => {

        sql.query("UPDATE orders SET id_restaurant = $1, id_customer = $2, price = $3, time = $4, date = $5, status = $6, content = $7, paid = $8 WHERE id_order = $9",
        [req.body.id_restaurant, req.body.id_customer, req.body.price, req.body.time, req.body.date, req.body.status, req.body.content, req.body.paid, req.params.id_order]);
});

module.exports = router;
