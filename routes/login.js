const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const axios = require("axios");

const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
});

const { check_login } = require("../middleware/check_login.js");

router.get("/p/login", async(req, res) =>{
    const { is_login } = req.session ?? {};

    if(is_login === true){
        return res.redirect("/p/overview");
    }

    return res.render("index.ejs", {
        PAGE: "LOGIN",
        session: {
            is_login: req.session.is_login,
        },
    });
});

router.post("/api/admin/login/auth", urlEncoded, async(req, res) =>{
    const { admin_id, admin_password } = req.body ?? {};

    if(!admin_id || !admin_password){
        return res.json({
            status: "FAIL",
            error: `Cant find data from body`,
        });
    }

    connection.execute(`SELECT * FROM admin_data_table WHERE admin_id=? AND admin_password=?`, [admin_id, admin_password], async(error, results, fields) =>{
        if(error){
            return res.json({
                status: "FAIL",
                error: `mysql error :: ERROR :: ${error}`
            });
        }

        if(results.length === 0){
            return res.json({
                status: "FAIL",
                error: `ID or PASSWORD is incorrect`
            });
        }

        req.session.is_login = true;
        req.session.admin_id = admin_id;

        return res.json({
            status: "SUCCESS",
            error: null,
            data: {
                is_login: await req.session.is_login,
                admin_id: await req.session.admin_id,
            }
        });
    });
});

module.exports = router;