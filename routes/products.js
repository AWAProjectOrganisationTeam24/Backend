const express = require('express');
const router = express.Router();
const sql = require('../db');



//SHOW RESTAURANT'S MENU PRODUCTS
router.get("/restaurant/:id",  (req, res) => {
    sql.query("SELECT * FROM products WHERE id_restaurant =?", [req.params.id] , function (err, result) {
        if (err) throw err;
        res.send(result);
    });

});


//RESTAURANT IS ADDING PRODUCT
router.post('/add-product/:id', (req,res) => {
    sql.query("INSERT INTO product (id_restaurant, category, name, description, price, image) VALUES ($1, $2, $3, $4, $5, $6)",
        [req.params.id, req.body.category, req.body.name, req.body.description, req.body.price, req.body.image]);
});


//RESTAURANTS ID EDITING PRODUCT
router.post('/edit-product/:id', (req,res) => {
    sql.query("UPDATE product SET category = ?, name = ?, description = ?, price = ?, image = ? WHERE id_product = ?",
        [req.body.category, req.body.name, req.body.description, req.body.price, req.body.image, req.params.id]);
});

module.exports = router;
