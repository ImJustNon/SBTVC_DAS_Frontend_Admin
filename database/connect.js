const mysql = require("mysql2");
const config = require("../configs/config.js");
const connection = mysql.createConnection(config.database.mysql);

const connect = async() =>{
    connection.connect((err) =>{
        if (err) {
            console.log(("[DATABASE] ") + (`MySQL : Cannot connect to database ERROR : `) + (err));
        } 
        else {
            console.log(("[DATABASE] ") + (`MySQL : Connected`));
        }
    });
}

exports.connection = connection;
exports.connect = connect;