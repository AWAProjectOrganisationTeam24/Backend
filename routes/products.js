const express = require('express');
const router = express.Router();
const sql = require('../db');



router.get("/", (req,res) => {
        //not sure it this even has to be here

});

router.post("/",  (req, res) => {
    //for restaurnt
    // sql.query("SELECT * FROM product WHERE id_restaurant = $1", [req.body.id] , function (err, result) {

    sql.query("SELECT * FROM product", function (err, result) {

        if (err) throw err;
        res.send(result);
    });
});

router.post('/add-product', (req,res) => {
    sql.query("INSERT INTO product (id_restaurant, category, name, description, price, image) VALUES ($1, $2, $3, $4, $5, $6)",
        [req.body.id_restaurant, req.body.category, req.body.name, req.body.description, req.body.price, req.body.image]);
});
router.post('/edit-product/:id', (req,res) => {

    //id comes from params not body
        sql.query("UPDATE product SET id_restaurant = $1, category = $2, name = $3, description = $4, price = $5, image = $6 WHERE id_product = $7",
        [req.body.id_restaurant, req.body.category, req.body.name, req.body.description, req.body.price, req.body.image, req.params.id]);
});

module.exports = router;
