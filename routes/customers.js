const express = require('express');
const router = express.Router();
const sql = require('../db');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/auth');
    } else {
        next();
    }
};

router.get('/', function (req, res) {

/*
router.get('/', sessionChecker, function (req, res) {
    res.send("hello");

      res.render('main',
        {layout: 'login', listExists: true});

     */

});
router.post('/',urlencodedParser, function (req, res) {

    console.log(req.body);
    ssn=req.session;
    sql.query('SELECT 1 firstname, lastname, mail, address, city from customer where mail=? and psw=md5(?)', [req.body.mail,req.body.psw],
        function(error, results,fields) {
            if (error) throw error;
            if (results.length >= 1) {
                console.log("customer:  ");
                console.log(results);
                const user = {
                    mail: req.body.mail,
                    firstname: results[0].firstname,
                    lastname: results[0].lastname,
                    address: results[0].address,
                    city: results[0].city
                };
                ssn.user = user;
                res.send(user);
            } else {
                console.log("wrong psw");
            }

        }
    );

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
