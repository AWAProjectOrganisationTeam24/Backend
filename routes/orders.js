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
router.post('/add-order/:id_restaurant/:id', (req,res) => {
    sql.query("INSERT INTO orders (id_restaurant, id_customer, price, time, date, status, content, paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [req.params.id_restaurant, req.params.id, req.body.price, req.body.time, req.body.date, req.body.status, req.body.content, req.body.paid]);
});


//EDITING ORDERS
router.post('/edit-order/customer/:id', (req,res) => {
        sql.query("UPDATE orders SET id_restaurant = ?, id_customer = ?, price = ?, time = ?, date = ?, status = ?, content = ?, paid = ? WHERE id_order = ?",
        [req.body.id_restaurant, req.params.id, req.body.price, req.body.time, req.body.date, req.body.status, req.body.content, req.body.paid, req.params.id_order]);
});

router.post('/edit-order/restaurant/:id', (req,res) => {
    sql.query("UPDATE orders SET status = ? WHERE id_order = ?",
        [req.body.status, req.params.id]);
});

router.get('/edit-order/restaurant/:id', (req,res) => {
    sql.query("SELECT * FROM orders WHERE id_order = ?",
        [req.params.id] , function (err, result) {
            if (err) throw err;
            res.send(result);
        });
});
module.exports = router;
