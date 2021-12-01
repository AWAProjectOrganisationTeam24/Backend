const express = require('express');
const router = express.Router();
const sql = require('../db');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const sessions = require('express-session');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

router.use(cors());
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));

let jwtSecretKey = null;
if(process.env.JWTKEY === undefined) {
        jwtSecretKey = require('../jwt-key.json').secret;
} else {
        jwtSecretKey = process.env.JWTKEY;
}


let options = {}

passport.use(new BasicStrategy(
    function(mail, psw, done) {

        sql.query("SELECT id_customer, firstname, lastname, mail, psw, address, city from customer WHERE mail =?", mail, function (err, results) {
            if (err) throw err;
            const user = results;

            if(results == undefined) {
                // Username not found
                console.log("HTTP Basic username not found");
                return done(null, false, { message: "HTTP Basic username not found" });
            }

            if(bcrypt.compareSync(psw, results[0].psw) == false) {
                // Password does not match
                console.log("HTTP Basic password not matching username");
                return done(null, false, { message: "HTTP Basic password not found" });
            }
            return done(null, user);
            });
    }));



            /* Configure the passport-jwt module to expect JWT
               in headers from Authorization field as Bearer token */
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

/* This is the secret signing key.
   You should NEVER store it in code  */
options.secretOrKey = jwtSecretKey;

passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log("Processing JWT payload for token content:");
        console.log(jwt_payload);


        /* Here you could do some processing based on the JWT payload.
        For example check if the key is still valid based on expires property.
        */
        const now = Date.now() / 1000;
        if(jwt_payload.exp > now) {
                done(null, jwt_payload.user);
        }
        else {// expired
                done(null, false);
        }
}));


router.get(
    '/login',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
            console.log("jwt");
            res.json(
                {
                        status: "Successfully accessed protected resource with JWT",
                        user: req.user
                }
            );
    }
);
router.post(
    '/login',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        const body = {
            id: req.user[0].id_customer,
            email : req.user[0].mail
        };
        const payload = {
            user : body
        };

        const options = {
            expiresIn: '1d'
        }

        /* Sign the token with payload, key and options.


         */
        const token = jwt.sign(payload, jwtSecretKey, options);

        return res.json({ token });
    });

/*
Body JSON structure example
{
	"description": "Example todo",
	"dueDate": "25-02-2020"
}

router.get('/todosJWT',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
            console.log('GET /todosJWT')
            const t = todos.getAllUserTodos(req.user.id);
            console.log('User Id: ' + req.user.id);
            res.json(t);
    })


router.post('/todosJWT',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('POST /todosJWT');
    console.log(req.body);
    if(('description' in req.body) && ( 'dueDate' in req.body)) {
      todos.insertTodo(req.body.description, req.body.dueDate, req.user.id);
      res.json(todos.getAllUserTodos(req.user.id));
    }
    else {
      res.sendStatus(400);
    }

})
*/
/*

const oneDay = 1000 * 60 * 60 * 24;

router.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
passport.use(new BasicStrategy(
    function(mail, psw, done) {

        sql.query("SELECT firstname, lastname, mail, psw, address, city from customer WHERE mail =?", mail, function (err, results) {
            if (err) throw err;
            const user = results;

            if(results == undefined) {
                // Username not found
                console.log("HTTP Basic username not found");
                return done(null, false, { message: "HTTP Basic username not found" });
            }
             Verify password match

 */
/*
if(bcrypt.compareSync(psw, results[0].psw) == false) {
    // Password does not match
    console.log("HTTP Basic password not matching username");
    return done(null, false, { message: "HTTP Basic password not found" });
}
return done(null, user);
});
}
));

/*
router.get('/login',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
        res.json({
            firstname: req.user[0].firstname,
            lastname: req.user[0].lastname,
            mail: req.user[0].mail,
            address: req.user[0].address,
            city: req.user[0].city
        });
    });


*/
//-------------------------------------------------


router.post('/edit-customer/:id', (req,res) => {

    //id comes from params not body
        sql.query("UPDATE customer SET firstname = ?, lastname = ?, mail = ?, psw = ?, address = ?, city = ? WHERE id_customer = ?",
        [req.body.firstname, req.body.lastname, req.body.mail, req.body.psw, req.body.address, req.body.city, req.params.id]);
});

module.exports = router;
