const express = require('express');
const router = express.Router();
const sql = require('../db');



router.get("/", (req,res) => {
        //not sure it this even has to be here

});

router.post("/",  (req, res) => {
    //console.log(req.body.city);
   // sql.query("SELECT * FROM restaurant WHERE city = $1", [req.body.city] , function (err, result) {

    sql.query("SELECT * FROM restaurant", function (err, result) {

        if (err) throw err;
        res.send(result);
    });
});

router.post('/add-restaurant', (req,res) => {
    sql.query("INSERT INTO restaurant (name, address, city, image, type, openHr) VALUES ($1, $2, $3, $4, $5, $6)",
        [req.body.name, req.body.address, req.body.city, req.body.image, req.body.type, req.body.openHr]);
});
router.post('/edit-restaurant/:id', (req,res) => {

        sql.query("UPDATE restaurant SET name = $1, address = $2, city = $3, image = $4, type = $5, openHr = $6 WHERE id_restaurant = $7",
        [req.body.name, req.body.address, req.body.city, req.body.image, req.body.type, req.body.openHr, req.params.id]);
});

module.exports = router;
