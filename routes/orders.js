const express = require('express');
const router = express.Router();
const sql = require('../db');



//SHOW ORDERS
router.get("/customer/:id",  (req, res) => {
    sql.query("SELECT * FROM orders WHERE id_customer = ?", [req.params.id] , function (err, result) {
        if (err) throw err;
        res.send(result);
    });

});
router.get("/restaurant/:id",  (req, res) => {
    sql.query("SELECT * FROM orders WHERE id_restaurant = ?", [req.params.id] , function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//CUSTOMER CREATES NEW ORDER
router.post('/add-order/:id', (req,res) => {
    sql.query("INSERT INTO orders (id_restaurant, id_customer, price, time, date, status, content, paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [req.body.id_restaurant, req.params.id, req.body.price, req.body.time, req.body.date, req.body.status, req.body.content, req.body.paid]);
});


//EDITING ORDERS
router.post('/edit-order/customer/:id', (req,res) => {
        sql.query("UPDATE orders SET id_restaurant = ?, id_customer = ?, price = ?, time = ?, date = ?, status = ?, content = ?, paid = ? WHERE id_order = ?",
        [req.body.id_restaurant, req.params.id, req.body.price, req.body.time, req.body.date, req.body.status, req.body.content, req.body.paid, req.params.id_order]);
});

router.post('/edit-order/restaurant/:id', (req,res) => {
    sql.query("UPDATE orders SET id_restaurant = ?, id_customer = ?, price = ?, time = ?, date = ?, status = ?, content = ?, paid = ? WHERE id_order = ?",
        [req.params.id, req.body.id_customer, req.body.price, req.body.time, req.body.date, req.body.status, req.body.content, req.body.paid, req.params.id_order]);
});

module.exports = router;
