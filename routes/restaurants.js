const express = require('express');
const router = express.Router();
const sql = require('../db');


//RESTAURANT DEFAULT LIST
router.get("/", function(req,res) {
        sql.query("SELECT * FROM restaurant", function (err, result) {
            if (err) throw err;
            res.send(result);
        });
});

//RESTAURANTS IN SEARCHED CITY
router.post("/",  function(req, res) {
    sql.query("SELECT * FROM restaurant WHERE city = ?", [req.body.city] , function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//ADD RESTAURANT
router.post('/add-restaurant', (req,res) => {
    sql.query("INSERT INTO restaurant (name, address, city, image, type, openHr) VALUES ($1, $2, $3, $4, $5, $6)",
        [req.body.name, req.body.address, req.body.city, req.body.image, req.body.type, req.body.openHr]);
});

//EDIT RESTAURANT
router.post('/edit-restaurant/:id', (req,res) => {
    sql.query("UPDATE restaurant SET name = ?, address = ?, city = ?, image = ?, type = ?, openHr = ? WHERE id_restaurant = ?",
        [req.body.name, req.body.address, req.body.city, req.body.image, req.body.type, req.body.openHr, req.params.id]);
});

module.exports = router;
