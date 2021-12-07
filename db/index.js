const mysql = require('mysql');
/*
const con = mysql.createConnection({
    host: "us-cdbr-east-04.cleardb.com",
    user: "b75ac4e3bb1efc",
    password: "1ebef5af",
    database:"heroku_57ceb6976b5c753"
});
*/
//mysql://b75ac4e3bb1efc:1ebef5af@us-cdbr-east-04.cleardb.com/heroku_57ceb6976b5c753?reconnect=true

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"awa_project"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;